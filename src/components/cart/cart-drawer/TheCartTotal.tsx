import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

import TheButton from "../../ui/TheButton";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TheCartTotal: FC = () => {
  const { checkout } = useSelector((state: RootState) => state.checkout);
  const { totalPrice } = checkout;

  return (
    <>
      {checkout.lineItems?.length ? (
        <Flex flexDirection={"column"} gap={5}>
          <Flex flexDirection={"column"} gap={5}>
            <Link href={checkout.webUrl}>
              <TheButton
                label={`Checkout - ${totalPrice.amount} ${totalPrice.currencyCode}`}
              />
            </Link>
          </Flex>
        </Flex>
      ) : (
        ""
      )}
    </>
  );
};

export default TheCartTotal;
