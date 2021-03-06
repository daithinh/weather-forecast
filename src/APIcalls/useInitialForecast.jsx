import { useState, useEffect } from "react";

export const useInitialForecast = (apiKey) => {
  const [initialForecast, setInitialForecast] = useState(Array);
  const [showInitial, setShowInitial] = useState(Boolean);
  const [coordsValue, setCoordsValue] = useState({
    latitude: String,
    longitude: String,
  });
  const [isLoading, setIsLoading] = useState(Boolean);
  const [detailedForecast, setDetailedForecast] = useState(Array);

  const getDetailedForecast = async (latitude, longitude) => {
    const apiDetail = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const callDetail = await fetch(apiDetail);
    const resultDetail = await callDetail.json();
    setDetailedForecast([resultDetail]);
    return [resultDetail];
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setIsLoading(true);
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
        const call = await fetch(api);
        const result = await call.json();
        setCoordsValue({
          latitude: result.coord.lat,
          longitude: result.coord.lon,
        });

        const detailsCall = async () => {
          const details = [result].map(
            async (coords) =>
              await (
                await fetch(
                  `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.coord.lat}&lon=${coords.coord.lon}&units=metric&appid=${apiKey}`
                )
              ).json()
          );

          return Promise.all(details);
        };

        setInitialForecast([result]);
        setShowInitial(true);
        setIsLoading(false);
        detailsCall().then((data) => {
          setDetailedForecast(data);
        });
      });
    }
  }, [apiKey]);

  return {
    initialForecast,
    coordsValue,
    setCoordsValue,
    setShowInitial,
    showInitial,
    isLoading,
    setIsLoading,
    detailedForecast,
    getDetailedForecast,
  };
};
