import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { gallery } from '../galleryData';
import './HomeGallerySlideshow.css';

export default function HomeGallerySlideshow() {
  const [selectedImg, setSelectedImg] = useState(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 4,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  // Curate 12 best distinct highlights from gallery
  const highlightIndices = [1, 3, 5, 8, 12, 16, 21, 24, 28, 32, 36, 42];
  const slideItems = highlightIndices
    .map(idx => ({
      img: gallery[idx - 1] || gallery[0],
      tag: idx <= 20 ? '🔱 మహా శివరాత్రి' : '🪷 కామధేను ఆరాధన'
    }))
    .filter(item => Boolean(item.img));

  return (
    <section className="home-gallery-wrapper">
      {/* Header */}
      <div className="home-gallery-header">
        <span className="home-gallery-badge">✦ మా పవిత్ర వేడుకలు</span>
        <h2 className="home-gallery-title">ఫొటో గ్యాలరీ విశేషాలు</h2>
        <p className="home-gallery-subtitle">
          శ్రీ కామధేను ఆరాధన మరియు మహా శివరాత్రి పవిత్ర మహోత్సవాల దివ్య దృశ్యాలు.
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3500}
        keyBoardControl={true}
        pauseOnHover={true}
        showDots={false}
        arrows={true}
        itemClass="home-gallery-card-item"
      >
        {slideItems.map((item, index) => (
          <div 
            key={index} 
            className="home-gallery-card"
            onClick={() => setSelectedImg(item.img)}
            title="పెద్దదిగా చూడటానికి క్లిక్ చేయండి"
          >
            <img 
              src={item.img} 
              alt={`Gallery highlight ${index + 1}`} 
              className="home-gallery-img"
              loading="lazy"
            />
            <div className="home-gallery-overlay">
              <span className="home-gallery-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Bottom CTA to Full Gallery */}
      <div className="home-gallery-cta-wrap">
        <Link to="/gallery" className="home-gallery-cta-btn">
          <span>✦ పూర్తి ఫొటో గ్యాలరీని వీక్షించండి</span>
          <span>➔</span>
        </Link>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedImg && (
        <div 
          className="gallery-modal-overlay" 
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedImg(null); }}
        >
          <div className="gallery-modal-content">
            <button 
              type="button" 
              className="gallery-modal-close" 
              onClick={() => setSelectedImg(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={selectedImg} alt="Enlarged gallery view" className="gallery-modal-img" />
          </div>
        </div>
      )}
    </section>
  );
}
