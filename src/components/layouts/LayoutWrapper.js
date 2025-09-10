'use client';
import React from "react";
import { useParams } from "next/navigation";
import configData from "../../data/config.json";
import DefaultLayout from "./DefaultLayout/DefaultLayout.js";
import SpecialLayout from "./SpecialLayout/SpecialLayout.js";
import BasicLayout from "./BasicLayout/BasicLayout.js";

const LayoutWrapper = ({ children }) => {
  const params = useParams();
  const hotelInUrl = params.hotel;
  const currentData = configData[hotelInUrl];

  let LayoutComponent;

  switch (currentData?.layout) {
    case "special":
      LayoutComponent = SpecialLayout;
      break;
    case "basic":
      LayoutComponent = BasicLayout;
      break;
    default:
      LayoutComponent = DefaultLayout;
  }

  if (!currentData) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default LayoutWrapper;
