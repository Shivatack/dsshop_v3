import React from 'react';
import NavBar from './navbar'
// import styles from '../styles/layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <div className='flex flex-col items-center white'>
                <div className="container">
                    {children}
                </div>
            </div>
        </>
    );
}
