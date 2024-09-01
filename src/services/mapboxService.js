const axios = require('axios');
require('dotenv').config();

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const MAPBOX_GEOCODING_URL =  process.env.MAPBOX_GEOCODING_URL;
const RADIUS = process.env.MAPBOX_RADIUS;


const getCoordinates = async (locationName) => {
    const response = await axios.get(`${MAPBOX_GEOCODING_URL}${encodeURIComponent(locationName)}.json`, {
        params: {
            access_token: MAPBOX_ACCESS_TOKEN,
            limit: 1
        }
    });

    if (response.data.features.length > 0) {
        const [latitude, longitude] = response.data.features[0].center;
        return { latitude, longitude };
    } else {
        throw new Error('No se encontraron coordenadas para la ubicación proporcionada');
    }
}

const getNearbyLocations = async (eventLocation) => {
  try {
    const { latitude, longitude } = await getCoordinates(eventLocation);
    const response = await axios.get(`${MAPBOX_GEOCODING_URL}poi.json`, {
        params: {
            access_token: MAPBOX_ACCESS_TOKEN,
            proximity: `${latitude},${longitude}`,
            radius: RADIUS
        }
    });

    return response.data.features;
  } catch (error) {
    console.error('Error al obtener ubicaciones cercanas:', error);
    throw error;
  }
};

module.exports = {
  getNearbyLocations
};
