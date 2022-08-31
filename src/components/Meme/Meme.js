import "./Meme.css";
import { useState } from "react";

export default function Meme(props) {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");

    return (
        <main>
            <form>
                <div className="meme--input">
                    <input
                        onChange={e => setTopText(e.target.value)}
                        value={topText}
                        type="text"
                        placeholder="Top Text">
                    </input>
                    <input
                        onChange={e => setBottomText(e.target.value)}
                        value={bottomText}
                        type="text"
                        placeholder="Bottom Text">
                    </input>
                </div>

                <button
                    onClick={e => { props.handleClick(e, topText, bottomText) }} className="meme--submit-btn" disabled={props.isLoading}>
                    Get a new meme image &#128444;
                </button>
            </form>

            {props.isLoading && <h1 className="meme--img loading-text">Loading Meme...</h1>}

            {props.generatedMeme &&
                <img
                    src={props.generatedMeme.url}
                    alt="meme"
                    className="meme--img"
                    style={{ display: !props.isLoading ? "block" : "none" }}
                    onLoad={props.onLoadedMeme}
                // onError={props.onMemeError}
                />}
        </main >
    )
} 