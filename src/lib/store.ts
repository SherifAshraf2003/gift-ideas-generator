import { create } from "zustand";

type Question = {
  id: number;
  question: string;
};

type QuizStore = {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
}));
