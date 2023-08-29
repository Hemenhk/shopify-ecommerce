import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";

import TheShopDrawer from "./TheShopDrawer";

import classes from "./styles/TheNavLinks.module.css";

const TheNavLinks: FC = () => {
  return (
    <Flex flexDirection={"column"}>
      <ul className={classes.nav}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <TheShopDrawer />
        </li>

        <li>
          <Link href={"/faq"}>Faq</Link>
        </li>
      </ul>
    </Flex>
  );
};

export default TheNavLinks;
