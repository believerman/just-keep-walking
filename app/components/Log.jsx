import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import "./Log.scss";
import LogItem from "components/LogItem";

const LogDate = props => {
  let dateName = moment().date(props.id).format("Do");

  return (
    <li>
      <h4>{dateName}</h4>
      <ul>
        {props.walks.reverse().map(walk => <LogItem key={walk.id} {...walk} handleDeleteWalk={props.handleDeleteWalk} />)}
      </ul>
    </li>
  );
}; // LogDate Component
LogDate.propTypes = {
  id: PropTypes.string.isRequired,
  walks: PropTypes.array.isRequired,
  handleDeleteWalk: PropTypes.func.isRequired
}; // LogDate.propTypes

const LogMonth = props => {
  let monthName = moment().month(props.id - 1).format("MMMM");

  // Generate list of dates in reverse order.
  let dates = Object.keys(props.walks).sort().reverse();

  return (
    <li>
      <h3>{monthName}</h3>
      <ul>
        {dates.map(date => <LogDate key={date} id={date} walks={props.walks[date]} handleDeleteWalk={props.handleDeleteWalk} />)}
      </ul>
    </li>
  );
}; // LogMonth Component
LogMonth.propTypes = {
  id: PropTypes.string.isRequired,
  walks: PropTypes.object.isRequired,
  handleDeleteWalk: PropTypes.func.isRequired
}; // LogMonth.propTypes

const LogYear = props => {
  // Generate list of months in reverse order.
  let months = Object.keys(props.walks).sort().reverse();

  return (
    <li>
      <h2>{props.id}</h2>
      <ul>
        {months.map(month => <LogMonth key={month} id={month} walks={props.walks[month]} handleDeleteWalk={props.handleDeleteWalk} />)}
      </ul>
    </li>
  );
}; // LogYear Component
LogYear.propTypes = {
  id: PropTypes.string.isRequired,
  walks: PropTypes.object.isRequired,
  handleDeleteWalk: PropTypes.func.isRequired
}; // LogYear.propTypes

const Log = props => {
  if (props.walks.length) {
    let groupedWalks = props.walks.reduce((acc, cur) => {
      let start = moment(cur.start),
          year = start.format("YYYY"),
          month = start.format("MM"),
          date = start.format("DD");

      if (typeof acc[year] === "undefined") {acc[year] = {};}
      if (typeof acc[year][month] === "undefined") {acc[year][month] = {};}
      if (typeof acc[year][month][date] === "undefined") {acc[year][month][date] = [];}

      acc[year][month][date].push(cur);
      return acc;
    }, {});

    // Generate list of years in reverse order.
    let years = Object.keys(groupedWalks).sort().reverse();

    return (
      <main id="log">
        <ul>
          {years.map(year => <LogYear key={year} id={year} walks={groupedWalks[year]} handleDeleteWalk={props.handleDeleteWalk} />)}
        </ul>
      </main>
    );
  } else {
    return (
      <main>
        <p>No walks found.</p>
      </main>
    );
  }
} // Log Component
Log.propTypes = {
  walks: PropTypes.array.isRequired,
  handleDeleteWalk: PropTypes.func.isRequired
}; // Log.propTypes

export default Log;
