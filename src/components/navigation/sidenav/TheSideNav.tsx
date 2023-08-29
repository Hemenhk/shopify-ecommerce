import React, { FC, useRef } from "react";

import { FiMenu } from "react-icons/fi";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import TheNavLinks from "./TheNavLinks";
// import NavLinks from "../navlinks/NavLinks";

interface SideNavProps {
  isHovered: boolean;
}

const TheSideNav: FC<SideNavProps> = ({ isHovered }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const isHomePage = router.pathname === "/";

  const colorValue = isHomePage
    ? `${isHovered ? "black" : "white"}`
    : !isHomePage && "black";
  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        color={colorValue}
        backgroundColor={"transparent"}
        cursor={"pointer"}
        _hover={{ backgroundColor: "transparent" }}
      >
        <FiMenu size={40} />
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"#fafafa"}>
          <DrawerHeader mb={20}>
            <DrawerCloseButton size={"lg"} />
          </DrawerHeader>

          <DrawerBody><TheNavLinks /></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TheSideNav;
