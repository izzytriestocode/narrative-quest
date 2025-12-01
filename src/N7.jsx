import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import marketImage from "./assets/market.jpg";
import bookCoverImage from "./assets/TRF-book.jpg";

// Simple utility XP helper
const awardXp = (current, amount) => current + amount;

// Progress bar component
const XPBar = ({ xp, maxXp = 100 }) => {
  const percent = Math.min(100, Math.round((xp / maxXp) * 100));
  return (
    <div className="xp-bar" style={{ margin: "1rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>XP: {xp}</span>
        <span>{percent}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "12px",
          borderRadius: "999px",
          border: "1px solid #ccc",
          overflow: "hidden",
          marginTop: "0.25rem"
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #22c55e, #3b82f6)"
          }}
        />
      </div>
    </div>
  );
};

// Introduction with click-to-reveal objectives & hover tooltip on "connotation"
const Introduction = ({ onComplete, studentName, setStudentName, studentDate, setStudentDate }) => {
  const [step, setStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const objectives = [
    "Use setting, imagery, mood, connotation and figurative language",
    "See how authors bring real places to life in narrative",
    "Write our own scene set in an unfamiliar country"
  ];

  const revealNext = () => {
    if (step < objectives.length) {
      const next = step + 1;
      setStep(next);
      if (next === objectives.length && !hasCompleted) {
        setHasCompleted(true);
        onComplete();
      }
    }
  };

  const renderObjectiveText = (text) => {
    const parts = text.split(/(connotation)/i);
    return parts.map((part, index) => {
      if (part.toLowerCase() === "connotation") {
        return (
          <span
            key={index}
            style={{
              textDecoration: "underline dotted",
              cursor: "help",
              position: "relative"
            }}
            title="A feeling or idea suggested by a word, beyond its literal meaning."
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      <div style={{ padding: "1.5rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "1px solid #e5e7eb" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>Name:</label>
            <input type="text" placeholder="Enter your name" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem", fontSize: "1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>Date:</label>
            <input type="date" value={studentDate} onChange={(e) => setStudentDate(e.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem", fontSize: "1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", boxSizing: "border-box" }} />
          </div>
        </div>
      </div>
      <section
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>Learning Objective</h2>
      <p style={{ marginBottom: "0.75rem" }}>
        To analyse a narrative set in a different geographical location.
      </p>
      <h3 style={{ marginBottom: "0.5rem" }}>How?</h3>
      <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
        {objectives.slice(0, step).map((obj, idx) => (
          <li key={idx}>{renderObjectiveText(obj)}</li>
        ))}
      </ul>
      {step < objectives.length && (
        <button
          onClick={revealNext}
          style={{
            padding: "0.4rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          Reveal next step
        </button>
      )}
      {step >= objectives.length && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a", marginTop: "0.5rem" }}>
          ✅ All steps revealed – you've earned XP!
        </p>
      )}
      </section>
    </>
  );
};
// Zones of Regulation check-in
const ZoRCheck = ({ label = "ZoR Check-in", onComplete }) => {
  const [zone, setZone] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSelect = (z) => {
    setZone(z);
    if (!completed) {
      setCompleted(true);
      onComplete(z);
    }
  };

  const zones = [
    { id: "blue", name: "🔵 Blue – tired, sad, low energy" },
    { id: "green", name: "🟢 Green – calm, ready to learn" },
    { id: "yellow", name: "🟡 Yellow – worried, excited, silly" },
    { id: "red", name: "🔴 Red – angry, out of control" }
  ];

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#ecfeff",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>{label}</h2>
      <p style={{ fontSize: "1.1rem" }}>What zone are you in?</p>
      <div
        style={{
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
        }}
      >
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => handleSelect(z.name)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.75rem",
              border: zone === z.name ? "2px solid #06b6d4" : "1px solid #bae6fd",
              background: zone === z.name ? "#cffafe" : "#f0f9ff",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            {z.name}
          </button>
        ))}
      </div>
      {zone && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
          You chose: <strong>{zone}</strong>
        </p>
      )}
    </section>
  );
};

// Hook component with market image
const Hook = () => {
  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#fff7ed",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0, color: "#7c2d12" }}>🎯 Engage: Hook</h2>
      <p style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "1rem" }}>
        Look at this market:
      </p>
      <img
        src={marketImage}
        alt="Market scene"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "0.5rem",
          marginBottom: "1rem"
        }}
      />
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem", fontStyle: "italic" }}>
        What stories do you think could happen here? How does this place make you feel?
      </p>
      <div
        style={{
          borderLeft: "3px solid #ea580c",
          paddingLeft: "1rem",
          fontSize: "0.9rem",
          lineHeight: "1.6"
        }}
      >
        <p style={{ marginTop: 0 }}>
          <strong>Link to Learning:</strong> Today we'll explore how place affects story, how a writer uses geography, setting and voice to create powerful narrative
        </p>
      </div>
    </section>
  );
};

