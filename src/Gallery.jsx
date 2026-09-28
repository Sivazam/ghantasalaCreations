import React, { useState, useEffect, useCallback } from "react";
import Footer from "./Footer";
import Navrbar from "./Navbar";
import { gallery } from "./galleryData";
import './Gallery.css';

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Divide gallery into categories:
  // indices 0 to 19: Shivaratri (20 photos)
  // indices 20 to 45: Kamadhenu (26 photos)
  const items = gallery.map((src, index) => {
    const isKamadhenu = index >= 20;
    return {
      src,
      category: isKamadhenu ? "kamadhenu" : "shivaratri",
      title: isKamadhenu ? "కామధేను ఆరాధన" : "మహా శివరాత్రి",
      tag: isKamadhenu ? "🪷 కామధేను ఆరాధన" : "🔱 మహా శివరాత్రి"
    };
  });

  const filteredItems = items.filter(item => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  // Lightbox navigation
  const showNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev, closeLightbox]);

  return (
    <div className="Home gallery-page-wrapper">
      <Navrbar />

      <main className="gallery-main-container">
        {/* Header */}
        <header className="gallery-header">
          <span className="gallery-badge">✦ పవిత్ర దర్శనం • ఘంటసాల ఆర్ట్స్</span>
          <h1 className="gallery-title">ఫొటో గ్యాలరీ</h1>
          <p className="gallery-subtitle">
            మా పవిత్ర వేడుకలు, శ్రీ కామధేను ఆరాధన మరియు మహా శివరాత్రి మహోత్సవాల దివ్య దృశ్య సమాహారం.
          </p>

          {/* Category Filter Tabs */}
          <div className="gallery-filter-tabs">
            <button
              type="button"
              className={`gallery-filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => { setFilter("all"); setLightboxIndex(null); }}
            >
              అన్నీ (All Photos - {items.length})
            </button>
            <button
              type="button"
              className={`gallery-filter-btn ${filter === "kamadhenu" ? "active" : ""}`}
              onClick={() => { setFilter("kamadhenu"); setLightboxIndex(null); }}
            >
              🪷 కామధేను ఆరాధన (26)
            </button>
            <button
              type="button"
              className={`gallery-filter-btn ${filter === "shivaratri" ? "active" : ""}`}
              onClick={() => { setFilter("shivaratri"); setLightboxIndex(null); }}
            >
              🔱 మహా శివరాత్రి (20)
            </button>
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <article
              key={index}
              className="gallery-card"
              onClick={() => setLightboxIndex(index)}
              title={`${item.title} - పెద్దదిగా చూడటానికి క్లిక్ చేయండి`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="gallery-card-img"
                loading="lazy"
              />
              <div className="gallery-card-overlay">
                <span className="gallery-card-tag">{item.tag}</span>
                <span className="gallery-card-zoom-icon" aria-hidden="true">🔍</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="gallery-lightbox-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <div className="gallery-lightbox-box">
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              ✕
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-prev"
                  onClick={showPrev}
                  aria-label="Previous photo"
                >
                  ◀
                </button>
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-next"
                  onClick={showNext}
                  aria-label="Next photo"
                >
                  ▶
                </button>
              </>
            )}

            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].title}
              className="gallery-lightbox-img"
            />

            <div className="gallery-lightbox-counter">
              {filteredItems[lightboxIndex].tag} • {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}