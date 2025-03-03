import GetgeographicDate from "@/services/getGeographicDate";
import { GetweatherData } from "@/services/getWeatherData";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Animation_WindSpeed from "../../assets/gifts/Animation_WindSpeed.gif";
import Humodity from "../../assets/images/Humodity.png";
import sunset from "../../assets/images/sunest.png";
import sunrise from "../../assets/images/sunrise.png";
import "./HomePage.css";

function getTimeInfo(offsetInSeconds: number) {
  const offsetInMinutes = offsetInSeconds / 60;
  const offsetInHours = offsetInMinutes / 60;

  const timeZones = {
    "3.5": { continent: "Asia", city: "Tehran" },
  };

  const key = offsetInHours.toString();
  const timeZoneInfo = timeZones[key] || {
    continent: "Unknown",
    city: "Unknown",
  };

  const now = new Date();
  const localTime = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours() + offsetInHours,
    now.getUTCMinutes()
  );

  return {
    continent: timeZoneInfo.continent,
    city: timeZoneInfo.city,
    localTime: localTime.toLocaleTimeString(),
  };
}

export default function home() {
  const navigate = useNavigate();
  const handelBackLoginpage = () => {
    navigate("/");
  };
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [timezoneInfo, setTimezoneInfo] = useState<any>(null);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handelSearch = async () => {
    if (cityName.trim()) {
      const getGeographicDate = await GetgeographicDate(cityName);
      if (getGeographicDate && getGeographicDate.length > 0) {
        const { lat, lon } = getGeographicDate[0];
        setLat(lat);
        setLon(lon);
        const weather = await GetweatherData(lat, lon);
        setWeatherData(weather);
      }
    }
  };

  useEffect(() => {
    if (lat && lon) {
      GetweatherData(lat, lon).then((weather) => {
        setWeatherData(weather);
        const timezoneOffset = weather.timezone;
        const timeInfo = getTimeInfo(timezoneOffset);
        setTimezoneInfo(timeInfo);
      });
    }
  }, [lat, lon]);

  return (
    <div className="BackGroundHome">
      <div className="weather-container">
        <div className="flex justify-center items-center gap-6">
          <Input
            className="pl-10 text-white"
            style={{ border: "1px solid white" }}
            bg={"#8d939f"}
            sx={{ border: "none", borderRadius: "10px" }}
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            placeholder="Choose your desired city"
            _placeholder={{ color: "white", fontSize: "14px" }}
          />
          <div>
            <button
              style={{ border: "1px solid white" }}
              className="button relative flex items-center px-6 py-1"
              onClick={handelSearch}
            >
              <ImSearch className="text-white w-4 mr-2" />
              Search
            </button>
          </div>
        </div>
        <hr className="mt-6" />
        {weatherData && timezoneInfo && (
          <div className="flex flex-col items-center justify-center parent gap-12 mt-12">
            <span>
              <span className="font-bold text-5xl">
                {(weatherData.main.temp - 273.15).toFixed(2)}
              </span>
              <span className="text-black">°C</span>
            </span>
            <div className="flex justify-around w-full">
              {/* حداکثر دما */}
              <div className="flex justify-center items-center gap-4">
                <FaTemperatureArrowUp className="text-red-700" />
                <span className="text-xl">
                  {(weatherData.main.temp_max - 273.15).toFixed(2)}°
                </span>
              </div>
              {/* حداقل دما */}
              <div className="flex justify-center items-center gap-2">
                <FaTemperatureArrowDown className="text-blue-500" />
                <span className="text-xl">
                  {(weatherData.main.temp_min - 273.15).toFixed(2)}°
                </span>
              </div>
            </div>
            <div className="flex justify-around w-full">
              {/* رطوبت و سرعت باد */}
              <div className="flex justify-around items-center w-full">
                <div className="flex justify-center items-center gap-4">
                  <div>
                    <img className="w-12" src={Humodity} alt="Humodity" />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-xl">
                      {weatherData.main.humidity}%
                    </span>
                    <span>Humodity</span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 ">
                  <div>
                    <img src={Animation_WindSpeed} alt="Animation_WindSpeed" />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-xl"> {weatherData.wind.speed}</span>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </div>
            {/* طلوع و غروب آفتاب */}
            <div className="flex justify-around w-full">
              {/* طلوع */}
              <div className="flex flex-col">
                <div className="flex justify-center items-center gap-2">
                  <span>Sunrise</span>
                  <img className="w-6" src={sunrise} alt="sunrise" />
                </div>
                <span>{formatTime(weatherData.sys.sunrise)} Am</span>
              </div>
              {/* غروب */}
              <div className="flex flex-col">
                <div className="flex justify-center items-center gap-2">
                  <span>Sunset</span>
                  <img className="w-6" src={sunset} alt="sunset" />
                </div>
                <span>{formatTime(weatherData.sys.sunset)} Pm</span>
              </div>
            </div>

            {/* ساعت محلی*/}
            <div className="flex justify-center items-center flex-col">
              <div>
                {" "}
                <p>TimaZone</p>
              </div>
              <div>
                <p>
                  {timezoneInfo.continent}/{timezoneInfo.city}
                  {timezoneInfo.localTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start absolute top-24 right-[35%]">
        <h1 className="text-white text-6xl font-bold">
          {weatherData?.weather?.[0]?.main}
        </h1>
        <p className="text-white">{weatherData?.weather?.[0]?.description}</p>
        <img src={weatherData?.weather?.[0]?.icon} alt="" />
      </div>
      <button
        onClick={handelBackLoginpage}
        className="Btn absolute top-6 right-8"
      >
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>
        <div className="text">Logout</div>
      </button>
    </div>
  );
}