// SPaG activity – adjective + adverb
const SpagActivity = ({ onComplete }) => {
  const [adj, setAdj] = useState("");
  const [adv, setAdv] = useState("");
  const [valleyAdj, setValleyAdj] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleCheck = () => {
    if (!adj || !adv || !valleyAdj) {
      setFeedback("Try to fill in all three description words first!");
      return;
    }
    setFeedback("Nice! You’ve built a more vivid sentence.");
    if (!completed) {
      setCompleted(true);
      onComplete({
        sentence: `The ${adj} mountain rose ${adv} above the ${valleyAdj} valley.`
      });
    }
  };

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#fefce8",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>🎯 Engage: SPaG Activity – Build the Sentence</h2>
      <p style={{ fontSize: "1.1rem" }}>
        Start with the basic sentence and improve it using <strong>one adjective</strong> and{" "}
        <strong>one adverb</strong>, plus a describing word for the valley.
      </p>
      <p style={{ fontStyle: "italic", marginBottom: "0.75rem", fontSize: "1.1rem" }}>
        The ______ mountain rose ______ above the ______ valley.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "0.75rem"
        }}
      >
        <input
          type="text"
          placeholder="adjective (e.g., rocky)"
          value={adj}
          onChange={(e) => setAdj(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="adverb (e.g., tall)"
          value={adv}
          onChange={(e) => setAdv(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="valley adjective (e.g., calm)"
          value={valleyAdj}
          onChange={(e) => setValleyAdj(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button onClick={handleCheck} style={primaryButtonStyle}>
        Check my sentence
      </button>
      {feedback && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>{feedback}</p>
      )}
      {completed && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a" }}>
          ✅ Activity complete – XP earned!
        </p>
      )}
    </section>
  );
};

// Geographical Setting explanation
const GeographicalSettingExplanation = () => {
  const [expanded, setExpanded] = useState({
    sensory: false,
    language: false,
    atmosphere: false
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#ecfdf5",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0, color: "#065f46" }}>🔍 Explore: What is Geographical Setting?</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1rem", color: "#047857", marginBottom: "0.5rem" }}>Definition</h3>
        <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.5rem" }}>
          The geographical setting is where a story takes place — the physical location, landscape, climate, and cultural environment.
        </p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1rem", color: "#047857", marginBottom: "0.5rem" }}>Why it matters:</h3>
        <ul style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>It helps the reader visualise the world of the story.</li>
          <li>It shapes how characters live, speak, and behave.</li>
          <li>It can reflect the themes or mood of the story.</li>
        </ul>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1rem", color: "#047857", marginBottom: "0.5rem" }}>Examples:</h3>
        <ul style={{ fontSize: "1.1rem", marginTop: 0, paddingLeft: "1.5rem" }}>
          <li>A quiet English village on a foggy morning.</li>
          <li>A crowded New York café filled with voices and movement.</li>
        </ul>
      </div>

      <div style={{ borderTop: "1px solid #d1fae5", paddingTop: "1rem" }}>
        <h3 style={{ fontSize: "1rem", color: "#047857", marginBottom: "0.75rem" }}>How do authors use Sensory Imagery and Language to Build a Sense of Place?</h3>
        
        <div style={{ marginBottom: "0.5rem" }}>
          <button
            onClick={() => toggleExpand("sensory")}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.6rem 0.8rem",
              borderRadius: "0.5rem",
              border: "1px solid #a7f3d0",
              background: expanded.sensory ? "#d1fae5" : "#ecfdf5",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#047857"
            }}
          >
            {expanded.sensory ? "▼" : "▶"} Sensory Imagery
          </button>
          {expanded.sensory && (
            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", paddingLeft: "0.8rem", borderLeft: "3px solid #10b981" }}>
              Writers use the five senses — sight, sound, smell, touch, taste — to make the reader feel present in the setting.
            </p>
          )}
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <button
            onClick={() => toggleExpand("language")}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.6rem 0.8rem",
              borderRadius: "0.5rem",
              border: "1px solid #a7f3d0",
              background: expanded.language ? "#d1fae5" : "#ecfdf5",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#047857"
            }}
          >
            {expanded.language ? "▼" : "▶"} Language Choices
          </button>
          {expanded.language && (
            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", paddingLeft: "0.8rem", borderLeft: "3px solid #10b981" }}>
              Words and phrasing reflect local culture and tone
            </p>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleExpand("atmosphere")}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.6rem 0.8rem",
              borderRadius: "0.5rem",
              border: "1px solid #a7f3d0",
              background: expanded.atmosphere ? "#d1fae5" : "#ecfdf5",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#047857"
            }}
          >
            {expanded.atmosphere ? "▼" : "▶"} Atmosphere
          </button>
          {expanded.atmosphere && (
            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", paddingLeft: "0.8rem", borderLeft: "3px solid #10b981" }}>
              Descriptive language sets the mood (calm, tense, lively, isolated).
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// Key terms matching activity
const KeyTermsMatch = ({ onComplete }) => {
  const [answers, setAnswers] = useState({
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: ""
  });
  const [result, setResult] = useState("");
  const [completed, setCompleted] = useState(false);

  const correct = {
    s1: "Setting",
    s2: "Figurative Language",
    s3: "Mood",
    s4: "Connotation",
    s5: "Imagery"
  };

  const options = [
    "Setting",
    "Imagery",
    "Mood",
    "Connotation",
    "Figurative Language"
  ];

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    const allChosen = Object.values(answers).every((v) => v);
    if (!allChosen) {
      setResult("Try to choose a term for each sentence first.");
      return;
    }

    let correctCount = 0;
    Object.keys(correct).forEach((k) => {
      if (answers[k] === correct[k]) correctCount++;
    });

    if (correctCount === 5) {
      setResult("⭐ All correct! You’ve mastered the key terms.");
      if (!completed) {
        setCompleted(true);
        onComplete({ answers, correctCount });
      }
    } else {
      setResult(
        `You got ${correctCount} out of 5. Check your choices and try again!`
      );
    }
  };

  const renderSelect = (key) => (
    <select
      value={answers[key]}
      onChange={(e) => handleChange(key, e.target.value)}
      style={{
        ...inputStyle,
        padding: "0.25rem 0.5rem",
        fontSize: "0.85rem"
      }}
    >
      <option value="">Choose term...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#fef2ff",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>🔍 Explore: Key Terms – Matching Challenge</h2>
      <p style={{ fontSize: "1.1rem" }}>
        Match each sentence to the correct key term.
      </p>
      <ol style={{ paddingLeft: "1.25rem", fontSize: "1.1rem" }}>
        <li style={{ marginBottom: "0.5rem" }}>
          The story takes place in a small village with old stone houses and a
          quiet fountain.{" "}
          <div style={{ marginTop: "0.25rem" }}>{renderSelect("s1")}</div>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          The writer says the sea had “angry fists,” helping us imagine how
          powerful it was.{" "}
          <div style={{ marginTop: "0.25rem" }}>{renderSelect("s2")}</div>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          The storm and darkness make the story feel tense and scary.{" "}
          <div style={{ marginTop: "0.25rem" }}>{renderSelect("s3")}</div>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          The word “home” makes people think of love and safety, not just a
          house.{" "}
          <div style={{ marginTop: "0.25rem" }}>{renderSelect("s4")}</div>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          The poem says “the golden fields danced in the wind,” helping us
          picture the scene.{" "}
          <div style={{ marginTop: "0.25rem" }}>{renderSelect("s5")}</div>
        </li>
      </ol>
      <button onClick={handleCheck} style={primaryButtonStyle}>
        Check answers
      </button>
      {result && (
        <div>
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>{result}</p>
          {result && !completed && (
            <p style={{ 
              marginTop: "0.75rem", 
              padding: "0.6rem 0.8rem", 
              borderRadius: "0.5rem",
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              fontSize: "0.85rem",
              color: "#92400e"
            }}>
              Get 5/5 to unlock the next section! Ask Miss if you need help.
            </p>
          )}
        </div>
      )}
      {completed && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a" }}>
          ✅ Key terms level complete – XP earned!
        </p>
      )}
    </section>
  );
};

