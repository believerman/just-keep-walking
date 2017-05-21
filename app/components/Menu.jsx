import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import "./Menu.scss"

const Menu = () => {
  return (
    <nav id="menu">
      <NavLink to={"/"} exact onClick={e => {
          if (window.swUpdate) {
            e.preventDefault();
            console.log("update");
            window.location.reload();
          }
        }}><span>Home</span></NavLink>
      <NavLink to={"/log"} exact><span>Log</span></NavLink>
    </nav>
  );
} // Menu Component

export default Menu;
