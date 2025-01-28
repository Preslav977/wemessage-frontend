import styles from "./PopUpModalComponent.module.css";

function PopUpModalComponent({ backgroundColor, popUpText }) {
  return (
    <div
      className={styles.modalContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <p>{popUpText}</p>
    </div>
  );
}

export default PopUpModalComponent;
