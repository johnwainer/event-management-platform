const attendeeUseCases = require('../usecases/attendeeUseCases');
const attendanceService = require('../services/attendanceService');

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

const getAttendanceReport = async (req, res) => {
  try {
      const report = await attendanceService.getAttendanceReport();
      res.status(200).json(report);
  } catch (error) {
      console.error('Error creando el reporte de asistentes:', error);
      res.status(500).json({ error: 'Error creando el reporte de asistentes' });
  }
}

module.exports = { getAllAttendees, addAttendee, getAttendanceReport };
