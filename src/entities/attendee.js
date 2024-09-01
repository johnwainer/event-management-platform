const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendee = sequelize.define('Attendee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Events',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Attendee;
