import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
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
        <>
            Signed in as {session.user.email} <br />
            <button onClick={handleSignout}>Sign out</button>
        </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={handleSignin}>Sign in</button>
        </>
    )
}
