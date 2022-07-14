# Project 4 - OfficeTalk (O.T.)

# App Description
OfficeTalk is a messaging/chat application in which users can see others users online, and engage in real time online conversation with them! Users will be able to converse with any other user on their server, and send public messages to other users on the server as well. This makes it great for workflow & office conversation without having to go see your colleagues in person!

# Technologies Used
I wanted to use websockets for this project, since it came up in discussion during the last project for implementing direct messaging to our social media app. Usually chat applications require polling the server for changes, keeping track of timestamps, and a myriad of other processes and in the past this has been very inefficient and slower than it should be. However, Websockets intrigued me for implementing a real-time chat system since it provides bi-directional communication between the client and server. Socket.io enables low-latency and event-based communication between client and server. This means that the server pushes messages to the client, and the server does not need to continuously check if a message has been sent.

## Client Side:
* React.js
* Websockets.io
* Tailwind

## Server Side:
* Express
* Node.js

# User Stories:
* As a user, i want to access a public chat room
* As a user, i want to be able to send announcements/messages to the public chat room.
* As a user, i want to see other users online that i can chat with.
* As a user, i want to be able to send a chatroom request to another user to hold a private chat.
* As a user, i want to be able to hold a private chat with other users after they accept chat request.
* As a user, i want to be able to change my "Nickname" or user display name

# Questions
## How do you plan on learning and implementing this new technology?
* Websocket.io documentation is fairly extensive and elaborate, which will be helpful
* Youtube tutorials, and google.

## Goal with this Project:
* Explore and implement the various uses and conveniences of real-time messaging by using Websockets

## Users for this App:
* Anyone in an office work environment where continued and real-time communication is crucial to project success.
* Teams of colleagues working on projects/classwork together.
* Groups of friends who just want to shoot the shit

## MVP
* Successful implementation of a public chat room for users

## Stretch Goals
* Private chat capability/DM capability between 2 users (not in public channel)
* Implement a chat request modal/popup for when user wants to start a private chat with another user (for recieving user to click accept or ignore)

# Wireframes

## On socket connection
![](./wireframes/p4socketconnection.jpg)

## Public Chat Channel
![](./wireframes/publicchannel.jpg)

## Connected Users
![](./wireframes/connectedusers.jpg)

## Private Chat
![](./wireframes/privatechat.jpg)