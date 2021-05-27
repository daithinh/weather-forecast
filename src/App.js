import "./styles/css/style.css";
import { useState, useEffect } from "react";
import Input from "./components/Input";
import Results from "./components/Result";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CityCard from "./components/CityCard";

function App() {
  // do not steal please, i too suffering
  const apiKey = `2b1dfd97968067e68d497a960d2585ca`;
  // do not steal please, i too suffering
  const [showDetails, setShowDetails] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [detailedForecast, setDetailedForecast] = useState([]);
  const [initialForecast, setInitialForecast] = useState([]);
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
    setSearchData([result]);

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
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const call = await fetch(api);
        const result = await call.json();
        setCoordsValue({
          latitude: result.coord.lat,
          longitude: result.coord.lon,
        });

        setInitialForecast([result]);
        setShowInitial(true);
        return [result];
      });
    }

    return;
  }, [apiKey]);

  return (
    <div className="App">
      <div className="app-header">
        <Header />
        <Input handleSearch={handleSearch} query={query} setQuery={setQuery} />
      </div>
      <main>
        <Results
          searchData={searchData}
          showError={showError}
          detailedForecast={detailedForecast}
          getDetailedForecast={getDetailedForecast}
          showDetails={showDetails}
        />

        {showInitial &&
          initialForecast.map((data, index) => {
            return (
              <CityCard
                data={data}
                showDetails={showDetails}
                detailedForecast={detailedForecast}
                getDetailedForecast={getDetailedForecast}
                key={index}
              />
            );
          })}
      </main>
      <Footer />
    </div>
  );
}

export default App;
