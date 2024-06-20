import { Box, SimpleGrid, Image, Text, Heading, VStack, Checkbox, CheckboxGroup, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const sampleProducts = [
  { id: 1, name: "Smartphone", price: 699, image: "https://via.placeholder.com/150", category: "Electronics", brand: "Brand A" },
  { id: 2, name: "Laptop", price: 999, image: "https://via.placeholder.com/150", category: "Electronics", brand: "Brand B" },
  { id: 3, name: "Smartwatch", price: 199, image: "https://via.placeholder.com/150", category: "Accessories", brand: "Brand A" },
  { id: 4, name: "Headphones", price: 149, image: "https://via.placeholder.com/150", category: "Accessories", brand: "Brand C" },
];

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    filterProducts();
  }, [searchQuery]);

  const filterProducts = () => {
    let products = sampleProducts;

    if (searchQuery) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      products = products.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedBrands.length > 0) {
      products = products.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    products = products.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(products);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">Our Products</Heading>
      <Box mb={6}>
        <Heading as="h4" size="md" mb={4}>Filter By:</Heading>
        <VStack align="start" spacing={4}>
          <Box>
            <Text fontWeight="bold">Category</Text>
            <CheckboxGroup onChange={handleCategoryChange}>
              <Stack spacing={2} direction="column">
                <Checkbox value="Electronics">Electronics</Checkbox>
                <Checkbox value="Accessories">Accessories</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          <Box>
            <Text fontWeight="bold">Brand</Text>
            <CheckboxGroup onChange={handleBrandChange}>
              <Stack spacing={2} direction="column">
                <Checkbox value="Brand A">Brand A</Checkbox>
                <Checkbox value="Brand B">Brand B</Checkbox>
                <Checkbox value="Brand C">Brand C</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          <Box>
            <Text fontWeight="bold">Price Range</Text>
            <Slider
              aria-label="price-range"
              defaultValue={[0, 1000]}
              min={0}
              max={1000}
              step={10}
              onChangeEnd={handlePriceChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} index={0} />
              <SliderThumb boxSize={6} index={1} />
            </Slider>
            <Text>Price: ${priceRange[0]} - ${priceRange[1]}</Text>
          </Box>
          <Button onClick={filterProducts} colorScheme="teal">Apply Filters</Button>
        </VStack>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map(product => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={product.image} alt={product.name} />
            <VStack align="start" mt={4}>
              <Text fontWeight="bold">{product.name}</Text>
              <Text>${product.price}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;