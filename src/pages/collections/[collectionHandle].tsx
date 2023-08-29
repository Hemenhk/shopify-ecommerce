import React, { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/redux/store";
import { fetchCollectionWithHandle } from "@/redux/shopify-shop/shopActions";

import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";



const Collection: FC = () => {
  const collection = useSelector((state: RootState) => state.collection.collection);
  console.log(collection)
  const router = useRouter();
  const collectionHandle =
    (router.query.collectionHandle as string) || undefined;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (collectionHandle) {
      dispatch(fetchCollectionWithHandle(collectionHandle));
    }
  }, [dispatch, collectionHandle]);

  if (collection.length === 0) {
    return <div>Loading...</div>;
  }
  
  const collectionTitle = collection[0]?.title

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
        {collection.length > 0 &&
          collection.map((item: any) => (
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
                    <Text
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      color="white"
                      fontFamily={"inter"}
                      fontWeight="bold"
                      fontSize="12px"
                      textAlign={"center"}
                      textTransform={"uppercase"}
                      bg="rgba(0, 0, 0, 0.8)"
                      padding={"10px 15px"}
                      borderRadius="2px"
                    >
                      Out of Stock
                    </Text>
                  )}
                </Link>
                <Flex flexDirection={"column"} gap={3} pt={5}>
                  <Text
                    fontFamily={"noto sans"}
                    fontWeight={500}
                    textTransform={"uppercase"}
                    w={200}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    letterSpacing={1}
                  >
                    {item?.title}
                  </Text>
                  <Flex gap={5}>
                    {/* <CollectionPrice
                      price={item?.variants[0].price}
                      comparePrice={item?.variants[0].compareAtPrice}
                    /> */}
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
