import Results from "./Results";
import Loading from "./presentational/Loading";
import CityCard from "./CityCard";
import key from "weak-key";
import { useContext } from "react";
import MainDataContext from "../contexts/MainDataContext";
const Main = () => {
  const {
    isLoading,
    searchData,
    showError,
    detailedForecast,
    showDetails,
    showInitial,
    initialForecast,
  } = useContext(MainDataContext);
  return (
    <main>
      {!isLoading && (
        <Results
          searchData={searchData}
          showError={showError}
          detailedForecast={detailedForecast}
          showDetails={showDetails}
        />
      )}

      {showInitial ? (
        initialForecast.map((data) => {
          return (
            <CityCard
              data={data}
              showDetails={showDetails}
              detailedForecast={detailedForecast}
              key={key(data)}
            />
          );
        })
      ) : isLoading ? (
        <Loading />
      ) : null}
    </main>
  );
};

export default Main;
