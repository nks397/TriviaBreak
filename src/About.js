import React from "react"
import { Link, Switch, Route } from "react-router-dom"

function About() {
    return(
        <div className="about-container">
            <h1 className="about-title">About Page</h1>
            <div className="about-subtitle-container">
                <p className="about-subtitle">TriviaBreak was created to provide a challenge, knowledge, and improve brain health. TriviaBreak can not only give users a welcome break from the stressors of the world, but it can also improve their problem-solving and cognitive skills.</p>
            </div>
        </div>
    )
}

export default About