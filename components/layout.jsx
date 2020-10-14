import Head from 'next/head';
import Footer from './footer';
import ContactBtn from './contactBtn';
import { motion} from 'framer-motion';

function Layout({ children }) {
    return (
        <>
            <Head>
                <meta
                    httpEquiv="Content-Type"
                    content="text/html;charset=UTF-8"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="Backpack Buddy. Gratis rute wisata harian untuk backpacker di Bali"
                />
                <title>Backpack Buddy</title>
                <link rel="icon" href="/favicon.png" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                /> 
            </Head>
            <motion.main layout >
                { children }
            </motion.main>
            <ContactBtn />
            <Footer />
        </>
    );
}

export default Layout;