import React from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from '../Content';


const Home = () =>{

  const { Footer } = Layout

  return(
    <Layout>
        <Header/>
        <Layout>
          <Sidebar/>
          <Layout style={{padding: '5rem 5rem 0 5rem', display:'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <Content/>
            <Footer style={{textAlign: 'center'}}>Locadora 2022 - Todos direitos reservados</Footer>
          </Layout>
        </Layout>
      </Layout>
  )
}

export default Home