import React from "react";
import Dexie from "dexie";
import { MemoryRouter, Route } from "react-router-dom";

import db from "utils/db";
import Log from "components/Log";
import Logo from "components/Logo";
import Menu from "components/Menu";
import Home from "components/Home";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      walks: [],
      currentWalk: null
    };

    let that = this, methods = ["handleStartWalk", "handleEndWalk"];
    methods.forEach(method => this[method] = that[method].bind(this));
  } // constructor

  componentDidMount() {
    db.table("walks")
      .toArray()
      .then((walks) => {
        let latestWalk = walks[walks.length - 1],
            currentWalk = (latestWalk.end === null) ? latestWalk.id : null;
        this.setState({walks, currentWalk});
      });
  } // componentDidMount

  handleStartWalk() {
    const walk = {
      start: new Date(),
      end: null
    };
    db.table("walks")
      .add(walk)
      .then((id) => {
        const newList = [...this.state.walks, Object.assign({}, walk, { id })];
        this.setState({ walks: newList, currentWalk: id });
      });
  } // handleStartWalk

  handleEndWalk(id) {
    let newDate = new Date();
    db.table("walks")
      .update(id, { end: newDate })
      .then(() => {
        const newList = this.state.walks;
        const walkId = newList.findIndex(walk => walk.id === id);
        newList[walkId].end = newDate;
        this.setState({ walks: newList, currentWalk: null });
      });
  } // handleEndWalk

  render() {
    let currentWalk = this.state.walks.find(walk => walk.id === this.state.currentWalk) || null;

    return (
      <MemoryRouter>
        <Route render={({location, match}) => (
          <div>
            <Logo />
            <Route path="/" exact render={() => (
              <Home currentWalk={currentWalk} onStartWalk={this.handleStartWalk} onEndWalk={this.handleEndWalk}/>
            )}/>
            <Route path="/log" exact render={() => (
              <Log walks={this.state.walks} />
            )}/>
            <Menu />
          </div>
        )} />
      </MemoryRouter>
    );
  }
} // App Component

export default App;
