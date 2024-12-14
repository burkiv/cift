import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaEnvelope } from 'react-icons/fa';

export default function Menu({ roomId }) {
  return (
    <div className="w-64 bg-couplePanel p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Menü</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
            <AiFillHome className="mr-2" />
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link href="/profile" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
            <FaUser className="mr-2" />
            Profil
          </Link>
        </li>
        <li>
          <Link href="/messages" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
            <FaEnvelope className="mr-2" />
            Mesajlar
          </Link>
        </li>
        <li>
          <Link href="/create-room" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
            <FaUser className="mr-2" />
            Oda Oluştur
          </Link>
        </li>
        <li>
          <Link href="/join-room" className="flex items-center p-2 bg-white rounded hover:bg-coupleAccent transition-colors duration-200">
            <FaUser className="mr-2" />
            Odaya Katıl
          </Link>
        </li>
      </ul>

      {roomId && (
        <>
          <h3 className="text-xl font-bold mt-4">Aktiviteler</h3>
          <ul className="space-y-2">
            <li><Link href={`/room/${roomId}/video`} className="underline">Video İzleme</Link></li>
            <li><Link href={`/room/${roomId}/draw`} className="underline">Çizim Yapma</Link></li>
            <li><Link href={`/room/${roomId}/quiz`} className="underline">Quiz Çözme</Link></li>
          </ul>
        </>
      )}
    </div>
  );
}
