import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner"
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import {Projects} from "./components/Projects"
import { Footer } from "./components/Footer";
import { Chat } from "./components/Chat";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Experience />
      <Projects />
      <Chat/>
      <Footer/>
    </div>
  );
}

export default App;
