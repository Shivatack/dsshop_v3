import data from '../utils/data'
import { product } from '@prisma/client'
import Layout from '../components/layout'
import ProductItem from '../components/product-item'
import { Container, SimpleGrid } from '@chakra-ui/react'

export default function Home() {
    return (
        <Layout title='Home Page'>
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <SimpleGrid minChildWidth='250px' spacing='40px'>
                    {data.products.map((product: product) => (
                        <ProductItem product={product} key={product.slug} />
                    ))}
                </SimpleGrid>
            </Container>
        </Layout>
    )
}
