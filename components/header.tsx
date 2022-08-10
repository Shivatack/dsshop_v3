import Link from 'next/link';
import LoginButton from '../components/login-btn';

export default function Header() {
    return (
        <div className='header'>
            <Link href={"/"}>Home</Link>
            <br />
            <LoginButton />
        </div>
    )
}
