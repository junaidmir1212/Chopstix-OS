const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

// 1. Shift Data
app.get('/api/shift', (req, res) => {
    res.json({ sales: 1240.50, staffCount: 4, queueTime: "5 mins" });
});

// 2. Queue Predictor
app.get('/api/predict', (req, res) => {
    const currentHour = new Date().getHours();
    if ((currentHour >= 11 && currentHour <= 13) || (currentHour >= 17 && currentHour <= 19)) {
        res.json({ risk: "High", message: "RUSH INCOMING! Maximize prep.", color: "red" });
    } else {
        res.json({ risk: "Low", message: "Normal operations. Keep restocking.", color: "green" });
    }
});

// 3. Waste Calculator
app.post('/api/waste', (req, res) => {
    const costs = { "Noodles (kg)": 2.50, "Caramel Chicken (pan)": 6.00, "Spring Rolls (box)": 4.50 };
    res.json({ financialLoss: (costs[req.body.item] || 0) * req.body.quantity });
});

// 4. Customer Feedback Intelligence (AI)
app.post('/api/feedback', (req, res) => {
    const review = req.body.review.toLowerCase();
    let detectedSentiment = "Neutral 😐";
    let detectedTags = [];

    if (review.includes("cold") || review.includes("rude") || review.includes("slow") || review.includes("dirty") || review.includes("long") || review.includes("bad")) {
        detectedSentiment = "Negative 🔴";
        if (review.includes("cold") || review.includes("bad")) detectedTags.push("Food Quality");
        if (review.includes("rude") || review.includes("slow") || review.includes("long")) detectedTags.push("Speed/Service");
        if (review.includes("dirty")) detectedTags.push("Cleanliness");
    } 
    else if (review.includes("great") || review.includes("amazing") || review.includes("fast") || review.includes("friendly") || review.includes("hot")) {
        detectedSentiment = "Positive 🟢";
        if (review.includes("hot") || review.includes("amazing") || review.includes("great")) detectedTags.push("Food Quality");
        if (review.includes("fast") || review.includes("friendly")) detectedTags.push("Speed/Service");
    }

    res.json({ sentiment: detectedSentiment, tags: detectedTags.length > 0 ? detectedTags : ["General"] });
});

app.listen(3001, () => console.log("The Complete Brain is running on port 3001!"));