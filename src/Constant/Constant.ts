export const API_KEY = "e7c85220100e98f550fc5d16badc0b88"; //API_KEY من هستش
export const API_GEOGRAPHIC_COORDINATES = (city: string) => {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
}; //دریافت Lat , Longهر شهر

export const API_WEATHER_CONDITIONS = (lat: number, lon: number) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
}; //دریافت اطلاعات با استفاده از Lat , Long
