import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Word,
  editWord,
  deleteWord,
  addWord,
  WordPayload,
  getDateChecker,
  WordChecker,
  updateDateChecker,
  UpdateWordsCheckerPayload,
} from "@/services/api";

interface WordsState {
  words: WordChecker[];
  loading: boolean;
  error: string | null;
}

const initialState: WordsState = {
  words: [],
  loading: false,
  error: null,
};

const exampleData: WordChecker[] = [
  {
    word: {
      _id: "1",
      word: "hello",
      definition: "a greeting",
      context: "used to greet someone",
      synonyms: ["hi", "hey"],
    },
    dateOfCheck: {
      first: {
        date: new Date(),
        isChecked: false,
      },
      third: {
        date: new Date(),
        isChecked: false,
      },
      seventh: {
        date: new Date(),
        isChecked: false,
      },
      fourteenth: {
        date: new Date(),
        isChecked: false,
      },
    },
  },
  {
    word: {
      _id: "2",
      word: "world",
      definition: "the planet Earth",
      context: "the place we live on",
      synonyms: ["Earth", "planet Earth"],
    },
    dateOfCheck: {
      first: {
        date: new Date(),
        isChecked: false,
      },
      third: {
        date: new Date(),
        isChecked: false,
      },
      seventh: {
        date: new Date(),
        isChecked: false,
      },
      fourteenth: {
        date: new Date(),
        isChecked: false,
      },
    },
  },
];

export const fetchWordsAsync = createAsyncThunk(
  "words/fetchWords",
  async (_, thunkAPI) => {
    try {
      return await getDateChecker();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const addWordAsync = createAsyncThunk(
  "words/addWord",
  async (word: WordPayload, thunkAPI) => {
    try {
      const addedWord: WordPayload = {
        word: word.word,
        definition: word.definition,
        context: word.context,
        synonyms: word.synonyms,
      };
      return await addWord(addedWord);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const editWordAsync = createAsyncThunk(
  "words/editWord",
  async (word: Word, thunkAPI) => {
    try {
      const updatedWord = {
        _id: word._id,
        word: word.word,
        definition: word.definition,
        context: word.context,
        synonyms: word.synonyms,
      };
      return await editWord(updatedWord);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const deleteWordAsync = createAsyncThunk(
  "words/deleteWord",
  async (id: string, thunkAPI) => {
    try {
      const messages = await deleteWord(id);
      return {
        messages: messages,
        id: id,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const updateWordsCheckerAsync = createAsyncThunk(
  "words/updateWordsChecker",
  async (payload: UpdateWordsCheckerPayload, thunkAPI) => {
    try {
      const result = await updateDateChecker(payload);
      if (result?.status === 200) {
        return payload;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const exampleSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordsAsync.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        state.words = data ?? exampleData;
      })
      .addCase(fetchWordsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(addWordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWordAsync.fulfilled, (state, action) => {
        state.loading = false;
        const addedWord = {
          word: {
            _id: action.payload!._id,
            word: action.payload!.word,
            definition: action.payload!.definition,
            context: action.payload!.context,
            synonyms: action.payload!.synonyms,
          },
          dateOfCheck: {
            first: {
              date: new Date(),
              isChecked: false,
            },
            third: {
              date: new Date(),
              isChecked: false,
            },
            seventh: {
              date: new Date(),
              isChecked: false,
            },
            fourteenth: {
              date: new Date(),
              isChecked: false,
            },
          },
        };
        state.words.push(addedWord);
      })
      .addCase(addWordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(editWordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editWordAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedWord = action.payload;

        if (updatedWord) {
          const index = state.words.findIndex(
            (word) => word.word._id === updatedWord._id
          );
          if (index !== -1) {
            state.words[index] = {
              ...state.words[index],
              word: updatedWord,
            };
          }
        }
      })
      .addCase(editWordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(deleteWordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWordAsync.fulfilled, (state, action) => {
        state.loading = false;
        const deletedWordId = action.payload.id;
        state.words = state.words.filter(
          (word) => word.word._id !== deletedWordId
        );
      })
      .addCase(deleteWordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(updateWordsCheckerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWordsCheckerAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedWord = action.payload;
        if (updatedWord) {
          state.words = state.words.map((word) => {
            if (word.word._id === updatedWord.wordId) {
              return {
                ...word,
                dateOfCheck: {
                  ...word.dateOfCheck,
                  [updatedWord.times]: {
                    date: new Date(),
                    isChecked: true,
                  },
                },
              };
            }
            return word;
          });
        }
      })
      .addCase(updateWordsCheckerAsync.rejected, (state, action) =>{
        state.loading = false;
        state.error =  action.error.message || "An error occurred";
      })
  },
});

export default exampleSlice.reducer;
