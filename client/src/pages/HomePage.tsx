import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-center">
        <h1 className="font-bold size-10 text-xl text-center w-full">Learn Languages, Effortlessly</h1>
        <p className="py-5">
          Revolutionize your language learning journey with our intelligent
          spaced repetition system.
        </p>
        <Button onClick={()=>navigate('/vocabulary')}>Start Learning Now</Button>
      </div>
    </>
  );
};

export default HomePage;
