import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if user is authenticated
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    //...
    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            });

            return res.status(200).json(user);
        } catch (e) {
            console.log("API ERROR: " + e.message);
            return res.status(404).json({ message: 'User not found.' });
        }
    }
}
