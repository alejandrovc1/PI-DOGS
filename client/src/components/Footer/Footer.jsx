import styles from "./Footer.module.css";
function Footer() {
  return (
    <span className={styles.footer}>
      <a href="https://github.com/alejandrovc1"  target='_blank' rel="noreferrer">
        {"<"}Developed by Alejandro Villegas/{">"}
      </a>
    </span>
  );
}

export default Footer;
