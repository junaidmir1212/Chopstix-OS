# 🍜 Chopstix AI-Powered Enterprise OS

A cutting-edge, role-based management platform designed for **Chopstix UK**. This system transforms raw operational data into actionable AI-driven insights, helping Shift/Branch Managers and Area Managers optimize sales, labor, and wastage.

![Dashboard Preview](https://img.shields.io/badge/Status-Beta-red)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20TypeScript%20%7C%20Chart.js-E31837)

---

## 🚀 Key Features

### 🏢 Multi-Branch Intelligence
* **Context-Aware Dashboard:** Displays unique sales data, transaction counts, and labor metrics for specific branches (London, Manchester, Birmingham).
* **Regional Command Centre:** A dedicated view for Area Managers that mathematically aggregates data from all sites.

### 🤖 AI Strategy Engine
* **Dynamic Suggestions:** AI tips that change based on the **time of day** (e.g., Morning Prep vs. Evening Rush) and the **page context** (Training, Waste, or Feedback).
* **Predictive Analytics:** Integrated line charts comparing actual sales against AI-predicted busy-ness to help with staffing levels.

### 🔐 Secure Role-Based Access
* **Branch Isolation:** Shift Managers are locked to their specific location.
* **Identity Sync:** Top-right profile automatically generates initials and store name based on the login credentials.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Visualization:** Chart.js (React-Chartjs-2)
- **Icons:** FontAwesome
- **Auth Simulation:** Persistent LocalStorage-based Session Management

---

## 🔑 Login Directory (Testing)

| Role | Username | Password | Access |
| :--- | :--- | :--- | :--- |
| **Shift Manager** | `Junaid` | `Chopstix2026` | London (Oxford St) |
| **Branch Manager** | `Manager_Manc` | `Manc2026` | Manchester Arndale |
**Branch Manager** | `Manager_Brum` | `Brum2026` | Birmingham Bullring |
| **Area Director** | `AreaAdmin` | `ChopstixGlobal` | Global/UK Region |

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/chopstix-ai-os.git](https://github.com/your-username/chopstix-ai-os.git)
