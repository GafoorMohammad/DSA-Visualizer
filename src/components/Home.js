import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const jokes = [
  { setup: "How do you comfort a designer?", punchline: "You give them some space... between the elements. 😊", route: null },
  { setup: "How many programmers does it take to change a lightbulb?", punchline: "None that's a hardware problem. 💡", route: null },
  { setup: "Why did the programmer always mix up Halloween and Christmas?", punchline: "Because Oct 31 equals Dec 25. 🎃🎄", route: null },
  { setup: "Why did the designer break up with their font?", punchline: "Because it wasn't their type. ❤️", route: null },
  { setup: "Why did the programmer quit his job?", punchline: "Because he didn't get arrays. 🙁", route: null },
  { setup: "Why did the programmer bring a ladder to work?", punchline: "They heard the code needed to be debugged from a higher level. 🪜", route: null },
  { setup: "Why was the font always tired?", punchline: "It was always bold. 💤", route: null },
  { setup: "Why did the functions stop calling each other?", punchline: "Because they had constant arguments. 🔄", route: null },
  { setup: "Which song would an exception sing?", punchline: "Can't catch me - Avicii. 🎶", route: null },
  { setup: "There are 10 types of people in this world...", punchline: "Those who understand binary and those who don't. 01 10", route: null },
  { setup: "Why did the array go to school?", punchline: "To improve its grades! 📚", route: "/stack" }, // Example joke with route
];

const Home = () => {
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const changeJoke = () => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setCurrentJoke(jokes[randomIndex]);
    };

    const intervalId = setInterval(changeJoke, 60000); // Change joke every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleJokeClick = () => {
    if (currentJoke.route) {
      navigate(currentJoke.route); // Navigate to the corresponding route if it exists
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Welcome to the Data Structure Visualizer</h1>
      <p className="lead">Explore different data structures through interactive models!</p>
      
      <section className="info-section">
        <h2>Why Learn Data Structures?</h2>
        <p>
          Understanding data structures is crucial for efficient programming and algorithm design. 
          They provide a way to manage and organize data, making it easier to access, modify, and analyze. 
          In this visualizer, you can interact with various data structures like stacks, queues, linked lists, trees, graphs, and sorting algorithms.
        </p>
      </section>

      <section className="joke-section">
        <h2>Random Programmer Humor</h2>
        <div className="joke" onClick={handleJokeClick}>
          <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
            {currentJoke.setup} <strong>{currentJoke.punchline}</strong>
          </p>
        </div>
      </section>

      <section className="exploration-section">
        <h2>Get Started!</h2>
        <p>
          Click on the navigation bar to explore different data structures. 
          Each visual will give you insights into how these structures work and their applications in real-world scenarios.
        </p>
        <p>
          Let's embark on this journey to enhance your programming skills and understanding of algorithms!
        </p>
      </section>

      <div className="scrolling-jokes">
        {jokes.map((joke, index) => (
          <div key={index} className="joke-item" onClick={() => joke.route && navigate(joke.route)}>
            <p>
              {joke.setup} <strong>{joke.punchline}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
