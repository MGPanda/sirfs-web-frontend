import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import {Routes} from "./core/Routes/Routes";
import {Navbar} from "./core/Navbar/Navbar";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;
