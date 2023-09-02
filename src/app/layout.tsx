"use client"

import ReduxProvider from "@/redux/reduxProvider";
import { Providers } from "./chakraProvider";
import { usePathname } from "next/navigation";

import { Flex } from "@chakra-ui/react";

import TheAnnouncement from "@/components/announcement/TheAnnouncement";
import TheFooter from "@/components/footer/TheFooter";
import MainNav from "@/components/navigation/MainNav";
import classes from "../styles/TheLayout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  
  

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&family=Noto+Sans:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <ReduxProvider>
        <Providers>
          <body>
            {isHomePage ? (
              <Flex className={classes.bg} flexDirection={"column"}>
                <Flex flexDirection={"column"}>
                  <TheAnnouncement />
                  <MainNav />
                </Flex>

                <main>{children}</main>

                <TheFooter />
              </Flex>
            ) : (
              <Flex flexDirection={"column"}>
                <Flex flexDirection={"column"}>
                  <MainNav />
                </Flex>
                <main>{children}</main>
                <TheFooter />
              </Flex>
            )}
          </body>
        </Providers>
      </ReduxProvider>
    </html>
  );
}
