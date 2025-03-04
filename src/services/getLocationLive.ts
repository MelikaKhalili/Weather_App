import axios from "axios";

export const BASE_URL = "http://ip-api.com/json";

export const GetLocationLive = async () => {
  const result = await axios.get(BASE_URL);
  console.log(result);
  return result;
};
