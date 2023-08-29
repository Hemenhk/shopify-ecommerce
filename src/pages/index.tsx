import React, { FC, useEffect } from "react";

import { RootState, useAppDispatch } from "../redux/store";

import { Flex } from "@chakra-ui/react";
import {
  createCheckout,
  fetchCollectionWithHandle,
} from "@/redux/shopify-shop/shopActions";
import TheHero from "@/components/hero/TheHero";

import classes from "./styles/HomePage.module.css";
import Collection from "./collections/[collectionHandle]";
import { useSelector } from "react-redux";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const checkout = useSelector((state: RootState) => state.shop.checkout);
  // console.log("Checkout in app.js", checkout);

  // const completedOrder = checkout.completedAt;

  const hair: string = "hair";

  useEffect(() => {
    dispatch(createCheckout());
    dispatch(fetchCollectionWithHandle(hair));
  }, [dispatch]);

  return (
    <Flex
      flexWrap={"wrap"}
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      pb={10}
      className={classes.hero_container}
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
          className={classes.hero_container}
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
