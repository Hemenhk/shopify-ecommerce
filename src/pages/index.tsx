import React, { FC, useEffect } from "react";

import { useAppDispatch } from "../redux/store";

import { Flex } from "@chakra-ui/react";
import { fetchCollectionWithHandle } from "@/redux/shopify-shop/shopActions";
import TheHero from "@/components/hero/TheHero";

import classes from "./styles/HomePage.module.css";
import Collection from "./collections/[collectionHandle]";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const hair: string = "hair";

  useEffect(() => {
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
