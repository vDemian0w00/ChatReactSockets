import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 90%;
  word-break: break-all;
  span {
    color: #cc6565;
  }
`;

const Welcome = ({ user }) => {
  return (
    <Container>
      <h1>
        Welcome back, <span>{user?.username}!</span>
      </h1>
      <h2>Start chatting with your friends!</h2>
    </Container>
  );
};

export default Welcome;
