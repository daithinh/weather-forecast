import DetailedCard from "./DetailedCard";
import key from "weak-key";
import {
  faMapMarkerAlt,
  faTint,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const CityCard = ({ data, detailedForecast }) => {
  const {
    name,
    sys: { country },
    main: { temp, temp_min, humidity },
    weather,
    wind: { speed },
    visibility,
  } = data;

  return (
    <>
      <article key={key(data)}>
        <div className={temp >= 18 ? `city-card warm` : `city-card cold`}>
          <h2>
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>{" "}
            {name}{" "}
            <span className="city-card__header--country">({country})</span>
          </h2>

          {weather.map(({ icon, description }) => {
            return (
              <div className="city-card__description" key={key(weather)}>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt="current weather"
                />
                <div className="city-card__description__temps">
                  <p>
                    {temp} &#176;<span> / {temp_min}&#176;</span>
                  </p>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="city-card__additional-wrapper-paint">
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

            <div className="city-card__additional--visibility">
              <FontAwesomeIcon icon={faEye} />
              <p>{visibility}m</p>
              <p>Visibility</p>
            </div>
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
