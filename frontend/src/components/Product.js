import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-0">
      <Link to={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link
          to={`product/${product._id}`}
          style={{ color: "dimgray", textDecoration: "none" }}
        >
          <Card.Title as="p">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-2">
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h4">&#x20B9; {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
