import "./Meme.css";



export default function Meme(props) {

    return (
        <main>
            <form action="#" method="GET">
                <div className="meme-input">
                    <input ref={props.topText} type="text" id="top-text" placeholder="Top Text"></input>
                    <input ref={props.bottomText} type="text" id="bottom-text" placeholder="Bottom Text"></input>
                </div>

                <button onClick={e => { props.handleClick(e) }} type="submit" className="meme-submit">Get a new meme image &#128444;</button>
            </form>

            {props.generatedMeme && <img src={props.generatedMeme.url} className="meme--img" />}
        </main >
    )
}