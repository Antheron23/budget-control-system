# 💰 Budget Control System

A full-stack MERN expense tracking application that helps users manage their personal finances. It features secure user authentication, real-time expense tracking, and dynamic budget calculation with a modern, responsive UI.

## 🚀 Features

* **User Authentication:** Secure Sign Up and Login using JWT (JSON Web Tokens) & bcrypt encryption.
* **Expense Management:** Add, View, and Delete daily expenses.
* **Budget Tracking:** Real-time calculation of total spending with visual alerts (Green/Red) when over budget.
* **Responsive UI:** Professional design with a light yellow gradient theme and card-based layout.
* **Data Persistence:** All data is stored securely in MongoDB.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Hooks: useState, useEffect, useContext)
* React Router (Navigation)
* Axios (API Requests)
* CSS3 (Custom Gradient & Card Design)

**Backend:**
* Node.js & Express.js (REST API)
* MongoDB & Mongoose (Database & Schemas)
* JWT & Bcryptjs (Authentication & Security)

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `server` folder:

`MONGO_URI` = Your MongoDB Connection String
`JWT_SECRET` = Your Secret Key (e.g., mysecrettoken)

## 📦 Installation & Setup

Follow these steps to get the project running locally.

###Clone the Repository
```bash
git clone(https://github.com/Antheron23/budget-control-system.git)
cd budget-control-system

2.Install Dependencies
Server (Backend):Bash
cd server
npm install
Client (Frontend):Bash
cd ../client
npm install
3. Run the ProjectStart the Backend:(Inside the server folder)Bashnpm run dev
# Server runs on http://localhost:5000
Start the Frontend:(Open a new terminal, go to client folder)Bashnpm start
# Client runs on http://localhost:3000
