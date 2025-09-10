import React from 'react';
import Header from './header/Header.js';
import BottomBar from './bottom/BottomBar.js';
import classes from "./css/index.module.css";
import Footer from './bottom/Footer.js';

const SpecialLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className={classes.bgc}>{children}</main>
            <BottomBar />
            <Footer />
        </div>
    );
};

export default SpecialLayout;
