const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/auth');
const attendeeRoutes = require('./routes/attendeeRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/attendees', attendeeRoutes);


app.get('/', (req, res) => {
  res.send('Api conectada!');
});

module.exports = app;
