import React, { useState } from "react";

export const Chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setResponse("Please enter a question.");
      return;
    }

    setResponse("Thinking...");

    try {
      const res = await fetch("http://127.0.0.1:8000/search", {
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
      setResponse("An error occurred. Please try again.");
    }
  };

  return (
    <div className="chat">
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
