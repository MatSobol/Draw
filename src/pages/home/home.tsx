import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { Navbar } from "./navbar";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className={styles.welcomeText}>
          Welcome to <span style={{ color: "blue" }}>Draw!</span>
        </h1>
        <p className={styles.describeText}>Collaborate & Create in real-time</p>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => navigate("/create-room")}
            className={`${styles.button} primary`}
          >
            Create room
          </button>
          <button
            className={`${styles.button} secondary`}
            onClick={() => navigate("/join-room")}
          >
            Join room
          </button>
        </div>
      </div>
    </>
  );
};
