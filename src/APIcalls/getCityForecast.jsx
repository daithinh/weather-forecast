export const getCityForecast = async (query) => {
  const apiKey = `2b1dfd97968067e68d497a960d2585ca`;
  const cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  const call = await fetch(cityApi);
  if (!call.ok) {
    const message = `An error has occured: ${call.status}`;
    throw new Error(message);
  }
  const result = await call.json();

  return result;
};
