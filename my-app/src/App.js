import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/home'

function App() {
  return (
    <div className="App">
      <Router>
        <Home></Home>
      </Router>
    </div>
  );
}

export default App;
