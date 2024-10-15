import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const container = useRef();
  const [loading, setLoading] = useState(true);
  const fullTokenAddress = '0x85f9D045cee8dbC8e3Cc0F491f9fB6aB830EeeC3';
  const [copyText, setCopyText] = useState(`${fullTokenAddress.slice(0, 3)}...${fullTokenAddress.slice(-3)}`);
  const [formattedAddress, setFormattedAddress] = useState(fullTokenAddress);
  const isComingSoon = false;

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
      if (img.complete) {
        loadedImages++;
      } else {
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
      }
    });

    if (loadedImages === images.length) {
      setTimeout(() => {
        setLoading(false);
        gsap.to(".coming-soon .content-img, .coming-soon .content", {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        });
      }, 1000);
    }

    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
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
        setTimeout(() => setCopyText(`${fullTokenAddress.slice(0, 3)}...${fullTokenAddress.slice(-3)}`), 1500);
      }
    });
  };

  if (isComingSoon) {
    return (
      <div className="coming-soon" ref={container}>
        {loading && (
          <div id="leaf-loader-logo">
            <img src="/loaderMatchaLeaf.webp"
              width="147"
              height="147"
              alt="loaderLeaf"
              style={{
                display: "block",
                width: "147px",
                height: "147px",
              }}
            />
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="13" height="13" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </span>
              {copyText}
            </button>
            <button className="buy-button" onClick={() => window.open("https://app.uniswap.org/explore/tokens/ethereum/0x85f9d045cee8dbc8e3cc0f491f9fb6ab830eeec3", "_blank")}>BUY NOW</button>
          </div>
        </div>

        <div className="footer">
          <div className="social-icons">
            <a href="https://x.com/matchaai_io" target="_blank" rel="noopener noreferrer" className="icon">
              <svg enableBackground="new 0 0 1668.56 1221.19" viewBox="0 0 1668.56 1221.19" fill="#fff">
                <path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99 h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"></path>
              </svg>
            </a>
            <a href="https://t.me/matchaai_io" target="_blank" rel="noopener noreferrer" className="icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16.114 9.291c.552-.552 1.1-1.84-1.2-.276a395.806 395.806 0 0 1-6.489 4.372 2.7 2.7 0 0 1-2.117.046c-1.38-.414-2.991-.966-2.991-.966s-1.1-.691.783-1.427c0 0 7.961-3.267 10.722-4.418 1.058-.46 4.647-1.932 4.647-1.932s1.657-.645 1.519.92c-.046.644-.414 2.9-.782 5.338-.553 3.451-1.151 7.225-1.151 7.225s-.092 1.058-.874 1.242a3.787 3.787 0 0 1-2.3-.828c-.184-.138-3.451-2.209-4.648-3.221a.872.872 0 0 1 .046-1.473 169.31 169.31 0 0 0 4.835-4.602Z"></path>
              </svg>
            </a>
          </div>
          <div className="footer-info">
            <span className="footer-item footer-left">Matcha AI © All Rights Reserved</span>
            <a href="mailto:contact@matchaai.io" className="footer-item footer-center">contact@matchaai.io</a>
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
    )
  }

  return (
    <div className="app-container">
      {loading && (
        <div className="loader-overlay">
          <div id="leaf-loader-logo">
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
        </div>
      )}
      <div className="hero-section" ref={container}>
        <div className="coming-soon">
          <img src="/leafMatchaLeftR.webp" className="leaf left-leaf content-img" alt="Left Leaf" />
          <img src="/leafMatchaRight.webp" className="leaf right-leaf content-img" alt="Right Leaf" />

          <div className="content">
            <img src="/logoMatcha.webp" className="logo content-img" alt="Matcha Logo" />
            <h2 className="subtitle-release">Predict the Future of Meme Coins</h2>
            <div className="buttons">
              <button className="address-button" onClick={() => handleCopy(false)}>
                <span className="icon-copy">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="13" height="13" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </span>
                {copyText}
              </button>
              <button className="buy-button" onClick={() => window.open("https://app.uniswap.org/explore/tokens/ethereum/0x85f9d045cee8dbc8e3cc0f491f9fb6ab830eeec3", "_blank")}>BUY NOW</button>
            </div>

            <div className="text-zone">
              <p>
                Matcha is an advanced AI-driven platform that leverages machine learning to provide
                predictive insights into trending meme coins, social media sentiment, and crypto market movements.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="info-section">
        <img src="/bowlMatcha.webp" alt="Bowl Background" className="bowl-image" />
        <span className="green-text" onClick={() => window.open("https://t.me/matchaai_io", "_blank")}>Join Now</span>
      </section>

      <section className="extra-section">
        <h2 className="title">MATCHANOMICS</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">SYMBOL</span>
            <span className="value">$MATCHA</span>
          </div>
          <div className="info-item">
            <span className="label">TOKEN SUPPLY</span>
            <span className="value">100M</span>
          </div>
          <div className="info-item">
            <span className="label">BUY/SELL TAX</span>
            <span className="value">5%</span>
          </div>
          <div className="info-item">
            <span className="label">MAX WALLET</span>
            <span className="value">2%</span>
          </div>
        </div>
      </section>

      <section className="extra-section-leaf" style={{ position: 'relative' }}>
        <img src="/leafMatchaLeftR.webp" className="leaf-second left-leaf-second content-img" alt="Left Leaf" />
        <p className="centered-text">🍵</p>
        <img src="/leafMatchaRight.webp" className="leaf-second right-leaf-second content-img" alt="Right Leaf" />
      </section>

      <div className="footer-release">
        <div className="social-icons">
          <a href="https://x.com/matchaai_io" target="_blank" rel="noopener noreferrer" className="icon">
            <svg enableBackground="new 0 0 1668.56 1221.19" viewBox="0 0 1668.56 1221.19" fill="#fff">
              <path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99 h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"></path>
            </svg>
          </a>
          <a href="https://t.me/matchaai_io" target="_blank" rel="noopener noreferrer" className="icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M16.114 9.291c.552-.552 1.1-1.84-1.2-.276a395.806 395.806 0 0 1-6.489 4.372 2.7 2.7 0 0 1-2.117.046c-1.38-.414-2.991-.966-2.991-.966s-1.1-.691.783-1.427c0 0 7.961-3.267 10.722-4.418 1.058-.46 4.647-1.932 4.647-1.932s1.657-.645 1.519.92c-.046.644-.414 2.9-.782 5.338-.553 3.451-1.151 7.225-1.151 7.225s-.092 1.058-.874 1.242a3.787 3.787 0 0 1-2.3-.828c-.184-.138-3.451-2.209-4.648-3.221a.872.872 0 0 1 .046-1.473 169.31 169.31 0 0 0 4.835-4.602Z"></path>
            </svg>
          </a>
          <a href="https://dexscreener.com/ethereum/0x9550f7522f664da2d73dd149e36b0e17c60a84f3" target="_blank" rel="noopener noreferrer" className="icon">
            <svg fillRule="evenodd" viewBox="0 0 252 300" focusable="false" fill="#fff">
              <path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886l12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 003.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 003.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197"></path>
              <path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 015.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 015.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z"></path>
            </svg>
          </a>
        </div>
        <div className="footer-info">
          <span className="footer-item footer-left">Matcha AI © All Rights Reserved</span>
          <a href="mailto:contact@matchaai.io" className="footer-item footer-center">contact@matchaai.io</a>
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
