import request from 'supertest';
import express from 'express';
import router from '../routes/userRoutes';
import { createUser, getAllUsers } from '../controllers/userController';

jest.mock('../controllers/userController');

describe('User Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', router);
  });

  describe('GET /', () => {
    it('should call getAllUsers controller', async () => {
      const mockUsers = [{ id: 1, name: 'Test User' }];
      (getAllUsers as jest.Mock).mockImplementation((req, res) => {
        res.json(mockUsers);
      });

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(getAllUsers).toHaveBeenCalled();
    });
  });

  describe('POST /', () => {
    it('should call createUser controller', async () => {
      const mockUser = { name: 'New User' };
      const mockCreatedUser = { id: 1, ...mockUser };
      (createUser as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json(mockCreatedUser);
      });

      const response = await request(app)
        .post('/')
        .send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedUser);
      expect(createUser).toHaveBeenCalled();
    });
  });
});