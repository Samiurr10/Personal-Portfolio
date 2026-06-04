import React, { useState } from "react";
import { API_SEARCH_URL, CONTACT_EMAIL } from "../site";
import colorSharp from "../assets/img/color-sharp.png";

export const Chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e?.preventDefault();

    const trimmed = question.trim();
    if (!trimmed) {
      setResponse("Please enter a question.");
      return;
    }

    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch(API_SEARCH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = await res.json();

      if (data.status === 200 && data.response) {
        setResponse(data.response);
      } else {
        setResponse(data.response || "Something went wrong. Please try again.");
      }
    } catch {
      setResponse(
        `Could not reach the assistant. Email me at ${CONTACT_EMAIL} or use the resume link above.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat" id="chat">
      <img className="background-image-left" src={colorSharp} alt="" aria-hidden="true" />
      <h2>Ask Me Anything</h2>
      <p>Have a question about my experience, projects, or skills? Ask below.</p>
      <form onSubmit={handleAsk}>
        <input
          className="chat-input"
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          aria-label="Your question"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {response ? <p className="chat-response">{response}</p> : null}
    </section>
  );
};
