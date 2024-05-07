# Channel Cluster - chat

## Table of contents

- Description
- Features
- Requirements
- Installation
- Author

## Description

This is a real-time chat application built using Express.js, EJS, Socket.IO, and MongoDB. <br />
Users can join different chat rooms, send and receive messages in real-time, and interact with other users.

<img width="1405" alt="Screenshot: main page of channel chat app" src="https://github.com/hyejin-seok/channel-chat-app/assets/132785671/4423ccb0-90b5-4a4e-917d-e97fff1c6d0a">
<img width="1405" alt="Screenshot: chat room page of channel chat app" src="https://github.com/hyejin-seok/channel-chat-app/assets/132785671/2d048397-9ed4-4db2-8634-5bd037a73a92">

## Features

- **Secure User Authentication**: <br />
  &nbsp;Uses bcrypt and cookie sessions to ensure user data is secure.
- **Multiple Chat Rooms**: <br />
  &nbsp;Users can join and leave various chat rooms based on their interests.
- **Real-time Chat**: <br />
  &nbsp;Built with Socket.IO for live communication without needing to refresh the page.

## Requirements

- Node.js: installed on your machine. [Node.js](https://nodejs.org/en)
- MongoDB: to store chat messages and user information. [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the respository:

   ```
   git clone https://github.com/hyejin-seok/channel-chat-app
   ```

2. Navigate to the project directory:

   ```
   cd channel-chat-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:Create a .env file in the root directory of the project and add the following variables:

   **Note**: chatDB(Chat Messages History): `DATABASE_URL`, authDB(Users Authentication): `DATABASE_URL_SECONDARY`

   ```
   PORT=

   DATABASE_URL=
   DATABASE_URL_SECONDARY=

   COOKIE_PARSING_SECRET_KEY=
   SESSION_ID_SECRET_KEY=
   ```

5. Start the application:

   ```
   npm start
   ```

## Author

[Hyejin](https://github.com/hyejin-seok)
