import { useQuery } from "@tanstack/react-query";
import quizService from "@/services/quizService.js";

export const useQuizQuery = (isEnabled, difficulty) => {
  return useQuery({
    queryKey: ["quiz", difficulty],
    queryFn: async () => {
      return await quizService.getAll(difficulty);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};
