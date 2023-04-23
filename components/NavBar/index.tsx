import Link from "next/link";
import LoginButton from "./LoginButton";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function NavBar() {
    let navBarItems = [];
    const { data: user } = useSession();

    if (!user) {
        navBarItems = [
            {
                name: "Home",
                link: "/",
            },
            {
                name: "Subscribe",
                link: "/subscribe",
            },
        ];
    } else {
        navBarItems = [
            {
                name: "Home",
                link: "/",
            },
            {
                name: "Nutritional Informaton",
                link: "/nutritional-information",
            },
            {
                name: "Meal Plans",
                link: "/meal-plans",
            },
        ];
    }

    return (
        <div className="navbar ">
            {/* Mobile */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        {navBarItems.map((item) => {
                            return (
                                <li key={item.name}>
                                    <Link href={item.link}>{item.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex items-center h-full ml-4 text-xl normal-case">
                    <Image src="/biochef-transparent.png" alt="Bio Chef Logo" width={40} height={40}/>
                    <p className="ml-3 font-bold">BioChef</p>
                </div>
            </div>
            {/* Desktop */}
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    {navBarItems.map((item) => {
                        return (
                            <li key={item.name}>
                                <Link href={item.link}>{item.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="navbar-end">
                <LoginButton />
            </div>
        </div>
    );
}
