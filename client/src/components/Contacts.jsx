import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: 20% 80%;
  overflow-y: hidden;
  background-color: #f09c9ccb;
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
    margin-right: 0.2rem;
    
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: rgb(239, 201, 201);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      transition: all 0.3s ease;
      cursor: pointer;
      background-color: rgb(239, 201, 201);
      min-height: 2.5rem;
      border-radius: 0.2rem;
      padding: 0.2rem;
      width: 90%;
      gap: 1rem;
      align-items: center;
      display: flex;
      .username {
        word-wrap: break-word;
        h3 {
          font-size: 90%;
          color: white;
        }
      }
    }
    .selected {
      background-color: rgb(248, 115, 115);
    }
  }
  .current-user {
    background-color: rgb(194, 127, 185);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      color: white;
      font-size: 100%;
    }
    @media screen and (max-width: 768px) and (min-height: 600px) {
      gap: 0.5rem;
      .username {
        font-size: 0.5rem;
      }
    }
  }
`;

const Contacts = ({ contacts, currentUser, chatChange }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserId(currentUser._id);
    }
  }, [currentUser]);

  const handleSelect = (contact, i) => {
    setCurrentSelected(i);
    chatChange(contact);
  };

  return (
    <>
      {currentUserId && currentUserName ? (
        <Container>
          <div className="current-user">
            <h2 className="username">{currentUserName}</h2>
          </div>
          <div className="contacts">
            {contacts.map((contact, i) => {
              return (
                <div
                  className={`contact ${
                    i === currentSelected ? "selected" : ""
                  }`}
                  key={i}
                  onClick={() => handleSelect(contact, i)}
                >
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      ) : null}
    </>
  );
};

export default Contacts;
