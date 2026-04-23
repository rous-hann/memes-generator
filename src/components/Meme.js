import React, { useState, useEffect } from "react"

export default function Meme() {
    const [allMemes, setAllMemes] = useState([])
    const [loading, setLoading] = useState(true)
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        imageUrl: ""
    })

    // Fetch memes from Imgflip API on mount — no API key required
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                setAllMemes(data.data.memes)
                // Pick a random starting meme right away
                const random = data.data.memes[
                    Math.floor(Math.random() * data.data.memes.length)
                ]
                setMeme(prev => ({ ...prev, imageUrl: random.url }))
                setLoading(false)
            })
            .catch(() => {
                // Graceful fallback if fetch fails
                setMeme(prev => ({ ...prev, imageUrl: "https://i.imgflip.com/30b1gx.jpg" }))
                setLoading(false)
            })
    }, [])

    function getRandomMeme() {
        const random = allMemes[Math.floor(Math.random() * allMemes.length)]
        setMeme(prev => ({ ...prev, imageUrl: random.url }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prev => ({ ...prev, [name]: value }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    name="topText"
                    value={meme.topText}
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    value={meme.bottomText}
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                />
                <div className="break" />
                <button
                    onClick={getRandomMeme}
                    disabled={loading}
                    className="form--button"
                >
                    {loading ? "Loading memes..." : "✨ Get a new meme image"}
                </button>
            </div>

            {/* Meme image with text overlay */}
            <div className="meme">
                {meme.imageUrl && (
                    <img
                        className="meme--image"
                        alt="meme"
                        src={meme.imageUrl}
                    />
                )}
                {meme.topText && (
                    <h2 className="meme--text meme--text-top">{meme.topText}</h2>
                )}
                {meme.bottomText && (
                    <h2 className="meme--text meme--text-bottom">{meme.bottomText}</h2>
                )}
            </div>
        </main>
    )
}