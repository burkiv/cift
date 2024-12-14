import Head from 'next/head'
import Menu from '../../components/Menu'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import VideoPlayer from '../../components/VideoPlayer'
import DrawingActivity from '../../components/DrawingActivity'
import Link from 'next/link'

let socket;

export default function RoomDetailPage() {
  const router = useRouter();
  const { roomId } = router.query;
  const [roomData, setRoomData] = useState(null);
  const [error, setError] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  
  const [chatOpen, setChatOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [role, setRole] = useState(null); // Rolü burada tutacağız

  useEffect(() => {
    if (roomId) {
      fetch('/api/socket'); 
      socket = io({ path: '/api/socket_io' });
      
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        socket.emit('joinRoom', roomId);
      });

      socket.on('assignedRole', ({ role }) => {
        console.log('Rol atandı:', role);
        setRole(role);
      });

      socket.on('chatMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.disconnect();
      }
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;
    async function fetchRoom() {
      try {
        const res = await fetch(`/api/rooms?roomId=${roomId}`);
        if (!res.ok) {
          const errData = await res.json();
          setError(errData.error || 'Oda bulunamadı');
        } else {
          const data = await res.json();
          setRoomData(data);
        }
      } catch (err) {
        setError('Bir hata oluştu.');
      }
    }
    fetchRoom();
  }, [roomId]);

  function sendMessage() {
    if(!inputMsg.trim()) return;
    socket.emit('chatMessage', { roomId, message: inputMsg, sender: role === 'partner' ? 'Partner' : 'User' });
    setInputMsg('');
  }

  return (
    <>
      <Head>
        <title>Oda Detayı - Çift Platformu</title>
        <meta name="description" content="Oda detayı sayfası" />
      </Head>
      <div className="flex h-screen bg-coupleBg text-coupleText overflow-hidden">
        {menuOpen && (
          <div className="bg-couplePanel p-4 shadow-md w-64 transition-all duration-200">
            <h2 className="text-2xl font-bold mb-4">Menü</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/games" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
                  Oyunlar
                </Link>
              </li>
              <li>
                <Link href="/messages" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
                  Mesajlar
                </Link>
              </li>
              <li>
                <Link href="/create-room" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
                  Oda Oluştur
                </Link>
              </li>
              <li>
                <Link href="/join-room" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
                  Odaya Katıl
                </Link>
              </li>
            </ul>
          </div>
        )}
        
        <div className="flex-1 flex flex-row relative">
          <div className="flex-1 p-8 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="space-x-2">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="bg-coupleAccent hover:bg-pink-600 text-white py-1 px-3 rounded"
                >
                  {menuOpen ? 'Menüyü Gizle' : 'Menüyü Göster'}
                </button>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="bg-coupleAccent hover:bg-pink-600 text-white py-1 px-3 rounded"
                >
                  {chatOpen ? 'Sohbeti Gizle' : 'Sohbeti Göster'}
                </button>
              </div>
            </div>

            {!roomId && <p>Yükleniyor...</p>}
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            {roomData && (
              <>
                <h1 className="text-3xl font-bold mb-4">{roomData.roomName} Odası</h1>
                <p className="text-gray-700 mb-4">
                  Bu odada partnerinizle beraber aktiviteler yapabilirsiniz.
                </p>

                {/* Video Player */}
                <VideoPlayer socket={socket} roomId={roomId} />

                {/* Drawing Activity: role prop veriyoruz */}
                {role && <DrawingActivity socket={socket} roomId={roomId} role={role} />}

                <div className="bg-white p-4 rounded shadow-md mb-4">
                  <h2 className="text-xl font-semibold mb-2">Oda Bilgisi</h2>
                  <div className="flex items-center">
                    <span className="font-mono bg-couplePanel px-2 py-1 rounded mr-2">{roomData.roomId}</span>
                    <button 
                      className="bg-coupleAccent hover:bg-pink-600 text-white py-1 px-3 rounded"
                      onClick={() => {
                        navigator.clipboard.writeText(roomData.roomId);
                        alert("Oda kodu kopyalandı!");
                      }}
                    >
                      Kopyala
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow-md">
                  <h2 className="text-xl font-semibold mb-2">Aktiviteler</h2>
                  <ul className="list-disc list-inside">
                    <li>Video İzleme (Şu anda etkin)</li>
                    <li>Çizim Yapma (Yakında)</li>
                    <li>Quiz Çözme (Yakında)</li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {chatOpen && (
            <div className="relative h-full flex flex-col shadow-md overflow-hidden" style={{width: 300, backgroundColor: '#ffffff'}}>
              <h2 className="text-xl font-semibold mb-2 p-4 border-b border-gray-300">Sohbet</h2>
              <div className="flex-1 p-2 overflow-y-auto bg-gray-50">
                {messages.map((m, i) => (
                  <div key={i} className="mb-1">
                    <span className="font-bold">{m.sender}:</span> {m.message}
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-300 flex">
                <input 
                  className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:border-coupleAccent mr-2"
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Mesaj yaz..."
                />
                <button 
                  className="bg-coupleAccent hover:bg-pink-600 text-white py-2 px-4 rounded"
                  onClick={sendMessage}
                >
                  Gönder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
