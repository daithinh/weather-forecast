import Results from "./Results";
import Loading from "./presentational/Loading";
import CityCard from "./CityCard";
import key from "weak-key";
import { useContext } from "react";
import MainDataContext from "../contexts/MainDataContext";
const Main = () => {
  const { isLoading, showInitial, initialForecast } =
    useContext(MainDataContext);
  return (
    <main>
      {showInitial && !isLoading ? (
        initialForecast.map((data) => {
          return <CityCard data={data} key={key(data)} />;
        })
      ) : isLoading ? (
        <Loading />
      ) : (
        <Results />
      )}
    </main>
  );
};

export default Main;
