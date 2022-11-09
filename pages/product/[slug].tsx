import NextLink from 'next/link'
import Image from 'next/image'
import data from "../../utils/data"
import { useRouter } from "next/router"
import { product } from "@prisma/client"
import Layout from "../../components/layout"
import { Link, Button, Container, Grid, GridItem, List, ListItem, Heading, Text, Flex } from '@chakra-ui/react'

export default function ProductScreen() {
    const { query } = useRouter()
    const { slug } = query
    const product: product = data.products.find(x => x.slug === slug)

    if (!product)
        return (
            <Layout title="Product not found">
                Product not found!
            </Layout>
        )

    return (
        <Layout title={product.name}>
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <NextLink href="/" passHref>
                    <Link>
                        <Button variant='outline'>&lsaquo; Back to products</Button>
                    </Link>
                </NextLink>

                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    <GridItem colSpan={2}>
                        <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive"></Image>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <List spacing={3}>
                            <ListItem><Heading as='h1'>{product.name}</Heading></ListItem>
                            <ListItem><Text>Category: {product.category_id}</Text></ListItem>
                            <ListItem><Text>Description: {product.desc}</Text></ListItem>
                        </List>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex flexDir='column' p={5} shadow='md' borderWidth='1px' rounded='10px'>
                            <Flex justify='space-between'>
                                <Text>Price</Text>
                                <Text>${product.price}</Text>
                            </Flex>
                            <Flex justify='space-between'>
                                <Text>Status</Text>
                                <Text>In stock</Text>
                                {/* <Text>${product.stock > 0 ? 'In stock' : 'Unavailable'}</Text> */}
                            </Flex>
                            <NextLink href="/add-to-cart" passHref>
                                <Link>
                                    <Button variant="solid" mt={4} w='100%'>Add to cart</Button>
                                </Link>
                            </NextLink>
                        </Flex>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    )
}
