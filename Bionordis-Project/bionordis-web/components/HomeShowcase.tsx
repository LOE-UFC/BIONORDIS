"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function HomeShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex > 2 ? 0 : prevIndex + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex > 2 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex < 1 ? 3 : prevIndex - 1));
  };

  return (
    <section className="showcase-section">
      <div className="showcase-slider">
        <div
          className="showcase-track"
          style={{ transform: `translateX(-${index * 25}%)` }}
        >
          {/* SLIDE 1 */}
          <div className="showcase-card">
            <img src="/molecules.jpg" alt="Database" />
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">DATABASE</span>
              <h2>+2,000 Molecules</h2>
              <p>Advanced computational analysis of bioactive compounds.</p>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="showcase-card">
            <img src="/forest.avif" alt="Biodiversity" />
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">BIODIVERSITY</span>
              <h2>79 Botanical Families</h2>
              <p>Structured botanical intelligence integrated into the platform.</p>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="showcase-card">
            <img src="/chemical.jpg" alt="Chemistry" />
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">CHEMISTRY</span>
              <h2>14 Chemical Classes</h2>
              <p>Strategic analysis of molecular structures.</p>
            </div>
          </div>

          {/* SLIDE 4 */}
          <div className="showcase-card">
            <img src="/bio.jpg" alt="Network" />
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">NETWORK</span>
              <h2>12 Biodiversity Nodes</h2>
              <p>Integration between biodiversity research institutions.</p>
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="slider-dots">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`dot ${index === i ? "active" : ""}`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="slider-buttons">
          <button className="slide-btn prev" onClick={prevSlide}>
            &larr;
          </button>
          <button className="slide-btn next" onClick={nextSlide}>
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
