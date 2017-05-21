import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import secondsToTime from "utils/secondsToTime";

class LogItem extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      showDelete: false,
      deleting: false
    };

    let that = this, methods = ["toggleShowDelete"];
    methods.forEach(method => this[method] = that[method].bind(this));
  } // constructor

  toggleShowDelete() {
    this.setState({showDelete: !this.state.showDelete});
  }

  render() {
    let walkFinished = (this.props.end === null)
          ? false
          : true,
        startMoment = moment(this.props.start),
        endMoment = (walkFinished)
          ? moment(this.props.end)
          : null,

        start = `Start: ${startMoment.format("h:mma")}`,
        end = (walkFinished)
          ? `, end: ${endMoment.format("h:mma")}`
          : "",
        duration = (walkFinished)
          ? `; duration: ${secondsToTime(
              moment.duration(
                endMoment
                .diff(startMoment)
              ).asSeconds()
            )}.`
          : "; walk in progress!",
        deleteItem = (this.state.showDelete)
          ? <a className="deleteItem" onClick={e => {
              this.props.handleDeleteWalk(this.props.id);
              this.setState({deleting: true});
              e.stopPropagation();
            }}></a>
          : null,
        liStyle = (this.state.deleting)
          ? {opacity: 0.5}
          : null;

    return (
      <li style={liStyle}>
        <p onClick={() => {this.toggleShowDelete()}}>{start}{end}{duration}{deleteItem}</p>
      </li>
    );
  } // render
} // LogItem Component
LogItem.propTypes = {
  id: PropTypes.number.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date),
  handleDeleteWalk: PropTypes.func.isRequired
}; // LogItem.propTypes

export default LogItem;
