import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className={styles.errorPageContainer}>
      <img
        className={styles.errorPageImg}
        src="/wemessage_logo.jpg"
        alt="wemessage logo"
      />
      <h1>404 Not Found</h1>
      <p>Looks like you tried a page that doesn&#039;t exist!</p>
      <p>
        Click <Link to={"/login"}>here</Link> to be redirected to login form
      </p>
    </div>
  );
}

export default ErrorPage;
