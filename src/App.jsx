import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Routing from "./components/Routing.jsx";
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routing />
      </Router>
    </>
  );
}

export default App;
