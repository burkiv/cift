// pages/profile.js
import Head from 'next/head';
import Menu from '../components/Menu';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profil - Çift Platformu</title>
        <meta name="description" content="Profil sayfası" />
      </Head>
      <div className="flex h-screen bg-pink-50">
        <Menu />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4">Profil Sayfanız</h1>
          <p className="text-gray-700">
            Burada kullanıcı bilgilerinizi, avatarınızı, ilişkinizle ilgili notları veya profil ayarlarınızı görebilirsiniz.
          </p>
        </div>
      </div>
    </>
  );
}
