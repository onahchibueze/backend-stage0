Backend Wizards — Stage 0 Task

This project was built for HNG Backend Stage 0.
It exposes a single endpoint /me that returns profile information and a random cat fact fetched from Cat Facts API
.

📡 Endpoint

GET /me

Example Response
{
"status": "success",
"user": {
"email": "youremail@example.com",
"name": "Chibueze Somtochukwu",
"stack": "Node.js/Express"
},
"timestamp": "2025-10-17T12:00:00.000Z",
"fact": "Cats sleep for 70% of their lives."
}

🧰 Run Locally
git clone https://github.com/onahchibueze/backend-stage0.git
cd backend-stage0
npm install

Run the app in development:

npm run dev

Then visit:

http://localhost:3000/me
