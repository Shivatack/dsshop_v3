import Header from '../components/header';
import Layout from '../components/layout';
import { useSession } from "next-auth/react";
import Head from 'next/head';

export default function Dashboard() {
    const { data: session } = useSession();

    if (session)
        return (
            <Layout>
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="User dashboard." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <h1 className=''>
                    Hello <b>{ session.user.name }</b>!
                </h1>
            </Layout>
        )
    // maybe to complete with an "else"
}
