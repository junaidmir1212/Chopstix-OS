"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRobot, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

export default function AIReviews() {
  const [branch, setBranch] = useState("Oxford Street (London)");
  const theme = { 
    primaryRed: '#E31837', 
    textDark: '#1E232B', 
    textMuted: '#6B7280', 
    white: '#FFFFFF', 
    border: '#E5E7EB', 
    success: '#10B981',
    aiBlue: '#4338CA',
    aiBg: '#EEF2FF'
  };

  useEffect(() => {
    // Sync with the branch selected in the Layout Header
    const update = () => {
      setBranch(localStorage.getItem("selected_branch") || "Oxford Street (London)");
    };
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  // --- 📝 THE FEEDBACK DATABASE ---
  const allReviews: any = {
    "Oxford Street (London)": [
      { user: "Sarah L.", comment: "Best Pumpkin Katsu in London! Super fast service.", rating: 5, sentiment: "Positive", date: "2 hours ago" },
      { user: "James W.", comment: "Noodles were a bit cold today, but flavor was good.", rating: 3, sentiment: "Action Required", date: "5 hours ago" },
      { user: "Elena R.", comment: "Love the environment, very clean and friendly.", rating: 5, sentiment: "Positive", date: "Yesterday" }
    ],
    "Manchester Arndale": [
      { user: "Kev B.", comment: "Fast service in Manchester, very clean store.", rating: 5, sentiment: "Positive", date: "1 hour ago" },
      { user: "Liam F.", comment: "Excellent curry, highly recommend the salt & pepper chicken.", rating: 5, sentiment: "Positive", date: "3 hours ago" }
    ],
    "Birmingham Bullring": [
      { user: "Mo H.", comment: "Love the Caramel Chicken! Best lunch spot in Brum.", rating: 5, sentiment: "Positive", date: "30 mins ago" },
      { user: "Priya K.", comment: "Tables were a bit messy, but food was 10/10.", rating: 4, sentiment: "Action Required", date: "4 hours ago" }
    ]
  };

  // --- 🤖 AI SENTIMENT ENGINE ---
  const aiInsights: any = {
    "Oxford Street (London)": "Sentiment is 85% Positive. AI Alert: 2 mentions of 'cold food'. Check hot-holding temperatures.",
    "Manchester Arndale": "Perfect 100% Sentiment today. Staff speed is currently 12% faster than regional average.",
    "Birmingham Bullring": "Sentiment is 90% Positive. Note: Customers mentioned table cleanliness during peak hours.",
    "All Branches (UK)": "UK Regional Score: 4.8/5. High demand for Caramel Chicken across all sites. Ensure stock is ready."
  };

  const getReviews = () => {
    if (branch === "All Branches (UK)") {
      return Object.values(allReviews).flat();
    }
    return allReviews[branch] || allReviews["Oxford Street (London)"];
  };

  const reviews = getReviews();

  return (
    <div>
      {/* HEADER & AI INSIGHT */}
      <div style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.textDark, margin: '0 0 8px 0' }}>AI Sentiment Analysis</h1>
          <p style={{ color: theme.textMuted, fontSize: '15px', margin: 0 }}>Customer feedback for: <strong style={{color: theme.primaryRed}}>{branch}</strong></p>
        </div>
        
        <div style={{ 
          backgroundColor: theme.aiBg, 
          padding: '12px 24px', 
          borderRadius: '14px', 
          border: '1px solid #C7D2FE', 
          maxWidth: '450px',
          boxShadow: '0 4px 6px rgba(67, 56, 202, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: theme.aiBlue, marginBottom: '4px' }}>
            <FontAwesomeIcon icon={faRobot} />
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em' }}>AI STRATEGIC INSIGHT</span>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#3730A3', fontWeight: '600', lineHeight: '1.4' }}>
            {aiInsights[branch] || aiInsights["All Branches (UK)"]}
          </p>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {reviews.map((rev: any, i: number) => (
          <div key={i} style={{ 
            backgroundColor: theme.white, 
            padding: '24px', 
            borderRadius: '16px', 
            border: `1px solid ${theme.border}`,
            position: 'relative',
            transition: 'transform 0.2s'
          }}>
            <FontAwesomeIcon icon={faQuoteLeft} style={{ position: 'absolute', top: '20px', right: '20px', color: '#F3F4F6', fontSize: '24px' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700' }}>{rev.user}</h4>
                <span style={{ fontSize: '12px', color: theme.textMuted }}>{rev.date}</span>
              </div>
              <div style={{ 
                padding: '4px 10px', 
                borderRadius: '20px', 
                fontSize: '11px', 
                fontWeight: '800',
                backgroundColor: rev.sentiment === "Positive" ? '#ECFDF5' : '#FEF2F2',
                color: rev.sentiment === "Positive" ? theme.success : theme.primaryRed
              }}>
                {rev.sentiment.toUpperCase()}
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6', margin: '0 0 20px 0', fontStyle: 'italic' }}>
              "{rev.comment}"
            </p>

            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, starIndex) => (
                <FontAwesomeIcon 
                  key={starIndex} 
                  icon={faStar} 
                  style={{ color: starIndex < rev.rating ? '#FFB800' : '#E5E7EB', fontSize: '14px' }} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}