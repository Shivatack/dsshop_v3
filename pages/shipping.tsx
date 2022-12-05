import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import CheckoutWizard from "../components/checkout-wizard"
import Layout from "../components/layout"
import { Store } from "../utils/store"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function ShippingScreen() {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm()
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress } = cart
    const router = useRouter()

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('city', shippingAddress.city)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('country', shippingAddress.country)
    }, [setValue, shippingAddress])

    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country, location }
        })

        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalCode,
                    country
                }
            })
        )

        router.push('/payment')
    }

    return (
        <Layout title="Shipping Address">
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <CheckoutWizard activeStep={1} />

                <VStack as="form" mx='auto' maxW='container.md' onSubmit={handleSubmit(submitHandler)}>
                    <Heading as='h1' mb={4} fontSize='xl'>Shipping address</Heading>

                    <FormControl mb={4} isInvalid={!!errors?.fullName?.message}>
                        <FormLabel htmlFor="fullName">Full name</FormLabel>
                        <Input type="text" id="fullName" {...register('fullName', { required: 'Please enter full name.' })} w='full' autoFocus />
                        {
                            errors?.fullName?.message &&
                            <FormErrorMessage>{errors?.fullName?.message.toString()}</FormErrorMessage>
                        }
                    </FormControl>

                    <FormControl mb={4} isInvalid={!!errors?.address?.message}>
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <Input type="text" id="address" {...register('address', { required: 'Please enter address.', minLength: { value: 3, message: 'Address is more than 2 characters.' } })} w='full' />
                        {
                            errors?.address?.message &&
                            <FormErrorMessage>{errors?.address?.message.toString()}</FormErrorMessage>
                        }
                    </FormControl>

                    <FormControl mb={4} isInvalid={!!errors?.city?.message}>
                        <FormLabel htmlFor="city">City</FormLabel>
                        <Input type="text" id="city" {...register('city', { required: 'Please enter city.' })} w='full' />
                        {
                            errors?.city?.message &&
                            <FormErrorMessage>{errors?.city?.message.toString()}</FormErrorMessage>
                        }
                    </FormControl>

                    <FormControl mb={4} isInvalid={!!errors?.postalCode?.message}>
                        <FormLabel htmlFor="postalCode">Postal code</FormLabel>
                        <Input type="text" id="postalCode" {...register('postalCode', { required: 'Please enter postal code.' })} w='full' />
                        {
                            errors?.postalCode?.message &&
                            <FormErrorMessage>{errors?.postalCode?.message.toString()}</FormErrorMessage>
                        }
                    </FormControl>

                    <FormControl mb={4} isInvalid={!!errors?.country?.message}>
                        <FormLabel htmlFor="country">Country</FormLabel>
                        <Input type="text" id="country" {...register('country', { required: 'Please enter country.' })} w='full' />
                        {
                            errors?.country?.message &&
                            <FormErrorMessage>{errors?.country?.message.toString()}</FormErrorMessage>
                        }
                    </FormControl>

                    <Button mb={4} w='50%' variant="solid" colorScheme='pink' type="submit">Next</Button>
                </VStack>
            </Container>
        </Layout>
    )
}
