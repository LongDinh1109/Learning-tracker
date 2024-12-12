import React from "react";
import EditWord from "./EditWord";
import "../../styles/pages/vocabulary.css";
import Button from "../Button";
import { Word, WordChecker } from "@/services/api";
type WordList = WordChecker[];

type TableProps = {
  tableData: WordList;
  onEdit: (word: Word) => void;
  onDelete: (id: string) => void;
};

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  if(!text || text.length < 0) {
    return null;
  }
  const lines = text.split('\n'); // Split text by newlines
  return (
    <div>
      {lines.map((line, index) => (
        <p key={index}>{line}</p> // Render each line as a paragraph
      ))}
    </div>
  );
};

export default function Table({ tableData, onEdit, onDelete }: TableProps) {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [editWord, setEditWord] = React.useState<Word | null>(null);
  const handleDeleteWord = (id: string) => {
    onDelete(id);
  };
  const handleEditWord = (word: WordChecker) => {
    const editedWord = {
      _id: word.word._id,
      word: word.word.word,
      definition: word.word.definition,
      context: word.word.context,
      synonyms: word.word.synonyms,
    }
    setEditWord(editedWord);
    setShowEditForm(true);
  };

  const handleSubmitEditForm = (value: Word) => {
    onEdit(value);
    setShowEditForm(false);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Vovabulary</th>
            <th>Meaning, Context, Use, Synonyms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((word) => (
            <tr key={word.word._id}>
              <td>{word.word.word}</td>
              <td>
                <div className="word-def">
                  <p>Definition:</p>{" "}
                  <TextDisplay text={word.word.definition}/>
                </div>
                <div className="word-def">
                  <p>Context:</p> <TextDisplay text={word.word.context}/>
                </div>
                <div className="word-def">
                  <p>Synonyms:</p> {word.word.synonyms.join(", ")}
                </div>
              </td>
              <td>
                <Button onClick={() => handleEditWord(word)}>Edit</Button>
                <Button onClick={() => handleDeleteWord(word.word._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditForm && editWord && (
        <EditWord data={editWord} onEdit={handleSubmitEditForm} onClose={() => setShowEditForm(false)} />
      )}
    </>
  );
}
