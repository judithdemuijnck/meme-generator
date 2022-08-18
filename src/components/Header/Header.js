import "./Header.css";
import trollface from "../../icons/icon-trollface.png";

export default function Header() {
    return (
        <div className="header">
            <div className="header--title-section">
                <img src={trollface} alt="Trollface" className="header--icon" />
                <span className="header--title">Meme Generator</span>
            </div>
            <span className="header--course-title">React Course - Project 3</span>


        </div>
    )
}