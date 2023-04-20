import { getCurrentUser } from "@/lib/session";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function Hero({user}: {user?: User}) {

    return (
        <div className="min-h-[calc(100vh_-_4rem)] hero ">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-primary before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-neutral after:via-secondary after:blur-3xl after:content-[''] ">
                        <Image
                            src="/biochef-transparent.png"
                            alt="Bio Chef"
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                    </div>
                    <h1 className="text-5xl font-bold">Bio Chef</h1>
                    <p className="py-6">
                        Luxury health and wellness brand that analyses users
                        biological make up and provides a custom meal plan along
                        with personal chefs within your home.
                    </p>
                    {user ? (
                        <div className="flex justify-center gap-4 ">
                        <Link href="/meal-plans">
                            <button className="btn btn-primary">
                                My Meal Plans
                            </button>
                        </Link>
                        <Link href="/nutritional-information">
                            <button className="btn btn-primary">
                                My Nutrition
                            </button>
                        </Link>
                        </div>
                    ) : (
                        <Link href="/subscribe">
                            <button className="btn btn-primary">Get Started</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}