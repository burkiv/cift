import Head from 'next/head';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Kayıt Ol - Çift Platformu</title>
        <meta name="description" content="Çiftinizle platforma kayıt olun." />
      </Head>
      <div className="w-full h-screen bg-pink-200 flex items-center justify-center">
        <div className="max-w-md w-full bg-pink-100 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Kayıt Ol</h1>
          <label className="block mb-2 font-medium">Kullanıcı adı:</label>
          <input
            className="w-full p-2 mb-4 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
            type="text"
            placeholder="Kullanıcı adınızı giriniz"
          />

          <label className="block mb-2 font-medium">Email:</label>
          <input
            className="w-full p-2 mb-4 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
            type="email"
            placeholder="Email adresinizi giriniz"
          />

          <label className="block mb-2 font-medium">Şifre:</label>
          <input
            className="w-full p-2 mb-4 border border-pink-300 rounded focus:outline-none focus:border-pink-500"
            type="password"
            placeholder="Şifrenizi giriniz"
          />

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded mb-4">
            Kayıt Ol
          </button>

          <div className="text-center text-sm">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-pink-600 hover:underline">Giriş Yap</Link>
          </div>
        </div>
      </div>
    </>
  );
}
