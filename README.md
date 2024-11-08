# Hume AI Voice Interaction

## Project Overview
Hume AI Voice Interaction is a React-based web application designed to facilitate seamless voice interactions. It allows users to start and stop voice recordings, transcribe their speech, receive real-time feedback, and interact with a server to handle audio responses. Additionally, the application supports PDF uploads, enabling document processing and information retrieval from the uploaded PDFs.

## Features
- **Speech-to-Text Transcription**: Utilizes the browser’s built-in Speech Recognition API to transcribe spoken input.
- **Real-time Audio Response**: Connects to a backend server using Socket.IO for real-time audio output.
- **PDF Upload and Processing**: Enables users to upload PDF files, which are sent to the server for processing.
- **Toast Notifications**: Provides feedback for user actions using `react-toastify`.
- **Audio Playback**: Plays audio responses from the server.

## Technology Stack
- **React**: Frontend library for building the user interface.
- **Socket.IO**: Used for real-time communication between the client and server.
- **React Toastify**: Provides notifications for user interactions.
- **HTML5 Audio**: Handles audio playback for the received server output.
- **JavaScript/JSX**: Core language for frontend development.

## Installation and Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dibyendu-13/ai_assistant_frontend.git
   cd ai_assistant_frontend
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the React Application**:
   ```bash
   npm start
   ```

4. **Backend Setup**:
   The client application expects a server running at `http://localhost:4000`. Ensure you have a server set up with Socket.IO and appropriate endpoints for handling audio and PDF uploads.

## File Structure
- **src/**
  - **components/**
    - `HumeVoiceInteraction.js`: Main React component handling voice interaction and PDF upload functionality.
  - **App_Styling.js**: Styled-components or CSS-in-JS for styling the application.
- **public/**
  - Contains static assets and the `index.html` file.
- **package.json**: Configuration file for dependencies and project metadata.

## How to Use
1. **Upload a PDF**:
   - Click the file input to select a PDF and press the “Upload PDF” button.

2. **Start Recording**:
   - Press the “Start Recording” button to begin transcribing speech. The app will notify you once the recording starts.

3. **Stop Recording and Send Transcription**:
   - Press “Stop Recording” to stop the transcription and send the recorded text to the backend server.

4. **Audio Output**:
   - The app will receive audio output from the server and play it automatically.

## Environment Variables
Ensure that the server URL matches your backend configuration:
```javascript
const socket = io('http://localhost:4000'); // Adjust the server URL as needed
```

## Dependencies
- **React**
- **Socket.IO Client**
- **React Toastify**

Install dependencies using:
```bash
npm install react react-dom socket.io-client react-toastify
```

## Notifications
The app uses `react-toastify` for alerts:
- Displays transcription success and error messages.
- Notifies when the recording starts and stops.
- Alerts on PDF upload success or errors.

## Potential Enhancements
- **Real-time Transcription Display**: Display interim results for better user feedback.
- **PDF Content Preview**: Show parsed content from uploaded PDFs.
- **Authentication**: Add user authentication for personalized interactions.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any issues or feature requests, please open an issue on [GitHub](https://github.com/your-username/hume-ai-voice-interaction) or reach out to the project maintainer.

---
Thank you for using Hume AI Voice Interaction!

