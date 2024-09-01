const attendeeRepository = require('../repositories/attendeeRepository');

const getAllAttendees = async () => {
  return await attendeeRepository.getAllAttendees();
};

const createAttendee = async (attendeeData) => {
  return await attendeeRepository.createAttendee(attendeeData);
};

module.exports = { getAllAttendees, createAttendee };
