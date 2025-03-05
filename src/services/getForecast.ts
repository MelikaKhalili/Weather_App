import axios from "axios";
export const API_KEY = "e7c85220100e98f550fc5d16badc0b88";
const GetForecast = async (lat: number, lon: number) => {
  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  console.log(result.data);
  return result; //=>void❌
};
export default GetForecast;
