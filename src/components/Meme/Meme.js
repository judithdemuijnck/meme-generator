import "./Meme.css";

export default function Meme(props) {

    return (
        <main>
            <form>
                <div className="meme--input">
                    <input onChange={e => props.handleChange(e)} value={props.topText.value} id="topText" type="text" placeholder="Top Text"></input>
                    <input onChange={e => props.handleChange(e)} value={props.bottomText.value} id="bottomText" type="text" placeholder="Bottom Text"></input>
                </div>

                <button
                    onClick={e => { props.handleClick(e) }} className="meme--submit-btn" disabled={props.isLoading}>
                    Get a new meme image &#128444;
                </button>
            </form>

            {!props.isLoading ? props.generatedMeme && <img src={props.generatedMeme.url} className="meme--img" /> : <h1 className="meme--img loading-text">Loading Meme...</h1>}

        </main >
    )
} 