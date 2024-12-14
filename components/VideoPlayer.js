// components/VideoPlayer.js
import { useRef, useState, useEffect } from 'react';

export default function VideoPlayer({ socket, roomId }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('videoAction', ({ action, time }) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = time;
      if (action === 'play') {
        videoRef.current.play();
        setPlaying(true);
      } else if (action === 'pause') {
        videoRef.current.pause();
        setPlaying(false);
      }
    });

    return () => {
      socket.off('videoAction');
    }
  }, [socket]);

  function togglePlay() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
      socket.emit('videoAction', { roomId, action: 'play', time: videoRef.current.currentTime });
    } else {
      videoRef.current.pause();
      setPlaying(false);
      socket.emit('videoAction', { roomId, action: 'pause', time: videoRef.current.currentTime });
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Video İzleme</h2>
      <video ref={videoRef} width="400" src="/sample-video.mp4" controls={false}></video>
      <div className="mt-2">
        <button onClick={togglePlay} className="bg-coupleAccent hover:bg-pink-600 text-white py-1 px-3 rounded">
          {playing ? 'Durdur' : 'Oynat'}
        </button>
      </div>
    </div>
  );
}
