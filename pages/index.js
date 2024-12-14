// pages/index.js
import Head from 'next/head'
import Menu from '../components/Menu'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Ana Sayfa - Çift Platformu</title>
        <meta name="description" content="Ana sayfa - çift platformu" />
      </Head>
      <div className="flex h-screen bg-coupleBg text-coupleText">
        <Menu />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4">Hoş geldiniz!</h1>
          <p className="text-coupleText text-lg leading-relaxed">
            Burası ana sayfa. Buradan odalar oluşturabilir, partnerinizi davet edebilir, aktiviteleri seçebilirsiniz.
          </p>
        </div>
      </div>
    </>
  );
}
