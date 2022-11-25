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
    useBreakpointValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/store'
import { useSession } from 'next-auth/react'
// import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import { MenuIcon } from '@heroicons/react/outline'
import Cookies from 'js-cookie'

export default function NavBar() {
    const { status, data: session } = useSession()
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0)

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])

    const isDesktop = useBreakpointValue({ base: false, lg: true })

    // const handleSignIn = (e) => {
    //     e.preventDefault();
    //     signIn();
    // }

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
                                    {status === 'loading' ? (
                                        'Loading'
                                    ) : session?.user ? (
                                        <Menu>
                                            <MenuButton
                                                aria-label='Options'
                                            >
                                                {session.user.name}
                                            </MenuButton>
                                            <MenuList>
                                                <NextLink href="/profile" passHref>
                                                    <MenuItem>
                                                        <Link>
                                                            Profile
                                                        </Link>
                                                    </MenuItem>
                                                </NextLink>
                                                <NextLink href="/order-history" passHref>
                                                    <MenuItem>
                                                        <Link>
                                                            Order history
                                                        </Link>
                                                    </MenuItem>
                                                </NextLink>
                                                <MenuItem onClick={() => { Cookies.remove('cart'); dispatch({ type: 'CART_RESET' }); signOut({ callbackUrl: '/login' }); }}>
                                                    <Link>
                                                        Sign out
                                                    </Link>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                        // <Box>
                                        //     {session.user.name}
                                        //     <Button variant="outline" onClick={() => signOut()} colorScheme='pink'>Sign out</Button>
                                        // </Box>
                                    ) : (
                                        <NextLink href="/login" passHref>
                                            <Link>
                                                <Button variant="outline" colorScheme='pink'>Sign in</Button>
                                            </Link>
                                        </NextLink>
                                    )
                                    }
                                </HStack>
                            </Flex>
                        ) : (
                            // <IconButton
                            //     variant="ghost"
                            //     icon={<MenuIcon fontSize="1.25rem" />}
                            //     aria-label="Open Menu"
                            // />
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<MenuIcon fontSize="1.25rem" />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuGroup title='Profile'>
                                        {status === 'loading' ? (
                                            <MenuItem>
                                                Loading
                                            </MenuItem>
                                        ) : session?.user ? (
                                            <>
                                                <NextLink href="/profile" passHref>
                                                    <MenuItem>
                                                        <Link>
                                                            Profile
                                                        </Link>
                                                    </MenuItem>
                                                </NextLink>
                                                <NextLink href="/order-history" passHref>
                                                    <MenuItem>
                                                        <Link>
                                                            Order history
                                                        </Link>
                                                    </MenuItem>
                                                </NextLink>
                                                <MenuItem onClick={() => { Cookies.remove('cart'); dispatch({ type: 'CART_RESET' }); signOut({ callbackUrl: '/login' }); }}>
                                                    <Link>
                                                        Sign out
                                                    </Link>
                                                </MenuItem>
                                            </>
                                        ) : (
                                            <NextLink href="/login" passHref>
                                                <MenuItem>
                                                    <Link>
                                                        Sign in
                                                    </Link>
                                                </MenuItem>
                                            </NextLink>
                                        )
                                        }
                                    </MenuGroup>
                                    <MenuGroup title='Menu'>
                                        {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                                            <NextLink key={item} href={`/${item}`} passHref>
                                                <MenuItem>
                                                    {item}
                                                    <Link>
                                                    </Link>
                                                </MenuItem>
                                            </NextLink>
                                        ))}
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        )}
                    </HStack>
                </Box>
            </Box>
        </Box>
    )
}
