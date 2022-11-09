import NextLink from 'next/link'
import {
    Box,
    Flex,
    Link,
    HStack,
    Button,
    IconButton,
    ButtonGroup,
    useColorModeValue,
    useBreakpointValue
} from '@chakra-ui/react'
import { signIn } from "next-auth/react"
import { MenuIcon } from '@heroicons/react/outline'

export default function NavBar() {
    const isDesktop = useBreakpointValue({ base: false, lg: true })

    const handleSignIn = (e) => {
        e.preventDefault();
        signIn();
    }

    return (
        <Box as="section">
            <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                <Box py={{ base: '4', lg: '5' }} px={{ base: '4', lg: '5' }}>
                    <HStack spacing="10" justify="space-between">
                        {/* <Logo /> */}
                        <NextLink href="/" passHref>
                            <Link fontSize='3xl'>
                                Dsshop
                            </Link>
                        </NextLink>
                        {isDesktop ? (
                            <Flex justify="space-between" flex="1">
                                <ButtonGroup variant="link" spacing="8">
                                    {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                                    <Button key={item}>{item}</Button>
                                    ))}
                                </ButtonGroup>
                                <HStack spacing="3">
                                    <NextLink href="/cart" passHref>
                                        <Link>
                                            <Button variant="ghost">Cart</Button>
                                        </Link>
                                    </NextLink>
                                    <Button onClick={handleSignIn} variant="outline" colorScheme='pink'>Sign in</Button>
                                </HStack>
                            </Flex>
                        ) : (
                            <IconButton
                            variant="ghost"
                            icon={<MenuIcon fontSize="1.25rem" />}
                            aria-label="Open Menu"
                            />
                        )}
                    </HStack>
                </Box>
            </Box>
        </Box>
    )
}
