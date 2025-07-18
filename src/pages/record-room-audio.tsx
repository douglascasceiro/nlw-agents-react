import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useRecordAudio from '@/http/use-record-audio';

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const uploadAudio = async (audio: Blob) => {
    const formData = new FormData();
    formData.append('file', audio, 'audio.webm');
    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const result = await response.json();
    // biome-ignore lint/suspicious/noConsole: teste
    console.log('Audio uploaded:', result);
  };

  const { isRecording, startRecording, stopRecording } = useRecordAudio({
    uploadAudio,
  });

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <Link to={`/room/${params.roomId}`}>
        <Button className="cursor-pointer" variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Voltar ao Início
        </Button>
      </Link>
      {!isRecording && (
        <Button className="cursor-pointer" onClick={startRecording}>
          Gravar áudio
        </Button>
      )}
      {isRecording && (
        <Button className="cursor-pointer" onClick={stopRecording}>
          Parar gravação
        </Button>
      )}
      {isRecording && <p>Gravando...</p>}
      {!isRecording && <p>Pausado</p>}
    </div>
  );
}