// Clickable annotations component
const AnnotationClickable = ({ annotation1, annotation2, annotation3 }) => {
  const [expanded, setExpanded] = useState({
    a1: false,
    a2: false,
    a3: false
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={() => toggleExpand("a1")}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "0.75rem 1rem",
          marginBottom: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #dbeafe",
          background: expanded.a1 ? "#e0f2fe" : "#f0f9ff",
          cursor: "pointer",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "#0369a1"
        }}
      >
        {expanded.a1 ? "▼" : "▶"} Annotation
      </button>
      {expanded.a1 && (
        <p style={{ fontSize: "1.1rem", marginLeft: "1rem", marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
          {annotation1}
        </p>
      )}

      <button
        onClick={() => toggleExpand("a2")}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "0.75rem 1rem",
          marginBottom: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #dbeafe",
          background: expanded.a2 ? "#e0f2fe" : "#f0f9ff",
          cursor: "pointer",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "#0369a1"
        }}
      >
        {expanded.a2 ? "▼" : "▶"} more on Des Moines
      </button>
      {expanded.a2 && (
        <p style={{ fontSize: "1.1rem", marginLeft: "1rem", marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
          {annotation2}
        </p>
      )}

      <button
        onClick={() => toggleExpand("a3")}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "0.75rem 1rem",
          marginBottom: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid #dbeafe",
          background: expanded.a3 ? "#e0f2fe" : "#f0f9ff",
          cursor: "pointer",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "#0369a1"
        }}
      >
        {expanded.a3 ? "▼" : "▶"} This means...
      </button>
      {expanded.a3 && (
        <p style={{ fontSize: "1.1rem", marginLeft: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
          {annotation3}
        </p>
      )}
    </div>
  );
};

// Explain section - The Reluctant Fundamentalist introduction
const ExplainReluctantFundamentalist = () => {
  return (
    <>
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#eff6ff",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0, color: "#1e40af" }}>💡 Explain: Using <i>The Reluctant Fundamentalist</i> by Mohsin Hamid</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            We'll examine how the author explores:
          </p>
          <ul style={{ fontSize: "1.1rem", paddingLeft: "1.5rem" }}>
            <li><mark style={{ backgroundColor: "#ffff00" }}>Setting and Geographical Detail</mark></li>
            <li><mark style={{ backgroundColor: "#90EE90" }}>Imagery and Mood</mark></li>
            <li><mark style={{ backgroundColor: "#FF00FF" }}>Diction and Connotation</mark></li>
            <li><mark style={{ backgroundColor: "#B0E0E6" }}>Voice and Narrator Inference</mark></li>
          </ul>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <img
            src={bookCoverImage}
            alt="The Reluctant Fundamentalist book cover"
            style={{
              maxWidth: "200px",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: "1.7" }}>
        <p>
          <i>The Reluctant Fundamentalist</i> tells the story of Changez, a young man from Pakistan who moves to the United States to study at Princeton and starts a high-powered job in New York. At first, he is excited by the opportunities and lifestyle America offers.
        </p>
        
        <p>
          The novel begins with Changez speaking to an American visitor in a café in Lahore, immediately placing the reader in a specific geographical and cultural setting. This opening allows us to explore how Hamid establishes voice, setting, and mood from the very first lines.
        </p>

        <p style={{ marginTop: "1.5rem", backgroundColor: "#fff3cd", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #ffc107" }}>
          <strong>Please ask Miss for a printout of the Opening of <i>The Reluctant Fundamentalist.</i></strong>
        </p>
      </div>
    </section>

    <section style={{ backgroundColor: "#fffbeb", padding: "2rem 1rem", marginBottom: "2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#1e40af", marginBottom: "0.75rem" }}><mark style={{ backgroundColor: "#ffff00" }}>📍 Setting and Geographical Detail</mark></h3>
          
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0 }}>
              Key phrases from the text:
            </p>
            <ul style={{ fontSize: "1.1rem", paddingLeft: "1.5rem" }}>
              <li><strong>"native of this city"</strong></li>
              <li><strong>"northwest frontier"</strong></li>
              <li><strong>"Des Moines"</strong></li>
            </ul>
          </div>

          <h4 style={{ fontSize: "1.1rem", color: "#1e40af", marginTop: "1.5rem", marginBottom: "0.75rem" }}>Annotation</h4>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              These phrases <strong>contrast</strong> two worlds — Pakistan (likely Lahore) and America.
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              The reference to Des Moines helps readers <strong>confirm the visitor's Western background.</strong>
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: 0, paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              The text immediately establishes <strong>cultural distance</strong> and <strong>geographical identity.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section style={{ backgroundColor: "#ecfdf5", padding: "2rem 1rem", marginBottom: "2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#1e40af", marginBottom: "0.75rem" }}><mark style={{ backgroundColor: "#90EE90" }}>🎨 Imagery and Mood</mark></h3>
          
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0 }}>
              Key phrases from the text:
            </p>
            <ul style={{ fontSize: "1.1rem", paddingLeft: "1.5rem" }}>
              <li><strong>"I see I have alarmed you,"</strong></li>
              <li><strong>"Do not be frightened by my beard."</strong></li>
            </ul>
          </div>

          <h4 style={{ fontSize: "1.1rem", color: "#1e40af", marginTop: "1.5rem", marginBottom: "0.75rem" }}>Annotation</h4>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              These lines <strong>create a tense yet polite atmosphere.</strong>
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              <strong>"Alarmed" and "frightened"</strong> evoke fear and misunderstanding.
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: 0, paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              The narrator's <strong>calm reassurance</strong> softens the tension, hinting at <strong>cultural unease</strong> between the two men.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section style={{ backgroundColor: "#fce7f3", padding: "2rem 1rem", marginBottom: "2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#1e40af", marginBottom: "0.75rem" }}><mark style={{ backgroundColor: "#FF00FF" }}>📝 Diction and Connotation</mark></h3>
          
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0 }}>
              Key phrases from the text:
            </p>
            <ul style={{ fontSize: "1.1rem", paddingLeft: "1.5rem" }}>
              <li><strong>"lover of America,"</strong></li>
              <li><strong>"mission,"</strong></li>
              <li><strong>"bearing,"</strong></li>
              <li><strong>"observation."</strong></li>
            </ul>
          </div>

          <h4 style={{ fontSize: "1.1rem", color: "#1e40af", marginTop: "1.5rem", marginBottom: "0.75rem" }}>Annotation</h4>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              The words are <strong>formal and deliberate</strong>, showing that the narrator is <strong>well-educated and reflective.</strong>
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              <strong>"Lover of America"</strong> carries <strong>ironic undertones</strong> — is he sincere or subtly critical?
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: 0, paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              <strong>"Mission" and "bearing"</strong> sound almost <strong>military</strong>, hinting at deeper <strong>political or personal tension.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section style={{ backgroundColor: "#cffafe", padding: "2rem 1rem", marginBottom: "2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#1e40af", marginBottom: "0.75rem" }}><mark style={{ backgroundColor: "#B0E0E6" }}>🎤 Voice and Narrator Inference</mark></h3>
          
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0 }}>
              Key phrases from the text:
            </p>
            <ul style={{ fontSize: "1.1rem", paddingLeft: "1.5rem" }}>
              <li><strong>"Excuse me, sir,"</strong></li>
              <li><strong>"How did I know you were American?"</strong></li>
            </ul>
          </div>

          <h4 style={{ fontSize: "1.1rem", color: "#1e40af", marginTop: "1.5rem", marginBottom: "0.75rem" }}>Annotation</h4>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              The narrator <strong>directly addresses the listener</strong>, creating an <strong>intimate, conversational tone.</strong>
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "0.75rem", paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              His language is <strong>careful and observant</strong> — he's <strong>analysing the stranger and himself.</strong>
            </p>
          </div>
          <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "0.5rem" }}>
            <p style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: 0, paddingLeft: "1rem", borderLeft: "3px solid #0369a1" }}>
              We <strong>infer he's intelligent, cautious, and self-aware</strong>, <strong>aware of cultural stereotypes.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

