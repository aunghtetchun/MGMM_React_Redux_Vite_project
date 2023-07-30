import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import {  Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { submitGameRequest } from '../actions/gameActions';

export default function GameRequest() {
  const message = useSelector((state) => state.gameReducer.message);
  const initialFormData = {
    app_name: '',
    username: 'Unknown',
    phone: '09123456789',
    description: '',
    playstore_link: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitGameRequest(formData));
    setFormData(initialFormData);
  };
  useEffect(() => {
    // Hide the message after 3 seconds
    if (message) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' }); // Dispatch an action to clear the message after 3 seconds
      }, 3000);
    }
  }, [message, dispatch]);

  return (
    <>
    {message &&
    <div className="alert alert-success">{message}</div>
    }
      <h4 className="col-12 mt-5 text-center">Link Repair &amp; Request Game</h4>
      <Col>
        <hr />
        <Form className="text-light pb-3" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="fw-bold text-dark mt-3">Game Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="app_name"
              value={formData.app_name}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold text-dark mt-3">Game Type</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Online ? Offline ? Other ?"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold text-dark mt-3">Phone Type</Form.Label>
            <Form.Control
              required
              type="text"
              name="playstore_link"
              value={formData.playstore_link}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button className="px-3 py-2 mt-3" type="submit" variant="primary" block>
              <FiUpload /> &nbsp; Request Game
            </Button>
          </div>
        </Form>
      </Col>
    </>
  );
}
