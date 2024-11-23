import React from 'react'
import classes from './About.module.css'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div className={classes.about}>
            <h4>About</h4>
            <h2>Evangadi Network's Q&A</h2>
            <p>
                <h5>Welcome to the Evangadi Forum!</h5>
                The Evangadi Forum is a community where Evangadi Tech students can ask questions,
                share knowledge, and collaborate on programming challenges. It’s a place to connect,
                learn, and grow together.
            </p>
            <p>
                <h5>Designed for Collaboration and Learning</h5>
                This platform helps you engage with others on coding problems, tutorials, and algorithms.
                It’s your go-to space to seek help and share expertise.
            </p>
            <p>
                <h5>A Supportive Community for Everyone</h5>
                The Evangadi Forum is not just for Q&A, but also for building connections and inspiring each other.
                Join us in strengthening the community by asking, answering, and learning together!
            </p>
            <Link to='howitworks'>HOW IT WORKS</Link>
        </div>
    )
}

export default About