import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import classes from "../styles/TheFooter.module.css"
const TheFooterAddress: FC = () => {
  return (
    <Flex flexDirection={"column"}>
    <Text
      pb={4}
      fontFamily={"noto sans"}
      fontWeight={"400"}
      letterSpacing={1}
    >
      AKKADIAN
    </Text>
    <Text
      fontFamily={"inter"}
      fontWeight={"400"}
      fontSize={".9rem"}
      letterSpacing={1}
      w={"60%"}
      className={classes.address}
    >
      Sjöjungfruvägen 11, 58574, Linköping, Sverige
    </Text>
  </Flex>
  )
}

export default TheFooterAddress