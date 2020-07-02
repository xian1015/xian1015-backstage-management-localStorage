import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createHashHistory } from "history";

import header from "../components/header/Header";


const history = createHashHistory();

export default class Index extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router history={history}>
        <Route path="/" component={header} />
      </Router>
    );
  }
}