// Reading / inference activity (The Reluctant Fundamentalist)
const ReadingActivity = ({ onComplete }) => {
  const [choice, setChoice] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleCheck = () => {
    if (!choice) {
      setFeedback("Choose an answer before checking.");
      return;
    }
    if (choice === "b") {
      setFeedback(
        "Correct – the narrator sounds polite but also very observant and slightly tense."
      );
      if (!completed) {
        setCompleted(true);
        onComplete({ choice });
      }
    } else {
      setFeedback(
        "Not quite. Think about the words “alarm,” “frightened,” and how carefully he describes the visitor."
      );
    }
  };

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#eef2ff",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>Reading Level – Voice & Mood</h2>
      <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        From the opening of <em>The Reluctant Fundamentalist</em>:
      </p>
      <blockquote
        style={{
          fontSize: "0.85rem",
          borderLeft: "3px solid #6366f1",
          paddingLeft: "0.75rem",
          marginBottom: "0.75rem"
        }}
      >
        “Excuse me, sir, but may I be of assistance? Ah, I see I have alarmed
        you. Do not be frightened by my beard: I am a lover of America...”
      </blockquote>
      <p style={{ fontSize: "0.9rem" }}>
        What kind of <strong>mood</strong> is created by this opening?
      </p>
      <div
        style={{
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          marginTop: "0.5rem",
          marginBottom: "0.75rem"
        }}
      >
        <label style={optionLabelStyle}>
          <input
            type="radio"
            name="mood"
            value="a"
            checked={choice === "a"}
            onChange={(e) => setChoice(e.target.value)}
            style={{ marginRight: "0.25rem" }}
          />
          Calm and boring, with no tension between characters
        </label>
        <label style={optionLabelStyle}>
          <input
            type="radio"
            name="mood"
            value="b"
            checked={choice === "b"}
            onChange={(e) => setChoice(e.target.value)}
            style={{ marginRight: "0.25rem" }}
          />
          Polite on the surface, but tense and uneasy underneath
        </label>
        <label style={optionLabelStyle}>
          <input
            type="radio"
            name="mood"
            value="c"
            checked={choice === "c"}
            onChange={(e) => setChoice(e.target.value)}
            style={{ marginRight: "0.25rem" }}
          />
          Completely silly and joking, like a comedy scene
        </label>
      </div>
      <button onClick={handleCheck} style={primaryButtonStyle}>
        Check my answer
      </button>
      {feedback && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>{feedback}</p>
      )}
      {completed && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a" }}>
          ✅ Reading level complete – XP earned!
        </p>
      )}
    </section>
  );
};

// Chart Analysis – Quote and analysis
const ChartAnalysis = ({ onComplete }) => {
  const [quote, setQuote] = useState("");
  const [setting, setSetting] = useState("");
  const [narrator, setNarrator] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (quote.trim() && setting.trim() && narrator.trim()) {
      setCompleted(true);
      onComplete({ quote, setting, narrator });
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#eff6ff",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0, color: "#1e40af" }}>📖 Read the opening again and complete the chart!</h2>
      
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          fontSize: "1.1rem",
          tableLayout: "fixed"
        }}>
          <tbody>
            <tr>
              <td style={{ 
                border: "2px solid #0369a1", 
                padding: "0.75rem",
                fontWeight: "bold",
                backgroundColor: "#f0f9ff",
                width: "35%",
                verticalAlign: "middle"
              }}>
                Identify a QUOTE from the text
              </td>
              <td style={{ 
                border: "2px solid #0369a1", 
                padding: "0.5rem",
                verticalAlign: "top"
              }}>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #dbeafe",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter a quote here..."
                />
              </td>
            </tr>
            <tr>
              <td style={{ 
                border: "2px solid #0369a1", 
                padding: "0.75rem",
                fontWeight: "bold",
                backgroundColor: "#f0f9ff",
                verticalAlign: "middle"
              }}>
                Write what it tells us about the SETTING
              </td>
              <td style={{ 
                border: "2px solid #0369a1", 
                padding: "0.5rem",
                verticalAlign: "top"
              }}>
                <textarea
                  value={setting}
                  onChange={(e) => setSetting(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #dbeafe",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                  placeholder="Write your analysis here..."
                />
              </td>
            </tr>
            <tr>
              <td style={{ 
                border: "2px solid #0369a1", 
                padding: "0.75rem",
                fontWeight: "bold",
                backgroundColor: "#f0f9ff",
                verticalAlign: "middle"
              }}>
                Write what it tells us about what the NARRATOR is saying
              </td>
              <td style={{ 
                border: "2px solid #0369a1", 
                padding: "0.5rem",
                verticalAlign: "top"
              }}>
                <textarea
                  value={narrator}
                  onChange={(e) => setNarrator(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #dbeafe",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                  placeholder="Write your analysis here..."
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          border: "none",
          background: "#0369a1",
          color: "white",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: "0.5rem"
        }}
      >
        Submit Analysis
      </button>

      {completed && (
        <p style={{ color: "#16a34a", fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
          ✓ Great work! Your analysis has been recorded.
        </p>
      )}
    </section>
  );
};

// Writing task – main narrative scene
const WritingTask = ({ onComplete }) => {
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (!location) {
      setFeedback("Choose a location to set your scene.");
      return;
    }
    if (text.trim().length < 80) {
      setFeedback(
        "Try to write a little more so we can really feel the setting (aim for at least 3–4 sentences)."
      );
      return;
    }
    setFeedback("Brilliant – your scene paints a vivid sense of place.");
    if (!completed) {
      setCompleted(true);
      onComplete({ location, text });
    }
  };

  const locations = [
    "A busy market in India",
    "A quiet village in Japan",
    "A desert in Morocco",
    "A crowded New York café",
    "A foggy English village"
  ];

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#ecfdf5",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>Writing Level – Your Own Scene</h2>
      <p style={{ fontSize: "1.2rem" }}>
        Write a short scene in a location you have never visited. Use this sensory checklist provided to describe your scene. Use{" "}
        <strong>at least 2 adjectives and 1 adverb</strong>.
      </p>
      <label style={{ fontSize: "0.85rem", display: "block", marginTop: "0.5rem" }}>
        Choose a location:
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ ...inputStyle, marginTop: "0.25rem" }}
        >
          <option value="">Select location...</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </label>
      <label
        style={{
          display: "block",
          marginTop: "0.75rem",
          fontSize: "0.85rem"
        }}
      >
        Your scene:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          style={{
            ...inputStyle,
            width: "100%",
            marginTop: "0.25rem",
            resize: "vertical"
          }}
          placeholder="Write your scene here..."
        />
      </label>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.5rem", fontStyle: "italic" }}>
        Sentence starters if stuck: "I could see...", "The sound of ... filled the air.", "The smell of ... reminded me of ...", "I felt ... as I walked through ..."
      </p>
      <button onClick={handleComplete} style={primaryButtonStyle}>
        Save my scene & earn XP
      </button>
      {feedback && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>{feedback}</p>
      )}
      {completed && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a" }}>
          ✅ Writing level complete – big XP!
        </p>
      )}
    </section>
  );
};

// Reflection level
const Reflection = ({ onComplete }) => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (!q1 || !q2 || !q3) {
      setFeedback("Answer all three reflection questions before finishing.");
      return;
    }
    setFeedback("Thank you – your reflections help show your understanding.");
    if (!completed) {
      setCompleted(true);
      onComplete({ q1, q2, q3 });
    }
  };

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#f9fafb",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>Final Reflection</h2>
      <p style={{ fontSize: "0.9rem" }}>
        Before you leave, think about what you’ve created today.
      </p>
      <div style={{ display: "grid", gap: "0.75rem", marginTop: "0.5rem" }}>
        <label style={reflectionLabelStyle}>
          1. How did you show the <strong>setting</strong> in your scene?
          <textarea
            value={q1}
            onChange={(e) => setQ1(e.target.value)}
            rows={3}
            style={reflectionInputStyle}
          />
        </label>
        <label style={reflectionLabelStyle}>
          2. Which sentence best shows the <strong>narrator’s voice</strong>?
          <textarea
            value={q2}
            onChange={(e) => setQ2(e.target.value)}
            rows={3}
            style={reflectionInputStyle}
          />
        </label>
        <label style={reflectionLabelStyle}>
          3. What is one change that would make the <strong>mood</strong> stronger?
          <textarea
            value={q3}
            onChange={(e) => setQ3(e.target.value)}
            rows={3}
            style={reflectionInputStyle}
          />
        </label>
      </div>
      <button onClick={handleComplete} style={primaryButtonStyle}>
        Finish reflection & earn XP
      </button>
      {feedback && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>{feedback}</p>
      )}
      {completed && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a" }}>
          ✅ Reflection complete – lesson finished!
        </p>
      )}
    </section>
  );
};

