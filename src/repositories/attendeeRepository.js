const Attendee = require('../entities/attendee');

const getAllAttendees = async () => {
  return await Attendee.findAll();
};

const createAttendee = async (attendeeData) => {
  return await Attendee.create(attendeeData);
};

module.exports = { getAllAttendees, createAttendee };
