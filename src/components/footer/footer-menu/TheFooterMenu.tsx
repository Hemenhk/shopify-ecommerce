import React, { FC } from 'react'

import { Flex, Text } from "@chakra-ui/react";

const TheFooterMenu: FC = () => {
  return (
    <Flex flexDirection={"column"} gap={2}>
    <Text
      pb={4}
      fontFamily={"noto sans"}
      fontWeight={"400"}
      letterSpacing={1}
    >
      Side menu
    </Text>
    <Text
      fontFamily={"inter"}
      fontWeight={"400"}
      fontSize={".9rem"}
      letterSpacing={1}
    >
      About us
    </Text>
    <Text
      fontFamily={"inter"}
      fontWeight={"400"}
      fontSize={".9rem"}
      letterSpacing={1}
    >
      Terms & Conditions
    </Text>
    <Text
      fontFamily={"inter"}
      fontWeight={"400"}
      fontSize={".9rem"}
      letterSpacing={1}
    >
      Contact us
    </Text>
  </Flex>
  )
}

export default TheFooterMenu