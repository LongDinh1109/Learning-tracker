import FlashCard from "@/components/FlashCard";
import { useAppselector } from "@/hooks/hook";

export default function HistoryPage() {
  const words = useAppselector((state) => state.words.words);
  const renderFlashCard = () => {
    if (words.length === 0) {
      return <div className="text-center">You have no words to check</div>;
    }
    return (
      <div className="justify-center grid grid-cols-[repeat(auto-fit,_minmax(500px,500px))] gap-1">
        {words.map((word) => (
          <FlashCard wordToCheck={word} />
        ))}
      </div>
    );
  };
  return (
    <>
      <h1 className="pb-5 text-3xl font-bold text-center mt-10">History</h1>
      {renderFlashCard()}
    </>
  );
}
