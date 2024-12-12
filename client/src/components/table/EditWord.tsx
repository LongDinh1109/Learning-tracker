import WordForm from "./WordForm";
import Button from "../Button";
import { Word } from "@/services/api";

type EditWordProps = {
  data: Word;
  onEdit: (word: Word) => void;
  onClose: () => void;
};

export default function EditWord({ data, onEdit,onClose }: EditWordProps) {
  const handleEditWord = (word: Word) => {
    onEdit(word);
  };
  return (
    <div className="overlay">
      <div className="modal-container">
        <h2>Edit word</h2>
        <WordForm mode="edit" data={data} onSubmitData={handleEditWord} />
        <Button className="close-btn" onClick={onClose}>x</Button>
      </div>
    </div>
  );
}
