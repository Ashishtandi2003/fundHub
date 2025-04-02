import Layout from '../components/layout/Layout';
import '../style/global.css';
import { Roboto } from 'next/font/google';

// Load Roboto font
const roboto = Roboto({
  weight: ['400', '700'], // Add required font weights
  subsets: ['latin'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp;
