import React from "react";
import EditWord from "./EditWord";
import { type Word } from "../../pages/NewVocabulary";
import "../../styles/pages/vocabulary.css";
type WordList = Word[];

type TableProps = {
  tableData: WordList;
  onEdit: (word: Word) => void;
  onDelete: (id: string) => void;
};

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
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
  console.log(tableData);

  const [showEditForm, setShowEditForm] = React.useState(false);
  const [editWord, setEditWord] = React.useState<Word | null>(null);
  const handleDeleteWord = (id: string) => {
    onDelete(id);
  };
  const handleEditWord = (word: Word) => {
    setEditWord(word);
    setShowEditForm(true);
  };

  const handleSubmitEditForm = (value: Word) => {
    setShowEditForm(false);
    onEdit(value);
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
            <tr key={word.word}>
              <td>{word.word}</td>
              <td>
                <div className="word-def">
                  <p>Definition:</p>{" "}
                  <TextDisplay text={word.wordDef.definition}/>
                </div>
                <div className="word-def">
                  <p>Context:</p> <TextDisplay text={word.wordDef.context}/>
                </div>
                <div className="word-def">
                  <p>Synonyms:</p> {word.wordDef.synonyms.join(", ")}
                </div>
              </td>
              <td>
                <button onClick={() => handleEditWord(word)}>Edit</button>
                <button onClick={() => handleDeleteWord(word.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditForm && editWord && (
        <EditWord data={editWord} onEdit={handleSubmitEditForm} />
      )}
    </>
  );
}
