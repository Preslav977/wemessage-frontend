import styles from "./RenderGroupDetailsMessages.module.css";
import useFetchSingleGroupURL from "./api/custom hooks/useFetchSingleGroupURL";
import { Link } from "react-router-dom";
import { UserLogInObjectContext } from "../contexts/UserLoggedInContext";
import { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";

function RenderGroupDetailsMessages({ renderGroupOrGroupDetails }) {
  const { groupDetails, error, loading } = useFetchSingleGroupURL();

  // console.log(groupDetails);

  const [userLogInObj, setUserLoginInObj] = useContext(UserLogInObjectContext);

  if (loading) {
    return <img src="./loading_spinner.svg" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  if (!renderGroupOrGroupDetails) {
    return <h5>Groups</h5>;
  } else if (renderGroupOrGroupDetails && groupDetails !== null) {
    console.log(groupDetails);
  }
}

export default RenderGroupDetailsMessages;
