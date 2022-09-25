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
import Clientes from './Components/Cliente/ListaClientes';
import ClienteForm from './Components/Cliente/ClienteForm';
import Locacoes from './Components/Locacao/ListaLocacao';
import LocacaoForm from './Components/Locacao/LocacaoForm';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='filmes' element={<Filmes/>}/>
            <Route path='filme' element={<FilmeForm/>}/>
            <Route path='filme/:id' element={<FilmeForm/>}/>

            <Route path='clientes' element={<Clientes/>}/>
            <Route path='cliente' element={<ClienteForm/>}/>
            <Route path='cliente/:id' element={<ClienteForm/>}/>

            <Route path='locacoes' element={<Locacoes/>}/>
            <Route path='locacao' element={<LocacaoForm/>}/>
            <Route path='locacao/:id' element={<LocacaoForm/>}/>
          </Route>

          
      </Routes>

      
    
    </Router>
  );
}

export default App;
