import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from '../utils/store';

function MyApp({
    Component,
    pageProps: { session, ...pageProps }
}) {
    return (
        <SessionProvider session={ session }>
            <ChakraProvider>
                <StoreProvider>
                    <Component {...pageProps} />
                </StoreProvider>
            </ChakraProvider>
        </SessionProvider>
    )
}

export default MyApp
