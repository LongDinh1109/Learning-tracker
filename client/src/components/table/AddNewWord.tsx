import WordForm from "./WordForm";
import { Word } from "../../pages/NewVocabulary";
type AddNewWordProps = {
  onSubmit: (value: Word) => void;
  onClose: () => void;
};

export default function AddNewWord({ onSubmit,onClose }: AddNewWordProps) {
  return (
    <div className="overlay">
      <div className="modal-container">
        <h2>Add new word</h2>
        <WordForm onSubmitData={onSubmit} mode="add" />
        <button className="close-btn" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
}
