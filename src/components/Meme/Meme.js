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
            {/* 7a: (change required) Loading is still true - keep showing loading text */}
            {/* 11a:(change required) Loading is now false - don't render loading text  */}

            {/* 1. Initially - nothing is displayed, both isLoading and generatedMeme are false */}
            {/* 7b - generatedMeme is now truthy! Render and start loading the image (but don't display it yet using CSS!) */}

            {!props.isLoading ? props.generatedMeme && <img
            src={props.generatedMeme.url}
                // 7c: (change required) Loading is still true - don't display:block yet!
                // 11b:  (change required) Loading is now false - show me the image!
                // Note - I've done this as a style because I'm lazy - but you can apply a class dependent on the isLoading prop
            className="meme--img" 
                // 8. (change required) When the network request to get the image finishes, the 'onLoad' event handler will fire, and send a callback to the parent
                // Aside. I just put an alt tag in here because my linter was complaining
            /> : <h1 className="meme--img loading-text">Loading Meme...</h1>}

        </main >
    )
} 
