import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Card, Col, Container, ListGroup, Modal, Row, Form } from 'react-bootstrap';
// require("dotenv").config();
// const port = process.env.PORT
// const host = process.env.HOST

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
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
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    try {
      await axios.post(`http://localhost:5000/api/createCategory`, newCategory);
      fetchData();
      setNewCategory({ name: "", description: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
    });
    setShowModal(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateCategory/${editingCategory._id}`, newCategory);
      fetchData();
      setEditingCategory(null);
      setNewCategory({ name: '', description: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteCategory/${categoryId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setNewCategory({ name: '', description: '' });
  };

  return (
    <>
      <Container className=''>
        <Row>
          <Col className='d-flex flex-column justify-content-center'>
            <h2 className='fs-1 fw-bolder'>Categories</h2>
            <Card className='w-50'>
              <ListGroup>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <ListGroup.Item className='' key={category._id}>
                      <strong>Name : {category.name}</strong>
                      <p>
                        <b>Description :</b>
                        {category.description}
                      </p>
                      <Button variant='info' onClick={() => handleEditCategory(category)}>
                        Edit
                      </Button>
                      <Button
                        variant='danger'
                        className='ms-2 me-auto'
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
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} className='mt-5  '>
      <Modal.Header closeButton className="text-center text-white bg-dark">
      <Modal.Title className="text-center fs-5 fw-bold text-white ">{editingCategory ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-size text-white">Name <b>:</b></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="name"
                className="py-1 text-size border border-white bg-dark text-white "

                value={newCategory.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-size text-white">Description <b>:</b></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="text-size text-white border border-white bg-dark"
                placeholder="Enter category description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between bg-dark">
          <Button className="py-1 text-size" variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className="py-1 text-size" variant="primary" onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
            {editingCategory ? 'Update Category' : 'Add Category'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Categories;
