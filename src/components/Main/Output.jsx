import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Markdown from "react-markdown";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegStopCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";

const Output = () => {
  const [isSpeak, setIsSpeak] = useState(false);

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  let selectedVoice = null; // Global variable to store the selected voice

  const speak = () => {
    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(resultData);

    if (!selectedVoice) {
      // Get the list of available voices
      const voices = speechSynthesis.getVoices();

      // Filter for Indian English voices
      const indianVoices = voices.filter((voice) => voice.lang === "en-IN");

      // Use the first available Indian English voice, if any, and save it
      if (indianVoices.length > 0) {
        selectedVoice = indianVoices[0];
      } else {
        // Fallback to the fourth voice in the list if no Indian English voice is found
        selectedVoice = voices[1];
      }
    }

    voice.voice = selectedVoice;

    if (!isSpeak && !synth.paused) {
      setIsSpeak(true);
      voice.onend = () => setIsSpeak(false);
      synth.speak(voice);
    } else {
      setIsSpeak(false);
      synth.cancel();
    }
  };

  return (
    <div className="w-full sm:min-w-[75%] sm:max-w-[75%]">
      <div className="content">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex items-start gap-2">
            <img src={assets.gemini_icon} alt="logo" className="animate-spin" />
            <p
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: resultData }}
            ></p>
            {/* <Markdown className={"prose prose-blue"}>{resultData}</Markdown> */}
            <div
              onClick={speak}
              className="text-2xl p-2 rounded-full hover:bg-hover"
            >
              {isSpeak ? <FaRegStopCircle /> : <HiOutlineSpeakerWave />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;
