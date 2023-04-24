
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {

    const { data: session } = useSession();
    // If user is signed in, show their avatar and a logout button
    if (session) {
        return (
            <div className="relative mr-2 dropdown " data-test="loggedin">
                <label className="avatar">
                    <div
                        tabIndex={0}
                        className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {session.user.image ? (
                            <Image
                                src={session.user.image}
                                alt="Your Avatar"
                                width={30}
                                height={30}
                            />
                        ) : (
                            <Image
                                src="/avatar.svg"
                                alt="Your Avatar"
                                width={30}
                                height={30}
                            />
                        )}
                    </div>
                </label>
                <ul
                    tabIndex={0}
                    className="right-0 px-4 py-2 mt-5 text-right shadow menu menu-compact dropdown-content bg-base-100 rounded-box ">
                    <li className="" onClick={() => signOut()}>
                        Logout
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <button className="btn btn-primary" data-test="login" onClick={() => signIn()}>
            Login
        </button>
    );
}
