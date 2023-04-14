import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = (props) => {
  console.log(props.product);
  return (
    <Card className="my-3 p-0">
      <Link to={`/product/${props.product._id}`}>
        <Card.Img src={props.product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${props.product._id}`}
          style={{ color: "dimgray", textDecoration: "none" }}
        >
          <Card.Title as="p" style={{ minHeight: "7ch" }}>
            <strong>{props.product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-2">
            {props.product.rating} from {props.product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h4">&#x20B9; {props.product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
