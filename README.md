# Channel Cluster - chat 

## Table of contents

- Description
- Features
- Requirements
- Installation
- Contributor

## Description

This is a real-time chat application built using Express.js, EJS, Socket.IO, MongoDB, and vanilla CSS. <br />
It was developed entirely with vanilla JavaScript, leveraging EJS for templating and vanilla CSS, without the use of any CSS libraries.

Users can join different chat rooms, send and receive messages in real-time, and interact with other users. 🗣️
<br /> <br />

[HOME PAGE]
<img width="1410" alt="Screenshot: home page of channel chat app" src="https://github.com/hyejin-seok/channel-chat-app/assets/132785671/805b921c-6109-4a5c-8fa7-0f0b5cbadca2">
<br /><br />
[CHAT ROOM PAGE]
<img width="1410" alt="Screenshot: chat rooom page of channel chat app" src="https://github.com/hyejin-seok/channel-chat-app/assets/132785671/63f1fecd-7f7e-4ca3-9041-cef38772c1d1">

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

## Contributor

🌻 [Hyejin](https://github.com/hyejin-seok)
