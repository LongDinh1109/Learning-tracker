import { WordChecker } from "@/services/api";
import Button from "./Button";
import { formatDate } from "@/utils/formatDate";
import { useAppDispatch } from "@/hooks/hook";
import { updateWordsCheckerAsync } from "@/store/slices/wordsSlice";

type CardProps = {
  wordToCheck: WordChecker;
  dateOfCheck?: {
    [key: string]: {
      date: Date;
      isChecked: boolean;
    };
  };
};
type SpacedRepetitionProps = "first" | "third" | "seventh" | "fourteenth";
export default function FlashCard({ wordToCheck, dateOfCheck }: CardProps) {
  const dispatch = useAppDispatch();
  const word = wordToCheck.word;

  const renderDates = () => {
    if (dateOfCheck) {
      const count = Object.keys(dateOfCheck)[0];
      const date = formatDate(Object.values(dateOfCheck)[0].date, "DD/MM/YYYY");
      const handleUpdateWordChecker = () => {
        dispatch(updateWordsCheckerAsync({ wordId: word._id, times: count }));
      };
      return (
        <>
          <div>
            The review for the {count}: {date}
          </div>
          <div>
            <Button onClick={handleUpdateWordChecker}>Review</Button>
          </div>
        </>
      );
    }
    const datesOfCheck = wordToCheck.dateOfCheck;
    console.log(Object.keys(datesOfCheck));

    return (
      <>
        {datesOfCheck &&
          Object.keys(datesOfCheck).map((times, index) => {
            return (
              <div key={index}>
                The {times} review : 
                {formatDate(datesOfCheck[times as SpacedRepetitionProps].date)} 
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2 border w-full p-5 rounded-md">
      <div className="font-bold text-center">{word.word}</div>
      <div>Context: {word.context}</div>
      <div>Definition: {word.definition}</div>
      <div>Synonyms: {word.synonyms}</div>
      {renderDates()}
    </div>
  );
}
