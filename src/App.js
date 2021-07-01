import "./styles/css/style.css";
import { useState } from "react";
import Input from "./components/Input";
import Footer from "./components/presentational/Footer";
import Header from "./components/presentational/Header";
import { useInitialForecast } from "./APIcalls/useInitialForecast";
import { getCityForecast } from "./APIcalls/getCityForecast";

import Main from "./components/Main";
const App = () => {
  const [showError, setShowError] = useState(Boolean);
  const [searchData, setSearchData] = useState(Array);
  const apiKey = `2b1dfd97968067e68d497a960d2585ca`;
  const {
    initialForecast,
    setShowInitial,
    showInitial,
    isLoading,
    setIsLoading,
    detailedForecast,
    setDetailedForecast,
  } = useInitialForecast();
  const [query, setQuery] = useState(String);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setShowInitial(false);
    getCityForecast(query)
      // ugly solution here, will refactor
      .then((data) => {
        setSearchData([data]);

        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${apiKey}`
        )
          .then((data) => data.json())
          .then((data) => {
            setDetailedForecast([data]);
            setShowInitial(false);
            setIsLoading(false);
          });
      })
      // ugly solution here, will refactor

      .catch((error) => {
        console.log(error.message);
        setShowInitial(false);
        setIsLoading(false);
        setShowError(true);
      });
  };

  return (
    <div className="App">
      <Header />
      <Input handleSearch={handleSearch} query={query} setQuery={setQuery} />
      <Main
        isLoading={isLoading}
        searchData={searchData}
        initialForecast={initialForecast}
        showInitial={showInitial}
        showError={showError}
        detailedForecast={detailedForecast}
      />
      <Footer />
    </div>
  );
};

export default App;
