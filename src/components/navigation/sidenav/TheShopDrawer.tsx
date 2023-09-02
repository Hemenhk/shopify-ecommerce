import React, { FC, useState } from "react";
import Link from "next/link";

import { BiChevronDown } from "react-icons/bi";
import { Flex } from "@chakra-ui/react";

import classes from "./styles/TheShopDrawer.module.css";

const TheShopDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDrawerHandler = () => setIsOpen(!isOpen);
  return (
    <>
      <Flex flexDirection={"column"}>
        <Flex
          alignItems={"center"}
          gap={3}
          onClick={openDrawerHandler}
          className={classes.parent_link}
          letterSpacing={"2px"}
        >
          Shop
          <BiChevronDown
            size={20}
            className={isOpen ? classes.chevron_up : classes.chevron_down}
          />
        </Flex>
        <ul
          className={`${classes.nested_drawer} ${
            isOpen ? classes.nested_drawer_open : classes.nested_drawer_closed
          }`}
        >
          <li>
            <Link href="/collections/beard">Beard</Link>
          </li>
          <li>
            <Link href="/collections/hair">Hair</Link>
          </li>
          <li>
            <Link href="/collections/bundle">Kits</Link>
          </li>
        </ul>
      </Flex>
    </>
  );
};

export default TheShopDrawer;
