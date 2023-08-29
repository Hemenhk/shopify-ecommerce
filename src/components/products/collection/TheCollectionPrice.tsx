import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

interface Price {
  amount: string;
  currencyCode: string;
}

interface ComparePrice {
  amount: string;
  currencyCode: string;
}

interface CollectionPriceProps {
  comparePrice: ComparePrice;
  price: Price;
}

const TheCollectionPrice: FC<CollectionPriceProps> = ({
  comparePrice,
  price,
}) => {
  const comparePrices = comparePrice ? (
    <>
      <Text fontFamily={"inter"} fontSize={"1.1rem"} color={"red.500"} pb={10}>
        {price.amount} {price.currencyCode}
      </Text>
      <Text
        fontFamily={"inter"}
        fontSize={"1.1rem"}
        color={"#6a6a6a"}
        textDecoration={"line-through"}
        pb={10}
      >
        {comparePrice.amount} {comparePrice.currencyCode}
      </Text>
    </>
  ) : (
    <>
      <Text fontFamily={"inter"} fontSize={"1.2rem"} pb={10}>
        {price.amount} {price.currencyCode}
      </Text>
    </>
  );
  return <>{comparePrices}</>;
};

export default TheCollectionPrice;
