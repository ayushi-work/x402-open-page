import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen when page is fully loaded
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    // Animated cursor logic
    const cursor = document.getElementById('cursor-dot');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let posX = mouseX, posY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      posX += (mouseX - posX) * 0.16;
      posY += (mouseY - posY) * 0.16;
      follower.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const interactive = 'a, button, .btn, input, textarea, label';
    document.querySelectorAll(interactive).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      {/* Loading Screen */}
      {loading && (
        <div className={`loading-screen ${!loading ? 'fade-out' : ''}`} id="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">
              <img src={`${process.env.PUBLIC_URL}/assets/Group 1.svg`} alt="x402 logo" className="logo-image" />
            </div>
            <div className="loading-bars">
              <div className="loading-bar-item"></div>
              <div className="loading-bar-item"></div>
              <div className="loading-bar-item"></div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* Left side - Abstract geometric shape */}
        <div className="left-section">
          <img src={`${process.env.PUBLIC_URL}/assets/Group 1.svg`} alt="Abstract geometric shape" className="geometric-shape" />
        </div>

        {/* Right side - Content */}
        <div className="right-section">
          <h1 className="title">x402-<span className="title-o-dot">o</span>pen</h1>

          <div className="ripple-graphic">
            <img src={`${process.env.PUBLIC_URL}/assets/blending 1764619793646.svg`} alt="Ripple effect" className="ripple" />
          </div>

          <div className="buttons">
            <a className="btn btn-primary" href="https://github.com/VanshSahay/x402-open/blob/main/README.md" target="_blank" rel="noopener noreferrer">
              <span className="btn-text">Get Started</span> →
            </a>
          </div>

          <h2 className="subtitle">Leaderboard Coming Soon!</h2>

          <p className="description">
            Decentralized facilitator toolkit for the X402 protocol. Run a facilitator node anywhere, or point a gateway at multiple nodes to get a single public URL that verifies and settles payments through the network.
          </p>
        </div>
      </div>

      {/* Custom animated cursor */}
      <div className="cursor-follower" id="cursor-follower"></div>
      <div className="cursor" id="cursor-dot"></div>
    </div>
  );
}

export default App;