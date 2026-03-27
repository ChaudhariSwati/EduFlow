# 🎓 EduFlow – Academic Assignment Dashboard

**EduFlow** is a premium, high-performance web application built for modern academic environments. It enables seamless assignment distribution, tracking, and submission between professors and students — with a focus on high-end UX and responsive design.

**Live Demo:** https://eduflow-one-virid.vercel.app/


Demo :https://eduflow-one-virid.vercel.app/
---

### 🔑 Quick Demo Access

Skip the registration! Use the **Quick Demo Buttons** on the login page or use these credentials:
Live demo :https://eduflow-one-virid.vercel.app/

| Role | Email | Password |
| :--- | :--- | :--- |
| **Professor (Admin)** | `prof@joineazy.com` | `admin123` |
| **Student** | `riya@student.com` | `stu123` |

---

### ✨ Key Features

#### **👨‍🏫 Professor Privileges (Admin)**
- **Assignment Lifecycle:** Create, edit, and delete assignments with title, description, due date, and a Google Drive link.
- **Real-time Tracking:** View a live per-student submission status list on every assignment card.
- **Class Analytics:** Instant stats on total students, pending tasks, and completion percentages with visual progress bars.

#### **👩‍🎓 Student Experience**
- **Smart Overview:** Visual summary cards showing total, completed, and pending assignment counts at a glance.
- **Progress Indicators:** Dynamic progress bars for individual assignment class progress and overall course completion.
- **Secure Submission:** A 2-step verification modal — "Yes, I have submitted" → final confirmation — prevents accidental submissions.

#### **💎 Premium Engineering**
- **Glassmorphism UI:** A sleek, professional **Slate & Blue** dark theme with backdrop blur and gradient accents.
- **Auth Features:** Password visibility toggle and international country code support for phone numbers.
- **Mobile First:** 100% responsive layout that works perfectly on phones, tablets, and desktops.

---

## 🏗️ Project Architecture

```
EduFlow/
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── App.jsx                        ← Root component; handles role-based routing
    ├── App.css                        ← App-level styles
    ├── main.jsx                       ← React DOM entry point
    ├── index.css                      ← Global resets and keyframe animations
    │
    ├── assets/
    │   └── hero.png                   ← Static assets
    │
    ├── data/
    │   └── mockData.js                ← Seed users & assignments (mock JSON)
    │
    ├── context/
    │   └── AppContext.jsx             ← Global state: auth, assignments, CRUD ops
    │
    └── components/
        ├── Login.jsx                  ← Sign in form + quick demo access buttons
        ├── Navbar.jsx                 ← Top navigation with user info and logout
        ├── StudentDashboard.jsx       ← Student stats overview and assignment list
        ├── AdminDashboard.jsx         ← Admin stats, assignment management view
        ├── AssignmentCard.jsx         ← Shared card component (student & admin views)
        ├── ProgressBar.jsx            ← Reusable animated progress bar component
        ├── ConfirmSubmitModal.jsx     ← Step 1 of 2-step submission verification
        ├── SubmitConfirmModal.jsx     ← Step 2 final confirmation modal
        ├── CreateAssignmentModal.jsx  ← Admin form to create a new assignment
        │
        └── Auth/
            ├── Register.jsx           ← New user registration with role selection
            └── ForgotPassword.jsx     ← Password recovery flow
```

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Core** | React 18 (Vite) |
| **Styling** | Tailwind CSS |
| **State Management** | React Context API + `useState` / `useEffect` |
| **Persistence** | localStorage API |
| **Auth** | Simulated role-based auth via mock user data |
| **Deployment** | Vercel |

---

## 📦 Setup & Installation

### Prerequisites
- Node.js v16+
- npm or yarn

### Local Installation

```bash
# Clone the repository
git clone https://github.com/ChaudhariSwati/EduFlow.git

# Enter the directory
cd EduFlow

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run from project root
vercel --prod
```

---

## 🧩 Component Structure & Design Decisions

### `AppContext.jsx` — Single Source of Truth
All authentication and assignment data flow through a single React Context. Login state, assignment list, submission status, and all CRUD operations (create, delete, submit) are managed here. Components access state via the `useApp()` hook — no prop drilling anywhere in the tree.

### `Login.jsx` — Role-Based Entry Point
A single login form that routes users to their correct dashboard based on their `role` field (`student` or `admin`). Quick Demo buttons allow instant one-click access — useful for evaluators and demos without needing to type credentials.

### `AssignmentCard.jsx` — Dual-Role Shared Component
One card component handles both student and admin views. Students see their personal status badge (Done / Pending / Overdue) and a submit button. Admins see a per-student submission breakdown with color-coded status pills. This eliminates code duplication while keeping both experiences polished.

### `ProgressBar.jsx` — Reusable Progress Indicator
Extracted as its own component to keep dashboard files clean and allow consistent styling across student and admin views. Accepts a `value` prop (0–100) and animates smoothly with a CSS transition on mount.

### `ConfirmSubmitModal.jsx` + `SubmitConfirmModal.jsx` — 2-Step Verification Flow
The submission flow is split into two deliberate confirmation steps to match the double-verification requirement. Step 1 asks "Have you submitted?" and Step 2 asks for final confirmation before writing to global state and localStorage. This prevents accidental or premature submissions.

### `CreateAssignmentModal.jsx` — Admin Assignment Form
A controlled form with fields for title, description, Google Drive link, and due date. On submit, the new assignment is immediately injected into global state and persisted to `localStorage`. All enrolled students automatically start with `submitted: false` for the new assignment.

### `Auth/Register.jsx` — Role Selection on Signup
The registration flow includes a role selector (Student / Professor) so new users are correctly assigned from the start. This drives the entire role-based authorization logic downstream.

### Styling Philosophy
The UI uses a **dark glassmorphism theme** — semi-transparent cards with `backdrop-filter: blur`, a Slate & Blue color palette, gradient progress bars, and smooth hover micro-interactions. Tailwind CSS utility classes handle layout and spacing consistently across all screen sizes.

---

## 🔐 Authentication & Authorization

| Rule | Implementation |
| :--- | :--- |
| Students see only their own assignment list | Submission map keyed by `currentUser.id` |
| Students cannot access admin views | `App.jsx` routes strictly by `currentUser.role` |
| Admins see all student submission statuses | `assignment.submissions` object per student |
| Admins manage only their own assignments | `createdBy` field validated before delete |
| Session persists across page refresh | `currentUser` stored in `localStorage` |

---

## 🗂️ Data Flow

```
mockData.js  ──►  AppContext (localStorage)  ──►  Dashboard Components
                        │
              ┌─────────┼──────────┐
              ▼         ▼          ▼
           Login   Assignments  Students
          (auth)    (CRUD)       (list)
```

1. On first load, `mockData.js` seeds `localStorage` with demo users and assignments.
2. `AppContext` reads from `localStorage` on mount and syncs back on every state change via `useEffect`.
3. Components read state via `useApp()` and dispatch actions (submit, create, delete) through context functions.
4. The user's `role` field determines which dashboard renders and what actions are available.

---

## 📱 Responsive Design

The layout uses CSS Grid with `auto-fill` and `minmax()` for assignment cards, collapsing from a 2-column desktop grid to a single-column mobile layout automatically. The Navbar compresses gracefully on small screens and all modals are center-aligned with full-width action buttons on mobile.

---

**Developed with ❤️ by [Chaudhari Swati](https://github.com/ChaudhariSwati)**
