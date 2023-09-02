"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Flex, Text } from "@chakra-ui/react";

import {
  addItemToCheckout,
  fetchProductWithHandle,
  fetchCheckout,
  createCheckout
} from "@/redux/shopify-shop/shopActions";

import TheButton from "@/components/ui/TheButton";
import TheText from "@/components/ui/TheText";
import { RootState, useAppDispatch } from "@/redux/store";
import TheImageCarousel from "@/components/products/singleItem/image-carousel/TheImageCarousel";
import TheVariants from "@/components/products/singleItem/variants/TheVariants";
import ThePrice from "@/components/products/singleItem/price/ThePrice";
import TheQuantitySelector from "@/components/products/singleItem/quantity-selector/TheQuantitySelector";
import TheAccordion from "@/components/products/singleItem/accordion/TheAccordion";

import classes from "./style.module.css";

const ProductDetailPage = ({ params }) => {
  const dispatch = useAppDispatch();
  const productHandle = params.productHandle;

  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const product = useSelector((state: RootState) => state.product.product);
  const metafields = useSelector(
    (state: RootState) => state.product.product.metafields
  );

  const checkoutId = localStorage.getItem("checkout_id");


  useEffect(() => {
    if (!checkoutId) {
      dispatch(createCheckout());
    }
    if (checkoutId) {
      dispatch(fetchCheckout(checkoutId));
    }

  }, [dispatch, checkoutId]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchProductWithHandle(productHandle));
    };

    fetchData();

    return fetchData;
  }, [dispatch, productHandle]);

  useEffect(() => {
    if (product.variants && product.variants.length === 1) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  const addItemToCartHandler = () => {
    if (selectedVariantId) {
      dispatch(addItemToCheckout(selectedVariantId, quantity));
      setQuantity(1);
    } else {
      console.log("Please select a variant before adding to cart.");
      return null;
    }
  };

  if (!product.title) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      className={classes.container}
      w={"100vw"}
      flexDirection={"row"}
      justifyContent={"center"}
      gap={10}
      padding={"5rem"}
      bgColor={"#fafafa"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={10}
      >
        <Flex flexDirection={"column"}>
          <TheImageCarousel
            images={product.images}
            available={product.availableForSale}
          />
        </Flex>
        <Flex className={classes.large_screen_accordion} w={400}>
          <TheAccordion metafields={metafields} />
        </Flex>
      </Flex>
      <Flex
        className={classes.info}
        position={"relative"}
        left={"50px"}
        w={"400px"}
        flexDirection={"column"}
        gap={10}
      >
        <Flex
          flexDirection={"column"}
          gap={3}
          className={classes.info_container}
        >
          <Text
            fontFamily={"inter"}
            fontSize={"1.4rem"}
            fontWeight={"400"}
            letterSpacing={1.5}
            textTransform={"uppercase"}
          >
            {product.title}
          </Text>
          <Flex
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={5}
            borderBottomWidth={1}
            pt={10}
            pb={5}
          >
            <ThePrice product={product} />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
          <TheVariants
            variants={product.variants}
            onVariantSelect={(variantId) => {
              setSelectedVariantId(variantId);
            }}
          />
        </Flex>
        <Flex>
          <TheQuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </Flex>
        <Flex
          className={classes.btn_container}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"3rem"}
          w={"400px"}
        >
          <TheButton
            label={product.availableForSale ? "Add to cart" : "Sold out"}
            onClick={selectedVariantId ? addItemToCartHandler : null}
            // disabled={!product.availableForSale || !selectedVariantId}
          />
          <Text
            className={classes.description}
            fontFamily={"inter"}
            fontSize={"1rem"}
            fontWeight={"400"}
            letterSpacing={0.5}
            lineHeight={1.75}
            whiteSpace={"break-spaces"}
          >
            {metafields[3]?.value}
          </Text>
          <Flex
            className={classes.smaller_screen_accordion}
            w={"90%"}
            justifyContent={"center"}
            pt={10}
          >
            <TheAccordion metafields={metafields} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductDetailPage;
