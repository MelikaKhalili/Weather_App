import GetForecast from "@/services/getForecast";
import GetgeographicDate from "@/services/getGeographicDate";
import { GetLocationLive } from "@/services/getLocationLive";
import { GetweatherData } from "@/services/getWeatherData";
import { Input } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaLocationCrosshairs,
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
} from "react-icons/fa6";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Animation_WindSpeed from "../../assets/gifts/Animation_WindSpeed.gif";
import Humodity from "../../assets/images/Humodity.png";
import speedDirections from "../../assets/images/speedDirections.png";
import sunset from "../../assets/images/sunest.png";
import sunrise from "../../assets/images/sunrise.png";
import Bahar from "../../assets/Temperaturephotos/Bahar.jpg";
import Norm from "../../assets/Temperaturephotos/Norm.jpg";
import Paez from "../../assets/Temperaturephotos/Paez.jpg";
import Tabestan from "../../assets/Temperaturephotos/Tabestan.jpg";
import Zemestan from "../../assets/Temperaturephotos/Zemestan.svg";
import "../../i18n/i18n";
import i18n from "../../i18n/i18n";
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
  const [isData, setIsDta] = useState(false);
  const [showFavorite, setShowFavorite] = useState<any[]>([]);
  const [locationusers, setLocationUsers] = useState<any>(null);
  const [isLocationButtonDisabled, setIsLocationButtonDisabled] =
    useState(false);
  const [forecast, setForecast] = useState<any>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [closeModal, setCloseModal] = useState(false);
  const [openModalHourlyforecast, setOpenModalHourlyforecast] = useState(false);
  const [BackGroundImage, setBackGroundImage] = useState<string>("");
  const getBackGroundImage = (temp: number) => {
    if (temp > 15) {
      return Tabestan;
    } else if (temp <= 30 && temp > 20) {
      return Bahar;
    } else if (temp <= 20 && temp > 10) {
      return Paez;
    } else if (temp <= 10 && temp > 0) {
      return Zemestan;
    } else {
      return Norm;
    }
  };
  useEffect(() => {
    const temp = weatherData?.main?.temp - 273.15;
    setBackGroundImage(getBackGroundImage(temp));
  }, [weatherData]); //==>یعنی خب هر موقع اطلاعات اب و هوایی تغییر کرد بک گراند عوض بشه
  const handelCloseModal = () => {
    setCloseModal(true);
  };
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handelSearch = async () => {
    setIsDta(true);
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
    setCityName("");
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
  useEffect(() => {
    GetLocationLive()
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  }, []);
  const handelLocationLiveUsers = () => {
    if (isLocationButtonDisabled) return;
    GetLocationLive()
      .then((res) => {
        const { lat, lon } = res.data;
        setLat(lat);
        setLon(lon);
        GetweatherData(lat, lon).then((weather) => {
          setWeatherData(weather);
          const timezoneOffset = weather.timezone;
          const timeInfo = getTimeInfo(timezoneOffset);
          setTimezoneInfo(timeInfo);
        });
        setLocationUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
    setIsLocationButtonDisabled(true);
  };
  const handelFavorite = () => {
    if (
      weatherData &&
      !showFavorite.some((item) => item.id === weatherData.id)
    ) {
      setShowFavorite([...showFavorite, weatherData]);
    }
  };
  const handelDeleteFavorite = (id: number) => {
    setShowFavorite(showFavorite.filter((item) => item.id !== id));
  };
  useEffect(() => {
    const fetchForcest = async () => {
      if (lat && lon) {
        try {
          const response = await GetForecast(lat, lon);
          console.log(response.data);
          setForecast(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchForcest();
  }, [lat, lon]);
  const handelShowMoreDetails = () => {
    if (forecast) {
      setShowDetails(true);
    } else {
      console.log("There is no prediction");
    }
    setCloseModal(false);
  };
  const handelHourlyforecast = () => {
    setOpenModalHourlyforecast(true);
    console.log("Hello Melika");
  };
  console.log(forecast);
  const { t, i18 } = useTranslation();
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    i18n.changeLanguage(currentLang === "fa" ? "en" : "fa");
  };

  return (
    <div
      className="BackGroundHome"
      style={{
        backgroundImage: `url(${BackGroundImage})`,
        borderRight: "10px solid white",
      }}
    >
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
      {isData && (
        <div
          className="flex gap-8 flex-col justify-center items-start absolute top-48
        right-[30%]"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-6xl font-bold">
              {weatherData?.weather?.[0]?.main}
            </h1>
            <p className="text-white text-xl">
              {weatherData?.weather?.[0]?.description}
            </p>
            <img
              className="w-16"
              src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
              alt={weatherData?.weather?.[0]?.description}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-6">
              <button onClick={handelShowMoreDetails} className="btn-1">
                {t("Buttontextone")}
              </button>
              <button onClick={handelFavorite} className="btn-2">
                {t("ButtontextTwo")}
              </button>
            </div>
            <button
              onClick={handelHourlyforecast}
              className="btn-3 justify-self-center"
            >
              {t("Buttontextthree")}
            </button>
          </div>
        </div>
      )}
      {showFavorite && (
        <div className="absolute top-1/4 right-8">
          {showFavorite.map((item) => (
            <div className="bg-slate-950 backdrop-blur-2xl px-8 rounded-xl mb-8">
              <div
                key={item.id}
                className="flex gap-2  text-white justify-center items-center"
              >
                <span>{item.name}</span>
                <span>{(item.main.temp - 273.15).toFixed(2)}°</span>
                <img
                  className="w-12"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Icon_Weather"
                />
                <button onClick={() => handelDeleteFavorite(item.id)}>
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
      <button
        onClick={handelLocationLiveUsers}
        className={`cursor-pointer bg-white/60 absolute bottom-10 left-[620px]   rounded-[20px] flex justify-center items-center gap-4 py-1 px-2 ${
          isLocationButtonDisabled ? " opacity-25 cursor-not-allowed" : ""
        }`}
      >
        <span> Current Location</span>
        <FaLocationCrosshairs className="text-3xl text-gray-900" />
      </button>
      <div className="absolute top-24 right-6">
        <button
          className="bg-white/60  rounded-full w-14 h-14 font-bold text-[12px]"
          onClick={toggleLanguage}
        >
          {i18n.language === "fa" ? "Change Englisch" : "تغییر به فارسی"}
        </button>
      </div>
      {showDetails && forecast && !closeModal && (
        <div
          onClick={handelCloseModal}
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
        >
          <div className="bg-white/45 backdrop-blur-md shadow-lg w-[600px]  rounded-xl border-solid border-4 border-white/100 ">
            {forecast.list.slice(0, 5).map((item: any, index: any) => {
              const icon = item?.weather?.[0]?.icon;
              const data = new Date(item.dt * 1000);
              const day = data.toLocaleDateString("en-US", {
                weekday: "long",
              });
              const Month = data.toLocaleDateString("en-US", {
                month: "long",
              });
              return (
                <div key={index}>
                  <div className="grid grid-cols-3 justify-center items-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={`http://openweathermap.org/img/wn/${icon}.png`}
                        alt=""
                      />
                      <p>{item.main.temp.toFixed(1)}°</p>
                    </div>
                    <div>
                      <p>{day}</p>
                    </div>
                    <div>
                      <p>{Month}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {openModalHourlyforecast && (
        <div
          onClick={() => setOpenModalHourlyforecast(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md "
        >
          <div className="bg-white/45 backdrop-blur-md shadow-lg w-[95%] rounded-xl border-solid border-4 border-white/100 ">
            <div className="p-6">
              <div className="weather-grid">
                {forecast.list.slice(0, 8).map((item: any, index: any) => {
                  const icon = item?.weather?.[0]?.icon;
                  const deg = item?.wind?.deg;
                  const dt_text = item?.dt_txt;
                  const temp = item?.main?.temp;
                  console.log(temp);
                  console.log(dt_text);
                  const data = moment(dt_text, "YYYY-MM-DD HH:mm:ss");
                  console.log(data);
                  data.minutes(Math.floor(data.minutes() / 3) * 3);
                  const formattedTime = data.format("h:mm A"); //=>Am/Pm
                  console.log(formattedTime);
                  return (
                    <div key={index} className="flex flex-col gap-10">
                      <div className="icon-item bg-slate-500   rounded-xl shadow-md flex justify-center items-center flex-col px-6 py-4">
                        <img
                          src={`http://openweathermap.org/img/wn/${icon}.png`}
                          alt="Icon_weatherData"
                          className="w-16 h-16"
                        />
                        <p>{formattedTime}</p>
                        <p>{temp.toFixed(1)}°</p>
                      </div>
                      <div className="direction-item bg-slate-500  rounded-xl shadow-xl px-6 py-4">
                        <p>{formattedTime}</p>
                        <div
                          style={{
                            transform: `rotate(${deg}deg)`,
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <img
                            className="w-8 h-8"
                            src={speedDirections}
                            alt="Wind Direction"
                          />
                        </div>
                        <p>{temp.toFixed(1)}°</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
