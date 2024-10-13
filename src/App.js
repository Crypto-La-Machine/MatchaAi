import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const container = useRef();
  const [loading, setLoading] = useState(true);
  const [copyText, setCopyText] = useState("0x..E67");

  const fullTokenAddress = '0X57689087675465768798UH755565768798';
  const [formattedAddress, setFormattedAddress] = useState(fullTokenAddress);

  const formatTokenAddress = () => {
    if (window.innerWidth >= 480 && window.innerWidth < 935) {
      const start = fullTokenAddress.slice(0, 10);
      const end = fullTokenAddress.slice(-10);
      setFormattedAddress(`${start}...${end}`);
    } else {
      setFormattedAddress(fullTokenAddress);
    }
  };

  useEffect(() => {
    formatTokenAddress();

    window.addEventListener('resize', formatTokenAddress);
    return () => window.removeEventListener('resize', formatTokenAddress);
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedImages = 0;
    images.forEach((img) => {
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          setTimeout(() => {
            setLoading(false);
            gsap.to(".coming-soon img, .content", {
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            });
          }, 500);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        '.left-leaf',
        { x: '-100vw' },
        { x: '0', duration: 1.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.right-leaf',
        { x: '100vw' },
        { x: '0', duration: 1.5, ease: 'power3.out' }
      );
    }
  }, [loading]);

  const handleCopy = (isFooter = false) => {
    navigator.clipboard.writeText(fullTokenAddress).then(() => {
      if (!isFooter) {
        setCopyText("COPIED");
        setTimeout(() => setCopyText("0x..E67"), 1500);
      }
    });
  };

  return (
    <div className="coming-soon" ref={container}>
      {loading && <div className="loader">Loading...</div>}

      <img src="/leafMatchaLeft.webp" className="leaf left-leaf" alt="Left Leaf" />
      <img src="/leafMatchaRight.webp" className="leaf right-leaf" alt="Right Leaf" />

      <div className="content">
        <img src="/logoMatcha.webp" className="logo" alt="Matcha Logo" />
        <h2 className="subtitle">COMING SOON</h2>
        <div className="buttons">
          <button className="address-button" onClick={() => handleCopy(false)}>
            <span className="icon-copy">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="13" height="13" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
            {copyText}
          </button>
          <button className="buy-button">BUY NOW</button>
        </div>
      </div>

      <div className="footer">
        <div className="social-icons">
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="icon">
            <svg enableBackground="new 0 0 1668.56 1221.19" viewBox="0 0 1668.56 1221.19" width="30" height="30" fill="#fff">
              <path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"></path>
            </svg>
          </a>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="icon">
            <svg viewBox="0 0 24 24" width="27.5" height="27.5" fill="none">
              <path d="M16.114 9.291c.552-.552 1.1-1.84-1.2-.276a395.806 395.806 0 0 1-6.489 4.372 2.7 2.7 0 0 1-2.117.046c-1.38-.414-2.991-.966-2.991-.966s-1.1-.691.783-1.427c0 0 7.961-3.267 10.722-4.418 1.058-.46 4.647-1.932 4.647-1.932s1.657-.645 1.519.92c-.046.644-.414 2.9-.782 5.338-.553 3.451-1.151 7.225-1.151 7.225s-.092 1.058-.874 1.242a3.787 3.787 0 0 1-2.3-.828c-.184-.138-3.451-2.209-4.648-3.221a.872.872 0 0 1 .046-1.473 169.31 169.31 0 0 0 4.835-4.602Z"></path>
            </svg>
          </a>
        </div>
        <div className="footer-info">
          <span className="footer-item footer-left">Matcha AI © All Rights Reserved</span>
          <span className="footer-item footer-center">contact@matchaai.io</span>
          <span
            className="footer-item footer-right"
            id="tokenAddress"
            onClick={() => handleCopy(true)}
            style={{ cursor: "pointer" }}
          >
            CA: {formattedAddress}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
