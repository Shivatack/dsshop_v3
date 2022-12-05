import { Flex, Text } from "@chakra-ui/react"
import React from "react"

export default function CheckoutWizard({ activeStep = 0 }) {
    return (
        <Flex mb={5} flexWrap='wrap'>
            {
                ['User login', 'Shipping address', 'Payment method', 'Place order'].map(
                    (step, index) => (
                        <Text
                            key={step}
                            borderBottom={`${index == activeStep ? '3px solid' : '1px solid'}`}
                            borderBottomColor={`${index < activeStep ? 'indigo' : (index > activeStep ? 'gray.400' : 'pink.500')}`}
                            color={`${index < activeStep ? 'indigo' : (index > activeStep ? 'gray.400' : 'pink.500')}`}
                            flex={1}
                            textAlign='center'
                            fontWeight={`${index == activeStep ? 'bold' : 'normal'}`}
                            py={3}
                            display={index == activeStep ? 'block' : { base: 'none', md: 'block' }}
                        >
                            {step}
                        </Text>
                    )
                )
            }
        </Flex>
    )
}
