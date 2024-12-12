import request from 'supertest';
import express from 'express';
import wordRoutes from '../routes/wordRoutes';
import { addNewWord, getAllWords } from '../controllers/wordController';

jest.mock('../controllers/wordController');

const app = express();
app.use(express.json());
app.use('/api/words', wordRoutes);

describe('Word Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/words/getAllWords', () => {
    it('should route to getAllWords controller', async () => {
      const mockWords = [
        { id: 1, word: 'test' }
      ];
      
      (getAllWords as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockWords);
      });

      const response = await request(app).get('/api/words/getAllWords');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockWords);
      expect(getAllWords).toHaveBeenCalled();
    });
  });

  describe('POST /api/words', () => {
    it('should route to createWord controller', async () => {
      const mockWord = {
        word: 'test',
        translation: 'тест',
        category: 'basic'
      };
      
      (addNewWord as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json({ ...mockWord, id: 1 });
      });

      const response = await request(app)
        .post('/api/words')
        .send(mockWord);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ ...mockWord, id: 1 });
      expect(addNewWord).toHaveBeenCalled();
    });
  });
});
