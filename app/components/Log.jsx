import _ from "lodash";
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
        {props.walks.reverse().map(walk => <LogItem key={walk.id} {...walk} />)}
      </ul>
    </li>
  );
}; // LogDate Component
LogDate.propTypes = {
  id: PropTypes.string.isRequired,
  walks: PropTypes.array.isRequired
}; // LogDate.propTypes

const LogMonth = props => {
  let monthName = moment().month(props.id - 1).format("MMMM");

  return (
    <li>
      <h3>{monthName}</h3>
      <ul>
        {_.toPairs(props.walks).reverse().map(date => <LogDate key={date[0]} id={date[0]} walks={date[1]} />)}
      </ul>
    </li>
  );
}; // LogMonth Component
LogMonth.propTypes = {
  id: PropTypes.string.isRequired,
  walks: PropTypes.object.isRequired
}; // LogMonth.propTypes

const LogYear = props => {
  return (
    <li>
      <h2>{props.id}</h2>
      <ul>
        {_.toPairs(props.walks).reverse().map(month => <LogMonth key={month[0]} id={month[0]} walks={month[1]} />)}
      </ul>
    </li>
  );
}; // LogYear Component
LogYear.propTypes = {
  id: PropTypes.string.isRequired,
  walks: PropTypes.object.isRequired
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

    return (
      <main id="log">
        <ul>
          {_.toPairs(groupedWalks).reverse().map(year => <LogYear key={year[0]} id={year[0]} walks={year[1]} />)}
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
  walks: PropTypes.array.isRequired
}; // Log.propTypes

export default Log;
