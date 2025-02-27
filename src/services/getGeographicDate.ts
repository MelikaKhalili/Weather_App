import { API_GEOGRAPHIC_COORDINATES } from "@/Constant/Constant";
import axios from "axios";
const GetgeographicDate = async (city: string) => {
  const url = API_GEOGRAPHIC_COORDINATES(city);
  const response = await axios.get(url);
  console.log(response);
  return response.data;
};
export default GetgeographicDate;
