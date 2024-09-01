const eventRepository = require('../repositories/eventRepository');

const getAllEvents = async () => {
  return await eventRepository.getAllEvents();
};

const createEvent = async (eventData) => {
  return await eventRepository.createEvent(eventData);
};

const getEventById = async (id) => {
  return await eventRepository.getEventById(id);
};

const updateEvent = async (id, eventData) => {
  return await eventRepository.updateEvent(id, eventData);
};

const deleteEvent = async (id) => {
  return await eventRepository.deleteEvent(id);
};

const createOrUpdateEvent = async (eventData) => {
  const existingEvent = await eventRepository.getEventByName(eventData.name);
  
  if (existingEvent) {
      return await eventRepository.updateEvent(existingEvent.id, eventData);
  } else {
      return await eventRepository.createEvent(eventData);
  }
};

module.exports = { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent, createOrUpdateEvent };
