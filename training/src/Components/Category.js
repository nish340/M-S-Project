import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:5000/api/categories");
    setCategories(response.data);
  };

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    await axios.post("http://localhost:5000/api/categories", newCategory);
    fetchCategories();
    setNewCategory({ name: "", description: "", img: "" });
  };

  const handleEditCategory = async (categoryId) => {
    const categoryToEdit = categories.find(
      (category) => category._id === categoryId
    );
    setNewCategory({ ...categoryToEdit });
  };

  const handleUpdateCategory = async () => {
    const { _id, name, description, img } = newCategory;

    try {
      await axios.put(`http://localhost:5000/api/categories/${_id}`, {
        name,
        description,
      });
      fetchCategories();
      setNewCategory({ name: "", description: "", img: "" });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Category Management</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter category images"
                name="images"
                value={newCategory.img}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter category description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Form>
        </Col>
        <Col>
          <h2>Categories</h2>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item key={category._id}>
                <strong>{category.name}</strong>
                <p>{category.description}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item key={category._id}>
                <strong>{category.name}</strong>
                <p>{category.description}</p>
                <Button
                  variant="info"
                  onClick={() => handleEditCategory(category._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
