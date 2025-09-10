import React from 'react';
import DefaultHeader from './header/DefaultHeader.js';
import DefaultBottomBar from './bottom/DefaultBottomBar.js';
import classes from "./css/index.module.css";

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <DefaultHeader />
            <main className={classes.bgc}>{children}</main>
            <DefaultBottomBar />
        </div>
    );
};

export default DefaultLayout;
