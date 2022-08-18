import "./Meme.css";



export default function Meme(props) {
    return (
        <main>
            <form action="#" method="GET">
                <div className="meme-input">
                    <input ref={props.topText} type="text" id="top-text" placeholder="Top Text"></input>
                    <input ref={props.bottomText} type="text" id="bottom-text" placeholder="Bottom Text"></input>
                </div>
                {/* 8. How do we consume the new property we've passed through to the button? */}
                <button onClick={e => { props.handleClick(e) }} type="submit" className="meme-submit">Get a new meme image &#128444;</button>
            </form>
            {/* 13. What could we render here if our new property is true instead of the image? We want to show the user something is loading... */}
            {!props.isLoading ? <img src={props.generatedMeme.url} className="meme--img" /> : <p className="meme--img loading__text">Loading...</p>}
        </main >
    )
}