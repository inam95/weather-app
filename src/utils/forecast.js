import request from 'request';

function forecast(lng, lat, callback) {
  const coords = `${lat},${lng}`;
  const url = `http://api.weatherstack.com/current?access_key=4c9e211a2ef1789a37ac0d7a1f4cced1&query=${encodeURIComponent(
    coords
  )}&units=s`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else {
      if (body.error) {
        callback('Unable to find location', undefined);
      } else {
        const { temperature, feelslike, weather_descriptions } = body.current;

        const detailedForecast = `${weather_descriptions[0]}. It's currently ${temperature} degree out. It feels like ${feelslike} degree out.`;

        callback(undefined, detailedForecast);
      }
    }
  });
}

export { forecast };
