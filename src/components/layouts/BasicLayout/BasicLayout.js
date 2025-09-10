import React from "react";
import Header from "./header/Header.js";
import BottomBar from "./bottom/BottomBar.js";
import classes from "./css/index.module.css";

const BasicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={classes.bgc}>{children}</main>
      <BottomBar />
    </div>
  );
};

export default BasicLayout;
