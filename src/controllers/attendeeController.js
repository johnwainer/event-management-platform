const attendeeUseCases = require('../usecases/attendeeUseCases');

const getAllAttendees = async (req, res) => {
  try {
    const attendees = await attendeeUseCases.getAllAttendees();
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

const addAttendee = async (req, res) => {
  try {
    const newAttendee = await attendeeUseCases.createAttendee(req.body);
    res.status(201).json(newAttendee);
  } catch (error) {
    res.status(500).json({ error: 'Error Interno del Servidor ' + error });
  }
};

module.exports = { getAllAttendees, addAttendee };
