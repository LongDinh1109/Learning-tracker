import { Request, Response } from 'express';
import {
  addNewWord,
  deleteWord,
  getAllWords,
  updateWord,
} from '../controllers/wordController';
import Word from '../models/Word';

jest.mock('../models/Word');

describe('Word Controller - Get All Words', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {};
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  it('get all words', async () => {
    const mockWords = [{ id: 1, name: 'Test User' }];
    (Word.find as jest.Mock).mockResolvedValue(mockWords);

    await getAllWords(mockRequest as Request, mockResponse as Response);
    expect(Word.find).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockWords);
  });

  it('should return 500 when an error occurs', async () => {
    const error = new Error('Mock error');
    (Word.find as jest.Mock).mockRejectedValue(error);
    await getAllWords(mockRequest as Request, mockResponse as Response);
    expect(mockStatus).toHaveBeenCalledWith(500);
  });
});

describe('Word Controller - Update Word', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {
      params: { id: 'mockId' },
      body: {
        word: 'updated',
        definition: 'new definition',
        context: 'new context',
        synonyms: ['new', 'synonym'],
      },
    };
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  it('should successfully update a word', async () => {
    const mockUpdatedWord = {
      _id: 'mockId',
      word: 'updated',
      definition: 'new definition',
      context: 'new context',
      synonyms: ['new', 'synonym'],
      save: jest.fn().mockResolvedValue(true),
    };

    (Word.findById as jest.Mock).mockResolvedValue(mockUpdatedWord);

    await updateWord(mockRequest as Request, mockResponse as Response);

    expect(Word.findById).toHaveBeenCalledWith('mockId');
    expect(mockUpdatedWord.save).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockUpdatedWord);
  });

  it('should return 404 when word is not found', async () => {
    (Word.findById as jest.Mock).mockResolvedValue(null);

    await updateWord(mockRequest as Request, mockResponse as Response);

    expect(Word.findById).toHaveBeenCalledWith('mockId');
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Word not found' });
  });

  it('should handle errors during update', async () => {
    const error = new Error('Database error');
    (Word.findById as jest.Mock).mockRejectedValue(error);

    await updateWord(mockRequest as Request, mockResponse as Response);

    expect(Word.findById).toHaveBeenCalledWith('mockId');
    expect(mockStatus).toHaveBeenCalledWith(500);
  });
});

describe('Word Controller - Add New Word', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {
      body: {
        word: 'example',
        definition: 'test definition',
        context: 'test context',
        synonyms: ['test1', 'test2'],
      },
    };
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  it('should successfully add a new word', async () => {
    const mockSavedWord = {
      ...mockRequest.body,
      _id: 'mockId',
      save: jest.fn().mockResolvedValue(true),
    };

    (Word as unknown as jest.Mock).mockImplementation(() => mockSavedWord);

    await addNewWord(mockRequest as Request, mockResponse as Response);

    expect(mockSavedWord.save).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(mockSavedWord);
  });

  it('should handle validation errors', async () => {
    const validationError = new Error('Validation failed');
    const mockSavedWord = {
      ...mockRequest.body,
      save: jest.fn().mockRejectedValue(validationError),
    };

    (Word as unknown as jest.Mock).mockImplementation(() => mockSavedWord);

    await addNewWord(mockRequest as Request, mockResponse as Response);

    expect(mockSavedWord.save).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(400);
  });

  it('should handle missing required fields', async () => {
    mockRequest.body = {};
    const mockSavedWord = {
      save: jest.fn().mockRejectedValue(new Error('Missing required fields')),
    };

    (Word as unknown as jest.Mock).mockImplementation(() => mockSavedWord);

    await addNewWord(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
  });
});

describe('Word Controller - Delete Word', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {
      params: { id: 'mockId' },
    };
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  it('should successfully delete a word', async () => {
    const mockDeletedWord = {
      _id: 'mockId',
    };
    (Word.findById as jest.Mock).mockResolvedValue(mockDeletedWord);
    (Word.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedWord);

    await deleteWord(mockRequest as Request, mockResponse as Response);
    expect(Word.findById).toHaveBeenCalledWith('mockId');
    expect(Word.findByIdAndDelete).toHaveBeenCalledWith('mockId');
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Word deleted successfully',
    });
  });

  it('should return 404 when word is not found', async () => {
    (Word.findById as jest.Mock).mockResolvedValue(null);
    await deleteWord(mockRequest as Request, mockResponse as Response);
    expect(Word.findById).toHaveBeenCalledWith('mockId');
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Word not found' });
  });

  it('should handle errors during deletion', async () => {
    const error = new Error('Database error');
    (Word.findById as jest.Mock).mockRejectedValue(error);
    await deleteWord(mockRequest as Request, mockResponse as Response);
    expect(Word.findById).toHaveBeenCalledWith('mockId');
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
