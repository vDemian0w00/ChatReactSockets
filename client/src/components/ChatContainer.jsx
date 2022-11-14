import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";
import { addMsg, getAllMsg } from "../API/ApiRoutes";
import { v4 } from "uuid";
const Container = styled.div`
  display: grid;
  grid-template-rows: 20% 70% 10%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    background-color: rgb(237, 173, 228);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    .user-name {
      display: flex;
      align-items: center;
      padding: 1rem;
      h3 {
        color: white;
      }
    }
  }
  .chat-body {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-right: 0.2rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: rgb(239, 201, 201);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: rgb(237, 173, 228);
        max-width: 50%;
        overflow-wrap: break-word;
        font-size: 1.1rem;
      }
    }
    .sended {
      justify-content: flex-end;
    }
    .recieved {
      .content {
        background-color: rgb(250, 145, 236);
      }
      justify-content: flex-start;
    }
  }
  .chat-input {
    background-color: rgb(237, 173, 228);
  }
`;

const ChatContainer = ({ user, currentUser, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getAllMsg({
        from: currentUser._id,
        to: user._id,
      });
      setMessages(data);
    }
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSendMsg = async (msg) => {
    const response = await addMsg({
      from: currentUser._id,
      to: user._id,
      message: msg,
    });
    socket.current.emit(
      "sm",
      {
        from: currentUser._id,
        to: user._id,
        message: msg,
      }
    );

    const msgs = [...messages];

    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        setArrivalMsg({ fromSelf: false, message: data });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-name">
          <h3>{user.username}</h3>
        </div>
        <Logout />
      </div>
      <div className="chat-body">
        {messages
          ? messages.map((msg, i) => {
              return (
                <div ref={scrollRef} key={v4()}>
                  <div
                    className={`message ${
                      msg.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* <ChatMessages/> */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

export default ChatContainer;
