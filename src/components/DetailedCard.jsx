import key from "weak-key";

const DetailedCard = ({ details }) => {
  return (
    <div className="details-cards-cont">
      {details
        ? details.daily.map((days, dayOfWeek) => {
            const {
              temp: { min, max },
              weather,
            } = days;
            const newDay = new Date();
            const today = newDay.getDate();
            newDay.setDate(today + dayOfWeek);
            return (
              <article className="details-cards__card" key={key(days.temp)}>
                <div className="details-cards__card--day">
                  <p>
                    {newDay
                      .toLocaleString("en-us", { weekday: "long" })
                      .slice(0, 3)}{" "}
                    {/* <span>({newDay.toLocaleDateString()})</span> */}
                  </p>
                </div>

                {weather.map(({ description, icon }) => {
                  return (
                    <div
                      className="details-cards__card--description"
                      key={key(weather)}
                    >
                      <p>{description}</p>
                      <img
                        src={`http://openweathermap.org/img/wn/${icon}.png`}
                        alt="Current weather"
                      />
                    </div>
                  );
                })}

                <div className="details-cards__card--temps">
                  <p>
                    {min} &#176; <span>/ {max} &#176;</span>
                  </p>
                </div>
              </article>
            );
          })
        : null}
    </div>
  );
};

export default DetailedCard;
