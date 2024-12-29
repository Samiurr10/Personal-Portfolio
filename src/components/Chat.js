import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const Chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    // Placeholder for LLM interaction logic
    setResponse("I'm currently processing your question...");
    setTimeout(() => {
      setResponse(`You asked: "${question}" – response coming soon!`);
    }, 1000); // Simulate delay
  };

  return (
    <section className="chat" id="chat">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <h2>Ask Me Anything</h2>
            <p>Have a question about me? Ask below!</p>
            <Form>
              <Form.Group controlId="formQuestion">
                <Form.Control
                  type="text"
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="chat-input"
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleAsk}
                className="mt-3 chat-button"
              >
                Ask
              </Button>
            </Form>
            {response && <p className="mt-4 chat-response">{response}</p>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
