# SkylineX — Luxury Construction & Architectural Marketplace

A production-ready fullstack construction-tech marketplace platform built with modern 2026 aesthetics inspired by Apple, Airbnb, Stripe, Houzz, and high-end architectural studios.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19 (TypeScript), Vite 8, Tailwind CSS, Three.js & OrbitControls, Lucide Icons, Canvas Confetti, Web Speech API (Native TTS) |
| **Backend** | Node.js, Express.js (ES Modules, REST API) |
| **Real-Time Gateway** | Socket.io for live enquiry dispatch, contractor approval broadcasts & deal closures |
| **Database** | MongoDB with Mongoose ODM (with automatic graceful fallback to high-resolution mock datasets) |
| **Design System** | Clean light luxurious interface, `#2563EB` soft blue accents, `#14B8A6` premium teal highlights, glassmorphism, 24px rounded corners |

---

## 🌟 Core Modules & Functional Highlights

### 1. Interactive Welcome Mascot with Voice Greeting ("Chhotu Engineer")
- Animated cartoon builder mascot with safety helmet, talking pulse animations, and friendly dialogues.
- **Tri-Language Voice Synthesis**: Uses browser native `window.speechSynthesis` to speak in English, हिन्दी (Hindi), or Hinglish.
- Remembers user choice in `localStorage` and can be re-triggered anytime from the top navbar button.

### 2. Tri-Language System (English / हिन्दी / Hinglish)
- Universal application-wide language state (`'en' | 'hi' | 'hinglish'`).
- Dedicated 3-way toggle in the navbar.
- Dynamic translation across headlines, trust badges, search placeholders, sub-services, and quote forms.

### 3. Hero Section & Lightweight 3D Teaser Card
- Universal search input with real-time query filtering (by contractor name, specialty, or category).
- Trust indicators: IS 456 Structural Codes, PWD & ISO certified contractors, direct WhatsApp & phone contact.
- **Lightweight 3D Teaser Card**: Interactive 3D micro-building preview with hover tilt motion (`card-3d-pop`), day/night mode toggle, procedural level adjustments, and launch trigger for the full 3D Spatial Studio.

### 4. 3D Virtual Board & Exploded Floor Planner (20 Architectural Styles)
- Dedicated 3D spatial studio featuring **20 distinct architectural house styles**:
  1. Modern Minimalist
  2. Brutalist Concrete
  3. Classical Rajasthani Courtyard (Jharokha & Haveli arch accents)
  4. Scandinavian Nordic Villa
  5. Biophilic Eco-Villa (living green balconies & vertical gardens)
  6. PEB Industrial Steel Frame
  7. Contemporary Glasshouse
  8. Kerala Traditional Nalukettu
  9. New York Industrial Loft
  10. French Provençal Manor
  11. Japanese Zen Minka (charred Yakisugi wood & Engawa verandas)
  12. Art Deco Luxury Villa
  13. Mediterranean Hacienda
  14. Tropical Balinese Sanctuary
  15. Tuscan Stone Farmhouse
  16. Neo-Classical Heritage Estate
  17. Mountain Alpine Chalet
  18. British Colonial Bungalow
  19. Futuristic Smart Eco-Villa
  20. Sustainable Mud & Bamboo Sanctuary
- **Interactive Controls**:
  - **Floor Slider (1 to 10 Floors)**: Real-time procedural rendering of building levels.
  - **Exploded Floor Separation Slider**: Dynamically separates building floors along the vertical Y-axis to inspect floor plans.
  - **OrbitControls**: 360-degree rotation, zoom, tilt, and auto-rotation toggle.
  - **Day / Night Lighting**: Warm sunlight shadows or illuminated interior window glow.
  - **Structural Wireframe Mode**: Inspects columns and load-bearing framing.

### 5. Categories Section (Anti-Clutter, 3D Pop/Hover & Smart Popularity Algorithm)
- Minimalist, de-cluttered preview cards with category icon, name, 1-line description, and sub-service count.
- **Smart Category Popularity Ranking Algorithm**:
  - Tracks user click interactions and quote requests per category in LocalStorage and backend metrics.
  - Dynamically sorts categories in real-time so the most chosen/interacted categories appear first.
  - Displays trending badges (`🔥 TRENDING #1`, `🔥 TRENDING #2`, `🔥 TRENDING #3`).
