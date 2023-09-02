import React, { FC } from "react";
import { useAppDispatch } from "@/redux/store";

import { updateLineItem } from "@/redux/shopify-shop/shopActions";

import { Flex, Image, Text } from "@chakra-ui/react";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CheckoutLineItem, ProductVariant } from "shopify-buy";

// interface CartItemProps {
//   id: string
//   image: string
//   price ;
//   title;
//   currency;
//   quantity;
//   removeLineItem;
//   variant;
// }

const TheCartItem: FC<CheckoutLineItem> = (props) => {
  const dispatch = useAppDispatch();

  const {
    id,
    image,
    price,
    title,
    currency,
    quantity,
    removeLineItem,
    variant,
  } = props;
  const removeItemHandler = () => {
    dispatch(removeLineItem(id));
  };

  const itemIncreaseHandler = () => dispatch(updateLineItem(id, quantity + 1));

  const itemDecreaseHandler = () => dispatch(updateLineItem(id, quantity - 1));

  console.log(props.id);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      mb={5}
      pb={8}
      gap={5}
      borderBottomWidth="1px"
    >
      <Flex alignItems={"center"} ml={10}>
        <Image src={image} w={"200px"} />
      </Flex>
      <Flex gap={4} flexDirection={"column"} mr={20}>
        <Flex flexDirection={"column"} gap={1.5}>
          <Text
            fontFamily={"noto sans"}
            fontWeight={"400"}
            fontSize=".8rem"
            letterSpacing={1.5}
            textTransform={"uppercase"}
            w={150}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {title}
          </Text>
          {variant.title === "Default Title" ? (
            ""
          ) : (
            <Text
              fontFamily={"noto sans"}
              fontWeight={"400"}
              fontSize=".6rem"
              letterSpacing={1.5}
              textTransform={"uppercase"}
              w={150}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              s
            >
              {variant.title}
            </Text>
          )}

          <Text fontFamily={"inter"} fontSize={".9rem"}>
            {currency} {""}
            {price}
          </Text>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"space-between"} gap={3}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
            border={"1px"}
            borderColor={"#dbdbdb"}
            borderRadius={2}
            padding={"6px"}
          >
            <AiOutlineMinus
              size={15}
              cursor={"pointer"}
              onClick={itemDecreaseHandler}
            />
            <Text>{quantity}</Text>
            <AiOutlinePlus
              size={15}
              cursor={"pointer"}
              onClick={itemIncreaseHandler}
            />
          </Flex>
          <Flex>
            <BsTrash3 cursor={"pointer"} onClick={removeItemHandler} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TheCartItem;
