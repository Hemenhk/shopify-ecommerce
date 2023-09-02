import { useState, FC } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { ProductVariant } from "shopify-buy";

interface VariantProps {
  variants: ProductVariant[];
}

const TheVariants: FC<VariantProps> = ({ variants }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<any>(null);
  const selectVariants =
    variants && variants.length > 1
      ? variants.map((variant) => (
          <Box
            key={variant.id}
            cursor="pointer"
            borderWidth="1px"
            borderRadius="2px"
            borderColor={selectedVariantId === variant.id ? "#000" : "#dbdbdb"}
            transition={".2s ease-out"}
            _hover={{
              borderColor: "#000",
            }}
            px={5}
            py={3}
            onClick={() => {
              setSelectedVariantId(variant.id);
            }}
          >
            <Text
              fontFamily={"noto sans"}
              fontSize={"12px"}
              fontWeight={"500"}
              textTransform={"uppercase"}
              letterSpacing={1}
            >
              {variant.title}
            </Text>
          </Box>
        ))
      : "";

  return (
    <Flex gap={5} flexDirection={"column"}>
      <Flex flexWrap={"wrap"} gap={3}>
        {selectVariants}
      </Flex>
    </Flex>
  );
};

export default TheVariants;
