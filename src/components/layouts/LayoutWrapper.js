'use client';
import React from "react";
import Header from "../layout/Header";
import HeaderCartButton from "../layout/HeaderCartButton";

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pb-24">{children}</main>
      <HeaderCartButton />
    </>
  );
};

export default LayoutWrapper;
