import DetailedCard from "./DetailedCard";
import key from "weak-key";
import {
  faMapMarkerAlt,
  faTint,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CityCard = ({ data, detailedForecast }) => {
  const {
    name,
    sys: { country },
    main: { temp, temp_min, humidity },
    weather,
    wind: { speed },
  } = data;

  return (
    <>
      <article
        key={key(data)}
        className={temp >= 18 ? `city-card` : `city-card cold`}
      >
        <header className="city-card__header">
          <h2>
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>{" "}
            {name}{" "}
            <span className="city-card__header--country">({country})</span>
          </h2>
        </header>

        {weather.map(({ icon, description }) => {
          return (
            <div className="city-card__description" key={key(weather)}>
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt="current weather"
              />
              <div className="city-card__description__temps">
                <p>
                  {temp} &#176;<span> / {temp_min}</span>
                </p>
                <p>{description}</p>
              </div>
            </div>
          );
        })}

        <div className="city-card__additional">
          <div className="city-card__additional--wind">
            <FontAwesomeIcon icon={faWind} />
            <p>{speed}km/h</p>
            <p>Wind</p>
          </div>
          <div className="city-card__additional--humidity">
            <FontAwesomeIcon icon={faTint} />
            <p>{humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </article>

      {detailedForecast.map((details) => {
        return <DetailedCard details={details} key={key(details)} />;
      })}
    </>
  );
};

export default CityCard;
