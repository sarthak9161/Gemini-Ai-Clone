import React, { useEffect } from "react";
import { assets } from "../../assets/assets";

const VoiceInput = ({ setInput }) => {
  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN"; // Change the language as needed

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      console.log("Transcript:", transcript);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition:", event.error);
    };

    const micIcon = document.getElementById("mic-icon");
    micIcon.addEventListener("click", () => {
      recognition.start();
      console.log("Recording started");
    });
  }, [setInput]);

  return <img id="mic-icon" src={assets.mic_icon} alt="mic" />;
};

export default VoiceInput;
