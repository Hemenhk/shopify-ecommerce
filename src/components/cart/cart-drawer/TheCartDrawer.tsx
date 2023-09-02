import React, { FC } from 'react'
import { useSelector } from "react-redux";

import { Flex } from "@chakra-ui/react";


import { removeLineItem } from '@/redux/shopify-shop/shopActions';
import { RootState } from '@/redux/store';
import TheCartItem from './TheCartItem';


const TheCartDrawer: FC = () => {
    const { checkout } = useSelector((state: RootState) => state.checkout);
    console.log("Items in checkout",checkout)
  
    return (
      <Flex flexDirection={"column"}>
        {checkout.lineItems?.length ? (
          checkout.lineItems.map((item) => (
            <TheCartItem
              removeLineItem={removeLineItem}
              key={item.id}
              id={item.id}
              image={item.variant.image.src}
              price={item.variant.price.amount}
              title={item.title}
              currency={item.variant.price.currencyCode}
              quantity={item.quantity}
              variant={item.variant}
            />
          ))
        ) : (
          <Flex justifyContent={"center"}>Your cart is empty!</Flex>
        )}
      </Flex>
    );
}

export default TheCartDrawer