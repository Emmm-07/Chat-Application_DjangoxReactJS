# Chat App
This is a Chat Application that uses WebSockets and Django Channels for real-time communication. The application provides seamless real-time messaging, online user status updates, and in-app notifications to enhance user engagement.

## Link
[https://em-chat-three.vercel.app/](https://em-chat-three.vercel.app/)

Note: On first boot up, you might sometimes experience a slow server response when logging in, it is because the server is deployed on free tier only of render.com.
In general the servers on free tier plans go to sleep after 30 minutes of inactivity. And to “wake” them up again it takes about 1 minute.

## To run the Frontend in localhost
../frontend > npm start

## To run the backend / API in localhost
../backend > python manage.py runserver

## Technologies Used:

**Tailwind CSS**: For styling the application with modern, responsive design.

**JavaScript & React.js**: For building an interactive and dynamic user interface.

**Python & Django**: Manages backend logic and API development.

**Redis**: Handles real-time data and caching.

**SQLite**: Used as lightweight database for storing application data.

**JWT**: Authentication for secure user management.
<br>

## Key Features:
- User Authentication – Secure login and signup using JWT authentication.
- Real-time Messaging – Instant message delivery powered by WebSockets, Django Channels, and Redis.
- Online Status Indicator – A green dot appears next to active users.
- Message Persistence – All messages are stored in an SQLite database for retrieval.
- In-App Notifications – Users receive real-time notifications when they receive new messages.

