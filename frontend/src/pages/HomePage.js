import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product.js";
import { Row, Col } from "react-bootstrap";
import ProductCarousel from "../components/ProductCarousal.js";
import { listProducts } from "../actions/productActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const keyword = params.keyword;
  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products.</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        products && (
          <>
            <Row>
              {products.length ? (
                products.map((product) => {
                  return (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  );
                })
              ) : (
                <Col>No items found for this search query...</Col>
              )}
            </Row>
          </>
        )
      )}
    </>
  );
};

export default HomePage;
