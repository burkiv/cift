import Head from 'next/head';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Giriş Yap - Çift Platformu</title>
        <meta name="description" content="Sevgilinizle bağlarınızı güçlendirin" />
      </Head>
      <div className="w-full h-screen bg-pink-200 flex items-center justify-center">
        <div className="max-w-md w-full bg-pink-100 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Çift Platformu</h1>
          <label className="block mb-2 font-medium">Kullanıcı adı:</label>
          <input
            className="w-full p-2 mb-4 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
            type="text"
            placeholder="Kullanıcı adınızı giriniz"
          />
          <label className="block mb-2 font-medium">Şifre:</label>
          <input
            className="w-full p-2 mb-4 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
            type="password"
            placeholder="Şifrenizi giriniz"
          />
          <div className="flex justify-between items-center mb-4">
            {/* Bu harici bir link, istersen Link'le de yapabilirsin ama sayfa yoksa # kalabilir */}
            <a href="#" className="text-sm text-pink-600 hover:underline">Şifrenizi mi unuttunuz?</a>
          </div>
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded mb-4">
            Giriş yap
          </button>
          <div className="text-center text-sm">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-pink-600 hover:underline">Kayıt ol</Link>
          </div>
        </div>
      </div>
    </>
  );
}
