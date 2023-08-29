import React, { FC } from "react";

import MainNav from "../navigation/MainNav";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import classes from "./styles/TheLayout.module.css";
import TheAnnouncement from "../announcement/TheAnnouncement";
import TheFooter from "../footer/TheFooter";

interface LayoutProps {
  children: any;
}

const TheLayout: FC<LayoutProps> = (props) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <Flex className={classes.bg}>
      {isHomePage ? (
        <Flex flexDirection={"column"}>
          <Flex flexDirection={"column"}>
            <TheAnnouncement />
            <MainNav />
          </Flex>

          <main>{props.children}</main>

          <TheFooter />
        </Flex>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default TheLayout;
