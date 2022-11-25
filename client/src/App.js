import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from './components/Home/Home.jsx';
import LandingPage from './components/Landing Page/LandingPage.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form';
import './App.css';
import Loading from "./components/Loading/Loading.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={ <Form/> }/>
          <Route path="/loading" element={ <Loading/> }/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;