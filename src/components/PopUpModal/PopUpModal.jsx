import styles from "./PopUpModal.module.css";
import PropTypes from "prop-types";

function PopUpModal({
  popUpModalBackgroundColor,
  popUpModalContentColor,
  popUpModalOutlineColor,
  popUpModalContentHeader,
  popUpModalContentText,
}) {
  return (
    <div
      data-testid="modal"
      className={styles.popUpModalContainer}
      style={{
        backgroundColor: popUpModalBackgroundColor,
        color: popUpModalContentColor,
        outlineColor: popUpModalOutlineColor,
      }}
    >
      <div className={styles.popUpModalContent}>
        <p>{popUpModalContentHeader}</p>
        <p>{popUpModalContentText}</p>
      </div>
    </div>
  );
}

PopUpModal.propTypes = {
  popUpModalBackgroundColor: PropTypes.string,
  popUpModalContentColor: PropTypes.string,
  popUpModalOutlineColor: PropTypes.string,
  popUpModalContentHeader: PropTypes.string,
  popUpModalContentText: PropTypes.string,
};

export default PopUpModal;
