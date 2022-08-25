import "./Meme.css";
import { useState } from "react";

export default function Meme(props) {
    const [topText, setTopText] = useState({ value: "" });
    const [bottomText, setBottomText] = useState({ value: "" });

    function handleChange(event) {
        if (event.target.id === "topText") {
            setTopText({ value: event.target.value })
        } else if (event.target.id === "bottomText") {
            setBottomText({ value: event.target.value })
        }
    }

    return (
        <main>
            <form>
                <div className="meme--input">
                    <input onChange={handleChange} value={topText.value} id="topText" type="text" placeholder="Top Text"></input>
                    <input onChange={handleChange} value={bottomText.value} id="bottomText" type="text" placeholder="Bottom Text"></input>
                </div>

                <button
                    onClick={e => { props.handleClick(e, topText, bottomText) }} className="meme--submit-btn" disabled={props.isLoading}>
                    Get a new meme image &#128444;
                </button>
            </form>

            {!props.isLoading ? props.generatedMeme && <img src={props.generatedMeme.url} alt="meme" className="meme--img" /> : <h1 className="meme--img loading-text">Loading Meme...</h1>}

        </main >
    )
} 