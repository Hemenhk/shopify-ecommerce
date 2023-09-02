"use client"
import React, { FC, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useHover } from "@uidotdev/usehooks";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";

import TheCartDrawer from "./cart-drawer/TheCartDrawer";
import TheCartTotal from "./cart-drawer/TheCartTotal";

import classes from "./styles/TheCartIcon.module.css";

interface CartProps {
  isHovered: boolean;
}

const CartIcon: FC<CartProps> = ({ isHovered }) => {
  if (typeof window !== "undefined") {
    // Check if localStorage is available before using it
    localStorage.getItem("checkout_id");
    // Use checkoutId as needed
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hoverRef, isCartHovered] = useHover<HTMLButtonElement>();

  const btnRef = useRef<HTMLButtonElement>();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const checkout = useSelector((state: RootState) => state.checkout.checkout);
  const isCartOpen = useSelector(
    (state: RootState) => state.checkout.isCartOpen
  );
  // console.log("Checkout in CartIcon:", checkout);

  const gradientValue = isHomePage
    ? `${isHovered ? "white 50%, black 50%" : "white 50%, transparent 50%"}`
    : !isHomePage && "white 50%, black 50%";

  const bgValue = isHomePage
    ? `${!isHovered ? "transparent" : "black"}`
    : "black";

  const hasLineItems = checkout.lineItems && checkout.lineItems.length > 0;
  return (
    <>
      <Button
        ref={btnRef && hoverRef}
        onClick={onOpen}
        backgroundColor={bgValue}
        w={"75px"}
        borderRadius={"30px"}
        cursor={"pointer"}
        bgGradient={`linear(to-r, ${gradientValue})`}
        bgSize={"200% 100%"}
        bgPosition={"right bottom"}
        color={"#fff"}
        border={`${isHovered ? "1px solid black" : "1px solid white"}`}
        transition={"all 0.5s ease-out"}
        _hover={{
          backgroundPosition: "left bottom",
          color: "#000",
        }}
      >
        <Flex alignItems={"center"} gap={2}>
          <HiOutlineShoppingBag size={25} />
          {hasLineItems && (
            <div
              className={`${classes.indicator} ${
                isHovered && isCartHovered && classes.hovered
              }
                }`}
            ></div>
          )}
        </Flex>
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen || isCartOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"#fafafa"}>
          <DrawerCloseButton size={"lg"} />
          <DrawerHeader
            fontFamily={"noto sans"}
            fontWeight={"400"}
            letterSpacing={2}
            borderBottomWidth="1px"
            mb={8}
          >
            CART
          </DrawerHeader>
          <DrawerBody>
            <TheCartDrawer />
          </DrawerBody>
          <DrawerFooter justifyContent={"center"}>
            <DrawerBody>
              <TheCartTotal />
            </DrawerBody>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartIcon;
