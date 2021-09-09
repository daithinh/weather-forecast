import "./styles/css/style.css";
import { useState } from "react";
import Input from "./components/Input";
import Footer from "./components/presentational/Footer";
import Header from "./components/presentational/Header";
import { useInitialForecast } from "./APIcalls/useInitialForecast";
import { getCityForecast } from "./APIcalls/getCityForecast";
import MainDataContext from "./contexts/MainDataContext";
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
    getDetailedForecast,
  } = useInitialForecast(apiKey);
  const [query, setQuery] = useState(String);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setShowInitial(false);
    getCityForecast(query)
      .then((data) => {
        setSearchData([data]);
        getDetailedForecast(data.coord.lat, data.coord.lon).then(() => {
          setShowInitial(false);
          setIsLoading(false);
        });
      })

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
      <MainDataContext.Provider
        value={{
          isLoading,
          searchData,
          initialForecast,
          showInitial,
          showError,
          detailedForecast,
        }}
      >
        <Main />
      </MainDataContext.Provider>

      <Footer />
    </div>
  );
};

export default App;
