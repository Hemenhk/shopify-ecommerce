import React, { useState, FC } from "react";
import Image from "next/image";
import { Flex, Box, Button } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { Image as ImageInterface } from "shopify-buy";

interface ImageProps {
  images: ImageInterface[];
  available: boolean;
}

const TheImageCarousel: FC<ImageProps> = ({ images, available }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex <= 2) {
      setCurrentImageIndex((prevIdx) => prevIdx + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIdx) => prevIdx - 1);
    }
  };

  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <Flex
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      mt={3}
      gap={5}
    >
      <Image
        src={images[currentImageIndex]?.src || images[0]?.src}
        alt="product"
        width={400}
        height={400}
        style={{ opacity: available ? 1 : 0.5 }}
      />

      {images.length > 1 ? (
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={10}>
          <Button
            onClick={prevImage}
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "transparent" }}
          >
            <MdKeyboardArrowLeft size={20} />
          </Button>
          <Flex>
            {images.map((_, index) => (
              <Box
                key={index}
                w="8px"
                h="8px"
                borderRadius="50%"
                bg={index === currentImageIndex ? "#000" : "transparent"}
                border={
                  index === currentImageIndex
                    ? "1px solid #000"
                    : "1px solid #cecece"
                }
                mx={1}
              />
            ))}
          </Flex>

          <Button
            onClick={nextImage}
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "transparent" }}
          >
            <MdKeyboardArrowRight size={20} />
          </Button>
        </Flex>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default TheImageCarousel;
