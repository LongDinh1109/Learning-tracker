import React from "react";
import { Word } from "../../pages/NewVocabulary";
type WordFormProps = {
  onSubmitData: (value: Word) => void;
} & (EditForm | AddForm);

type EditForm = {
  mode: "edit";
  data: Word;
};
type AddForm = {
  mode: "add";
};

export default function WordForm({
  onSubmitData,
  mode,
  ...props
}: WordFormProps) {
  const data = mode === "edit" ? (props as EditForm).data : undefined;
  const defaultValue = {
    word: data?.word ?? "",
    definition: data?.wordDef.definition ?? "",
    context: data?.wordDef.context ?? "",
    synonyms: data?.wordDef.synonyms ?? [],
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formatedData = Object.fromEntries(formData);
    console.log(formatedData.definition);
    
    onSubmitData({
      id: data ? data.id : "",
      word: formatedData.newWord as string,
      wordDef: {
        definition: formatedData.definition as string,
        context: formatedData.context as string,
        synonyms: synonymsItem,
      },
    });
  };

  //handle add multiple synonyms
  const [synonymsItem, setSynonymsItem] = React.useState<string[]>(
    defaultValue.synonyms
  );

  const handleAddSynonym = () => {
    setSynonymsItem([...synonymsItem, ""]);
  };

  const handleRemoveSynonym = (index: number) => {
    setSynonymsItem((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSynonymChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setSynonymsItem((prev) => {
      return prev.map((item, i) => (i === index ? value : item));
    });
  };
  return (
    <form onSubmit={handleSubmit} className="word-form">
      <p>
        <label htmlFor="new-word">New word:</label>
        <textarea
          placeholder="New word"
          name="newWord"
          id="newWord"
          defaultValue={defaultValue.word}
        />
      </p>
      <p>
        <label htmlFor="definition">Definition:</label>
        <textarea
          placeholder="Definition"
          name="definition"
          id="definition"
          defaultValue={defaultValue.definition}
        />
      </p>
      <p>
        <label htmlFor="context">Context:</label>
        <textarea
          placeholder="context"
          name="context"
          id="context"
          defaultValue={defaultValue.context}
        />
      </p>
      <p>
        <label htmlFor="synonyms">Synonyms:</label>
        <div className="synonyms-input">
          {synonymsItem.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="synonym"
                name="synonym"
                onChange={(e) => handleSynonymChange(e, index)}
                defaultValue={item}
              />
              <button type="button" onClick={() => handleRemoveSynonym(index)}>
                x
              </button>
            </div>
          ))}
          <div style={{ visibility: "hidden" }}>
            <input type="text" placeholder="synonym" name="synonym" />
            <button type="button">x</button>
          </div>
        </div>
        <button type="button" onClick={handleAddSynonym}>
          +
        </button>
      </p>
      <button>{mode === "edit" ? "Update word" : "Add new word"}</button>
    </form>
  );
}
