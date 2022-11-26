import Nav from "../Nav/Nav.jsx";
import Cards from "../Cards/Cards.jsx";
import styles from "./Home.module.css";
import Footer from "../Footer/Footer.jsx";


function Home() {
  return (
    <div className={styles.maindiv}>
      <Nav />
      <Cards />
      <br/>
      <Footer />
    </div>
  );
}

export default Home;
