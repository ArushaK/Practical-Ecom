import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listProducts } from "../actions/productActions";
import "../styles/product-carousel.css";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  console.log(productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Carousel
        style={{ marginTop: "0.5em" }}
        pause="hover"
        className="bg-primary"
        indicators={false}
        interval={10000}
      >
        {products &&
          products.map((product) => (
            <CarouselItem key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  {product.name} (${product.price.toFixed(2)})
                </Carousel.Caption>
              </Link>
            </CarouselItem>
          ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
