import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import axios from "axios";

import Map from "./components/map/Map";
import Table from "./components/table/Table";
import LineGraph from "./components/graph/LineGraph";
import Header from "./components/header/Header";
import InfoBoxes from "./components/infoBox/InfoBoxes";
import { prettyPrintStat, sortData } from "./util";

import "./App.css";
import "leaflet/dist/leaflet.css";
import Footer from "./components/footer/Footer";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // const [mapCenter, setMapCenter] = useState({ lat: 34.80747, lng: -40.4796 });
  const [mapCenter, setMapCenter] = useState([34.80747, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/countries").then((response) => {
      const data = response.data;
      //country should return an object
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));

      let sortedData = sortData(data);

      setCountries(countries);
      setMapCountries(data);

      //sort the data; the function is pulled from another file called util.js
      setTableData(sortedData);
    });
  }, []);

  //to load data for worldwide on page load
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all").then((response) => {
      const data = response.data;
      setCountryInfo(data);
    });
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    axios.get(url).then((response) => {
      const data = response.data;

      setCountryInfo(data);
      setCountry(countryCode);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };

  return (
    <div className="app__container">
      <div className="app">
        <div className="app__left">
          <Header country={country} countries={countries} onCountryChange={onCountryChange} />
          <InfoBoxes
            casesType={casesType}
            setCasesType={setCasesType}
            prettyPrintStat={prettyPrintStat}
            countryInfo={countryInfo}
          />
          <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType} />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Case by Country</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default App;
