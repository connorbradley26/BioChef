import Link from "next/link";
import UserAuth from "./user-auth";
import type { User } from "next-auth";

export default function NavBar({user}: {user?: User}) {
  const navBarItems = [
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

  return (
    <div className="navbar bg-base-100">
      {/* Mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {navBarItems.map((item) => {
              return (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ml-4 text-xl normal-case">BioChef</div>
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
        <UserAuth user={user} />
      </div>
    </div>
  );
}
