import React from 'react'
import Head from 'next/head'
import NavBar from './navbar'
import { Text, Flex, Box } from '@chakra-ui/react'

export default function Layout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - Dsshop' : 'Dsshop'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Flex flexDirection='column' justify='space-between' minHeight='100vh'>
                <Box as='header'>
                    <NavBar />
                </Box>
                {/* <Container maxW='container.xl' as='main' m='auto' mt='4' px='4'>
                    {children}
                </Container> */}
                <Box as='main' flexGrow={1}>
                    {children}
                </Box>
                <Flex as='footer' h='10' justify='center' alignItems='center' shadow='inner'>
                    <Text>Copyright © 2022 Dsshop</Text>
                </Flex>
            </Flex>
        </>
    )
}
