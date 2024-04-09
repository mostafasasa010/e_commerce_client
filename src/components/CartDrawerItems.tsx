import {
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IProduct } from "../interfaces";
import { Link as LinkRouter } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCart } from "../app/features/cartSlice";

const CartDrawerItems = ({ id, attributes }: IProduct) => {
  const { cartProduct } = useSelector(selectCart);
  const dispatch = useDispatch();
  const removeItemHandler = (id: number) => {
    const product = cartProduct.filter((item: IProduct) => item.id === id);
    dispatch(removeFromCart(Array.from(product)));
  };

  return (
    <>
      <Flex py={"16px"} gap={"12px"}>
        <Stack>
          <Image
            boxSize={"80px"}
            rounded={"full"}
            objectFit={"cover"}
            src={attributes?.thumbnail?.data?.attributes?.url}
            alt={attributes?.thumbnail?.data?.attributes?.alternativeText}
          />
        </Stack>
        <Flex flexDir={"column"} gap={"8px"} flexGrow={1}>
          <Stack>
            <Link
              as={LinkRouter}
              to={`/products/${id}`}
              fontSize={"18px"}
              fontWeight={"semibold"}
              width={"fit-content"}
            >
              {attributes.title}
            </Link>
          </Stack>
          <Flex gap={"16px"} alignItems={"center"}>
            <Text>
              Price: $
              {attributes.price && attributes.discountPercentage
                ? Math.ceil(
                    (attributes.price ?? 0) -
                      (attributes.discountPercentage ?? 0)
                  )
                : attributes?.price && Math.ceil(attributes.price ?? 0)}{" "}
              USD
            </Text>
          </Flex>
          <Flex
            gap={"8px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text>
              Category:{" "}
              <Link
                as={LinkRouter}
                fontWeight={"semibold"}
                to={`/categories/${attributes?.categories?.data[0]?.id}`}
              >
                {attributes?.categories?.data[0]?.attributes?.title}
              </Link>
            </Text>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              variant={"outline"}
              size="sm"
              onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItems;
