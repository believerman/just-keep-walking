import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import "./Home.scss";
import secondsToTime from "utils/secondsToTime";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {interval: null};

    let that = this, methods = ["setInterval", "getTimerValue", "updateTimer", "handleStartWalk", "handleEndWalk"];
    methods.forEach(method => this[method] = that[method].bind(this));
  } // constructor

  componentDidMount() {
    if (this.props.currentWalk !== null) {
      this.setInterval();
    }
  } // componentDidMount

  componentWillUnmount() {
    clearInterval(this.state.interval);
  } // componentWillUnmount

  setInterval() {
    this.setState({interval: setInterval(this.updateTimer, 1000)});
  } // setInterval

  getTimerValue() {
    let seconds = (this.props.currentWalk === null)
          ? 0
          : moment.duration(
              moment()
              .diff(moment(this.props.currentWalk.start))
            ).asSeconds();
    return secondsToTime(seconds);
  } // getTimerValue

  updateTimer() {
    let timer = this.getTimerValue();
    document.getElementById("timer").innerHTML = timer;
  } // updateTimer

  handleStartWalk() {
    this.setInterval();
    this.props.onStartWalk();
  } // handleStartWalk

  handleEndWalk() {
    clearInterval(this.state.interval);
    setTimeout(() => {this.updateTimer()}, 200);
    this.props.onEndWalk(this.props.currentWalk.id);
  } // handleEndWalk

  render() {
    let timer = this.getTimerValue(),
        currentlyWalking = (this.props.currentWalk === null)
          ? false
          : true,
        link = (currentlyWalking)
          ? (event) => {this.handleEndWalk()}
          : (event) => {this.handleStartWalk()},
        text = (currentlyWalking)
          ? "Stop Walking"
          : "Start Walking";

    return (
      <main id="home" onClick={link}>
        <p id="timer">{timer}</p>
        <p id="text">{text}</p>
      </main>
    );
  } // render
} // Home Component
Home.propTypes = {
  currentWalk: PropTypes.object,
  onEndWalk: PropTypes.func.isRequired,
  onStartWalk: PropTypes.func.isRequired
} // Home.propTypes

export default Home;
