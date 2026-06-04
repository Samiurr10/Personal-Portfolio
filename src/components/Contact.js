import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        setStatus({ type: "success", text: data.message });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", text: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", text: "Could not send message. Email me directly at srahman96@gatech.edu." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="contact-card">
              <h2>Get In Touch</h2>
              <p>Have an opportunity, question, or just want to say hi? Send me a message and I'll get back to you.</p>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  aria-label="Your name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  aria-label="Your email"
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  aria-label="Your message"
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
              {status.text && (
                <p className={`contact-status contact-status--${status.type}`}>
                  {status.text}
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
};
