import React from 'react'
import classess from './howItWorks.module.css'

function HowItWorks() {
    return (
        <div className={classess.howItWorks}>
            <h2>How It Works</h2>
            <h4>Welcome to the Evangadi Forum 
                a platform designed to help Evangadi students
                connect, share knowledge, and get assistance 
                with programming challenges. 
                Here’s a quick guide on how to make the most 
                out of the forum:</h4>
            <ol>
                <li><span>Ask:</span> Post questions to get help on programming challenges.</li>
                <li> <span>Answer:</span> Share your knowledge by answering others’ questions.</li>
                <li> <span>Search:</span> Use the search to find similar topics and solutions.</li>
                <li> <span>Learn:</span> Engage with the community to grow and succeed together.</li>
            </ol>
            <p>Join us in creating a space for learning, support, and collaboration!</p>
        </div>
    )
}

export default HowItWorks