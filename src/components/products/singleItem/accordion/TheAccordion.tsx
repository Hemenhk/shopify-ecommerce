import { FC } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Metafield } from "shopify-buy";

interface AccordionProps {
  metafields: Metafield[];
}

const TheAccordion: FC<AccordionProps> = ({ metafields }) => {
  const metaFieldsMap = metafields.slice(0, 3).map((field: any, idx: any) => (
    <AccordionItem key={idx} p={"1rem"}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton display={"flex"} justifyContent={"space-between"}>
              <Box as="span" textAlign="left">
                <Text
                  fontFamily={"inter"}
                  fontSize={".8rem"}
                  fontWeight={"300"}
                  letterSpacing={2}
                  textTransform={"uppercase"}
                >
                  {field.key}
                </Text>
              </Box>
              {isExpanded ? (
                <AiOutlineMinus width={20} />
              ) : (
                <AiOutlinePlus width={20} />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            fontFamily={"inter"}
            fontSize={".8rem"}
            fontWeight={400}
            letterSpacing={0.5}
            lineHeight={1.75}
          >
            <Text whiteSpace={"break-spaces"}> {field.value}</Text>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  ));
  return (
    <Accordion allowMultiple w={450}>
      {metaFieldsMap}
    </Accordion>
  );
};

export default TheAccordion;
