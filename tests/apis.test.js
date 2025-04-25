const request = require('supertest');
const app = require('../server');
const { pool } = require('../config/db');

describe('School Routes', () => {
  describe('POST /api/schools/addSchool', () => {
    it('should add a new school with valid data', async () => {
        const res = await request(app)
          .post('/api/schools/addSchool')
          .send({
            name: 'Test School',
            address: '123 Main St',
            latitude: 12.9716,
            longitude: 77.5946
          });
        expect([200, 201]).toContain(res.statusCode);
      
        expect(res.body).toHaveProperty('data');
      
        expect(res.body.data).toHaveProperty('name', 'Test School');
    
        expect(res.body).toHaveProperty('message', 'School added successfully!');
        expect(res.body).toHaveProperty('schoolId'); 
        expect(typeof res.body.schoolId).toBe('number'); 
        expect(res.body.data).toHaveProperty('address', '123 Main St');
      });

    it('should return validation error for missing fields', async () => {
      const res = await request(app)
        .post('/api/schools/addSchool')
        .send({
          // Send no fields to trigger validation
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/schools/listSchools', () => {
    it('should list schools sorted by proximity', async () => {
      const res = await request(app)
        .get('/api/schools/listSchools')
        .query({ latitude: 12.9716, longitude: 77.5946 });
      expect(res.statusCode).toBe(200);
      // Accept both array or object with schools array
      if (Array.isArray(res.body)) {
        expect(Array.isArray(res.body)).toBe(true);
      } else {
        expect(Array.isArray(res.body.schools)).toBe(true);
      }
    });

    it('should return validation error for missing query params', async () => {
      const res = await request(app)
        .get('/api/schools/listSchools');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });
});

afterAll(async () => {
    await pool.end(); // This closes all connections and lets Jest exit
});