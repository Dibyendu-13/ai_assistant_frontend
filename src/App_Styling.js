import styled from 'styled-components';

// Define the main container
export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh; /* Full height of the viewport */
    background: linear-gradient(135deg, #6a82fb, #fc5c7d); /* Violet gradient background */
    font-family: 'Roboto', sans-serif; /* Modern font */
    color: #333;
    padding: 40px;
    margin: 0; /* Remove default margins */
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    color: #ffffff; /* White title color for contrast */
    margin-bottom: 30px;
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay for readability */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
`;

export const UploadButton = styled.button`
    background-color: #5a67d8; /* Blue color for the button */
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 25px; /* Comfortable padding */
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    margin: 10px 0; /* Margin for spacing */
    width: 80%; /* Responsive button width */
    max-width: 300px; /* Max width for button */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Soft shadow effect */

    &:hover {
        background-color: #434190; /* Darker blue on hover */
        transform: translateY(-2px); /* Lift effect */
    }

    &:active {
        transform: translateY(1px); /* Pressed effect */
    }
`;

export const InputField = styled.input`
    border: 2px solid #d1d1d1; /* Soft gray border */
    border-radius: 5px;
    padding: 12px; /* Comfortable padding */
    margin: 10px 0; /* Margin for spacing */
    width: 90%; /* Responsive width */
    max-width: 300px; /* Max width for input */
    font-size: 1rem;

    /* Adding box shadow for depth */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #5a67d8; /* Highlight border on focus */
        outline: none;
        box-shadow: 0 0 10px rgba(90, 103, 216, 0.5); /* Blue shadow on focus */
    }

    /* Adding a slight margin to differentiate from other elements */
    margin-bottom: 20px; /* Increase space below the input */
`;

export const TranscribedText = styled.p`
    margin-top: 20px;
    font-size: 1.2rem;
    text-align: center;
    color: #333;
    background: rgba(255, 255, 255, 0.9); /* Light background for readability */
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%; /* Responsive width */
    max-width: 400px; /* Limit maximum width */
`;

export const AudioControls = styled.audio`
    margin-top: 20px;
    border-radius: 5px;
    width: 80%; /* Responsive width */
    max-width: 300px; /* Fixed width for audio controls */
    outline: none;
`;
