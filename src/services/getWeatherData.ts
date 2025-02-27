import { API_WEATHER_CONDITIONS } from "@/Constant/Constant";
import axios from "axios";
export const GetweatherData = async (lat: number, long: number) => {
  const url = API_WEATHER_CONDITIONS(lat, long);
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};
