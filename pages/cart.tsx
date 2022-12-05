import NextLink from 'next/link'
import { useContext } from "react"
import { useRouter } from "next/router"
import { Store } from "../utils/store"
import { Box, Link, Grid, GridItem, Container, Table, Thead, Tr, Th, Tbody, Td, Image, Button, Flex, Text, List, ListItem, Heading, Select } from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'
import Layout from "../components/layout"
import dynamic from 'next/dynamic'

function CartScreen() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const {
        cart: { cartItems }
    } = state

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }

    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty)
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    }

    return (
        <Layout title="Shopping cart">
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <Heading as='h1' mb={4} fontSize='xl'>Shopping cart</Heading>
                {
                    cartItems.length === 0 ? (
                        <Box>Cart is empty.
                            <NextLink href="/" passHref>
                                <Link fontSize='xl'>
                                    Go shopping
                                </Link>
                            </NextLink>
                        </Box>
                    ) : (
                        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
                            <GridItem overflowX='auto' colSpan={{ md: 3 }}>
                                <Table minW='full'>
                                    <Thead borderBottom='1px'>
                                        <Tr>
                                            <Th px={5} textAlign='left'>Item</Th>
                                            <Th px={5} textAlign='right'>Quantity</Th>
                                            <Th px={5} textAlign='right'>Price</Th>
                                            <Th px={5} textAlign='center'>Action</Th>
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
                                                            />
                                                            &nbsp;
                                                            {item.name}
                                                        </Link>
                                                    </NextLink>
                                                </Td>
                                                <Td px={5} textAlign='right'>
                                                    <Select value={item.quantity} onChange={e => updateCartHandler(item, e.target.value)}>
                                                        {
                                                            // DO NOT FORGET TO CHANGE 5 BY THE QUANTITY AVAILABLE IN STOCK
                                                            [...Array(5).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Td>
                                                <Td px={5} textAlign='right'>${item.price}</Td>
                                                <Td px={5} textAlign='center'>
                                                    <Button onClick={() => removeItemHandler(item)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Flex flexDir='column' p={5} shadow='md' borderWidth='1px' rounded='10px'>
                                    <List spacing={3}>
                                        <ListItem>
                                            <Text pb={3} fontSize='xl'>
                                                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Button w='full' onClick={() => router.push('login?redirect=/shipping')}>
                                                Check Out
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Flex>
                            </GridItem>
                        </Grid>
                    )
                }
            </Container>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
