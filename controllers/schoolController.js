const dbPool = require('../config/db');
const calculateDistance = require('../utils/distance'); 

const addSchool = async (req, res) => {
  // Validation for request body is handled by middleware
  const { name, address, latitude, longitude } = req.body;

  try {
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await dbPool.query(sql, [name, address, latitude, longitude]);

    // Successfully inserted
    res.status(201).json({
      message: 'School added successfully!',
      schoolId: result.insertId, // ID of the newly inserted school
      data: { name, address, latitude, longitude }
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ message: 'Failed to add school due to a server error.' });
  }
};


const listSchools = async (req, res) => {
  // Validation for query parameters is handled by middleware
  const userLatitude = req.query.latitude;
  const userLongitude = req.query.longitude;


  try {
    const sql = 'SELECT id, name, address, latitude, longitude FROM schools';
    const [schools] = await dbPool.query(sql); // Fetch all schools

    if (!schools || schools.length === 0) {
      return res.status(200).json([]); // Return empty array if no schools found
    }

    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        school.latitude,
        school.longitude
      );
      // Return a new object combining school data and the calculated distance
      return { ...school, distance: parseFloat(distance.toFixed(2)) };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ message: 'Failed to retrieve schools due to a server error.' });
  }
};

module.exports = {
  addSchool,
  listSchools,
};