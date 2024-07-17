import "./main.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/Context";
import Output from "./Output";
import VoiceInput from "./VoiceInput";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Lumina Ai</p>
        <img src={assets.user_icon} alt="" />
       
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, fellow developer!</span>
              </p>
              <p> How can I assist you today?</p>
            </div>{" "}
            <div className="cards">
              <div className="card">
                <p>Write code for a specific task, including edge cases</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Help me craft a text response to a friend</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Help me understand American football</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Come up with a complex word riddle, including hints</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <Output />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <VoiceInput setInput={setInput} />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="send"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Lumina might show incorrect information, especially about people, so
            please double-check its answers.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Main;
