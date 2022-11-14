import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { RiLogoutBoxRLine } from "react-icons/ri";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 0.5rem;
  margin-right: 1.5rem;
  border-radius: 50%;
  background-color: rgb(194,127,185);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover{
    margin-right: 1rem;
    background-color: rgb(248,115,115);
    padding: 1.2rem;
  }
  svg{
    font-size: 1.5rem;
    color: white;
  }
`

const Logout = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.clear();
    nav("/");
  }
  return (
    <Button onClick={logout}>
      <RiLogoutBoxRLine />
    </Button>
  )
}

export default Logout
