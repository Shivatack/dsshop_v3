import prisma from '../../../lib/prisma'
import { hash } from 'argon2'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '@prisma/client'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return
    }

    const { name, email, password } = req.body

    if (!name || !email || !email.includes('@') || !password || password.trim().length < 8 || password.trim().length > 15) {
        res.status(422).json({
            message: 'Validation error'
        })
        return
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email } })

    if (existingUser) {
        res.status(422).json({
            message: 'User already exists!'
        })
        return
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: await hash(password),
            role: Role.USER
        }
    })

    res.status(201).send({
        message: 'Created user!',
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    })
}

export default handler
