import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import videoPerros from './videoPerros.mp4';

function LandingPage() {
  return (
    <div className='myvideo'>
      <p className={styles.title}>Welcome to Dogs Finder!</p>
      <Link to="/home">
        <button className={styles.button}>Enter to site</button>
      </Link>
      <video src={videoPerros} autoPlay loop muted />
    </div>
  );
}

export default LandingPage;
