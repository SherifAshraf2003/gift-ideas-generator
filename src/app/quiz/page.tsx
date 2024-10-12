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
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

interface Answers {
  question: string;
  answer: string;
}

const Quiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [questionNum, setQuestionNum] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<Answers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  let questions = [];

  try {
    questions = data ? JSON.parse(decodeURIComponent(data)) : [];
  } catch (e) {
    console.error("Error parsing questions:", e);
  }

  useEffect(() => {
    const prompt = answers
      .map((answer) => {
        return `Question: ${answer.question}\nAnswer: ${answer.answer}`;
      })
      .join("\n");
    console.log(prompt);
  }, [answers]);

  questions = questions.questions || [];
  const numberOfQuestions = questions.length;

  const nextQuestion = async () => {
    const object: Answers = {
      question: questions[questionNum].question,
      answer: answer,
    };

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];

      if (updatedAnswers[questionNum]) {
        updatedAnswers[questionNum] = object;
      } else {
        updatedAnswers.push(object);
      }

      return updatedAnswers;
    });

    if (questionNum === numberOfQuestions - 1) {
      try {
        setIsLoading(true);
        const list = await axios.post("/api/chatbot", { answers });
        const urlData = encodeURIComponent(
          JSON.stringify(
            JSON.parse(
              list.data.result.responseMessages[0].content[0].text
                .replace("```", "")
                .replace("json", "")
                .replace("```", "")
            )
          )
        );
        console.log(
          JSON.stringify(
            JSON.parse(
              list.data.result.responseMessages[0].content[0].text
                .replace("```", "")
                .replace("json", "")
                .replace("```", "")
            )
          )
        );
        setIsLoading(false);
        router.push(`/List?data=${urlData}`);
      } catch (e) {
        throw new Error("Error submitting answers");
      }

      return;
    }

    setAnswer("");
    setQuestionNum(questionNum + 1);
  };

  const prevQuestion = () => {
    if (questionNum === 0) {
      return;
    }
    setQuestionNum(questionNum - 1);
  };

  return (
    <>
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
            {questionNum === numberOfQuestions - 1 ? (
              isLoading ? (
                <div className="loading"></div>
              ) : (
                "Submit"
              )
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Quiz;
