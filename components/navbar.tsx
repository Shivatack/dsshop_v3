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
import { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/store'
import { signIn } from "next-auth/react"
import { MenuIcon } from '@heroicons/react/outline'

export default function NavBar() {
    const { state } = useContext(Store)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0)

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])

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
                                            <Button variant="ghost">
                                                Cart {cartItemsCount > 0 && (
                                                    <Box as='span' marginLeft={1} rounded='full' bg='red.600' px={2} py={1} fontSize='xs' fontWeight='bold' color='white'>
                                                        {cartItemsCount}
                                                    </Box>
                                                )}
                                            </Button>
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
