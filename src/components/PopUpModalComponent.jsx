import styles from "./PopUpModalComponent.module.css";
import PropTypes from "prop-types";

function PopUpModalComponent({
  popUpModalBackgroundColor,
  popUpModalContentColor,
  popUpModalOutlineColor,
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
        <p>{popUpModalContentText}</p>
      </div>
    </div>
  );
}

PopUpModalComponent.propTypes = {
  popUpModalBackgroundColor: PropTypes.string,
  popUpModalContentColor: PropTypes.string,
  popUpModalOutlineColor: PropTypes.string,
  popUpModalContentText: PropTypes.string,
};

export default PopUpModalComponent;
