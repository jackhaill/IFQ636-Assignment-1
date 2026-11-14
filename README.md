Catering Booking System
React - Frontend / UI, Renders UI + handles user interactions
Node.js - Backend Runtime Environment, Executes backend JavaScript code
Express - Backend Web Framework, Routes HTTP requests + structures APIs
MongoDB - Database, stores and tetrieves persistent app data

Live: http://<EC2-PUBLIC-IP>:5001

Setup:

Backend:

npm install

create .env:
MONGO_URI=<your connection string>
JWT_SECRET=<random string>
PORT=5001

Frontend:

npm install

Set baseURL in axiosConfig.jsx to backend address
npm run build

On EC2:

Backend:

pm2 start server.js --name backend

Frontend:

pm2 start "serve -s build -l 3000" --name frontend

Limitations:
Admin-managed catering serives not implemented
No elastic IP - Public IP changes on instance reset
