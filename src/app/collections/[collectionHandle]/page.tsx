"use client";

import React, { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";
import { fetchCollectionWithHandle } from "@/redux/shopify-shop/shopActions";

import { Card, CardBody, Flex, Heading } from "@chakra-ui/react";

import TheCollectionPrice from "@/components/products/collection/TheCollectionPrice";
import TheText from "@/components/ui/TheText";

const Collection: FC = ({params}) => {
  const collection = useSelector(
    (state: RootState) => state.collection.collection
  );
  const dispatch = useAppDispatch();
  const collectionHandle = params

  useEffect(() => {
    if (collectionHandle) {
      dispatch(fetchCollectionWithHandle(collectionHandle));
    }
  }, [dispatch, collectionHandle]);

  if (collection.length === 0) {
    return <div>Loading...</div>;
  }

  const collectionTitle = collection?.title;

  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={5} padding={10}>
      <Heading
        fontSize={"1.4rem"}
        fontFamily={"inter"}
        fontWeight={"400"}
        letterSpacing={2}
      >
        {collectionTitle}
      </Heading>
      <Flex flexWrap={"wrap"} justifyContent={"center"} gap={5}>
        {collection.products.length > 0 &&
          collection.products.map((item: any) => (
            <Card key={item?.id}>
              <CardBody opacity={item.availableForSale ? 1 : 0.5}>
                <Link href={`/products/${item.handle}`}>
                  <Flex>
                    <Image
                      alt="product image"
                      src={item?.images[0]?.src}
                      width={200}
                      height={200}
                    />
                  </Flex>
                  {!item.availableForSale && (
                    <TheText
                      text={"Out of Stock"}
                      position={"absolute"}
                      top={"40%"}
                      left={"10%"}
                      color={"white"}
                      bg={"rgba(0, 0, 0, 0.8)"}
                      padding={"10px 15px"}
                      textAlign={"center"}
                    />
                  )}
                </Link>
                <Flex flexDirection={"column"} gap={3} pt={5}>
                  <TheText text={item?.title} />

                  <Flex gap={5}>
                    <TheCollectionPrice
                      price={item?.variants[0].price}
                      comparePrice={item?.variants[0].compareAtPrice}
                    />
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
      </Flex>
    </Flex>
  );
};

export default Collection;
