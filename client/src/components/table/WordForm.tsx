import React from "react";
import Button from "../Button";
import { Word} from "@/services/api";
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
    definition: data?.definition ?? "",
    context: data?.context ?? "",
    synonyms: data?.synonyms ?? [],
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formatedData = Object.fromEntries(formData);
    console.log(formatedData.definition);

    onSubmitData({
      _id: data ? data._id : "",
      word: formatedData.newWord as string,
      definition: formatedData.definition as string,
      context: formatedData.context as string,
      synonyms: synonymsItem,
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
              <Button type="button" onClick={() => handleRemoveSynonym(index)}>
                x
              </Button>
            </div>
          ))}
          <div style={{ visibility: "hidden" }}>
            <input type="text" placeholder="synonym" name="synonym" />
            <button type="button">x</button>
          </div>
        </div>
        <Button type="button" onClick={handleAddSynonym} color="black">
          +
        </Button>
      </p>
      <Button onClick={() => null} color="black">
        {mode === "edit" ? "Update word" : "Add new word"}
      </Button>
    </form>
  );
}
