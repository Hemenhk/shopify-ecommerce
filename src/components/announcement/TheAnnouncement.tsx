import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

import classes from "./styles/TheAnnouncement.module.css";

const TheAnnouncement: FC = () => {
  return (
    <Flex bg={"#000"} h={"5vh"} justifyContent={"center"} alignItems={"center"}>
      <Text
        fontFamily={"inter"}
        fontSize={".8rem"}
        fontWeight={"400"}
        letterSpacing={2}
        color={"#fff"}
        className={classes.p}
      >
        ALWAYS FREE SHIPPING WORLD WIDE
      </Text>
    </Flex>
  );
};

export default TheAnnouncement;
