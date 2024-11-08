import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { AppContainer, Title, UploadButton } from './App_Styling.js'; // Adjust the path as needed

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:4000'); // Ensure this matches your server's URL



const HumeVoiceInteraction = () => {
    const [transcribedText, setTranscribedText] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // Stop after each transcription
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setTranscribedText(transcript);
                toast.info('Transcription complete: ' + transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                toast.error('Speech recognition error: ' + event.error);
            };
        } else {
            toast.error('Speech recognition not supported in this browser.');
        }

        socket.on('audioOutput', (audioBase64) => {
            const audioData = `data:audio/wav;base64,${audioBase64}`;
            setAudioSrc(audioData);
            toast.success('Received audio output!');
            
            // Reset after receiving output
            setTranscribedText('');
            setIsRecording(false);
        });

        return () => {
            socket.off('audioOutput');
            socket.off('error');
        };
    }, []);

    const startRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsRecording(true);
            toast.success('Recording started...');
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {

            recognitionRef.current.stop();
            
           
            socket.emit('userInput', transcribedText);
            toast.info('Recording stopped. Transcription will be sent.');
        }
    };


    const handlePdfUpload = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const uploadPdf = () => {
        if (pdfFile) {
            const formData = new FormData();
            formData.append('file', pdfFile);

            fetch('http://localhost:4000/upload-pdf', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('PDF uploaded successfully:', data.text);
                    toast.success('PDF uploaded successfully!');
                } else {
                    toast.error(data.message);
                }
            })
            .catch(error => {
                toast.error('Error uploading PDF: ' + error.message);
            });
        } else {
            toast.error('Please select a PDF file to upload.');
        }
    };

    return (
        <AppContainer>
            <Title>Hume AI Voice Interaction</Title>
            <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                style={{ marginBottom: '20px' }}
            />
            <UploadButton onClick={uploadPdf}>Upload PDF</UploadButton>
            {isRecording ? (
                <UploadButton onClick={stopRecording}>Stop Recording</UploadButton>
            ) : (
                <UploadButton onClick={startRecording}>Start Recording</UploadButton>
            )}
           
            {transcribedText && (
                <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Transcribed Text: {transcribedText}</p>
            )}
            {audioSrc && (
                <audio controls src={audioSrc} autoPlay />
            )}
            <ToastContainer 
                position="top-center" // Position of the notifications
                autoClose={5000} // Duration for which the notification will be displayed
                hideProgressBar={false} // Show progress bar
                newestOnTop={false} // New notifications appear below
                closeOnClick // Close on click
                rtl={false} // Right to left layout
                pauseOnFocusLoss // Pause on window focus loss
                draggable // Allow dragging
                pauseOnHover // Pause on hover
            />
        </AppContainer>
    );
};

export default HumeVoiceInteraction;
