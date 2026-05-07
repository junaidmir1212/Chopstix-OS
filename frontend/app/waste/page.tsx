"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WasteLog() {
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const theme = { primaryRed: '#E31837', textDark: '#1E232B', textMuted: '#6B7280', border: '#E5E7EB' };

  useEffect(() => {
    const update = () => {
      setRole(localStorage.getItem("chopstix_role") || "manager");
      setBranch(localStorage.getItem("selected_branch") || "Oxford Street (London)");
    };
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  const wasteData: Record<string, number> = { 
    "Oxford Street (London)": 4.2, 
    "Manchester Arndale": 3.8, 
    "Birmingham Bullring": 5.1 
  };

  const getStats = () => {
    if (branch === "All Branches (UK)") {
      const total = Object.values(wasteData).reduce((a, b) => a + b, 0);
      return { kg: total.toFixed(1), cost: (total * 12.5).toFixed(2), ai: "UK Regional Wastage is £163.75 today." };
    }
    const kg = wasteData[branch] || 0;
    return { kg: kg.toFixed(1), cost: (kg * 12.5).toFixed(2), ai: `${branch}: Waste is within target.` };
  };

  const stats = getStats();

  // --- 🔒 PRIVACY FILTER FOR CHART ---
  const getChartData = () => {
    const allLabels = ['London', 'Manchester', 'Birmingham'];
    const allValues = [4.2 * 12.5, 3.8 * 12.5, 5.1 * 12.5];

    if (role === "area_manager" && branch === "All Branches (UK)") {
      return { labels: allLabels, datasets: [{ label: 'Wastage (£)', data: allValues, backgroundColor: [theme.textDark, theme.textMuted, theme.primaryRed], borderRadius: 8 }] };
    }

    // If Branch Manager, find only THEIR index and hide others
    const branchMap: any = { "Oxford Street (London)": 0, "Manchester Arndale": 1, "Birmingham Bullring": 2 };
    const myIndex = branchMap[branch];
    
    return {
      labels: [allLabels[myIndex]],
      datasets: [{ label: 'Your Branch Wastage (£)', data: [allValues[myIndex]], backgroundColor: theme.primaryRed, borderRadius: 8 }]
    };
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Waste Audit: {branch}</h1>
        <div style={{ backgroundColor: '#EEF2FF', padding: '10px 20px', borderRadius: '12px', border: '1px solid #C7D2FE', color: '#4338CA', fontSize: '13px', fontWeight: '700' }}>
          <FontAwesomeIcon icon={faRobot} style={{marginRight: '10px'}} /> AI: {stats.ai}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '30px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
          <p style={{fontSize: '11px', fontWeight: '800', color: theme.textMuted}}>WEIGHT</p>
          <h2 style={{fontSize: '32px', margin: '5px 0'}}>{stats.kg} kg</h2>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
          <p style={{fontSize: '11px', fontWeight: '800', color: theme.textMuted}}>Wastage</p>
          <h2 style={{fontSize: '32px', margin: '5px 0', color: theme.primaryRed}}>£{stats.cost}</h2>
        </div>
      </div>

      <div style={{ height: '350px', backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
        <h3 style={{fontSize: '14px', marginBottom: '20px', color: theme.textMuted}}>Waste Performance Analysis</h3>
        <Bar data={getChartData()} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
}