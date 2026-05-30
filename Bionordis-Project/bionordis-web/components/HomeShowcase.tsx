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
            {/* Using Next.js Image or standard img. Standard img is fine for demo as per user's code, but let's use div style or next/image */}
            {/* The user had src="img/molecules.jpg" but wait, they don't have it in their public folder. Let's look at their public folder. */}
            {/* public/ file.svg, globe.svg, logo.jpg, BIONORDIS-LOGO/1.png... */}
            {/* I will use empty divs with fallback background for now if they don't have the images, or just img tags that might be missing */}
            <div className="absolute inset-0 bg-slate-800"></div>
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">DATABASE</span>
              <h2>+2,000 Molecules</h2>
              <p>Advanced computational analysis of bioactive compounds.</p>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="showcase-card">
            <div className="absolute inset-0 bg-emerald-800"></div>
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">BIODIVERSITY</span>
              <h2>79 Botanical Families</h2>
              <p>Structured botanical intelligence integrated into the platform.</p>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="showcase-card">
            <div className="absolute inset-0 bg-sky-800"></div>
            <div className="showcase-overlay"></div>
            <div className="showcase-content">
              <span className="showcase-tag">CHEMISTRY</span>
              <h2>14 Chemical Classes</h2>
              <p>Strategic analysis of molecular structures.</p>
            </div>
          </div>

          {/* SLIDE 4 */}
          <div className="showcase-card">
            <div className="absolute inset-0 bg-indigo-800"></div>
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
