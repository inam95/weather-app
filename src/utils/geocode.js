import request from 'request';

function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaW5hbTk1IiwiYSI6ImNreGo3bnoxdzZhY2wyb3JuYmMwbXl4Ym0ifQ.VaQFSaCOlF6BzPJ__wHPhg&limit=1`;

  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback('Unable to connect to location service', undefined);
    } else {
      if (features.length === 0) {
        callback('Unable to find location', undefined);
      } else {
        const [lng, lat] = features[0].center;
        const location = features[0].place_name;
        callback(undefined, { lat, lng, location });
      }
    }
  });
}

export { geocode };
