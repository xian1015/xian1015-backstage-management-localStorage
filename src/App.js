import React from 'react';
import './App.css';
import Header from "./components/header/header";
import Content from "./components/content/content";

import { Layout } from 'antd';

const {Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header></Header>
        <Content></Content>
        <Footer>杨卓颖 成都理工大学 乌圆测试</Footer>
      </Layout>
    </div>
  );
}

export default App;
