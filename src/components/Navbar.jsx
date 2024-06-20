import { Box, Flex, HStack, Link, IconButton, useDisclosure, Stack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Box bg="teal.500" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <FaTimes /> : <FaBars />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box color="white" fontWeight="bold" fontSize="xl">ElectroShop</Box>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <Link as={RouterLink} to="/" color="white">Home</Link>
              <Link as={RouterLink} to="/products" color="white">Products</Link>
              <Link as={RouterLink} to="/contact" color="white">Contact Us</Link>
            </HStack>
          </HStack>
        <InputGroup maxW="md" ml="auto">
            <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
            <Input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearchChange} />
          </InputGroup>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              <Link as={RouterLink} to="/" onClick={onClose}>Home</Link>
              <Link as={RouterLink} to="/products" onClick={onClose}>Products</Link>
              <Link as={RouterLink} to="/contact" onClick={onClose}>Contact Us</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;