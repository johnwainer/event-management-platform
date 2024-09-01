const Event = require('../entities/event');

const getAllEvents = async () => {
  return await Event.findAll();
};

const createEvent = async (eventData) => {
  return await Event.create(eventData);
};

const getEventById = async (id) => {
  return await Event.findByPk(id);
};

const updateEvent = async (id, eventData) => {
  const [updated] = await Event.update(eventData, { where: { id } });
  if (updated) {
    return await Event.findByPk(id);
  }
  return null;
};

const deleteEvent = async (id) => {
  const deleted = await Event.destroy({ where: { id } });
  return deleted > 0;
};

const getEventByName = async (name) => {
  return await Event.findOne({ where: { name } });
};

module.exports = { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent, getEventByName };