// Teacher panel & PDF download
const TeacherPanel = ({
  xp,
  completedSteps,
  responses,
  onDownloadPdf
}) => {
  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e5e7eb",
        background: "#fff7ed",
        marginTop: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>Teacher Dashboard</h2>
      <p style={{ fontSize: "0.9rem" }}>
        View the student’s progress and download their writing as a PDF.
      </p>
      <h3 style={{ marginBottom: "0.25rem" }}>Progress</h3>
      <ul style={{ fontSize: "0.85rem", marginTop: 0 }}>
        {Object.entries(completedSteps).map(([key, value]) => (
          <li key={key}>
            {labelFromKey(key)}:{" "}
            <strong style={{ color: value ? "#16a34a" : "#6b7280" }}>
              {value ? "Completed" : "Not completed"}
            </strong>
          </li>
        ))}
      </ul>
      <h3 style={{ marginBottom: "0.25rem" }}>Current XP</h3>
      <p style={{ fontSize: "0.9rem" }}>{xp} XP</p>

      <h3 style={{ marginBottom: "0.25rem" }}>Student Writing</h3>
      <p style={{ fontSize: "0.85rem" }}>
        <strong>Location:</strong>{" "}
        {responses.writing?.location || "Not selected yet"}
      </p>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          padding: "0.75rem",
          background: "white",
          fontSize: "0.85rem",
          maxHeight: "200px",
          overflowY: "auto"
        }}
      >
        {responses.writing?.text || "No writing submitted yet."}
      </div>

      <button
        onClick={onDownloadPdf}
        style={{
          ...primaryButtonStyle,
          marginTop: "0.75rem",
          background: "#f97316"
        }}
      >
        Download writing as PDF
      </button>
    </section>
  );
};

// ----------- MAIN APP --------------

