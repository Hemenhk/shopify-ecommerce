import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import { useHover } from "@uidotdev/usehooks";

import logo from "../../assets/images/logo.png";
import TheSideNav from "./sidenav/TheSideNav";
import TheCartIcon from "../cart/TheCartIcon"
import Link from "next/link";

const MainNav = () => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  return (
    <Flex
      h={125}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={10}
      borderBottomWidth={1}
      transition={".3s ease-out"}
      _hover={{
        backgroundColor: "#fff",
      }}
      ref={hoverRef}
    >
      <TheSideNav isHovered={isHovered} />
      <Link href="/">
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <Flex>
        <TheCartIcon isHovered={isHovered}/>
      </Flex>
    </Flex>
  );
};

export default MainNav;
