import React, { FC } from "react";

import { Text } from "@chakra-ui/react";

interface TextProps {
  text: string | number;
  position?: string | any;
  top?: string;
  left?: string;
  transform?: string;
  color?: string;
  pb?: string;
  bg?: string;
  padding?: string;
  textAlign?: string;
}

const TheText: FC<TextProps> = ({
  text,
  position,
  top,
  left,
  transform,
  color,
  pb,
  bg,
  padding,
  textAlign,
}) => {
  return (
    <Text
      fontFamily={"noto sans"}
      fontWeight={500}
      textTransform={"uppercase"}
      w={200}
      whiteSpace={"nowrap"}
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      letterSpacing={1}
      position={position}
      top={top}
      left={left}
      transform={transform}
      color={color}
      pb={pb}
      bg={bg}
      padding={padding}
      textAlign={textAlign}
    >
      {text}
    </Text>
  );
};

export default TheText;
