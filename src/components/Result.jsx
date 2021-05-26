import CityCard from "./CityCard";

const Result = ({
  loading,
  searchData,
  showError,
  detailedForecast,
  getDetailedForecast,
  showDetails,
}) => {
  return (
    <main>
      {showError && (
        <h2 className="error">No city found, try another query!</h2>
      )}
      {loading && !showError
        ? searchData.map((data, index) => {
            return (
              <CityCard
                data={data}
                detailedForecast={detailedForecast}
                getDetailedForecast={getDetailedForecast}
                key={index}
                showDetails={showDetails}
              />
            );
          })
        : ""}
    </main>
  );
};

export default Result;
