import Image from 'next/image';
import { Fragment } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function LoginButton() {
    const { data: session } = useSession();

    const handleSignin = (e) => {
        e.preventDefault();
        signIn();
    }

    const handleSignout = (e) => {
        e.preventDefault();
        signOut();
    }

    if (session) {
        return (
            < Menu as="div" className="ml-3 relative" >
                <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <Image
                            className="h-8 w-8 rounded-full"
                            // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            src={session.user.image}
                            alt=""
                            width={36}
                            height={36}
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            <p className='block text-gray-700 px-4 py-2 text-sm font-bold'>
                                { session.user.name }
                            </p>
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Your Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={handleSignout}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                >
                                    Sign out
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu >
        )
    }
    return (
        <>
            {/* Not signed in <br /> */}
            <button onClick={handleSignin} className={'text-gray-300 hover:bg-gray-700 hover:text-white'}>Sign in</button>
        </>
    )
}
