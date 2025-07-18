import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCreateQuestion } from '@/http/use-create-question';
import useRecordAudio from '@/http/use-record-audio';

// Esquema de validação no mesmo arquivo conforme solicitado
const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const uploadAudio = async (audio: Blob) => {
    setIsTranscribing(true);
    const formData = new FormData();
    formData.append('file', audio, 'audio.webm');
    const response = await fetch('http://localhost:3333/transcribe-audio', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    // biome-ignore lint/suspicious/noConsole: teste
    console.log('Audio uploaded:', result);

    form.setValue('question', result.transcription);
    setIsTranscribing(false);
  };

  const { isRecording, startRecording, stopRecording } = useRecordAudio({
    uploadAudio,
    chunksPerInterval: 0,
  });

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  });

  const handleCreateQuestion = async (data: CreateQuestionFormData) => {
    await createQuestion(data);
  };

  const { isSubmitting } = form.formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Sua Pergunta</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px]"
                        placeholder="O que você gostaria de saber?"
                        {...field}
                        disabled={isSubmitting || isTranscribing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse items-center">
                {!isRecording && (
                  <Button
                    className="cursor-pointer"
                    disabled={isSubmitting || isTranscribing}
                    onClick={startRecording}
                  >
                    Gravar Pergunta
                  </Button>
                )}
                {isRecording && (
                  <Button className="cursor-pointer" onClick={stopRecording}>
                    Parar gravação
                  </Button>
                )}
                {isRecording && <p>Gravando...</p>}
                {isTranscribing && <p>Transcrevendo...</p>}
              </div>
            </div>
            <Button
              className="cursor-pointer"
              disabled={isSubmitting}
              type="submit"
            >
              Enviar pergunta
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