const App = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({
    intro: false,
    zorIn: false,
    spag: false,
    keyTerms: false,
    reading: false,
    writing: false,
    reflection: false,
    zorOut: false
  });
  const [responses, setResponses] = useState({
    zorIn: null,
    zorOut: null,
    spag: null,
    keyTerms: null,
    reading: null,
    writing: null,
    reflection: null
  });

  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");

  const markComplete = (stepKey, xpAmount, extraDataKey, extraData) => {
    setCompletedSteps((prev) => {
      if (prev[stepKey]) return prev; // avoid double XP
      return { ...prev, [stepKey]: true };
    });
    setXp((current) => awardXp(current, xpAmount));
    if (extraDataKey) {
      setResponses((prev) => ({ ...prev, [extraDataKey]: extraData }));
    }
  };

  const handleDownloadPdf = () => {
    // Create a printable HTML version that matches the web app styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Narrative Quest - Geographical Setting - Complete Lesson</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: white;
            padding: 2rem;
          }
          .container { max-width: 960px; margin: 0 auto; }
          h2 { 
            margin-bottom: 0.5rem;
            font-size: 2rem;
            color: #1e40af;
          }
          .subheader {
            margin-bottom: 1rem;
            color: #4b5563;
          }
          .info-box {
            background-color: #ecf0f1;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            border-left: 4px solid #0369a1;
          }
          .level-box {
            border-radius: 1rem;
            padding: 1rem 1.25rem;
            border: 1px solid #e5e7eb;
            margin-bottom: 1rem;
            page-break-inside: avoid;
          }
          .level-blue { background: #f0f9ff; }
          .level-yellow { background: #fef3c7; }
          .level-green { background: #dcfce7; }
          .level-purple { background: #f3e8ff; }
          .level-cyan { background: #cffafe; }
          .level-pink { background: #fce7f3; }
          .level-red { background: #fee2e2; }
          .level-title { 
            font-weight: bold;
            font-size: 1.2rem;
            color: #0369a1;
            margin-bottom: 1rem;
          }
          .response-box {
            background: white;
            padding: 1rem;
            margin: 0.75rem 0;
            border-radius: 0.5rem;
            border-left: 4px solid #0369a1;
          }
          .correct { color: #16a34a; font-weight: bold; }
          ul, ol { margin-left: 1.5rem; margin-bottom: 1rem; }
          li { margin-bottom: 0.5rem; }
          .footer {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #cbd5e1;
            font-size: 0.875rem;
            color: #64748b;
            text-align: center;
          }
          @media print {
            body { padding: 0.5rem; }
            .level-box { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Narrative Quest – Geographical Setting</h2>
          <h1 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Setting & Narrative in The Reluctant Fundamentalist</h1>
          <p class="subheader">Explore how geographical setting shapes character, mood, and meaning in contemporary literature.</p>

          <div class="info-box">
            <h3 style="margin: 0 0 0.5rem 0; color: #0369a1; font-size: 1.1rem;">Learning Objectives</h3>
            <p style="margin: 0; font-size: 1rem;">Use setting, imagery, mood, connotation and figurative language to analyse narrative. See how authors bring real places to life in narrative. Write our own scene set in an unfamiliar country.</p>
          </div>

          <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border: 1px solid #e5e7eb;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div>
                <label style="display: block; font-size: 0.95rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Name:</label>
                <div style="padding: 0.5rem 0.75rem; font-size: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem;">
                  ${studentName || "Student Name Not Entered"}
                </div>
              </div>
              <div>
                <label style="display: block; font-size: 0.95rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem;">Date:</label>
                <div style="padding: 0.5rem 0.75rem; font-size: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem;">
                  ${studentDate || "Date Not Selected"}
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1rem; background: #f0f9ff; border-radius: 0.5rem; border: 1px solid #0369a1;">
            <span style="font-size: 1.1rem; font-weight: bold; color: #0369a1;">⭐ XP: ${xp}</span>
            <div style="flex: 1; height: 20px; background: #e0f2fe; border-radius: 10px; overflow: hidden;">
              <div style="height: 100%; background: linear-gradient(90deg, #0369a1, #06b6d4); width: ${Math.min((xp / 100) * 100, 100)}%; transition: width 0.3s ease;"></div>
            </div>
            <span style="font-size: 0.9rem; color: #64748b;">${Math.min(xp, 100)}/100</span>
          </div>

          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.5rem;">
            <h3 style="margin-top: 0; margin-bottom: 0.75rem; font-size: 1.2rem; color: #1e40af;">📋 Task Schedule</h3>
            <p style="margin: 0 0 0.75rem 0; font-size: 0.95rem;">Your learning journey follows the 5E model:</p>
            <div style="display: grid; gap: 0.5rem;">
              <div style="padding: 0.75rem 1rem; border-radius: 0.75rem; background: #fef3c7; border: 1px solid #f59e0b;">
                <strong style="color: #92400e;">🎯 Engage</strong> — SPaG Activity & Hook
              </div>
              <p style="margin: 0.25rem 0 0 0; padding: 0 1rem; font-size: 0.85rem; color: #666;">Warm-up and explore the lesson hook to spark curiosity about setting and narrative.</p>
              
              <div style="padding: 0.75rem 1rem; border-radius: 0.75rem; background: #dcfce7; border: 1px solid #16a34a; margin-top: 0.5rem;">
                <strong style="color: #15803d;">🔍 Explore</strong> — Key Terms
              </div>
              <p style="margin: 0.25rem 0 0 0; padding: 0 1rem; font-size: 0.85rem; color: #666;">Learn and match key literary terms including imagery, mood, connotation, setting, and figurative language.</p>
              
              <div style="padding: 0.75rem 1rem; border-radius: 0.75rem; background: #f3e8ff; border: 1px solid #a855f7; margin-top: 0.5rem;">
                <strong style="color: #6b21a8;">💡 Explain</strong> — Geographical Setting (The Reluctant Fundamentalist)
              </div>
              <p style="margin: 0.25rem 0 0 0; padding: 0 1rem; font-size: 0.85rem; color: #666;">Analyse how Mohsin Hamid uses setting, culture, and geographical detail to establish mood from the opening chapter.</p>
              
              <div style="padding: 0.75rem 1rem; border-radius: 0.75rem; background: #fce7f3; border: 1px solid #ec4899; margin-top: 0.5rem;">
                <strong style="color: #831843;">📝 Elaborate</strong> — Annotating The Reluctant Fundamentalist
              </div>
              <p style="margin: 0.25rem 0 0 0; padding: 0 1rem; font-size: 0.85rem; color: #666;">Expand your understanding by closely annotating the passage, focusing on voice, setting, and narration.</p>
              
              <div style="padding: 0.75rem 1rem; border-radius: 0.75rem; background: #fee2e2; border: 1px solid #ef4444; margin-top: 0.5rem;">
                <strong style="color: #7f1d1d;">✅ Evaluate</strong> — Write a paragraph on a geographical location
              </div>
              <p style="margin: 0.25rem 0 0 0; padding: 0 1rem; font-size: 0.85rem; color: #666;">Apply your learning by writing your own descriptive paragraph set in a location you've never visited.</p>
            </div>
          </div>

          ${responses.zorIn ? '<div class="level-box level-blue"><div class="level-title">✨ ZoR Check-In</div><div class="response-box"><strong>Zone Selected:</strong> ' + (responses.zorIn.zone || "[Not selected]") + '</div></div>' : ''}

          ${responses.spag ? '<div class="level-box level-yellow"><div class="level-title">🎯 SPaG Challenge</div><div class="response-box"><strong>Sentence:</strong> ' + (responses.spag.sentence || "[Not answered]") + '</div></div>' : ''}

          ${responses.keyTerms ? '<div class="level-box level-green"><div class="level-title">📚 Key Terms Matching</div><table style="width: 100%; border-collapse: collapse; margin-top: 1rem;"><thead><tr style="background: #0369a1; color: white;"><th style="padding: 0.75rem; text-align: left; border: 1px solid #ccc; font-weight: bold;">Term Matched</th><th style="padding: 0.75rem; text-align: left; border: 1px solid #ccc; font-weight: bold;">Definition</th></tr></thead><tbody>' + (responses.keyTerms.answers ? (() => { const termDefs = {"Setting": "The geographical location, time period, and environment where a story takes place", "Imagery": "Vivid descriptions using sensory details (sight, sound, smell, taste, touch) to create mental pictures", "Mood": "The emotional atmosphere or feeling created by the author\'s use of language and description", "Connotation": "The emotional or cultural associations and feelings a word carries beyond its literal meaning", "Figurative Language": "Language that uses figures of speech like metaphors, similes, and personification to create meaning beyond literal interpretation"}; return Object.entries(responses.keyTerms.answers).map(([key, answer]) => '<tr style="background: ' + (key === Object.keys(responses.keyTerms.answers)[0] ? "#f0f9ff" : key === Object.keys(responses.keyTerms.answers)[1] ? "#fef3c7" : key === Object.keys(responses.keyTerms.answers)[2] ? "#dcfce7" : "#f3e8ff") + '; border-bottom: 1px solid #ccc;"><td style="padding: 0.75rem; border: 1px solid #ccc; font-weight: bold;">' + (answer || "[Not answered]") + '</td><td style="padding: 0.75rem; border: 1px solid #ccc;">' + (termDefs[answer] || "Not a valid term") + '</td></tr>').join(''); })() : '') + '</tbody></table></div></div>' : ''}

          <div class="level-box" style="background: #ecfdf5; border: 1px solid #86efac;"><div class="level-title">🔍 Explore: What is Geographical Setting?</div><div style="font-size: 0.95rem; line-height: 1.6;"><p style="margin-top: 0; margin-bottom: 0.75rem;"><strong>Definition:</strong> The geographical setting is where a story takes place — the physical location, landscape, climate, and cultural environment.</p><p style="margin-bottom: 0.75rem;"><strong>Why it matters:</strong></p><ul style="margin: 0 0 0.75rem 1.5rem; padding: 0;"><li>It helps the reader visualise the world of the story.</li><li>It shapes how characters live, speak, and behave.</li><li>It can reflect the themes or mood of the story.</li></ul><p style="margin-bottom: 0.75rem;"><strong>Examples:</strong></p><ul style="margin: 0 0 0.75rem 1.5rem; padding: 0;"><li>A quiet English village on a foggy morning.</li><li>A crowded New York café filled with voices and movement.</li></ul><p style="margin-bottom: 0;"><strong>How authors use Sensory Imagery and Language to Build a Sense of Place:</strong></p><ul style="margin: 0.5rem 0 0 1.5rem; padding: 0;"><li><strong>Sensory Imagery:</strong> Writers use the five senses — sight, sound, smell, touch, taste — to make the reader feel present in the setting.</li><li><strong>Language Choices:</strong> Words and phrasing reflect local culture and tone.</li><li><strong>Atmosphere:</strong> Descriptive language sets the mood (calm, tense, lively, isolated).</li></ul></div></div>

          <div class="level-box" style="background: #eff6ff; border: 1px solid #bfdbfe;"><div class="level-title">💡 Explain: Using The Reluctant Fundamentalist by Mohsin Hamid</div><div style="font-size: 0.95rem; line-height: 1.6;"><p style="margin: 0.5rem 0;"><em>The Reluctant Fundamentalist</em> tells the story of Changez, a young man from Pakistan who moves to the United States to study at Princeton and starts a high-powered job in New York. At first, he is excited by the opportunities and lifestyle America offers.</p><p style="margin: 0.5rem 0;">The novel begins with Changez speaking to an American visitor in a café in Lahore, immediately placing the reader in a specific geographical and cultural setting. This opening allows us to explore how Hamid establishes voice, setting, and mood from the very first lines.</p><p style="margin-bottom: 0;"><strong>Focus Areas:</strong></p><ul style="margin: 0.5rem 0 0 1.5rem; padding: 0;"><li><mark style="background-color: #ffff00;">📍 Setting and Geographical Detail</mark> — Phrases like "native of this city," "northwest frontier," and "Des Moines" contrast two worlds and establish cultural distance.</li><li><mark style="background-color: #90EE90;">🎨 Imagery and Mood</mark> — Lines like "I see I have alarmed you" and "Do not be frightened by my beard" create a tense yet polite atmosphere.</li><li><mark style="background-color: #FF00FF;">📝 Diction and Connotation</mark> — Words like "lover of America," "mission," "bearing," and "observation" are formal and deliberate, showing education and reflection with ironic undertones.</li><li><mark style="background-color: #B0E0E6;">🎤 Voice and Narrator Inference</mark> — The narrator directly addresses the listener, creating an intimate tone. We infer he is intelligent, cautious, and self-aware.</li></ul></div></div>

          ${responses.reading ? '<div class="level-box" style="background: #eef2ff;"><div class="level-title">📖 Reading Level – Voice & Mood</div><div style="font-size: 0.95rem; line-height: 1.6;"><p style="margin-top: 0; margin-bottom: 0.75rem;"><strong>From the opening of <em>The Reluctant Fundamentalist:</em></strong></p><blockquote style="font-style: italic; border-left: 3px solid #6366f1; padding-left: 0.75rem; margin: 0.5rem 0 0.75rem 0; color: #4f46e5;">"Excuse me, sir, but may I be of assistance? Ah, I see I have alarmed you. Do not be frightened by my beard: I am a lover of America..."</blockquote><p style="margin-bottom: 0.75rem;"><strong>What kind of mood is created by this opening?</strong></p><div class="response-box" style="margin-bottom: 0;"><strong>Student Answer:</strong><p style="margin: 0.5rem 0; margin-bottom: 0;">' + (responses.reading.choice === "b" ? "✓ Polite on the surface, but tense and uneasy underneath" : responses.reading.choice === "a" ? "Calm and boring, with no tension between characters" : responses.reading.choice === "c" ? "Completely silly and joking, like a comedy scene" : "[Not answered]") + '</p></div></div></div>' : ''}

          ${responses.chartAnalysis ? '<div class="level-box" style="background: #eff6ff;"><div class="level-title">📊 Chart Analysis</div>' + ('<div class="response-box"><strong>Identify a QUOTE from the text:</strong><p style="margin: 0.5rem 0; font-style: italic;">"' + (responses.chartAnalysis.quote || "[Not provided]") + '"</p></div>') + ('<div class="response-box"><strong>Write what it tells us about the SETTING:</strong><p style="margin: 0.5rem 0;">' + (responses.chartAnalysis.setting || "[Not provided]") + '</p></div>') + ('<div class="response-box"><strong>Write what it tells us about what the NARRATOR is saying:</strong><p style="margin: 0.5rem 0;">' + (responses.chartAnalysis.narrator || "[Not provided]") + '</p></div>') + '</div>' : ''}

          ${responses.writing ? '<div class="level-box level-red"><div class="level-title">✍️ Writing Task</div><div class="response-box"><strong>Location:</strong> ' + (responses.writing.location || "[Not selected]") + '</div><div class="response-box"><strong>Student Scene:</strong></div><div style="background: white; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap;">' + (responses.writing.text || "[No writing submitted]") + '</div></div>' : ''}

          ${responses.reflection ? '<div class="level-box" style="background: #f9fafb;"><div class="level-title">💭 Reflection</div><div class="response-box"><strong>1. How did I show the setting?</strong><p style="margin: 0.5rem 0;">' + (responses.reflection.q1 || "[Not answered]") + '</p></div><div class="response-box"><strong>2. Which sentence best shows the narrator\'s voice?</strong><p style="margin: 0.5rem 0;">' + (responses.reflection.q2 || "[Not answered]") + '</p></div><div class="response-box"><strong>3. What one change would make the mood stronger?</strong><p style="margin: 0.5rem 0;">' + (responses.reflection.q3 || "[Not answered]") + '</p></div></div>' : ''}

          ${responses.zorOut ? '<div class="level-box level-cyan"><div class="level-title">🎉 ZoR Check-Out</div><div class="response-box"><strong>Zone Selected:</strong> ' + (responses.zorOut.zone || "[Not selected]") + '</div></div>' : ''}

          <div class="footer">
            <p><strong>Lesson Complete!</strong></p>
            <p>Total XP Earned: ${xp} | Submitted: ${(() => { const d = new Date(); return String(d.getDate()).padStart(2, '0') + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + d.getFullYear(); })()}</p>
            <p style="margin-top: 1rem; font-style: italic; color: #0369a1;">💡 Use your browser's print function (Ctrl+P or Cmd+P) and select "Save as PDF" to download this as a PDF with proper formatting.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '', 'width=1024,height=768');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-trigger print dialog
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // Level gating
  const canAccess = {
    intro: true,
    zorIn: completedSteps.intro,
    spag: completedSteps.zorIn,
    keyTerms: completedSteps.spag,
    reading: completedSteps.keyTerms,
    chartAnalysis: completedSteps.reading,
    writing: completedSteps.chartAnalysis,
    reflection: completedSteps.writing,
    zorOut: completedSteps.reflection
  };


  const IntroductionSchedule = ({ scheduleViewed, onScheduleView }) => {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <section
      style={{
        borderRadius: "1rem",
        padding: "1.25rem",
        border: "1px solid #e5e7eb",
        background: "white",
        marginBottom: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
        Task Schedule
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        Here is your learning journey for today. You’ll progress through 
        each stage following the 5E model.
      </p>
      <p style={{ fontSize: "0.9rem", fontStyle: "italic", color: "#6b7280", marginBottom: "1rem" }}>
        Click on each box to see more.
      </p>

      {/* 5E LIST */}
      <div style={{ display: "grid", gap: "0.75rem" }}>

        {/* Engage */}
        <div
          onClick={() => toggle("engage")}
          style={{ ...taskHeaderStyle, background: "#fef3c7", border: "1px solid #f59e0b" }}
        >
          <strong>🎯 Engage</strong> — SPaG Activity & Hook
        </div>
        {open === "engage" && (
          <div style={{ ...taskBodyStyle, background: "#fef3c7", borderLeft: "3px solid #f59e0b" }}>
            You will begin with a SPaG warm-up and explore the lesson hook 
            to spark curiosity about setting and narrative.
          </div>
        )}

        {/* Explore */}
        <div
          onClick={() => toggle("explore")}
          style={{ ...taskHeaderStyle, background: "#dcfce7", border: "1px solid #16a34a" }}
        >
          <strong>🔍 Explore</strong> — Key Terms
        </div>
        {open === "explore" && (
          <div style={{ ...taskBodyStyle, background: "#dcfce7", borderLeft: "3px solid #16a34a" }}>
            Learn and match key literary terms including imagery, mood, 
            connotation, setting, and figurative language.
          </div>
        )}

        {/* Explain */}
        <div
          onClick={() => toggle("explain")}
          style={{ ...taskHeaderStyle, background: "#f3e8ff", border: "1px solid #a855f7" }}
        >
          <strong>💡 Explain</strong> — Geographical Setting 
          (The Reluctant Fundamentalist)
        </div>
        {open === "explain" && (
          <div style={{ ...taskBodyStyle, background: "#f3e8ff", borderLeft: "3px solid #a855f7" }}>
            Analyse how Mohsin Hamid uses setting, culture, and geographical 
            detail to establish mood from the opening chapter.
          </div>
        )}

        {/* Elaborate */}
        <div
          onClick={() => toggle("elaborate")}
          style={{ ...taskHeaderStyle, background: "#fce7f3", border: "1px solid #ec4899" }}
        >
          <strong>📝 Elaborate</strong> — Annotating The Reluctant Fundamentalist
        </div>
        {open === "elaborate" && (
          <div style={{ ...taskBodyStyle, background: "#fce7f3", borderLeft: "3px solid #ec4899" }}>
            Expand your understanding by closely annotating the passage, 
            focusing on voice, setting, and narration.
          </div>
        )}

        {/* Evaluate */}
        <div
          onClick={() => toggle("evaluate")}
          style={{ ...taskHeaderStyle, background: "#fee2e2", border: "1px solid #ef4444" }}
        >
          <strong>✅ Evaluate</strong> — Write a paragraph on a geographical location
        </div>
        {open === "evaluate" && (
          <div style={{ ...taskBodyStyle, background: "#fee2e2", borderLeft: "3px solid #ef4444" }}>
            Apply your learning by writing your own descriptive paragraph set 
            in a location you've never visited.
          </div>
        )}
      </div>

      {/* Next Page Button */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          onClick={onScheduleView}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "999px",
            border: "1px solid #3b82f6",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: 500
          }}
        >
          Let's begin! ↓
        </button>
      </div>

    </section>
  );
};

// STYLES
const taskHeaderStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  cursor: "pointer",
  fontSize: "0.9rem"
};

const taskBodyStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "white",
  borderLeft: "3px solid #3b82f6",
  fontSize: "0.85rem",
  marginTop: "-0.5rem",
  marginBottom: "0.5rem"
};

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "1.5rem",
        paddingLeft: "2rem",
        maxWidth: "960px",
        margin: "0 auto",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "0.5rem", fontSize: "2rem", color: "#1e40af" }}>Autumn II - Narrative Writing</h2>
      
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ marginBottom: "0.25rem", fontSize: "1.1rem" }}>
          Narrative Quest – Geographical Setting
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#4b5563" }}>
          Earn XP by completing each level: from Zones of Regulation, through
          SPaG and key terms, to your own narrative scene.
        </p>
      </header>

      <XPBar xp={xp} maxXp={120} />
      <IntroductionSchedule scheduleViewed={scheduleViewed} onScheduleView={() => setScheduleViewed(true)} />

      {scheduleViewed && (
        <>
          <LevelLockWrapper title="Level 1 – Introduction" unlocked={canAccess.intro}>
            <Introduction
              onComplete={() =>
                markComplete("intro", 10, null, null)
              }
              studentName={studentName}
              setStudentName={setStudentName}
              studentDate={studentDate}
              setStudentDate={setStudentDate}
            />
          </LevelLockWrapper>

          <LevelLockWrapper title="Level 2 – ZoR Check-in" unlocked={canAccess.zorIn}>
            <ZoRCheck
              label="ZoR Check-in (Start of Lesson)"
              onComplete={(zone) =>
                markComplete("zorIn", 5, "zorIn", { zone })
              }
            />
          </LevelLockWrapper>

          <Hook />

          <LevelLockWrapper title="Level 3 – SPaG Challenge" unlocked={canAccess.spag}>
            <SpagActivity
              onComplete={(data) =>
                markComplete("spag", 10, "spag", data)
              }
            />
          </LevelLockWrapper>

          <GeographicalSettingExplanation />

          <LevelLockWrapper
            title="Level 4 – Key Terms Matching"
            unlocked={canAccess.keyTerms}
          >
            <KeyTermsMatch
              onComplete={(data) =>
                markComplete("keyTerms", 15, "keyTerms", data)
              }
            />
          </LevelLockWrapper>

          <ExplainReluctantFundamentalist />

          <LevelLockWrapper
            title="Level 5 – Reading Mood & Voice"
            unlocked={canAccess.reading}
          >
            <ReadingActivity
              onComplete={(data) =>
                markComplete("reading", 15, "reading", data)
              }
            />
          </LevelLockWrapper>

          <LevelLockWrapper
            title="Level 5.5 – Chart Analysis"
            unlocked={canAccess.reading}
          >
            <ChartAnalysis
              onComplete={(data) =>
                markComplete("chartAnalysis", 10, "chartAnalysis", data)
              }
            />
          </LevelLockWrapper>

          <LevelLockWrapper
            title="Level 6 – Writing Your Scene"
            unlocked={canAccess.writing}
          >
            <WritingTask
              onComplete={(data) =>
                markComplete("writing", 40, "writing", data)
              }
            />
          </LevelLockWrapper>

          <LevelLockWrapper
            title="Level 7 – Reflection"
            unlocked={canAccess.reflection}
          >
            <Reflection
              onComplete={(data) =>
                markComplete("reflection", 15, "reflection", data)
              }
            />
          </LevelLockWrapper>

          <LevelLockWrapper
            title="Level 8 – ZoR Check-out"
            unlocked={canAccess.zorOut}
          >
            <ZoRCheck
              label="ZoR Check-out (End of Lesson)"
              onComplete={(zone) =>
                markComplete("zorOut", 5, "zorOut", { zone })
              }
            />
          </LevelLockWrapper>
        </>
      )}

      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/n6")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #0369a1",
            background: "white",
            color: "#0369a1",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          ← Previous Lesson
        </button>
        <button
          onClick={handleDownloadPdf}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#22c55e",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          📤 Submit Lesson
        </button>
        <button
          onClick={() => navigate("/n8")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #0369a1",
            background: "white",
            color: "#0369a1",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
};

// ----------- SMALL STYLE HELPERS & WRAPPERS ------------

const inputStyle = {
  width: "100%",
  padding: "0.35rem 0.5rem",
  borderRadius: "0.5rem",
  border: "1px solid #d1d5db",
  fontSize: "0.9rem"
};

const primaryButtonStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "999px",
  border: "none",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  marginTop: "0.5rem"
};

const optionLabelStyle = {
  fontSize: "0.85rem",
  borderRadius: "0.75rem",
  border: "1px solid #e5e7eb",
  padding: "0.5rem 0.5rem",
  background: "white",
  cursor: "pointer"
};

const reflectionLabelStyle = {
  fontSize: "0.85rem",
  display: "block"
};

const reflectionInputStyle = {
  ...inputStyle,
  width: "100%",
  marginTop: "0.25rem",
  resize: "vertical"
};

const LevelLockWrapper = ({ title, unlocked, children }) => (
  <section style={{ marginBottom: "1rem" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.25rem"
      }}
    >
      <span
        style={{
          fontSize: "0.85rem",
          fontWeight: 600,
          color: unlocked ? "#16a34a" : "#9ca3af"
        }}
      >
        {unlocked ? "Unlocked" : "Locked"}
      </span>
      <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{title}</span>
    </div>
    {unlocked ? (
      children
    ) : (
      <div
        style={{
          borderRadius: "1rem",
          padding: "0.75rem 1rem",
          border: "1px dashed #d1d5db",
          background: "#f9fafb",
          fontSize: "0.85rem"
        }}
      >
        Complete the previous level to unlock this one.
      </div>
    )}
  </section>
);

const labelFromKey = (key) => {
  const map = {
    intro: "Level 1 – Introduction",
    zorIn: "Level 2 – ZoR Check-in",
    spag: "Level 3 – SPaG Challenge",
    keyTerms: "Level 4 – Key Terms",
    reading: "Level 5 – Reading Activity",
    writing: "Level 6 – Writing Task",
    reflection: "Level 7 – Reflection",
    zorOut: "Level 8 – ZoR Check-out"
  };
  return map[key] || key;
};

export default App;