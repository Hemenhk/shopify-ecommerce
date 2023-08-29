import React, { FC } from "react";
import Link from "next/link";
import { Flex, Button, Heading, Text } from "@chakra-ui/react";

import classes from "./styles/TheHero.module.css";

const TheHero: FC = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      pl={10}
      h={"600px"}
      w={"60%"}
      gap={5}
      className={classes.container}
    >
      <Heading fontFamily={"noto sans"} letterSpacing={0.6} color={"#fff"}>
        Style your hair with the sea!
      </Heading>
      <Text
        fontFamily={"inter"}
        fontSize={"1rem"}
        fontWeight={"500"}
        letterSpacing={0.6}
        color={"#dbdbdb"}
      >
        Unlock incredible texture and a high hold with a matte finish, with our
        sea salt spray!
      </Text>
      <Link href="/products/sea-salt-spray">
        <Button
          w="200px"
          h={"50px"}
          fontFamily={"noto sans"}
          fontSize={".9rem"}
          fontWeight={"500"}
          letterSpacing={1}
          textTransform={"uppercase"}
          bgGradient={"linear(to-r, transparent 50%, white 50%)"}
          bgSize={"200% 100%"}
          bgPosition={"right bottom"}
          color={"#000"}
          border={"1px solid white"}
          borderRadius={2}
          transition={"all 0.5s ease-out"}
          _hover={{
            backgroundPosition: "left bottom",
            backgroundColor: "transparent",
            color: "#fff",
          }}
          className={classes.btn}
        >
          View Product
        </Button>
      </Link>
    </Flex>
  );
};

export default TheHero;
