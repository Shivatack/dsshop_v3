// import { Order } from '@prisma/client'
// import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session)
        return res.status(401).send("Sign in required!")

    // const {user} = session

    /*
    orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
    */
    // const newOrder = new Order({
    //     ...req.body,
    //     user: user.id
    // })
}

export default handler
