import styles from "./RenderChatOrGroupHeader.module.css";
import PropTypes from "prop-types";

function RenderChatOrGroupHeader({ showChatOrGroupHeader }) {
  return <h5>{showChatOrGroupHeader}</h5>;
}

RenderChatOrGroupHeader.propTypes = {
  showChatOrGroupHeader: PropTypes.string,
};

export default RenderChatOrGroupHeader;
