import styles from "./LogInFormComponent.module.css";

import { Link } from "react-router-dom";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  UserNameContext,
  PasswordContext,
} from "../contexts/UserRegistrationContext";

function LogInFormComponent() {
  const { username, setUsername } = useContext(UserNameContext);

  const { password, setPassword } = useContext(PasswordContext);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default LogInFormComponent;
