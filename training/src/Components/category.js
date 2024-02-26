import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Modal } from "react-bootstrap";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllCategory");
      setCategories(response.data.res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    try {
      await axios.post("http://localhost:5000/api/createCategory", newCategory);
      fetchData();
      setNewCategory({ name: "", description: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ ...category });
    setShowModal(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateCategory/${editingCategory._id}`, newCategory);
      fetchData();
      setEditingCategory(null);
      setNewCategory({ name: "", description: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteCategory/${categoryId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setNewCategory({ name: "", description: "" });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Category Management</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Category
          </Button>
        </Col>
        <Col>
          <h2>Categories</h2>
          <ListGroup>
            {categories.length > 0 ? (
              categories.map((category) => (
                <ListGroup.Item key={category._id}>
                  <strong>{category.name}</strong>
                  <p>{category.description}</p>
                  <Button
                    variant="info"
                    onClick={() => handleEditCategory(category)}
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
              ))
            ) : (
              <ListGroup.Item>No categories found</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>

      {/* {/ Modal for adding/editing categories /} */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategory ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
            {editingCategory ? 'Update Category' : 'Add Category'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Category;
