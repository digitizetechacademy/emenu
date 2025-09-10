'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import configData from "../../data/config.json";
import Button from "@mui/material/Button";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const TypeSelecter = () => {
  const params = useParams();
  const hotelInUrl = params.hotel;
  const currentData = configData[hotelInUrl];
  const [storedMenuType, setStoredMenuType] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        setStoredMenuType(sessionStorage.getItem("menuType"))
    }
  }, []);
  
  const [selectedMenu, setSelectedMenu] = useState(storedMenuType || null);

  useEffect(() => {
    if (selectedMenu) {
      sessionStorage.setItem("menuType", selectedMenu);
    }
  }, [selectedMenu]);
  
  const handleMenuSelect = (menuType) => {
    setSelectedMenu(menuType);
  };
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    border: "2px solid #e2e2e266",
    borderRadius: "4px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "6px 8px",
  };

  if(!currentData) {
    return null;
  }

  return (
    <>
      {currentData.menuType === "veg" ? (
        <div style={containerStyle}>
          <RadioButtonCheckedIcon
            style={{ color: "green", marginRight: "5px" }}
          />
          <span>Pure Veg</span>
        </div>
      ) : currentData.menuType === "non-veg" ? (
        <div style={containerStyle}>
          <RadioButtonCheckedIcon
            style={{ color: "red", marginRight: "5px" }}
          />
          <span>Non-Veg</span>
        </div>
      ) : (
        <div
          style={{
            padding: "2px 4px",
            border: "2px solid #e2e2e266",
            borderRadius: "4px",
            backgroundColor: "rgb(226 226 226 / 26%)",
          }}
        >
          <Button
            variant="contained"
            color={selectedMenu === "veg" ? "success" : "default"}
            style={{
              margin: "3px",
              fontWeight: 500,
              padding: "2px 6px",
              fontSize: "14px",
            }}
            onClick={() => handleMenuSelect("veg")}
          >
            Veg
          </Button>
          <Button
            variant="contained"
            color={selectedMenu === "non-veg" ? "error" : "default"}
            style={{
              margin: "3px",
              fontWeight: 500,
              padding: "2px 6px",
            }}
            onClick={() => handleMenuSelect("non-veg")}
          >
            Non-Veg
          </Button>
        </div>
      )}
    </>
  );
};

export default TypeSelecter;
