import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const createRoomSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome da sala deve ter pelo menos 3 caracteres.',
  }),
  description: z.string().optional(),
});

export function CreateRoomForm() {
  const {} = useForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" />
      </CardContent>
    </Card>
  );
}
