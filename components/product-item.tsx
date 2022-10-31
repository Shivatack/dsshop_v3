import Link from 'next/link';
import { product } from '@prisma/client'
import { Box, Heading, Text, Image, Flex, Button } from '@chakra-ui/react'

export default function ProductItem({ product }: { product: product}) {
    return (
        <Box shadow='md' borderWidth='1px' rounded='10px'>
            <Link href={`/product/${product.slug}`}>
                <a>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderTopRadius='10px'
                    />
                </a>
            </Link>

            <Flex flexDir='column' p={5}>
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <Heading>{product.name}</Heading>
                    </a>
                </Link>

                <Text mt={4}>{product.desc}</Text>
                <Text mt={4}>{product.price}€</Text>
                <Link href="/add-to-cart">
                    <Button variant="solid" mt={4}>Add to cart</Button>
                </Link>
            </Flex>
        </Box>
    )
}
