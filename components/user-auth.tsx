"use client";

import { signIn } from "next-auth/react";

export default function UserAuth() {
    return (
        <button className="btn btn-primary" onClick={() => signIn()}>
        Login
        </button>
    );
}