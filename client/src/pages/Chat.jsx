import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import styled from "styled-components";
import { getContacts } from "../API/ApiRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { HOST } from "../API/ApiRoutes";
import { io } from "socket.io-client";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f5f5;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #ba9f9f;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (max-width: 768px) and (min-height: 600px) {
      grid-template-columns: 35% 65%;
    }
    .state {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;
    }
  }
`;

const Chat = () => {
  const nav = useNavigate();

  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("user-info")) {
        nav("/");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user-info")));
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(HOST);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function setUser() {
      if (currentUser) {
        const { data } = await getContacts(currentUser._id);
        setContacts(data.users);
      }
    }
    setUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setSelectedContact(chat);
  };

  return (
    <Container>
      <div className="container">
        {contacts.length !== 0 ? (
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            chatChange={handleChatChange}
          />
        ) : (
          <div className="state">Wait for other people </div>
        )}
        {selectedContact === undefined ? (
          isLoaded ? (
            <Welcome user={currentUser} />
          ) : null
        ) : (
          <ChatContainer
            user={selectedContact}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

export default Chat;
