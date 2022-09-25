import React from 'react';
import { Layout } from 'antd';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Filmes from './Components/Filmes';
import Home from './Components/Home';
import FilmeForm from './Components/FilmeForm';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='filmes' element={<Filmes/>}/>
            <Route path='filmes/:id' element={<FilmeForm/>}/>
            <Route path='filmes/create' element={<FilmeForm/>}/>
          </Route>

          
      </Routes>

      
    
    </Router>
  );
}

export default App;
