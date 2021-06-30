import "./styles/css/style.css";
import { useState } from "react";
import Input from "./components/Input";
import Results from "./components/Result";
import Footer from "./components/presentational/Footer";
import Header from "./components/presentational/Header";
import CityCard from "./components/CityCard";
import key from "weak-key";
import { useInitialForecast } from "./APIcalls/useInitialForecast";

function App() {
  const apiKey = `2b1dfd97968067e68d497a960d2585ca`;
  const [showDetails, setShowDetails] = useState(Boolean);
  const [showError, setShowError] = useState(Boolean);
  const [searchData, setSearchData] = useState(Array);
  const [detailedForecast, setDetailedForecast] = useState(Array);
  const {
    initialForecast,
    coordsValue,
    setCoordsValue,
    setShowInitial,
    showInitial,
  } = useInitialForecast();
  const [query, setQuery] = useState(String);

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
          initialForecast.map((data) => {
            console.log(data);

            return (
              <CityCard
                data={data}
                showDetails={showDetails}
                detailedForecast={detailedForecast}
                getDetailedForecast={getDetailedForecast}
                key={key(data)}
              />
            );
          })}
      </main>
      <Footer />
    </div>
  );
}

export default App;
