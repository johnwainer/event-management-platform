const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

async function getAttendanceReport() {
    try {
        const result = await sequelize.query(`
            SELECT 
                DATE_FORMAT(date, '%W') AS dayOfWeek,
                COUNT(Attendees.id) AS totalAttendees
            FROM Events
            LEFT JOIN Attendees ON Events.id = Attendees.eventId
            GROUP BY DATE_FORMAT(date, '%W')
            ORDER BY FIELD(dayOfWeek, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        `, {
            type: QueryTypes.SELECT
        });

        return result;
    } catch (error) {
        throw new Error('Error fetching attendance report: ' + error.message);
    }
}

module.exports = {
    getAttendanceReport
};
