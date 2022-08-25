import Image from 'next/image';
import LoginButton from './login-btn';
import CustomLink from './custom-link';
import { useRouter } from 'next/router';

import { Disclosure } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const router = useRouter();

    const navigation = [
        { name: 'Home', href: '/', current: router.asPath === '/'},
        { name: 'Dashboard', href: '/dashboard', current: router.asPath === '/dashboard' }
    ];

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="block lg:hidden h-8 w-auto">
                                        <Image
                                            src="https://tailwindui.com/img/logos/workflow-mark.svg"
                                            alt="Workflow"
                                            width={36}
                                            height={36}
                                        />
                                    </div>
                                    <div className="hidden lg:block h-8 w-auto">
                                        <Image
                                            className='bg-white rounded-lg'
                                            src="https://tailwindui.com/img/logos/workflow-mark.svg"
                                            alt="Workflow"
                                            width={36}
                                            height={36}
                                        />
                                    </div>
                                </div>
                                <div className='hidden sm:block sm:ml-6'>
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <CustomLink
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </CustomLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <LoginButton />
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
