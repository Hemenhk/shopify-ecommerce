"use client";
import React, { FC, useEffect } from "react";

import { RootState, useAppDispatch } from "../redux/store";

import { Flex } from "@chakra-ui/react";
import {
  createCheckout,
  fetchCollectionWithHandle,
  fetchCheckout,
} from "@/redux/shopify-shop/shopActions";
import TheHero from "@/components/hero/TheHero";

// import classes from "./styles/HomePage.module.css";
import Collection from "./collections/[collectionHandle]/page";
import { useSelector } from "react-redux";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const checkout = useSelector((state: RootState) => state.shop.checkout);
  const checkoutId = localStorage.getItem("checkout_id");
  console.log("ID", checkoutId);

  const completedOrder = checkout.completedAt;

  const hair: string = "hair";

  useEffect(() => {
    if (completedOrder) {
      dispatch(createCheckout());
    }
    if (!checkoutId) {
      dispatch(createCheckout());
    }
    if (checkoutId) {
      dispatch(fetchCheckout(checkoutId));
    }

    dispatch(fetchCollectionWithHandle(hair));
  }, [dispatch, checkoutId, completedOrder]);

  return (
    <Flex
      flexWrap={"wrap"}
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      pb={10}
      // className={classes.hero_container}
    >
      <Flex
        h={600}
        w={"100vw"}
        justifyContent={"flex-start"}
        flexDirection={"column"}
        gap={10}
      >
        <Flex
          position={"relative"}
          top={"40%"}
          pl={"30px"}
          // className={classes.hero_container}
        >
          <TheHero />
        </Flex>
      </Flex>
      <Flex pt={200}>
        <Collection />
      </Flex>
    </Flex>
  );
};

export default HomePage;
