import React, { useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Badge,
  Heading,
  Flex,
  Input,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function NavbarL(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  let { emptyCart } = props;

  const toast = useToast();

  const { toggled, total, cart, updateCart, state, logout} = props;

  const cartArray = cart.map((e, i)=>{
    return <CartItem key={e.Product.id} quantity={e.quantity} product={e.Product.name} id={e.Product.id} price={e.Product.price} description={e.Product.description} state={state} updateCart={updateCart}></CartItem>
  })

  console.log('Cart from NavbarL: ', cartArray)

  return (
    <div className="navbarL">
      <>
        <Button margin="15px" ref={btnRef} colorScheme="green" onClick={onOpen}>
          Cart
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Shopping Cart</DrawerHeader>
              <DrawerBody>
                {cartArray}
              </DrawerBody>

              <DrawerFooter>
                <Box mr='20px'>
                  <Flex direction='column' justify='center' align='center'>
                  <Badge colorScheme='red'>Subtotal </Badge>${total}
                  </Flex>
                </Box>
                <Button variant="outline" onClick={emptyCart} mr={3} >
                  Empty Cart
                </Button>
                <Button color="blue" onClick={() => {

                  toast({
                    title: "Purchased!",
                    description: `You purchased $${total} worth of grocieries.`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  emptyCart()
                }}>Checkout</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>

      {/*********************************************************************/}
      <Button onClick={() => toggled()} margin="15px" bg="#bedbbb">
        Map
      </Button>
      <Menu>
        <MenuButton as={Button} bg="#bedbbb" margin="15px">
          Users
        </MenuButton>
        <MenuList>
          {/* <Link to='/'> */}
          <MenuItem onClick={() => {
            logout();
            toast({
              title: "Logged out!",
              description: `You have logged out of your account.`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }}>Log Out</MenuItem>
          {/* </Link> */}
        </MenuList>
      </Menu>
    </div>
  );
}
