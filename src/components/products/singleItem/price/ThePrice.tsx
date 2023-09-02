import React, { FC } from 'react'
import { Text } from "@chakra-ui/react";
import { Product } from 'shopify-buy';

interface PriceProps {
    product: Product
}

const ThePrice: FC<PriceProps> = ({product}) => {

    if (!product || !product.variants || product.variants.length === 0) {
        return <p>No pricing information available</p>; 
      }
    const comparePrice = product.variants[0].compareAtPrice ? (
        <>
          <Text fontFamily={"inter"} fontSize={"1.2rem"} color={"red.500"} pb={10}>
            {product.variants[0]?.price?.amount}{" "}
            {product.variants[0]?.price?.currencyCode}
          </Text>
          <Text
            fontFamily={"inter"}
            fontSize={"1.2rem"}
            color={"#6a6a6a"}
            textDecoration={"line-through"}
            pb={10}
          >
            {product.variants[0]?.compareAtPrice.amount}{" "}
            {product.variants[0]?.compareAtPrice.currencyCode}
          </Text>
        </>
      ) : (
        <>
          <Text fontFamily={"inter"} fontSize={"1.2rem"} pb={10}>
            {product.variants[0]?.price?.amount}{" "}
            {product.variants[0]?.price?.currencyCode}
          </Text>
        </>
      );
      return <>{comparePrice}</>;
}

export default ThePrice