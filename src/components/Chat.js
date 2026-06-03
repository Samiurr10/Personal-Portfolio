import React, { useState } from "react";
import { API_URL } from "../site";

export const Chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setResponse("Please enter a question.");
      return;
    }

    if (!API_URL) {
      setResponse(
        "AI chat is offline. Email me at srahman96@gatech.edu or view my resume from the nav bar."
      );
      return;
    }

    setResponse("Thinking...");

    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: question }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setResponse(data.response);
      } else {
        setResponse("Error: " + data.response);
      }
    } catch (error) {
      setResponse(
        "Could not reach the assistant. Try again later or email srahman96@gatech.edu."
      );
    }
  };

  return (
    <div className="chat" id="chat">
      <h2>Ask Me Anything</h2>
      <input
        type="text"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      <p>{response}</p>
    </div>
  );
};
