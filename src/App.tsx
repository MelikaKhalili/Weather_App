import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Router from "./router/Router";

function App() {
  return (
    <>
      <ChakraProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Router />
      </ChakraProvider>
    </>
  );
}

export default App;
