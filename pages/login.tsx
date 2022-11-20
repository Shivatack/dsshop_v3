import NextLink from "next/link"
import Layout from "../components/layout"
import { useForm } from 'react-hook-form'
import { VStack, Container, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Button, Text, Link, Heading, Flex } from "@chakra-ui/react"

export default function LoginScreen() {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const submitHandler = ({ email, password }) => {
        console.log(email, password);
    }
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

    return (
        <Layout title="Login">
            <Container maxW='container.xl' m='auto' mt='10' mb='10' px='4'>
                <VStack as="form" mx='auto' maxW='container.md' onSubmit={handleSubmit(submitHandler)}>
                    <Heading as='h1' mb={4} fontSize='xl'>Login</Heading>
                    <FormControl mb={4} isInvalid={!!errors?.email?.message}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" {...register('email', { required: 'Please enter email.', pattern: { value: email_regex, message: 'Please enter a valid email.' } })} w='full' autoFocus />
                        {errors?.email?.message ?
                            (
                                <FormErrorMessage>{errors?.email?.message.toString()}</FormErrorMessage>
                            ) : (
                                <FormHelperText>No one will be able to use your email except us.</FormHelperText>
                            )
                        }
                    </FormControl>
                    <FormControl mb={4} isInvalid={!!errors?.password?.message}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" {...register('password', { required: 'Please enter password', pattern: { value: password_regex, message: 'Please enter a valid password' } })} w='full' autoFocus />
                        {errors?.password?.message ?
                            (
                                <FormErrorMessage>{errors?.password?.message.toString()}</FormErrorMessage>
                            ) : (
                                <FormHelperText>8 to 15 characters with at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit, and 1 special character.</FormHelperText>
                            )
                        }
                    </FormControl>
                    <Button mb={4} w='50%' variant="solid" type="submit">Login</Button>
                    <Flex w='full' align='flex-start'>
                        <Text mb={4} fontSize='lg'>Don&apos;t have an account? &nbsp;</Text>
                        <NextLink href="/register" passHref>
                            <Link fontSize='lg' fontWeight='bold'>
                                Register
                            </Link>
                        </NextLink>
                    </Flex>
                </VStack>
            </Container>
        </Layout>
    )
}
