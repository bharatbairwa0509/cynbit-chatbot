# Cynbit Technologies – Website Enhancement with AI Chatbot

**Live Demo:** https://cynbit-chatbot.onrender.com/  
**Original Website:** https://www.cynbit.in/

## About the Project

This project was developed as part of a Full Stack Developer assessment for Cynbit Technologies.

The objective was to enhance the existing Cynbit website by improving its user experience and adding useful functionality. I recreated the main website experience and introduced an AI-powered chatbot to help visitors understand the company, explore its services and find relevant information.

## My Proposed Website Enhancement

One of the improvements I wanted to bring to the Cynbit website was a **real AI-powered chatbot instead of a chatbot that only provides predefined responses**.

The chatbot uses the Groq AI API to understand user questions and generate relevant, natural-language responses. It acts as a website support assistant, helping visitors navigate the website and learn about Cynbit's services and products.

## Key Features

- Responsive website design for desktop and mobile devices.
- Improved navigation and user experience.
- Light and dark mode.
- Floating AI chatbot available on the website.
- Real AI-generated responses using the Groq API.
- Answers questions about Cynbit's services, products and training programmes.
- Quick-reply suggestions for common questions.
- Maintains recent conversation context for follow-up questions.
- Provides relevant information and directs visitors to the appropriate website sections.
- Handles questions outside its company knowledge by guiding users to contact the team.

## AI Chatbot – How It Works

The chatbot uses a backend API to communicate securely with the Groq AI service.

**Architecture:**

```text
User
  |
  v
Website Chatbot (Frontend)
  |
  | POST /api/chat
  v
Node.js + Express Backend
  |
  | Company Knowledge + User Message
  v
Groq AI API
  |
  v
AI-Generated Response
  |
  v
Website Chatbot
```

The API key is stored on the server using environment variables. It is never exposed in the frontend.

The backend also validates user input, limits message length and applies rate limiting to help prevent API abuse.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Groq AI API
- REST API
- Git and GitHub
- Render (Deployment)

## Project Structure

```text
cynbit-chatbot/
│
├── public/
│   └── index.html
│
├── server.js
├── knowledge.js
├── package.json
├── .env.example
└── .gitignore
```

## Run the Project Locally

**Requirements:** Node.js 18 or newer.

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/cynbit-chatbot.git
```

2. Open the project directory:

```bash
cd cynbit-chatbot
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add your Groq API key:

```env
PROVIDER=groq
GROQ_API_KEY=your_groq_api_key
```

5. Start the application:

```bash
npm start
```

6. Open the application:

```text
http://localhost:3000
```

Get your Groq API key from: https://console.groq.com/

## Deployment

The application is deployed on Render.

**Deployment configuration:**

- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `PROVIDER` and `GROQ_API_KEY`

**Live Demo:** https://cynbit-chatbot.onrender.com/

*Note: The application uses Render's free hosting plan. If it has been inactive, the first request may take around 30–60 seconds while the server starts.*

## Future Improvements

Some improvements I would like to implement in the future:

- Add website-wide content search using RAG.
- Add lead generation so visitors can request information or quotations.
- Add chat history and analytics for understanding visitor queries.
- Implement streaming responses for a smoother chatbot experience.
- Improve chatbot knowledge by connecting it with updated website content.

## What I Learned

Through this assessment, I gained practical experience in website enhancement, frontend development, backend API integration and working with AI services.

I also learned how to connect a frontend chatbot to a backend server and integrate the Groq AI API to generate real-time responses.

## Note

This is an independent prototype developed for assessment purposes. It is not an official Cynbit Technologies product.

## Contact

**Developed by:** YOUR NAME

- **GitHub:** https://github.com/YOUR-USERNAME
- **LinkedIn:** https://www.linkedin.com/in/YOUR-PROFILE