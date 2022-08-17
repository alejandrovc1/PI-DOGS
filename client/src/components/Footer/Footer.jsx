import styles from "./Footer.module.css";
function Footer() {
  return (
    <span className={styles.footer}>
      <a href="https://github.com/alejandrovc1">
        {"<"}Developed by Alejandro Villegas/{">"}
      </a>
    </span>
  );
}

export default Footer;
