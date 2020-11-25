import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
export default function CartItem(props) {
  const { quantity, product, price, description, removeCartItem } = props;

  return (
    <Box>
      <Flex justify="space-between">
        <Text>{quantity}x</Text>
        <Text>{product}</Text>
        <Text>${price}</Text>
      </Flex>
      <Flex justify="center">
        <Text fontSize="xs">
          {description}
        </Text>
      </Flex>
      <div className="space"></div>
      <Button colorScheme="teal" size="xs" onClick={() => {
        console.log(product);
        plusOneCartItem(product)
      }}>
        Add One
      </Button>
      <Button colorScheme="teal" size="xs" onClick={() => {
        console.log(product);
        deleteOneCartItem(product)
      }}>
        Remove One
      </Button>
      <Button colorScheme="red" size="xs" onClick={() => {
        console.log(product);
        removeCartItem(product)
      }}>
        Delete
      </Button>
      <div className="space"></div>
      <div className="space"></div>
      <hr />
    </Box>
  );
}
