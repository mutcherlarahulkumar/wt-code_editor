# Personalized Code Editor with AI

This is a web-based **Personalized Code Editor** that integrates a code editor with an AI chatbot powered by **Grok (from xAI)** and uses **JDoodle** for code validation. Users can write code, validate it, and interact with Grok by sending editor text and terminal responses with a single click.

## Features
- **Code Editor:** Write and edit code in a syntax-highlighted environment.
- **Code Validation:** Validate your code using JDoodle's online compiler API.
- **AI Chatbot (Grok):** Send editor text and terminal output to Grok for suggestions, explanations, or debugging help with one click.
- **Seamless Integration:** Real-time interaction between the editor, JDoodle, and Grok.

## Project Structure
```
personalized-code-editor/
├── client/             # Frontend (React)
│   ├── src/            # React source files
│   ├── public/         # Static assets
│   └── package.json    # Client-side dependencies
├── server/             # Backend (Node.js)
│   ├── src/            # Server source files
│   └── package.json    # Server-side dependencies
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## Prerequisites
- **Node.js** (v16.x or later)
- **npm** (v8.x or later)
- **A modern web browser**
- **JDoodle API Key:** Sign up at [JDoodle](https://www.jdoodle.com/) to get your API key.
- **Grok API Access:** Obtain an API key for Grok from [xAI](https://x.ai/) (if available; adjust based on your integration method).

## How to Run on Your Machine (Step-by-Step)

### Step 1: Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/your-username/personalized-code-editor.git
cd personalized-code-editor
```

### Step 2: Install Dependencies
Install the required dependencies for both the client and server.

For the client (React frontend):
```bash
cd client
npm install
```

For the server (Node.js backend):
```bash
cd ../server
npm install
```

### Step 3: Configure Environment Variables

### Step 4: Start the Server
Run the backend server:
```bash
cd server
npm start
```
The server should now be running at **http://localhost:5000** (or your configured port).

### Step 5: Start the Client
In a separate terminal, run the frontend:
```bash
cd client
npm start
```
The React app will open automatically in your browser at **http://localhost:3000**.

### Step 6: Use the Application
1. Open **http://localhost:3000** in your browser.
2. Write code in the editor.
3. Click the **"Validate"** button (or similar) to send your code to JDoodle for execution/validation.
4. Click the **"Send to Grok"** button to pass the editor text and JDoodle response to Grok.
5. View **Grok's response** in the AI chatbot panel.

## Notes
- Ensure your internet connection is active, as JDoodle and Grok require API calls.
- If Grok's API is not publicly available, adjust the integration to use a mock AI or another service.
