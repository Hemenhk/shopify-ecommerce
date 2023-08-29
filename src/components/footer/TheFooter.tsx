import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import TheFooterAddress from "./footer-address/TheFooterAddress";
import TheFooterMenu from "./footer-menu/TheFooterMenu";

import classes from "./styles/TheFooter.module.css";
const TheFooter: FC = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"2rem"}
      h={"300px"}
      bg={"#efefef"}
      className={classes.container}
    >
      <Flex className={classes.footer_menus}>
        <TheFooterAddress />
        <TheFooterMenu />
      </Flex>
      <Flex flexDirection={"column"} pb={5} className={classes.copyright}>
        <Text
          pb={2}
          fontFamily={"noto sans"}
          fontWeight={"400"}
          letterSpacing={1}
        >
          © AKKADIAN
        </Text>
        <Text
          fontFamily={"inter"}
          fontWeight={"400"}
          fontSize={".9rem"}
          letterSpacing={1}
        >
          Powered by Shopify
        </Text>
      </Flex>
    </Flex>
  );
};

export default TheFooter;
