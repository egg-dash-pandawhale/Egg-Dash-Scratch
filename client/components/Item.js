import React, { useState } from "react";
import {
  Box,
  Badge,
  Heading,
  Flex,
  Image,
  Text,
  Button,
  Input,
  Center,
  InputGroup,
  InputLeftAddon,
  ButtonGroup,
  Container,
  Header,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";

export default function Item(props) {
  const { updateCart, productName, productDescription, productPicture, productPrice, productId, farmId } = props;
  const defaultState = {
    quantity: 1,
    productName: productName,
    farmName: farmId === 1 ? 'Welsh Farms': 'PepperRidge Farms',
    price: productPrice,
    productImage: productPicture,
    description: productDescription,
    productId
  };

  const [state, setState] = useState(defaultState);

  function incQuant(field) {
    console.log('pressed');
    let current = state.quantity;
    current += 1;
    setState({
      ...state,
      quantity: current,
    });
    return;
  }

  function decQuant(field) {
    console.log('decreased');
    let current = state.quantity;
    current -= 1;
    setState({
      ...state,
      quantity: current,
    });
    return;
  }

  const toast = useToast();

  return (
    <Box>
      <Flex direction='column' justify='center' align='center'>
        <Image
          borderRadius="md"
          src= {state.productImage}
          width='250px'
          height='275px'
        />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="green" mt={2}>
            Organic
          </Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="green.800"
          >
            &bull; {state.productName} &bull; Non-GMO
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          Farm: {state.farmName}
        </Text>
        <Text>${state.price}</Text>
      </Flex>
      <br />
      <NumberInput size="sm" min={1} defaultValue={1} onChange={incQuant}>
        <NumberInputField />
        <NumberInputStepper >
          <NumberIncrementStepper/>
          <NumberDecrementStepper/>
        </NumberInputStepper>
      </NumberInput>
      <br />
      <Center>
        <Button size="md" onClick={() => {
          updateCart(props.state.user.id, state.productId, state.quantity);
          toast({
            title: "Added to cart!",
            description: `Added ${state.quantity} ${state.productName} to cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          }
          }>
          Add To Cart
        </Button>
      </Center>
    </Box>
  );
}
