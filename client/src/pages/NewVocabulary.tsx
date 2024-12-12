import { useEffect, useState } from "react";
import Table from "../components/table/Table";
import AddNewWord from "../components/table/AddNewWord";
import "../styles/pages/vocabulary.css";
import { useAppDispatch, useAppselector } from "@/hooks/hook";
import {
  addWordAsync,
  deleteWordAsync,
  editWordAsync,
  fetchWordsAsync,

} from "@/store/slices/wordsSlice";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { Word, WordPayload } from "@/services/api";

function NewVocabulary() {
  const { words, loading } = useAppselector((state) => state.words);
  const [showAddingForm, setShowAddingForm] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddNewWord = async (value: WordPayload) => {
    dispatch(addWordAsync(value));
    setShowAddingForm(false);
  };
  const handleDeleteWord = async (id: string) => {
    dispatch(deleteWordAsync(id));
  };

  const handleEditWord = async (word: Word) => {
    dispatch(editWordAsync(word));
    setShowAddingForm(false);
  };

  useEffect(() => {
    dispatch(fetchWordsAsync());
  }, [dispatch]);

  console.log(words);
  
  return (
    <>
      <div className="vocabulary-container">
        <h1 className="pb-5 text-3xl font-bold text-center mt-10">Vocabulary</h1>
        <p>
          <Button onClick={() => setShowAddingForm(true)}>Add new word</Button>
        </p>
        <Table
          tableData={words}
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
      {loading && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default NewVocabulary;
