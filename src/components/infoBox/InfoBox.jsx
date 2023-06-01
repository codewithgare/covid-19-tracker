import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./InfoBox.css";

const InfoBox = ({ title, cases, total, active, isRed, isOrange, isGreen, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${
        isOrange && "infoBox--orange"
      } `}
    >
      <CardContent className="infoBox__cardContent">
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${isRed && "infoBox__cases--red"} ${
            isOrange && "infoBox__cases--orange"
          } ${isGreen && "infoBox__cases--green"}`}
        >
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
