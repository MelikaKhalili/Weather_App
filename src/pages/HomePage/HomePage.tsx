import GetgeographicDate from "@/services/getGeographicDate";
import { GetweatherData } from "@/services/getWeatherData";
import { useEffect, useState } from "react";
import "./HomePage.css";

export default function home() {
  const [cityName, setCityName] = useState<string>(""); //یک جایی باید باشه برای ذخیره نام شهر وارد شده
  const [weatherData, setWeatherData] = useState<any>(null); // برای ذخیره اطلاعات هر شهر
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const handelSearch = async () => {
    if (cityName.trim()) {
      const getGeographicDate = await GetgeographicDate(cityName);
      if (getGeographicDate && getGeographicDate.length > 0) {
        const { lat, lon } = getGeographicDate[0];
        setLat(lat);
        setLon(lon);
        const weather = await GetweatherData(lat, lon);
        console.log(weather);
      }
    }
  };
  useEffect(() => {
    console.log(lat, lon);
    if (lat && lon) {
      GetweatherData(lat, lon).then((weather) => {
        setWeatherData(weather);
        console.log(weather);
      });
    }
  }, [lat, lon]);

  return (
    <div className="bg-slate-600 w-screen h-screen">
      <input
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        type="text"
        placeholder="Enter Your city"
      />
      <button onClick={handelSearch}>Search</button>
      {weatherData && (
        <div className="bg-red-600 w-96 h-32 absolute z-40">
          <h1>{weatherData?.main?.feels_like}</h1>
        </div>
      )}
    </div>
  );
}
