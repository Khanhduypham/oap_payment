import logo from './logo.svg';
import './App.css';
import {CreateLink} from "./pages/create-link";
import { Routes, Route } from 'react-router-dom';
import {Payment} from "./pages/payment";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<CreateLink/>}/>
            <Route path='payment' element={<Payment/>}/>
        </Routes>
    </div>
  );
}

export default App;
