import { Button, Container, Flex, Heading, Radio, RadioGroup, Stack, useToast, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CheckoutWizard from "../components/checkout-wizard"
import Layout from "../components/layout"
import { Store } from "../utils/store"
import Cookies from "js-cookie"

export default function PaymentScreen() {
    const { handleSubmit } = useForm()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress, paymentMethod } = cart
    const router = useRouter()
    const toast = useToast()
    const submitHandler = () => {
        if (!selectedPaymentMethod)
            return toast({
                title: 'Error:',
                description: 'Payment method is required!',
                status: 'error',
                duration: 9000,
                isClosable: true
            })

        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod })

        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod
            })
        )

        router.push('/placeorder')
    }

    useEffect(() => {
        if (!shippingAddress.address)
            router.push('/shipping')

        setSelectedPaymentMethod(paymentMethod || '')
    }, [paymentMethod, router, shippingAddress.address])

    return (
        <Layout title="Payment method">
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <CheckoutWizard activeStep={2} />

                <VStack as="form" mx='auto' maxW='container.md' onSubmit={handleSubmit(submitHandler)}>
                    <Heading as='h1' mb={4} fontSize='xl'>Payment method</Heading>

                    <RadioGroup onChange={setSelectedPaymentMethod} value={selectedPaymentMethod}>
                        <Stack direction='column'>
                            {
                                ['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                                    <Radio key={payment} value={payment} onChange={() => setSelectedPaymentMethod(payment)}>{payment}</Radio>
                                ))
                            }
                        </Stack>
                    </RadioGroup>

                    <Flex mb={4} w='50%' justify='space-between'>
                        <Button w='30%' variant="solid" onClick={() => router.push('/shipping')}>Back</Button>
                        <Button w='30%' variant="solid" colorScheme='pink' type="submit">Next</Button>
                    </Flex>
                </VStack>
            </Container>
        </Layout>
    )
}
