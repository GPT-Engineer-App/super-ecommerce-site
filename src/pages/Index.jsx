import React, { useState } from "react";
import { Box, Flex, Grid, Image, Text, Button, Heading, Container, VStack, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MHx8fHwxNzEzOTkxMzcyfDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNofGVufDB8fHx8MTcxMzk5MTM3Mnww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 3,
    name: "Portable Speaker",
    price: 50.0,
    image: "https://images.unsplash.com/photo-1612205625197-3ac48e5a572c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXJ8ZW58MHx8fHwxNzEzOTkxMzcyfDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const addToCart = (product) => {
    setCart((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);
      if (itemExists) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decrementQuantity = (productId) => {
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0));
  };

  return (
    <Container maxW="container.xl">
      <Heading my="4">E-Commerce Store</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {products.map((product) => (
          <Box key={product.id} p="5" shadow="md" borderWidth="1px">
            <Image src={product.image} alt={product.name} />
            <Text mt="2" fontSize="xl" fontWeight="semibold" lineHeight="short">
              {product.name}
            </Text>
            <Text>${product.price.toFixed(2)}</Text>
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Box>
        ))}
      </Grid>
      <VStack align="stretch" mt="8">
        <Heading size="lg">Shopping Cart</Heading>
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          cart.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Text fontWeight="bold">{item.name}</Text>
              <HStack>
                <IconButton icon={<FaMinus />} onClick={() => decrementQuantity(item.id)} />
                <Text>{item.quantity}</Text>
                <IconButton icon={<FaPlus />} onClick={() => incrementQuantity(item.id)} />
              </HStack>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              <IconButton icon={<FaTrash />} onClick={() => removeFromCart(item.id)} />
            </HStack>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
