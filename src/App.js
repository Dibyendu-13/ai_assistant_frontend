import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { AppContainer, Title, UploadButton } from './App_Styling.js'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:4000', {
    secure: true,
    transports: ['websocket'],
});

const HumeVoiceInteraction = () => {
    const [transcribedText, setTranscribedText] = useState('');
    const [audioQueue, setAudioQueue] = useState([]); // Queue to hold audio data
    const [pdfFile, setPdfFile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const isPlayingAudio = useRef(false); // Track if audio is currently playing
    const recognitionRef = useRef(null);

    const playNextAudio = useCallback(async () => {
        if (audioQueue.length === 0) return;

        isPlayingAudio.current = true; // Mark as playing
        const nextAudioSrc = audioQueue[0]; // Get the next audio in the queue

        const audio = new Audio(nextAudioSrc);
        audio.onended = () => {
            setAudioQueue((prevQueue) => prevQueue.slice(1)); // Remove the played audio
            isPlayingAudio.current = false; // Mark as ready for the next audio
        };

        try {
            await audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
            toast.error('Error playing audio.');
            setAudioQueue((prevQueue) => prevQueue.slice(1)); // Remove the errored audio
            isPlayingAudio.current = false;
        }
    }, [audioQueue]);

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
            setAudioQueue((prevQueue) => [...prevQueue, audioData]); // Add to the queue
            toast.success('Received audio output!');
            setTranscribedText('');
            setIsRecording(false);
        });

        return () => {
            socket.off('audioOutput');
            socket.off('error');
        };
    }, []);

    useEffect(() => {
        // Play audio sequentially from the queue
        if (!isPlayingAudio.current && audioQueue.length > 0) {
            playNextAudio();
        }
    }, [audioQueue, playNextAudio]);

    const startRecording = () => {
        if (!recognitionRef.current) {
            toast.error('Speech recognition is not available in this browser.');
            return;
        }

        // Request microphone access
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                recognitionRef.current.start();
                setIsRecording(true);
                toast.success('Recording started...');
            })
            .catch((err) => {
                console.error('Microphone access denied:', err);
                toast.error('Microphone access denied. Please allow microphone access.');
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        socket.emit('userInput', transcribedText);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
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
            {audioQueue.length > 0 && (
                <p style={{ marginTop: '20px', fontSize: '1rem' }}>Queued Audio: {audioQueue.length}</p>
            )}
            <ToastContainer 
                position="top-center" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </AppContainer>
    );
};

export default HumeVoiceInteraction;