- **Category Deep Dive & Sub-Service Explorer**: Granular technical specifications, market rates (per sq.ft or unit), and matching contractors.

### 6. Contractor Directory & Full Profile Modal
- Card previews with photo, business name, owner name, rating, jobs completed, experience in years, short bio, and top 3 service chips.
- Direct Action Buttons: "Call Contractor" (`tel:`) and "WhatsApp Chat" (pre-filled message).
- **Full Vendor Profile Modal**:
  - High-resolution portfolio gallery of past completed projects with cost and duration metrics.
  - Verified client reviews with ratings and project types.
  - Direct Quote Request Form with automatic SMS/email dispatch to the contractor.

### 7. Two-Tier Contractor Verification & KYC Blue Tick Engine
- **Level 1: Platform Listing Approval (`approved: boolean`)**:
  - Basic operational check by Admin. Appears in search results; homeowners can call and WhatsApp them. Shows **"Registered Partner"** badge (NO blue tick).
- **Level 2: Document KYC Verification (`kycVerified: boolean`)**:
  - Verification of GSTIN, municipal civil contractor license, and physical site verification. Awards the official **Blue Tick "Verified Pro"** checkmark badge.

### 8. Multi-Service Contractor Registration & Portal
- Signup form capturing business details, experience, rate per sq.ft, photo, and multi-service selection chips.
- Custom service tags input.
- Dedicated Vendor Portal to view incoming homeowner leads, unlock customer phone numbers (₹299 fee), and submit KYC verification documents.

### 9. AI House Planner & Dual-Mode Cost Estimator
- Input parameters: plot area (sq.ft), front width, depth, floors (1-10), bedrooms, budget level, and architectural style.
- Outputs:
  1. Room-by-room architectural layout with dimensions, sq.ft, floor allocation, and Vastu zones.
  2. Material Estimation & BOQ: Bag count of cement, metric tonnes of Fe550D steel, cubic feet of sand and aggregate, brick units.
  3. Cost breakdown percentage distribution (Foundation, RCC Structure, Brickwork, MEP, Finishing).
  4. Vastu guidelines and structural seismic safety recommendations (IS 456, IS 13920).
  5. Matched verified contractors in the user's city capable of executing the project.

### 10. Master Admin Dashboard (3-Tab Governance & Monetization Hub)
- **Tab 1: Platform Finance & Earning Model**:
  - Net Platform Revenue, Gross Merchandise Value (GMV), 5% Deal Closure Commissions, Subscriptions & Lead Fees.
  - **3-Pillar Monetization Model Architecture**:
    - *Pillar 1*: 5% Platform Commission collected upon construction milestone closures.
    - *Pillar 2*: ₹299 High-Intent Client Lead Unlock Fee paid by contractors.
    - *Pillar 3*: ₹2,999/year Verified Blue Tick Pro Subscription fee.
  - Category Revenue Matrix Table.
- **Tab 2: Global Customer Leads Log**:
  - Audit trail of client quote requests, status updater (`pending`, `contacted`, `quotation_sent`, `deal_closed`, `cancelled`).
  - **Deal Closer Engine**: Marking a deal as closed lets admin enter the signed contract value (e.g. ₹25,00,000); calculates 5% platform commission (₹1,25,000) and triggers celebratory confetti!
- **Tab 3: Contractor Governance & Two-Tier KYC Queue**:
  - Independent action buttons: "Approve Listing / Suspend Listing" (Level 1) and "Award Blue Tick (Verify KYC) / Revoke Blue Tick" (Level 2).

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- MongoDB (optional, automatically falls back to in-memory store if offline)

### Live Ports
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API & Socket.io**: [http://localhost:5000](http://localhost:5000)

### Starting from Scratch
```bash
# In client directory:
cd client
npm install
npm run dev

# In server directory:
cd ../server
npm install
node server.js
```
