import { type AppProps } from "next/app";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";
import { Inter as FontSans } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs"

import { api } from "@/lib/api";

import "./globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-inter",
})


export type NextPageWithLayout<Props> = NextPage<Props> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout= AppProps & {
    Component: NextPageWithLayout<AppProps>;
} 

function MyApp({ Component, pageProps: {  ...pageProps } }: AppPropsWithLayout) {
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

    return  <ClerkProvider {...pageProps}>    {layout}</ClerkProvider>;
}

export default api.withTRPC(MyApp);
