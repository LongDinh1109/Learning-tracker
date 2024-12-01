import { useEffect, useState } from "react";
import Table from "../components/table/Table";
import AddNewWord from "../components/table/AddNewWord";
import {
  addWord,
  deleteWord,
  editWord,
  getWords,
  type Word as WordType,
} from "../services/api";
import "../styles/pages/vocabulary.css";

export type Word = {
  id: string;
  word: string;
  wordDef: {
    definition: string;
    context: string;
    synonyms: string[];
  };
};

type WordList = Word[];

function NewVocabulary() {
  const initialTableData: WordList = [
    {
      id: "1",
      word: "hello",
      wordDef: {
        definition: "a greeting",
        context: "used to greet someone",
        synonyms: ["hi", "hey"],
      },
    },
    {
      id: "2",
      word: "world",
      wordDef: {
        definition: "the planet Earth",
        context: "the place we live on",
        synonyms: ["Earth", "planet Earth"],
      },
    },
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [showAddingForm, setShowAddingForm] = useState(false);
  const handleAddNewWord = async (value: Word) => {
    try {
      const addedWord: WordType = {
        word: value.word,
        definition: value.wordDef.definition,
        context: value.wordDef.context,
        synonyms: value.wordDef.synonyms,
      };
      const response = await addWord(addedWord);
      if (response) {
        setTableData([...tableData, value]);
        setShowAddingForm(false);
      }
      console.log("Word added:", response);
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };
  const handleDeleteWord = async (id: string) => {
    try {
      const response = await deleteWord(id);

      if (response) {
        setTableData(tableData.filter((word) => word.id !== id));
      }
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  const handleEditWord = async (word: Word) => {
    const updatedData = tableData.map((item) =>
      item.id === word.id ? word : item
    );
    const updatedWord = {
      _id: word.id,
      word: word.word,
      definition: word.wordDef.definition,
      context: word.wordDef.context,
      synonyms: word.wordDef.synonyms,
    };
    try {
      const response = await editWord(updatedWord);
      if (response) {
        setTableData(updatedData);
      }
    } catch (error) {
      console.error("Error editing word:", error);
    }
  };

  useEffect(() => {
    async function fetchingData() {
      try {
        const wordList = await getWords();
        if (wordList) {
          const formatedData = wordList.map((word: WordType) => ({
            id: word._id!,
            word: word.word,
            wordDef: {
              definition: word.definition,
              context: word.context,
              synonyms: word.synonyms,
            },
          }));
          setTableData(formatedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchingData();
  }, []);

  return (
    <div className='vocabulary-container'>
      <h1>Vocabulary</h1>
      <p>
        <button onClick={() => setShowAddingForm(true)}>Add new word</button>
      </p>
      <Table
        tableData={tableData}
        onDelete={handleDeleteWord}
        onEdit={handleEditWord}
      />
      {showAddingForm && (
        <AddNewWord
          onSubmit={handleAddNewWord}
          onClose={() => setShowAddingForm(false)}
        />
      )}
    </div>
  );
}

export default NewVocabulary;
