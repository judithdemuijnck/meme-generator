import "./Meme.css";



export default function Meme(props) {
    console.log(props.isLoading)
    return (
        <main>
            <form action="#" method="GET">
                <div className="meme-input">
                    <input ref={props.topText} type="text" id="top-text" placeholder="Top Text"></input>
                    <input ref={props.bottomText} type="text" id="bottom-text" placeholder="Bottom Text"></input>
                </div>
                {/* 8. How do we consume the new property we've passed through to the button? */}
                <button onClick={e => { props.handleClick(e) }} type="submit" className="meme-submit" disabled={props.isLoading}>Get a new meme image &#128444;</button>
            </form>
            {!props.isLoading ? <img src={props.generatedMeme.url} className="meme--img" /> : <p className="meme--img loading__text">Loading...</p>}
        </main >
    )
}
