import DetailedCard from "./DetailedCard";

const CityCard = ({
  data,
  detailedForecast,
  getDetailedForecast,
  showDetails,
}) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, temp_min, temp_max },
    weather,
  } = data;

  return (
    <>
      <article className="city-card">
        <header className="city-card__header">
          <p>
            {name} ({country})
          </p>
        </header>
        <div className="city-card__temps">
          <p>
            <span>Current:</span> {temp}&#8451;
          </p>
          <p>
            <span>Real feel:</span> {feels_like}&#8451;
          </p>
          <p>
            <span>Min:</span> {temp_min}&#8451; / <span>Max:</span> {temp_max}
            &#8451;
          </p>
        </div>
        <div className="city-card__description">
          {weather.map(({ icon, description }) => {
            return (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt="current weather"
                />
                <p>{description}</p>
              </>
            );
          })}
        </div>

        <button className="get-detailed-forecast" onClick={getDetailedForecast}>
          7 days forecast
        </button>
      </article>

      {detailedForecast && showDetails
        ? detailedForecast.map((details) => {
            return <DetailedCard details={details} />;
          })
        : ""}
    </>
  );
};

export default CityCard;
