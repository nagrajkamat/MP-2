window.addEventListener("DOMContentLoaded", () => {
  const meetingLinkInput = document.getElementById("meetingLink");
  const joinBtn = document.getElementById("joinBtn");
  const messageContainer = document.getElementById("messageContainer");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  let accessToken = ""; // Replace with your GPT API access token

  // Event listener for joining the Zoom meeting
  joinBtn.addEventListener("click", () => {
    const meetingLink = meetingLinkInput.value;
    joinZoomMeeting(meetingLink);
  });

  // Event listener for sending a message
  sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    displayUserMessage(message);
    sendGPTRequest(message);
    messageInput.value = "";
  });

  // Function to display a user message in the chat
  function displayUserMessage(message) {
    const userMessageElement = document.createElement("div");
    userMessageElement.className = "message user-message";
    userMessageElement.textContent = message;
    messageContainer.appendChild(userMessageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  // Function to display a bot message in the chat
  function displayBotMessage(message) {
    const botMessageElement = document.createElement("div");
    botMessageElement.className = "message bot-message";
    botMessageElement.textContent = message;
    messageContainer.appendChild(botMessageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  // Function to join the Zoom meeting
  function joinZoomMeeting(meetingLink) {
    // Your logic to join the Zoom meeting
    // ...
    // ...
  }

  // Function to send a message to the GPT API
  async function sendGPTRequest(message) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            prompt: message,
            max_tokens: 50,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch GPT API");
      }

      const data = await response.json();
      const gptResponse = data.choices[0].text.trim();
      displayBotMessage(gptResponse);
    } catch (error) {
      console.log(error);
      displayBotMessage("Oops! Something went wrong. Please try again later.");
    }
  }
});
// WEB SPEECH API ---
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.onresult = function (event) {
  const speechToText = event.results[0][0].transcript;
  console.log(speechToText);
};
recognition.start();

// Speech Synthesis
const msg = new SpeechSynthesisUtterance();
msg.text = 'Hello, I am the Zoom bot.';
window.speechSynthesis.speak(msg);


const clientId = 'fSG0rYIKTBiDRrnmEcfSXw';
const clientSecret = 'cjRivlyHqH9qm5VbhFMs8952RppYVFKx';
const redirectUri = 'https://www.github.com/nagrajkamat';

// Construct the Zoom authorization URL
const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

// Exchange the authorization code for an access token
const tokenEndpoint = 'https://zoom.us/oauth/token';
const postData = {
  grant_type: 'authorization_code',
  code: 'AUTHORIZATION_CODE',
  redirect_uri: redirectUri,
  client_id:fSG0rYIKTBiDRrnmE  ,
  client_secret:'cjRivlyHqH9qm5VbhFMs8952RppYVFKx'
};

axios.post(tokenEndpoint, postData)
  .then(response => {
    const accessToken = response.data.access_token;
    // Use the access token for API requests
    // ...
  })
  .catch(error => {
    console.error(error);
  });

  const utterance = new SpeechSynthesisUtterance();

// Set the text to be spoken
utterance.text = 'Hello, this is a sample text to be spoken';

// Optional: Set the voice and other properties
utterance.voice = speechSynthesis.getVoices()[0]; // Set the desired voice
utterance.volume = 1; // Set the volume (0 to 1)
utterance.rate = 1; // Set the speaking rate (0.1 to 10)
utterance.pitch = 1; // Set the pitch (0 to 2)

// Call the speech synthesis API to speak the text
speechSynthesis.speak(utterance);




// Function to convert text to speech using Web Speech API
function convertTextToSpeech(text) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  speechSynthesis.speak(utterance);
}

// Pass the GPT response to the text-to-speech function
convertTextToSpeech(gptResponse);

// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  // Create a new instance of the SpeechRecognition object
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Set the configuration options
  recognition.continuous = true; // Set to true for continuous speech recognition
  recognition.lang = 'en-US'; // Set the language

  // Event handler for the speech recognition result
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    // Process the transcript text as needed

    // Pass the transcript to your GPT or bot for processing
    processTranscript(transcript);
  };

  // Event handler for errors
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  // Start the speech recognition
  recognition.start();
} else {
  console.log('Speech recognition not supported in this browser');
}

// Function to process the transcript and perform actions
function processTranscript(transcript) {
  console.log('Transcript:', transcript);



