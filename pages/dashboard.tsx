import Layout from '../components/layout';
import { useSession } from "next-auth/react";
import Head from 'next/head';
import useSWR from 'swr';
import { User } from '@prisma/client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { data: session } = useSession();

    const { data } = useSWR<User>('/api/user', (url: string) => fetch(url).then((res) => res.json()));
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birthdate, setBirthdate] = useState<string>("");

    // const { data } = useSWR<User>('/api/user', (url: string) => fetch(url).then((res) => res.json()));
    // const [, ] = useState<>();
    // const [, ] = useState<>();
    // const [, ] = useState<>();
    // const [, ] = useState<>();
    // const [, ] = useState<>();
    // const [, ] = useState<>();


    useEffect(() => {
        if (data)
        {
            setUsername(data.name);
            setEmail(data.email);
        }
    }, [data]);
    if (!data) return <div>LOADING...</div>;

    function handleChange(e) {
        // setUsername(e.target.value);
        // console.log(username);
    }

    function handleUserChange(setUserAttribute, e) {
        setUserAttribute(e.target.value);
        // setTimeout(() => {
            // console.log(username);
            // console.log(email);
        // }, 3000);
    }

    function saveData(e) {
        e.preventDefault();

        console.log(username);
        console.log(email);
    }

    if (session)
    {
        return (
            <Layout>
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="User dashboard." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <h1 className=''>
                    Hello <b>{ username }</b>!
                </h1>

                <p>{ data.created_at.toString() }</p>

                <form action="" onSubmit={saveData} className='w-full max-w-lg'>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label htmlFor='name' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Name</label>
                            <input type="text" id='name' name="name" value={username} onChange={(e) => handleUserChange(setUsername, e)} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
                        </div>
                        <div className="w-full px-3">
                            <label htmlFor='email' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Email</label>
                            <input type="text" id='email' name="email" value={email} onChange={(e) => handleUserChange(setEmail, e)} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
                        </div>
                        <div className="w-full px-3">
                            <label htmlFor='phone' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone</label>
                            <input type="text" id='phone' name="phone" value={phone} onChange={(e) => handleUserChange(setPhone, e)} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
                        </div>
                        <div className="w-full px-3">
                            <label htmlFor='birthdate' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Birthdate</label>
                            <input type="date" id='birthdate' name="birthdate" value={birthdate} onChange={(e) => handleUserChange(setBirthdate, e)} className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </Layout>
        )
    }
    // maybe to complete with an "else"
}
