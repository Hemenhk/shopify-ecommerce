import type { AppProps } from "next/app";

import {Provider} from "react-redux"
import { ChakraProvider } from "@chakra-ui/react";

import TheLayout from "@/components/layout/TheLayout";
import store from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} >
    <ChakraProvider>
      <TheLayout>
        <Component {...pageProps} />
      </TheLayout>
    </ChakraProvider></Provider>
  );
}
