import React, { useState } from "react";
import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";

const Container = styled.div`
  display: grid;
  grid-template-rows: 100%;
  .inputContainer {
    background-color: transparent;
    border-radius: 3rem;
    display: grid;
    grid-template-columns: 90% 10%;
    input{
      align-self: center;
      color: white;
      border: none;
      background-color: transparent;
      padding: 1rem;
      font-size: 100%;
      outline: none;
      transition: all 0.3s ease;
      &::placeholder{
        color: white;
      }
      &:focus{
        font-size: 120%;
        opacity: 0.8;
      }
    }
    button{
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 180%;
      transition: all 0.3s ease;

      &:hover{
        font-size: 220%;
        color: rgb(237,173,228, 0.6);
      }
    }
  }
`;

const ChatInput = ({ handleSendMsg }) => {

  const [msg, setMsg] = useState("");

  const handleChange = (msg) => {
    setMsg(msg);
  }

  const sendChat = e => {
    e.preventDefault();
    if(msg){
      handleSendMsg(msg);
      setMsg("");
    }
  }

  return (
    <Container>
      <form className="inputContainer" onSubmit={sendChat}>
        <input type="text" value={msg} placeholder="Type a message" onChange={({target}) => handleChange(target.value)} />
        <button type="submit" >
          <RiSendPlaneFill />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;
