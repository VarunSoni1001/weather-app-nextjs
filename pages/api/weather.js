export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter missing.' });
  }

  try {
    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.SECRET_WEATHER_API_KEY}&q=${query}`
    );
    const weatherData = await weatherResponse.json();

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
}
