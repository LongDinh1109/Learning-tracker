import React from "react";
import { Word } from "../../pages/NewVocabulary";
import WordForm from "./WordForm";

type EditWordProps = {
  data: Word;
  onEdit: (word: Word) => void;
};

export default function EditWord({ data, onEdit }: EditWordProps) {
  const handleEditWord = (word: Word) => {
    onEdit(word);
  };
  return (
    <div className="overlay">
      <div className="modal-container">
        <h2>Edit word</h2>
        <WordForm mode="edit" data={data} onSubmitData={handleEditWord} />
        <button className="close-btn" onClick={() => onEdit(data)}>x</button>
      </div>
    </div>
  );
}
