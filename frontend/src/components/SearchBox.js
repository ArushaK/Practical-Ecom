import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="text"
        name="keyword"
        className="mr-sm-2 ml-sm-4"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        value={keyword}
      />
      <Button type="submit" size="sm" variant="secondary" className="ms-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
