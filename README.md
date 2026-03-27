# 🎓 EduFlow – Academic Assignment Dashboard

**EduFlow** is a premium, high-performance web application built for modern academic environments. It enables seamless assignment distribution, tracking, and submission between professors and students with a focus on high-end UX and responsive design.
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
* **Assignment Lifecycle:** Create, edit, and delete assignments.
* **Real-time Tracking:** View a live list of all students with their specific submission status.
* **Class Analytics:** Instant stats on total students, pending tasks, and completion percentages.

#### **👩‍🎓 Student Experience**
* **Smart Overview:** Visual summaries of total, completed, and pending assignments.
* **Progress Indicators:** Dynamic progress bars for both individual tasks and overall course journey.
* **Secure Submission:** 2-step verification modal to ensure work is correctly marked as done.

#### **💎 Premium Engineering**
* **Glassmorphism UI:** A sleek, professional **Slate & Blue** dark theme.
* **Advanced Auth:** Password visibility toggles and international country code support for phone numbers.
* **Mobile First:** 100% responsive layout that works perfectly on phones and desktops.

---
## Project Architecture 

C:\USERS\KUMAR\ONEDRIVE\DESKTOP\EDUFLOW\EDUFLOW\SRC
│   App.css
│   App.jsx
│   index.css
│   main.jsx
│
├───assets
│       hero.png
│       react.svg
│       vite.svg
│
├───components
│       AdminDashboard.jsx
│       AssignmentCard.jsx
│       ConfirmSubmitModal.jsx
│       CreateAssignmentModal.jsx
│       Login.jsx
│       Navbar.jsx
│       ProgressBar.jsx
│       StudentDashboard.jsx
│       SubmitConfirmModal.jsx
│
│   └───Auth
│           ForgotPassword.jsx
│           Register.jsx
│
├───context
│       AppContext.jsx
│
└───data
        mockData.js

### 🛠️ Tech Stack
* **Core:** React 18 (Vite)
* **Styling:** Tailwind CSS
* **State:** React Context API
* **Storage:** LocalStorage API

---
🛠️ Setup & Development Guidelines
Follow these steps to set up the project locally and maintain code quality:

1. Prerequisites
Ensure you have Node.js (v16+) installed.

Use npm or yarn as your package manager.
2. Local Installation
Bash
# Clone the repository
git clone [https://github.com/ChaudhariSwati/EduFlow.git](https://github.com/ChaudhariSwati/EduFlow.git)

# Enter the directory
cd EduFlow

# Install dependencies
npm install

# Start the local development server
npm run dev
3. Development Workflow
State Management: All authentication and assignment data are handled via AppContext.jsx. Do not prop-drill; use the useApp() hook.

Styling: Use Tailwind CSS utility classes. Avoid writing custom CSS in index.css unless global resets are needed.

Components: Create new components in the components/ folder. Ensure they are functional components using React Hooks.

-------
✨ Key Features
👨‍🏫 Professor Admin: Create, manage, and track real-time student submissions.

👩‍🎓 Student View: Personal progress tracking with 2-step submission confirmation.

💎 Premium UI: Glassmorphism dark theme, fully responsive for Mobile and Desktop.

📱 Auth Features: Password visibility toggle and international country code support.

----
---

### 🚀 How to Save and Push
1.  **Open VS Code** and click on your `README.md` file.
2.  **Delete everything** currently in the file.
3.  **Paste the code** from the gray box above.
4.  **Save the file** (`Ctrl + S`).
5.  **Run these commands** in your terminal to update GitHub:

```bash
git add README.md
git commit -m "docs: add architecture and setup guidelines"
git push origin main

### 📦 Installation
1. `git clone https://github.com/ChaudhariSwati/EduFlow.git`
2. `npm install`
3. `npm run dev`

---

**Developed with ❤️ by [Chaudhari Swati](https://github.com/ChaudhariSwati)**
