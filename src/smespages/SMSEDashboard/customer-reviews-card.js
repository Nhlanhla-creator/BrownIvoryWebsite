"use client"

import { useState } from "react"
import { ChevronDown, Star, X } from "lucide-react"
import "./reviews.css"

export function CustomerReviewsCard({ styles }) {
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const ratings = [
    {
      name: "Michael Thompson",
      rating: 4,
      date: "Apr 15, 2023",
      comment: "Great service and support! The team was very responsive to our needs and provided excellent guidance throughout the entire process.",
      company: "Thompson Enterprises",
      position: "CEO",
    },
    {
      name: "Priya Patel",
      rating: 4,
      date: "Apr 2, 2023",
      comment: "Very responsive team. They addressed all our concerns promptly and provided valuable insights for our business growth.",
      company: "Patel Innovations",
      position: "COO",
    },
    {
      name: "James Wilson",
      rating: 5,
      date: "Mar 28, 2023",
      comment: "Excellent service from start to finish. The team understood our requirements perfectly and delivered beyond our expectations.",
      company: "Wilson Technologies",
      position: "Director",
    },
  ]

  return (
    <>
      <div className={`ratings-card compact rounded-lg ${showReviewsModal ? "blurred" : ""}`}>
        <div className="ratings-wrapper">
          <div style={{
            padding: '22px',
            borderBottom: '1px solid var(--medium-brown)',
            backgroundColor: 'white',
            fontSize: '15px',
            color: 'var(--dark-brown)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginLeft: '-30px',
          }}>
            <h3 style={{ margin: 0 }}>Customer Reviews & Ratings</h3>
          </div>

          <div className="ratings-summary flex items-center justify-between">
            <div className="ratings-count flex flex-col items-center">
              <span className="text-2xl font-bold">25</span>
              <span className="text-sm">Reviews</span>
            </div>
            <div className="average-rating flex flex-col items-center">
              <div className="stars flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 4 ? styles.accentBrown : styles.paleBrown}
                    color={i < 4 ? styles.accentBrown : styles.paleBrown}
                  />
                ))}
              </div>
              <span className="text-sm">4.0 Average</span>
            </div>
          </div>

          <button
            style={{
             marginTop: "40px",
              padding: '12px 68px',
              marginBottom: '40px',
              marginLeft: "10px",
              borderRadius: '8px',
              backgroundColor: '#8d6e63',
              color: 'white',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(125, 90, 80, 0.1)',
              position: 'relative',
              zIndex: 1
            }}
            onClick={() => setShowReviewsModal(true)}
          >
            View More
            <ChevronDown className="ml-1 inline-block" size={16} />
          </button>
        </div>
      </div>

      {/* Full Reviews Modal */}
      {showReviewsModal && (
        <div className="reviews-modal-overlay">
          <div className="reviews-popup">
            <div className="reviews-popup-header">
              <h3>Customer Reviews</h3>
              <button 
                className="reviews-popup-close"
                onClick={() => setShowReviewsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#5a3921'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="reviews-popup-body">
              <div className="reviews-list">
                {ratings.map((review, index) => (
                  <div key={index} className="review-item" style={{
                    padding: '20px',
                    borderBottom: '1px solid #f0e0cc',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => {
                    setSelectedReview(review);
                    setShowDetailModal(true);
                  }}>
                    <div className="review-header" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <div className="reviewer-info">
                        <h4 style={{ margin: '0 0 4px 0', color: '#5a3921' }}>{review.name}</h4>
                        <p className="reviewer-company" style={{
                          margin: '0 0 4px 0',
                          color: '#8b6d4f',
                          fontSize: '0.9em'
                        }}>
                          {review.company} • {review.position}
                        </p>
                        <p className="review-date" style={{
                          margin: 0,
                          color: '#a69b8f',
                          fontSize: '0.8em'
                        }}>{review.date}</p>
                      </div>
                      <div className="review-stars" style={{ display: 'flex' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < review.rating ? styles.accentBrown : styles.paleBrown}
                            color={i < review.rating ? styles.accentBrown : styles.paleBrown}
                            style={{ marginLeft: '2px' }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="review-comment" style={{
                      color: '#5a3921',
                      lineHeight: '1.5'
                    }}>
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Individual Review Detail Modal */}
      {showDetailModal && selectedReview && (
        <div className="reviews-modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(90, 57, 33, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="reviews-popup" style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(90, 57, 33, 0.2)'
          }}>
            <div className="reviews-popup-header" style={{
              padding: '20px',
              borderBottom: '1px solid #f0e0cc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, color: '#5a3921' }}>Review Details</h3>
              <button 
                className="reviews-popup-close"
                onClick={() => setShowDetailModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#5a3921'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="reviews-popup-body" style={{ padding: '20px' }}>
              <div className="review-item">
                <div className="review-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div className="reviewer-info">
                    <h4 style={{ margin: '0 0 6px 0', color: '#5a3921' }}>{selectedReview.name}</h4>
                    <p className="reviewer-company" style={{
                      margin: '0 0 6px 0',
                      color: '#8b6d4f',
                      fontSize: '0.9em'
                    }}>
                      {selectedReview.company} • {selectedReview.position}
                    </p>
                    <p className="review-date" style={{
                      margin: 0,
                      color: '#a69b8f',
                      fontSize: '0.8em'
                    }}>{selectedReview.date}</p>
                  </div>
                  <div className="review-stars" style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i < selectedReview.rating ? styles.accentBrown : styles.paleBrown}
                        color={i < selectedReview.rating ? styles.accentBrown : styles.paleBrown}
                        style={{ marginLeft: '3px' }}
                      />
                    ))}
                  </div>
                </div>
                <div className="review-comment" style={{
                  color: '#5a3921',
                  lineHeight: '1.6',
                  fontSize: '1.05em'
                }}>
                  {selectedReview.comment}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}