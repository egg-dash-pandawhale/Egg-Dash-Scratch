import React, { useState, useEffect } from "react";
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
  AspectRatio,
} from "@chakra-ui/react";
import Item from "./Item";
export default function Markets(props) {
  const { version, addToCart, id } = props;

  const [store, setStore] = useState([]);
  console.log('store from markets', store);

  useEffect(() => {
    async function cart() {
      const request = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(`/cart/${id}`, request);
      const data = await response.json();
      console.log('this is data from cart login:', data);
      props.setState({...props.state, cart: data})
    }
    cart();
  }, [props.state.user.id]);

  useEffect(()=> {
    async function me() {
      const request = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch("/products", request);
      const data = await response.json();
      console.log('from MEEE', data)

      setStore(data)
    }
    me();
  }, [])


  const itemArr = store.map(e=>{
    return <Item key={e.id} addToCart={addToCart} productName={e.name} productDescription={e.description} productPicture={e.pictureurl} productPrice={e.price} productId={e.id} farmId={e.farm_id}></Item>
  })

  return (
    <div>
      {version === true ? (
        <Container maxW="max" maxH="max">
          <Flex wrap="nowrap">
            <SimpleGrid mr="25px" columns={3} mt="25px" spacing={10}>
              {itemArr}
            </SimpleGrid>
            <AspectRatio width="50%" ratio={4 / 3}>
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDKZcIZIpR-E3EQterjyMpqZF8dnMmp_VM&q=NY+NY"
                alt="demo"
              />
            </AspectRatio>
          </Flex>
        </Container>
      ) : (
        <Container maxW="max" maxH="max">
          <SimpleGrid columns={4} mt="25px" spacing={10}>
            {itemArr}
          </SimpleGrid>
        </Container>
      )}
    </div>
  );
}
