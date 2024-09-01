const eventUseCases = require('../usecases/eventUseCases');
const mapboxService = require('../services/mapboxService');

const getAllEvents = async (req, res) => {
  try {
    const events = await eventUseCases.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

const addEvent = async (req, res) => {
  try {
    const newEvent = await eventUseCases.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await eventUseCases.getEventById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventUseCases.updateEvent(req.params.id, req.body);
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleted = await eventUseCases.deleteEvent(req.params.id);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

const getNearbyLocations = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await eventUseCases.getEventById(id);

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    const { location } = event;

    const locations = await mapboxService.getNearbyLocations(location);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar ubicaciones cercanas ' + error});
  }
};

module.exports = { getAllEvents, addEvent, getEventById, updateEvent, deleteEvent, getNearbyLocations };
