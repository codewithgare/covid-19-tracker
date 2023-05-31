import InfoBox from "./InfoBox";
import "./InfoBoxes.css";

const InfoBoxes = ({ casesType, setCasesType, prettyPrintStat, countryInfo }) => {
  return (
    <div className="app__stats">
      <InfoBox
        isRed
        active={casesType === "cases"}
        onClick={(e) => setCasesType("cases")}
        title="Confirmed"
        cases={prettyPrintStat(countryInfo.todayCases)}
        total={prettyPrintStat(countryInfo.cases)}
      />
      <InfoBox
        active={casesType === "recovered"}
        onClick={(e) => setCasesType("recovered")}
        title="Recovered"
        cases={prettyPrintStat(countryInfo.todayRecovered)}
        total={prettyPrintStat(countryInfo.recovered)}
      />
      <InfoBox
        isRed
        active={casesType === "deaths"}
        onClick={(e) => setCasesType("deaths")}
        title="Deaths"
        cases={prettyPrintStat(countryInfo.todayDeaths)}
        total={prettyPrintStat(countryInfo.deaths)}
      />
    </div>
  );
};

export default InfoBoxes;
