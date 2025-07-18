import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionRequest } from './types/create-question-request';
import type { CreateQuestionResponse } from './types/create-question-response';
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response';

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result: CreateQuestionResponse = await response.json();
      return result;
    },
    onMutate: ({ question }) => {
      const questions =
        queryClient.getQueryData<GetRoomQuestionsResponse>([
          'get-questions',
          roomId,
        ]) || [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questions]
      );

      return { newQuestion, questions };
    },
    onError: (error, _variables, context) => {
      // biome-ignore lint/suspicious/noConsole: Retorno de erro para o console
      console.error('Error creating question:', error);
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context.questions
        );
      }
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }
          if (!context?.newQuestion) {
            return questions;
          }

          return questions.map((question) =>
            question.id === context.newQuestion.id
              ? {
                  ...context.newQuestion,
                  id: data.questionId,
                  answer: data.answer,
                  isGeneratingAnswer: false,
                }
              : question
          );
        }
      );
    },
  });
}
