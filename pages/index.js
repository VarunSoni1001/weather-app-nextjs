import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const WeatherDataPoint = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b">
    <p className="text-sm md:text-base lg:text-lg font-semibold">{label}:</p>
    {typeof value === "object" ? (
      <div className="flex items-center">
        <img src={value.icon} alt={value.text} className="w-8 h-8" />
        <span className="ml-2 text-sm md:text-base lg:text-lg">
          {value.text}
        </span>
      </div>
    ) : label === "Daytime" ? (
      <p className="text-sm md:text-base lg:text-lg">{value ? "Yes" : "No"}</p>
    ) : (
      <p className="text-sm md:text-base lg:text-lg">{value}</p>
    )}
  </div>
);

export default function Home() {
  const [weather, setWeather] = useState("");
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === "") {
      setWeather("");
    }
  }, [query]);

  const fetchWeather = async (query) => {
    try {

      if(query.length === 0) return toast.error("Please enter your city/state.");

      setIsLoading(true);
      const response = await fetch(`/api/weather?query=${query}`);
      const data = await response.json();
      setIsLoading(false);
      if (data.error) {
        toast.error(data.error.message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsLoading(false);
      return null;
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    let wthr = await fetchWeather(query);
    setWeather(wthr);
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg m-10">
          <div className="flex items-center justify-center text-center">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
              Type the location to find the weather
            </h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFetchWeather();
            }}
          >
            <div className="mt-2 relative">
              <input
                className="w-full py-2 px-4 border rounded-3xl shadow-sm focus:outline-none text-sm md:text-base"
                value={query}
                onChange={handleChange}
                type="text"
                name="search"
                id="search"
                placeholder="Enter location"
              />
              {query && (
                <button
                  className="absolute top-0 right-0 h-full px-4 py-1 text-blue-600"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 15.59L15.17 17 12 13.83 8.83 17 7.41 15.59 10.58 12 7.41 8.83 8.83 7.41 12 10.58 15.17 7 16.59 8.41 13.42 12l3.17 3.17z" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center mt-3 justify-center">
              <button
                className={`flex justify-between items-center mt-2 px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base ${isLoading ? 'disabled:bg-blue-50 disabled:hover:bg-blue-50 disabled:text-black disabled:cursor-not-allowed' : ''}`}
                disabled={isLoading}
                onClick={handleFetchWeather}
                type="submit"
              >
                {isLoading && (
            <img className="w-6 h-6" src="loader.svg" alt="Loader"/>
            )}
                <span>Search</span>
              </button>
            </div>
          </form>
          {!isLoading && weather &&
            weather.current &&
            Object.keys(weather.current).length !== 0 && (
              <div className="text-center mt-4">
                <p className="text-base md:text-lg font-semibold">
                  Current Weather in {weather.location.name},{" "}
                  {weather.location.region}, {weather.location.country}:
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={weather.current.condition.icon}
                      alt={weather.current.condition.text}
                      className="w-12 h-12 mr-1"
                    />
                    <span className="ml-1">
                      {weather.current.condition.text}
                    </span>
                  </div>
                  <WeatherDataPoint
                    label="Temperature"
                    value={`${weather.current.temp_c}° C / ${weather.current.temp_f}° F`}
                  />
                  <WeatherDataPoint
                    label="Daytime"
                    value={weather.current.is_day}
                  />
                  <WeatherDataPoint
                    label="Wind Speed"
                    value={`${weather.current.wind_mph} mph / ${weather.current.wind_kph} kmph`}
                  />
                  <WeatherDataPoint
                    label="Wind Degree"
                    value={`${weather.current.wind_degree}°`}
                  />
                  <WeatherDataPoint
                    label="Wind Direction"
                    value={weather.current.wind_dir}
                  />
                  <WeatherDataPoint
                    label="Pressure"
                    value={`${weather.current.pressure_mb} mb / ${weather.current.pressure_in} in`}
                  />
                  <WeatherDataPoint
                    label="Precipitation"
                    value={`${weather.current.precip_mm} mm / ${weather.current.precip_in} in`}
                  />
                  <WeatherDataPoint
                    label="Humidity"
                    value={`${weather.current.humidity} %`}
                  />
                  <WeatherDataPoint
                    label="Cloud Cover"
                    value={`${weather.current.cloud} %`}
                  />
                  <WeatherDataPoint
                    label="Feels Like"
                    value={`${weather.current.feelslike_c}° C / ${weather.current.feelslike_f}° F`}
                  />
                  <WeatherDataPoint
                    label="Visibility"
                    value={`${weather.current.vis_km} km / ${weather.current.vis_miles} miles`}
                  />
                  <WeatherDataPoint
                    label="UV Index"
                    value={weather.current.uv}
                  />
                  <WeatherDataPoint
                    label="Wind Gust"
                    value={`${weather.current.gust_mph} mph / ${weather.current.gust_kph} kmph`}
                  />
                  {/* Remove or comment out the lines for values you don't want to display */}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
