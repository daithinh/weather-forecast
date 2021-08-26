import CityCard from "./CityCard";

const Result = ({
  searchData,
  showError,
  detailedForecast,
  getDetailedForecast,
}) => {
  return (
    <>
      {!showError ? (
        searchData.map((data, index) => {
          return (
            <CityCard
              data={data}
              detailedForecast={detailedForecast}
              getDetailedForecast={getDetailedForecast}
              key={index}
            />
          );
        })
      ) : (
        <h2 className="error">No city found, try another query!</h2>
      )}
    </>
  );
};

export default Result;
