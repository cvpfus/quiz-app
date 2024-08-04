import { useQuery } from "@tanstack/react-query";
import quizService from "@/services/quizService.js";

export const useQuizQuery = (isEnabled) => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: quizService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};
