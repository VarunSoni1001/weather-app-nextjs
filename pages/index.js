import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [weather, setWeather] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") {
      setWeather("");
    }
  }, [query])

  const fetchWeather = async (query) => {
    try {
      const response = await fetch(`/api/weather?query=${query}`);
      const data = await response.json();

      if (data.error) {
        toast.error(data.error.message);
      }

      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFetchWeather = async (e) => {
    let wthr = await fetchWeather(query);
    setWeather(wthr);
  };

  return (
    <>
  <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          Type the location to find the weather
        </h1>
      </div>
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
            onClick={() => setQuery('')}
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 15.59L15.17 17 12 13.83 8.83 17 7.41 15.59 10.58 12 7.41 8.83 8.83 7.41 12 10.58 15.17 7 16.59 8.41 13.42 12l3.17 3.17z"/>
            </svg>
          </button>
        )}
      </div>
      <div className="flex items-center mt-3 justify-center">
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
          onClick={handleFetchWeather}
        >
          Search
        </button>
      </div>
      {weather && weather.current && weather.length !== 0 && (
        <div className="text-center mt-4">
          <p className="text-base md:text-lg font-semibold">
            Weather in {query}:
          </p>
          <p className="text-lg md:text-xl">{weather.current.temp_c} &#8451;</p>
        </div>
      )}
    </div>
  </div>
</>

  );
}
