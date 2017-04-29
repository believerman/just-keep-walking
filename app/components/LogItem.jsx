import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import secondsToTime from "utils/secondsToTime";

const LogItem = props => {
  let walkFinished = (props.end === null)
        ? false
        : true,
      startMoment = moment(props.start),
      endMoment = (walkFinished)
        ? moment(props.end)
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
        : "; walk in progress!";

  return (
    <li>
      <p>{start}{end}{duration}</p>
    </li>
  );
} // LogItem Component
LogItem.propTypes = {
  id: PropTypes.number.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date)
}; // LogItem.propTypes

export default LogItem;
