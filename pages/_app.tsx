import { type AppProps } from "next/app";
import { type Session } from "next-auth";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from 'next/font/google'

import { api } from "@/lib/api";

import "./globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-inter",
})


export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
} & {
    pageProps: {
        session: Session;
    };
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    const layout = getLayout(
        <main>
            <style jsx global>
                {`
                    :root {
                        --font-inter: ${fontSans.style.fontFamily};
                    }
                `}
            </style>
            <Component {...pageProps} />
        </main>
    );

    return <SessionProvider session={session}>{layout}</SessionProvider>;
}

export default api.withTRPC(MyApp);
