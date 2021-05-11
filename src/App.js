import "./styles/css/style.css";
import { useState, useEffect } from "react";
import Input from "./components/Input";
import Results from "./components/Result";
import DetailedCard from "./components/DetailedCard";
import Footer from "./components/Footer";

function App() {
  // do not steal please, i too suffering
  const apiKey = `2b1dfd97968067e68d497a960d2585ca`;
  // do not steal please, i too suffering
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [detailedForecast, setDetailedForecast] = useState([]);
  const [query, setQuery] = useState("");
  const [coordsValue, setCoordsValue] = useState({
    latitude: "",
    longitude: "",
  });

  const getCityForecast = async (query) => {
    const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
    setShowInitial(false);
    const call = await fetch(cityApi);

    if (!call.ok) {
      const message = `An error has occured: ${call.status}`;
      setShowError(true);
      throw new Error(message);
    }
    const result = await call.json();
    setShowError(false);
    console.log([result]);
    setSearchData([result]);
    setIsLoading(true);
    setShowDetails(false);
    setShowInitial(false);
    setCoordsValue({
      latitude: result.coord.lat,
      longitude: result.coord.lon,
    });
    return [result];
  };

  const getDetailedForecast = async () => {
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordsValue.latitude}&lon=${coordsValue.longitude}&units=metric&appid=${apiKey}`;
    const call = await fetch(api);
    const result = await call.json();
    console.log([result]);
    setDetailedForecast([result]);
    setShowDetails(true);
    return [result];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getCityForecast(query).catch((error) => {
      return console.log(error.message);
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position.coords.latitude + " " + position.coords.longitude);
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const call = await fetch(api);
        const result = await call.json();
        console.log([result]);
        setDetailedForecast([result]);
        setShowInitial(true);
        return [result];
      });
    } else {
      setShowError(true);
      return;
    }
  }, [apiKey]);

  return (
    <div className="App">
      <Input handleSearch={handleSearch} query={query} setQuery={setQuery} />
      <Results
        searchData={searchData}
        loading={loading}
        showError={showError}
        detailedForecast={detailedForecast}
        getDetailedForecast={getDetailedForecast}
        showDetails={showDetails}
      />

      {detailedForecast && showInitial
        ? detailedForecast.map((details) => {
            return <DetailedCard details={details} searchData={searchData} />;
          })
        : ""}

      <Footer />
    </div>
  );
}

export default App;
