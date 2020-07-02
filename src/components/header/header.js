import React from "react";
import { Layout } from "antd";
import "./header.css";
const { Header } = Layout;
export default class MyHeader extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Header className="headBox">
          <div className="title">后台管理</div>
      </Header>
    );
  }
}