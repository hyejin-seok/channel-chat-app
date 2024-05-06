# Channel Cluster - chat app

## Table of contents

- Description
- Features
- Requirements
- Installation
- Author

## Description

This is a real-time chat application built using Express.js, EJS, Socket.IO, and MongoDB. Users can join different chat rooms, send and receive messages in real-time, and interact with other users.

## Features

- Supports secure User Authentication
- Join and leave different rooms
- Real-time chat

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
