import styles from "./PopUpModalComponent.module.css";

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

export default PopUpModalComponent;
