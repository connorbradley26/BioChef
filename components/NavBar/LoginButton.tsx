import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function LoginButton() {
    // const { isLoaded, isSignedIn, user } = useUser();

    return (
        <div className="relative mr-2 dropdown " data-test="loggedin">
            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
            </SignedOut>
        </div>
    );
}
