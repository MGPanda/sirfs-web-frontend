import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import {Routes} from "./core/Routes/Routes";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;
