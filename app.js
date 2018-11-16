const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors());

const movieRoutes = require('./src/routes/movies-routes');
app.use('/', movieRoutes);

const actorRoutes = require('./src/routes/actors-routes');
app.use('/', actorRoutes);

app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    res.status(status).json({ error: err })
  });
  
app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Not Found' }})
})
  
const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)
  
module.exports = app