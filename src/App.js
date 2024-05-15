import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Charts from './pages/Charts';

function App() {
  const [isLogOut, setIsLogOut] = useState(true);
  const [userName,setUserName] = useState('')

  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      setUserName(`Hello ${localStorage.getItem('username')}`)
          }
  
  }, [localStorage])

  return (
    <Router>
      <Navbar setIsLogOut={setIsLogOut} isLogOut={isLogOut} userName={userName} setUserName={setUserName}/>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/login" element={<LoginPage setIsLogOut={setIsLogOut} setUserName={setUserName}/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/charts" element={<Charts/>} />
      </Routes>
    </Router>
  );
}

export default App;
