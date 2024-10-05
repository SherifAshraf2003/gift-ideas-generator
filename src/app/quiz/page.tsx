"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useQuizStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";

const Quiz = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [questionNum, setQuestionNum] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({}); // State to hold answers
  let questions = [];

  try {
    questions = data ? JSON.parse(decodeURIComponent(data)) : [];
  } catch (e) {
    console.error("Error parsing questions:", e);
  }

  questions = questions.questions || []; // Ensure questions is an array
  const numberOfQuestions = questions.length;

  const nextQuestion = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[questionNum].question]: answer,
    }));
    console.log(answers);
    if (questionNum === numberOfQuestions - 1) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questions[questionNum].question]: answer,
      }));
      return;
    }
    setAnswer("");
    setQuestionNum(questionNum + 1);
  };

  const prevQuestion = () => {
    if (questionNum === 0) {
      return;
    }
    setQuestionNum(questionNum - 1); // Go back to the previous question
  };

  return (
    <section className="flex items-center justify-center flex-col h-[100vh] bg-gradient-to-r from-gradientFrom to-gradientTo">
      <Card className="max-w-[650px] w-[650px]">
        <CardHeader>
          <CardTitle className="text-3xl">Gift Ideas Generator</CardTitle>
          <CardDescription className="text-lg">
            Help us find the perfect gift for your special someone!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <Progress
              className="mb-4"
              value={((questionNum + 1) / numberOfQuestions) * 100}
            />
            <div className="bg-blue-200 p-6 rounded-lg border-l-4 border-blue-600 shadow-sm mb-4">
              <p className="text-xl mb-3">
                {`Question ${questionNum + 1} of ${numberOfQuestions}`}
              </p>
              <p>{questions[questionNum]?.question}</p>
            </div>
            <label htmlFor="answer">Answer: </label>
            <Input
              id="answer"
              value={answer}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  nextQuestion();
                }
              }}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              placeholder="Enter your answer"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={prevQuestion} disabled={questionNum === 0}>
            Previous
          </Button>
          <Button onClick={nextQuestion}>
            {questionNum === numberOfQuestions - 1 ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Quiz;
