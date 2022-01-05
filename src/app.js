import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import { forecast } from './utils/forecast.js';
import { geocode } from './utils/geocode.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set yp static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Hello, Weather app',
    name: 'Inam'
  });
});

app.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About Page',
    name: 'Inam'
  });
});

app.get('/help', (req, res, next) => {
  res.render('help', {
    message: 'Hello, We are here to help you !',
    title: 'Help Page',
    name: 'Inam'
  });
});

app.get('/weather', (req, res, next) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address'
    });
  }

  geocode(req.query.address, (error, { lng, lat, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(lng, lat, (error, data) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        location,
        forecast: data,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res, next) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res, next) => {
  res.render('404', {
    message: 'Help article not found',
    title: '404',
    name: 'Inam'
  });
});

app.get('*', (req, res, next) => {
  res.render('404', {
    message: 'Page not found',
    title: '404',
    name: 'Inam'
  });
});

app.listen(4002, () => {
  console.log('Server is up on port 4002');
});
