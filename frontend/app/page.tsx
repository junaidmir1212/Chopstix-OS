"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoundSign, faReceipt, faShoppingBag, faUsers, faRobot } 
from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import 
{ 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Filler, 
  Legend 
} 
from 'chart.js';

ChartJS.register
(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Filler, 
  Legend
);

export default function Dashboard() {
  const [role, setRole] = useState("manager");
  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const theme = 
  {
    primaryRed: '#E31837', 
    textDark: '#1E232B', 
    textMuted: '#6B7280', 
    white: '#FFFFFF', 
    border: '#E5E7EB', 
    success: '#10B981' 
  };

  useEffect(() => {
    const update = () => {
      const currentRole = localStorage.getItem("chopstix_role") || "manager";
      const fullUserName = localStorage.getItem("chopstix_user_name") || "Manager";
      const currentBranch = localStorage.getItem("selected_branch") || "Oxford Street (London)";
      
      setRole(currentRole);
      setName(fullUserName.split(" ")[0]); // Extracts first name (e.g., Liam)
      setBranch(currentBranch);
      
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 17) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  const branches: any = {
    "Oxford Street (London)": 
    {
      sales: 1240.50, 
      trans: 256, 
      aov: 34.16, 
      labor: 24.6, 
      graph: [200, 450, 800, 300, 150, 200, 500, 950, 1100, 400] 
    },
    "Manchester Arndale": 
    {
      sales: 980.20, 
      trans: 185, 
      aov: 32.40, 
      labor: 21.2, 
      graph: [150, 300, 600, 250, 100, 150, 400, 800, 900, 350] 
    },
    "Birmingham Bullring": 
    { 
      sales: 2150.75, 
      trans: 410, 
      aov: 36.20, 
      labor: 19.8, 
      graph: [400, 600, 950, 400, 300, 250, 600, 1100, 1250, 600] 
    }
  };

  const getDisplayData = () => {
    if (branch === "All Branches (UK)") {
      return { metrics: 
        {
          sales: "4,371.45", 
          trans: "851", 
          aov: "34.25", 
          labor: "21.9%" 
        }, 
        graph: [750, 1350, 2350, 950, 550, 600, 1500, 2850, 3250, 1350], 
        ai: "UK Total: Birmingham is currently over-performing." };
    }
    const b = branches[branch] || branches["Oxford Street (London)"];
    return { metrics: 
      { 
        sales: b.sales.toLocaleString(), 
        trans: b.trans, 
        aov: b.aov.toFixed(2), 
        labor: b.labor + "%" 
      }, 
      graph: b.graph, ai: `${branch}: Peak demand expected soon.` };
  };

  const data = getDisplayData();
  const chartData = {
    labels: ['11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
    datasets: 
    [
      { 
        fill: true, 
        label: 'Sales (£)', 
        data: data.graph, 
        borderColor: theme.primaryRed, 
        backgroundColor: 'rgba(227, 24, 55, 0.1)', 
        tension: 0.4 
      }
    ]
  };

  return (
    <div>
      <div style=
      {
        { 
          marginBottom: '35px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end' 
          }
          }>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700' }}>
            {role === "area_manager" ? "UK Command Centre" : `${greeting}, ${name} 👋`}
            </h1>
          <p style={{ color: theme.textMuted }}>Region: 
            <strong style={{color: theme.primaryRed}}>{branch}</strong></p>
        </div>
        <div style=
        {
          { 
            backgroundColor: '#EEF2FF', 
            padding: '12px 24px', 
            borderRadius: '14px', 
            border: '1px solid #C7D2FE' 
            }
            }>
          <FontAwesomeIcon icon={faRobot} 
          style={{color: '#4F46E5', marginRight: '10px'}} />
          <span style=
          {
            { 
              fontSize: '13px', 
              fontWeight: '700', 
              color: '#4338CA' 
              }
              }>AI: {data.ai}
              </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '30px' }}>
        {[
        { title: "Sales", val: `£${data.metrics.sales}` }, 
        { title: "Transactions", val: data.metrics.trans }, 
        { title: "AOV", val: `£${data.metrics.aov}` }, 
        { title: "Labor", val: data.metrics.labor }].map((m, i) => 
          (
          <div key={i} style=
          {
            { 
              backgroundColor: 'white', 
              padding: '24px', 
              flex: 1, 
              borderRadius: '16px', 
              border: `1px solid ${theme.border}` 
              }
              }>
            <p style=
            {
              { 
                margin: 0, 
                fontSize: '12px', 
                fontWeight: '800', 
                color: theme.textMuted 
                }
                }>{m.title}
                </p>
            <h3 style={{ margin: '8px 0 0 0', fontSize: '26px' }}>{m.val}</h3>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style=
        {
          { 
            flex: 2, 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: `1px solid ${theme.border}`, 
            height: '350px' 
            }
            }>
          <Line data={chartData} 
          options={{ maintainAspectRatio: false }} />
        </div>
        <div style=
        {
          { 
            flex: 1, 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            border: `1px solid ${theme.border}`, 
            textAlign: 'center' 
            }
            }
            >
          <h3 style={{fontSize: '16px'}}>Handover Notes</h3>
          <textarea style=
          {
            { 
            width: '100%', 
            height: '220px', 
            borderRadius: '12px', 
            border: `1px solid ${theme.border}`, 
            padding: '15px', 
            fontSize: '14px', 
            outline: 'none', 
            boxSizing: 'border-box',
          fontFamily: 'inherit'
          }
        } placeholder="Type shift notes..." />
          <button style=
          {
            { 
              width: '100%', 
              padding: '12px', 
              backgroundColor: theme.textDark, 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              marginTop: '10px' 
              }
              }>Save Note
              </button>
        </div>
      </div>
    </div>
  );
}