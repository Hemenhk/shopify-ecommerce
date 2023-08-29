import React, { FC } from "react";
import { Button } from "@chakra-ui/react";

import classes from "./styles/TheButton.module.css";

interface ButtonProps {
  label: string;
  onClick: () => {};
  height: string;
  disabled: boolean;
}

const TheButton: FC<ButtonProps> = ({ label, onClick, height, disabled }) => {
  return (
    <Button
      w="100%"
      h={"40px" || height}
      fontFamily={"noto sans"}
      fontSize={"1rem"}
      fontWeight={"400"}
      letterSpacing={2}
      textTransform={"uppercase"}
      bgGradient={"linear(to-r, white 50%, black 50%)"}
      bgSize={"200% 100%"}
      bgPosition={"right bottom"}
      color={"#fff"}
      border={"1px solid black"}
      borderRadius={2}
      transition={"all 0.5s ease-out"}
      _hover={{
        backgroundPosition: "left bottom",
        color: "#000",
      }}
      onClick={onClick}
      className={classes.btn}
      isDisabled={disabled}
    >
      {label}
    </Button>
  );
};

export default TheButton;
