import NextLink from 'next/link'
import { Box, Button, Container, Flex, Grid, GridItem, Heading, Image, Link, List, ListItem, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import CheckoutWizard from "../components/checkout-wizard"
import Layout from "../components/layout"
import { Store } from '../utils/store'
import { useRouter } from "next/router"
import axios from 'axios'
import { getError } from '../utils/error'
import Cookies from "js-cookie"

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { cartItems, shippingAddress, paymentMethod } = cart
    const router = useRouter()
    const toast = useToast()

    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100

    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

    useEffect(() => {
        if (!paymentMethod)
            router.push('/payment')
    }, [paymentMethod, router])

    const [loading, setLoading] = useState(false)

    const placeOrderHandler = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })

            setLoading(false)

            dispatch({ type: 'CART_CLEAR_ITEMS' })

            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: []
                })
            )

            router.push(`/order/${data.id}`)
        } catch (err) {
            setLoading(false)

            toast({
                title: 'Error:',
                description: getError(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            })
        }
    }

    return (
        <Layout title="Place order">
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <CheckoutWizard activeStep={3} />

                <Heading as='h1' mb={4} fontSize='xl'>Place order</Heading>

                {
                    cartItems.length === 0 ?
                        (
                            <Box>Cart is empty.
                                <NextLink href="/" passHref>
                                    <Link fontSize='xl'>
                                        Go shopping
                                    </Link>
                                </NextLink>
                            </Box>
                        ) : (
                            <Grid
                                templateAreas={{
                                    base: `
                                        "shipping"
                                        "payment"
                                        "items"
                                        "summary"
                                    `,
                                    sm: `
                                        "shipping"
                                        "payment"
                                        "items"
                                        "summary"
                                    `,
                                    md: `
                                        "shipping summary"
                                        "payment summary"
                                        "items summary"
                                    `
                                }}
                                gridTemplateColumns={{ base: '1fr', sm: '1fr', md: '3fr 1fr' }}
                                gap={5}
                            >
                                <GridItem area={'summary'} height='fit-content' p={5} shadow='md' borderWidth='1px' rounded='10px'>
                                    <Heading as='h2' mb={4} fontSize='lg'>Order summary</Heading>

                                    <List spacing={3}>
                                        <ListItem>
                                            <Flex justify='space-between'>
                                                <Text>Items</Text>
                                                <Text>${itemsPrice}</Text>
                                            </Flex>
                                        </ListItem>

                                        <ListItem>
                                            <Flex justify='space-between'>
                                                <Text>Tax</Text>
                                                <Text>${taxPrice}</Text>
                                            </Flex>
                                        </ListItem>

                                        <ListItem>
                                            <Flex justify='space-between'>
                                                <Text>Shipping</Text>
                                                <Text>${shippingPrice}</Text>
                                            </Flex>
                                        </ListItem>

                                        <ListItem>
                                            <Flex justify='space-between'>
                                                <Text>Total</Text>
                                                <Text>${totalPrice}</Text>
                                            </Flex>
                                        </ListItem>

                                        <ListItem>
                                            <Button
                                                disabled={loading}
                                                onClick={placeOrderHandler}
                                                w="full"
                                                variant="solid"
                                                colorScheme="pink"
                                            >
                                                {loading ? 'Loading...' : 'Place order'}
                                            </Button>
                                        </ListItem>
                                    </List>
                                </GridItem>

                                <GridItem area={'shipping'} p={5} shadow='md' borderWidth='1px' rounded='10px'>
                                    <Heading as='h2' mb={4} fontSize='lg'>Shipping address</Heading>

                                    <Text>
                                        {shippingAddress.fullName}
                                        <br />
                                        {shippingAddress.address}
                                        <br />
                                        {shippingAddress.city}
                                        <br />
                                        {shippingAddress.postalCode}
                                        <br />
                                        {shippingAddress.country}
                                    </Text>

                                    <NextLink href="/shipping" passHref>
                                        <Link fontSize='lg'>
                                            <Button variant="solid" colorScheme="pink" mt={4}>Edit</Button>
                                        </Link>
                                    </NextLink>
                                </GridItem>

                                <GridItem area={'payment'} p={5} shadow='md' borderWidth='1px' rounded='10px'>
                                    <Heading as='h2' mb={4} fontSize='lg'>Payment method</Heading>

                                    <Text>
                                        {paymentMethod}
                                    </Text>

                                    <NextLink href="/payment" passHref>
                                        <Link fontSize='lg'>
                                            <Button variant="solid" colorScheme="pink" mt={4}>Edit</Button>
                                        </Link>
                                    </NextLink>
                                </GridItem>

                                <GridItem area={'items'} p={5} shadow='md' borderWidth='1px' rounded='10px'>
                                    <Heading as='h2' mb={4} fontSize='lg'>Order items</Heading>

                                    <Table minW='full' display={{ base: 'none', sm: 'table' }}>
                                        <Thead borderBottom='1px'>
                                            <Tr>
                                                <Th px={5} textAlign='left' fontWeight="bold">Item</Th>
                                                <Th px={5} textAlign='right' fontWeight="bold">Quantity</Th>
                                                <Th px={5} textAlign='right' fontWeight="bold">Price</Th>
                                                <Th px={5} textAlign='right' fontWeight="bold">Subtotal</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {cartItems.map((item) => (
                                                <Tr key={item.slug} borderBottom='1px'>
                                                    <Td>
                                                        <NextLink href={`/product/${item.slug}`} passHref>
                                                            <Link display='flex' flexDirection='row' alignItems='center'>
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    width={50}
                                                                    height={50}
                                                                    mr={3}
                                                                />
                                                                &nbsp;
                                                                {item.name}
                                                            </Link>
                                                        </NextLink>
                                                    </Td>
                                                    <Td px={5} textAlign='right'>{item.quantity}</Td>
                                                    <Td px={5} textAlign='right'>${item.price}</Td>
                                                    <Td px={5} textAlign='right'>${item.quantity * item.price}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>

                                    <Table minW='full' display={{ base: 'table', sm: 'none' }}>
                                        <Tbody>
                                            {cartItems.map((item) => (
                                                <Tr key={item.slug} borderBottom='1px'>
                                                    <Tr>
                                                        <Th px={5} textAlign='left' fontWeight="bold">Item</Th>
                                                        <Td textAlign='right'>
                                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                                <Link display='flex' flexDirection='row' alignItems='center'>
                                                                    {item.name}
                                                                    <Image
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        width={50}
                                                                        height={50}
                                                                        ml={3}
                                                                    />
                                                                </Link>
                                                            </NextLink>
                                                        </Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th px={5} textAlign='left' fontWeight="bold">Quantity</Th>
                                                        <Td px={5} textAlign='right'>{item.quantity}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th px={5} textAlign='left' fontWeight="bold">Price</Th>
                                                        <Td px={5} textAlign='right'>${item.price}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th px={5} textAlign='left' fontWeight="bold">Subtotal</Th>
                                                        <Td px={5} textAlign='right'>${item.quantity * item.price}</Td>
                                                    </Tr>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>

                                    <NextLink href="/cart" passHref>
                                        <Link fontSize='lg'>
                                            <Button variant="solid" colorScheme="pink" mt={4}>Edit</Button>
                                        </Link>
                                    </NextLink>
                                </GridItem>
                            </Grid>
                        )
                }
            </Container>
        </Layout>
    )
}
