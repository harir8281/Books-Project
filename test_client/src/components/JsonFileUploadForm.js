import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios"; 

const JsonFileUploadForm = ({ onRefetch }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    status: "",
  });
  const [submitButtonClicked, setSubmitButtonClicked] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = JSON.parse(event.target.result);
          setFileContent(content);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          setFileContent(null);
        }
      };

      reader.readAsText(file);
    } else {
      setFileContent(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonClicked("file");

    if (fileContent) {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/books",
          fileContent
        );

        console.log("File Upload API Response:", response.data);
      } catch (error) {
        console.error("Error sending POST request for file upload:", error);
      }
    }
    onRefetch();
    setFileContent(null);
    setSelectedFile(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonClicked("form");

    try {
      // Include both file content and form data in the API request
      const dataToSend = {
        ...formData,
        fileContent, // Include the JSON content
      };

      const response = await axios.post(
        "http://localhost:5001/api/books",
        dataToSend
      );

      console.log("Form Submit API Response:", response.data);
    } catch (error) {
      console.error("Error sending POST request for form data:", error);
    }

    onRefetch();
    setFileContent(null);
    setSelectedFile(null);
    setFormData({
      title: "",
      shortDescription: "",
      longDescription: "",
      status: "",
    });
  };

  return (
    <div className="json-upload-container">
      <Row>
        <Col md={6}>
          <div className="json-upload-box">
            <Form onSubmit={handleFileSubmit}>
              <Form.Group controlId="fileUpload">
                <Form.Label>Select a JSON file:</Form.Label>
                <Form.Control
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                />
              </Form.Group>
              {fileContent && (
                <div>
                  <h3>File Content:</h3>
                  <pre>{JSON.stringify(fileContent, null, 2)}</pre>
                </div>
              )}
              <Button
                style={{ margin: 10 }}
                variant="primary"
                type="submit"
                disabled={!fileContent}
              >
                Submit File
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div className="json-upload-box">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="shortDescription">
                <Form.Label>Short Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="longDescription">
                <Form.Label>Long Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button style={{ margin: 10 }} variant="primary" type="submit">
                Submit Form
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JsonFileUploadForm;
