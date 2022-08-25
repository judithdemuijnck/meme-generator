import "./Meme.css";

export default function Meme(props) {

    return (
        <main>
            <form>
                <div className="meme--input">
                    <input ref={props.topText} type="text" placeholder="Top Text"></input>
                    <input ref={props.bottomText} type="text" placeholder="Bottom Text"></input>
                </div>

                <button
                    onClick={e => { props.handleClick(e) }} className="meme--submit-btn" disabled={props.isLoading}>
                    Get a new meme image &#128444;
                </button>
            </form>
            {/* 7a: Loading is still true - keep showing this text for now */}
            {/* 11a: Loading is now false - don't render this  */}
            {props.isLoading && <h1 className="meme--img loading-text">Loading Meme...</h1>}

            {/* 1. Initially - nothing is displayed, both isLoading and generatedMeme are false! */}
            {/* 7b - generatedMeme is now truthy! Start loading the image (but don't display it yet!) */}
            {props.generatedMeme && <img
                src={props.generatedMeme.url}
                className="meme--img"
                // 7c: Loading is still true - don't display:block yet!
                // 11b: Loading is now false - show me the image!
                style={{display: !props.isLoading ? 'block': 'none'}}
                // 8. When the network request to get the image finishes, the 'onLoad' event handler will fire, and send a callback to the parent
                onLoad={props.onLoadedmeme}
                // 8. (alt) If the network request to get the image errors, the 'onError' event handler will fire, and send a callback to the parent
                onError={props.onMemeError}
                // Aside. I just put an alt tag in here because my linter was complaining
                alt="meme"
                />}

        </main >
    )
} 
