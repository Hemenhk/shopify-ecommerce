import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number | ((prevQuantity: number) => number)) => void;
}

const TheQuantitySelector: FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  const increaseQuantityHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <Flex flexDirection={"column"} gap={3}>
      <Text fontFamily={"inter"} fontSize={".8rem"}>
        Quantity:
      </Text>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={4}
        border={"1px"}
        borderColor={"#dbdbdb"}
        borderRadius={2}
        padding={"6px 20px"}
        w={125}
      >
        <AiOutlineMinus
          size={15}
          cursor={"pointer"}
          onClick={decreaseQuantityHandler}
        />
        <Text>{quantity}</Text>
        <AiOutlinePlus
          size={15}
          cursor={"pointer"}
          onClick={increaseQuantityHandler}
        />
      </Flex>
    </Flex>
  );
};

export default TheQuantitySelector;
