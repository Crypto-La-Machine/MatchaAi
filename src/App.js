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
            gsap.to(".coming-soon .content-img, .coming-soon .content", {
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
      {loading && (
        <div id='leaf-loader-logo'>
          <img src="/loaderMatchaLeaf.webp" width="147" height="147" alt="loaderLeaf" />
          <div id="ring">
            <svg width="157" height="157" viewBox="0 0 157 157" fill="none">
              <path d="M152 78.5C152 88.1522 150.099 97.7098 146.405 106.627C142.711 115.545 137.297 123.647 130.472 130.472C123.647 137.297 115.545 142.711 106.627 146.405C97.7098 150.099 88.1522 152 78.5 152C68.8478 152 59.2902 150.099 50.3728 146.405C41.4553 142.711 33.3528 137.297 26.5276 130.472C19.7025 123.647 14.2886 115.545 10.5949 106.627C6.90113 97.7098 5 88.1522 5 78.5C5 68.8478 6.90114 59.2902 10.5949 50.3728C14.2886 41.4553 19.7026 33.3528 26.5277 26.5276C33.3528 19.7025 41.4553 14.2886 50.3728 10.5949C59.2902 6.90113 68.8479 5 78.5 5C88.1522 5 97.7098 6.90114 106.627 10.5949C115.545 14.2886 123.647 19.7026 130.472 26.5277C137.297 33.3528 142.711 41.4553 146.405 50.3728C150.099 59.2902 152 68.8479 152 78.5L152 78.5Z" stroke="url(#paint0_linear_878_20181)" strokeWidth="6" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_878_20181" x1="5" y1="94.9609" x2="145.461" y2="94.9609" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#69c510" />
                  <stop offset="0.741563" stopColor="#538b01" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      <img src="/leafMatchaLeft.webp" className="leaf left-leaf content-img" alt="Left Leaf" />
      <img src="/leafMatchaRight.webp" className="leaf right-leaf content-img" alt="Right Leaf" />

      <div className="content">
        <img src="/logoMatcha.webp" className="logo content-img" alt="Matcha Logo" />
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
