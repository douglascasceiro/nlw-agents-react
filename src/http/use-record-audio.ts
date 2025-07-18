import { useRef, useState } from 'react';

export default function useRecordAudio({
  uploadAudio,
  chunksPerInterval = 5000,
}: {
  uploadAudio: (data: Blob) => void;
  chunksPerInterval?: number;
}) {
  const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function';

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const createRecorder = (audio: MediaStream) => {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });
    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };
    recorder.current.onstart = () => {
      // biome-ignore lint/suspicious/noConsole: teste
      console.log('Gravação iniciada');
    };
    recorder.current.onstop = () => {
      // biome-ignore lint/suspicious/noConsole: teste
      console.log('Gravação encerrada');
    };
    recorder.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recorder.current && recorder?.current.state !== 'inactive') {
      recorder.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startRecording = async () => {
    if (!isRecordingSupported) {
      alert('Gravação de áudio não é suportada neste navegador.');
      return false;
    }
    setIsRecording(true);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    if (chunksPerInterval !== 0) {
      intervalRef.current = setInterval(() => {
        recorder.current?.stop();
        createRecorder(audio);
      }, 5000);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}
