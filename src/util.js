//
// We import react beacase we want to include some JSX
import React, { useEffect, useRef } from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  //or

  //   sortedData.sort((a, b) => {
  //     if (a.cases > b.cases) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   });
  // return sortedData
};

export const casesTypeColors = {
  cases: {
    hex: "#ff5714",
    rgb: "rgb(255, 87, 20)",
    half_op: "rgba(255, 87, 20, 0.5)",
    multiplier: 80,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 120,
  },
  deaths: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 200,
  },
};

//DRAW circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") => {
  //const to hold the pathOptions styles
  const pathOptions = {
    color: `${casesTypeColors[casesType].hex}`,
    fillColor: `${casesTypeColors[casesType].hex}`,
  };

  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={pathOptions}
      fillOpacity={0.4}
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));
};
export const prettyPrintStat = (stat) => (stat ? `+${numeral(stat).format("0.0a")}` : "0");
