import FlashCard from "@/components/FlashCard";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppselector } from "@/hooks/hook";
import { DateOfCheck, WordChecker } from "@/services/api";
import { fetchWordsAsync } from "@/store/slices/wordsSlice";
import { useEffect } from "react";

// Type definitions for word checking functionality
type WordToCheck = {
  word: WordChecker;
  dateOfCheck: {
    [key: string]: DateOfCheck;
  };
};
type SpacedRepetitionProps = "first" | "third" | "seventh" | "fourteenth";

/**
 * Filters words that need to be checked based on their scheduled check dates
 * @param words Array of words to be checked
 * @returns Array of words that need to be checked with their respective check dates
 */
const getWordToCheck = (words: WordChecker[]): WordToCheck[] => {
  const today = new Date();
  const wordToCheck: WordToCheck[] = [];

  // Helper function to determine if a word needs to be checked
  const needsCheck = (checkDate: DateOfCheck): boolean => {
    return !checkDate.isChecked && new Date(checkDate.date) <= today;
  };

  // Iterate through each word and check dates for spaced repetition intervals
  for (const word of words) {
    for (const key of ["first", "third", "seventh", "fourteenth"]) {
      const checkDate = word.dateOfCheck[key as SpacedRepetitionProps];
      if (needsCheck(checkDate)) {
        wordToCheck.push({
          word,
          dateOfCheck: {
            [key]: {
              date: checkDate.date,
              isChecked: checkDate.isChecked,
            },
          },
        });
        break;
      }
    }
  }
  return wordToCheck;
};

/**
 * TrackingPage component for displaying words that need to be reviewed
 * based on spaced repetition intervals
 */
export default function TrackingPage() {
  // Get words from Redux store
  const { loading, words } = useAppselector((state) => state.words);
  const dispatch = useAppDispatch();

  // Fetch words when component mounts
  useEffect(() => {
    dispatch(fetchWordsAsync());
  }, [dispatch]);

  const WordToCheck = getWordToCheck(words);
  const renderFlashCard = () => {
    if (WordToCheck.length === 0) {
      return <div className="text-center">You have no words to check</div>;
    }
    return (
      <div className="justify-center grid grid-cols-[repeat(auto-fit,_minmax(500px,500px))] gap-1">
        {WordToCheck.map((word) => (
          <FlashCard wordToCheck={word.word} dateOfCheck={word.dateOfCheck} />
        ))}
      </div>
    );
  };
  return (
    <>
      <h1 className="pb-5 text-3xl font-bold text-center mt-10">
        Spaced repetition
      </h1>
      {/* Grid layout for displaying flashcards */}
      {renderFlashCard()}
      {loading && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
    </>
  );
}
