"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function TrainingAcademy() {
  const [branch, setBranch] = useState("");
  const theme = { primaryRed: '#E31837', textMuted: '#6B7280', border: '#E5E7EB', success: '#10B981' };

  useEffect(() => {
    const update = () => setBranch(localStorage.getItem("selected_branch") || "Oxford Street (London)");
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  const trainingData: any = {
    "Oxford Street (London)": { progress: 85, staff: 12, ai: "3 staff due for Food Safety renewal." },
    "Manchester Arndale": { progress: 62, staff: 8, ai: "Prioritize Noodle Station SOP training." },
    "Birmingham Bullring": { progress: 91, staff: 15, ai: "Top performing branch in compliance." },
    "All Branches (UK)": { progress: 79, staff: 35, ai: "Regional target: 85% by end of month." }
  };

  const stats = trainingData[branch] || trainingData["All Branches (UK)"];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Training Academy: {branch}</h1>
        <div style={{ backgroundColor: '#EEF2FF', padding: '10px 20px', borderRadius: '12px', border: '1px solid #C7D2FE', color: '#4338CA', fontSize: '13px', fontWeight: '700' }}>
          <FontAwesomeIcon icon={faRobot} style={{marginRight: '10px'}} /> AI: {stats.ai}
        </div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>Compliance</h3>
          <span style={{ fontWeight: '800', color: theme.primaryRed }}>{stats.progress}%</span>
        </div>
        <div style={{ height: '12px', backgroundColor: '#F3F4F6', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${stats.progress}%`, height: '100%', backgroundColor: theme.success }} />
        </div>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>Staff Members: <strong>{stats.staff}</strong></p>
      </div>
    </div>
  );
}