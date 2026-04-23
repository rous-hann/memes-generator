import React from "react"
import memelogo from "../images/meme-icon.png"

export default function Nav() {
    return (
        <nav>
            <img src = {memelogo} alt = "logo" className="nav--logo"/>
            &nbsp;<span className="nav--title">Meme Generator</span> 
            <h6 className="nav--text">React</h6>
        </nav>
    )
}