import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ZoRCheck Component
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
    </section>
  );
};

// Memoized Definition Input Component
const DefinitionInput = React.memo(({ value, onChange, definition }) => {
  const inputRef = useRef(null);

  return (
    <div style={{ marginBottom: "1rem", padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter term..."
          style={{
            width: "120px",
            padding: "0.5rem",
            border: "1px solid #fcd34d",
            borderRadius: "0.4rem",
            fontSize: "0.9rem",
            fontWeight: "500"
          }}
        />
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#333", flex: 1, paddingTop: "0.5rem" }}>
          {definition}
        </p>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if value or definition changes
  return prevProps.value === nextProps.value && prevProps.definition === nextProps.definition;
});

DefinitionInput.displayName = "DefinitionInput";

const N4 = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
  const [spagAnswers, setSpagAnswers] = useState({
    word1: "",
    word2: "",
    word3: "",
    word4: "",
    word5: "",
    word6: ""
  });
  const [spagFeedback, setSpagFeedback] = useState(null);
  const [level2Answers, setLevel2Answers] = useState({
    def1: "",
    def2: "",
    def3: "",
    def4: ""
  });
  const [level2Feedback, setLevel2Feedback] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({
    levelOne: false,
    levelTwo: false,
    levelThree: false,
    levelFour: false,
    levelFive: false
  });

  const markComplete = (stepKey, points) => {
    if (!completedSteps[stepKey]) {
      setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
      setXp((prev) => prev + points);
    }
  };

  const handleLevel2InputChange = useCallback((field, value) => {
    setLevel2Answers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleDef1Change = useCallback((value) => {
    handleLevel2InputChange("def1", value);
  }, [handleLevel2InputChange]);

  const handleDef2Change = useCallback((value) => {
    handleLevel2InputChange("def2", value);
  }, [handleLevel2InputChange]);

  const handleDef3Change = useCallback((value) => {
    handleLevel2InputChange("def3", value);
  }, [handleLevel2InputChange]);

  const handleDef4Change = useCallback((value) => {
    handleLevel2InputChange("def4", value);
  }, [handleLevel2InputChange]);

  const LevelSection = ({ 
    unlocked, 
    title, 
    children, 
    bgColor = "#f9fafb",
    ref = null
  }) => {
    if (!unlocked) {
      return (
        <section
          style={{
            borderRadius: "1rem",
            padding: "1rem 1.25rem",
            border: "2px dashed #cbd5e1",
            background: "#f8fafc",
            marginBottom: "1rem",
            opacity: 0.6
          }}
        >
          <h2 style={{ marginTop: 0, color: "#94a3b8" }}>{title}</h2>
          <p style={{ color: "#64748b", fontStyle: "italic" }}>
            🔒 Complete the previous level to unlock this activity.
          </p>
        </section>
      );
    }
    return (
      <section
        ref={ref}
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: bgColor,
          marginBottom: "1rem"
        }}
      >
        {children}
      </section>
    );
  };

  const XPBar = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", padding: "1rem", background: "#f0f9ff", borderRadius: "0.5rem", border: "1px solid #0369a1" }}>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#0369a1" }}>⭐ XP: {xp}</span>
        <div style={{ flex: 1, height: "20px", background: "#e0f2fe", borderRadius: "10px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #0369a1, #06b6d4)",
              width: `${Math.min((xp / 100) * 100, 100)}%`,
              transition: "width 0.3s ease"
            }}
          />
        </div>
        <span style={{ fontSize: "0.9rem", color: "#64748b" }}>{Math.min(xp, 100)}/100</span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#1e40af", fontSize: "1.5rem" }}>
          Autumn II - Narrative Writing
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "1.5rem" }}>
          Lesson 4
        </p>

        {/* Student Info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "1.5rem", minWidth: 0 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Your Name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Date:
            </label>
            <input
              type="date"
              value={studentDate}
              onChange={(e) => setStudentDate(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem"
              }}
            />
          </div>
        </div>

        <XPBar />
      </div>

      {/* Learning Journey Schedule */}
      {!scheduleViewed && (
        <section
          style={{
            borderRadius: "1rem",
            padding: "1rem 1.25rem",
            border: "1px solid #e5e7eb",
            background: "#eff6ff",
            marginBottom: "1rem"
          }}
        >
          <h2 style={{ marginTop: 0, color: "#1e40af" }}>Task Schedule</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div style={{ padding: "0.75rem", background: "#fef3c7", borderRadius: "0.5rem", borderLeft: "4px solid #f59e0b", fontWeight: "500" }}>
              <strong>🎯 Engage:</strong> SPaG Activity & Hook
            </div>
            <div style={{ padding: "0.75rem", background: "#fef3c7", borderRadius: "0.5rem", borderLeft: "4px solid #f59e0b", fontWeight: "500" }}>
              <strong>🔍 Explore:</strong> Key Terms
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>💡 Explain:</strong> Analyse voice in - Paddy Clarke Ha Ha Ha
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>📝 Elaborate:</strong> Acting / Independent Task
            </div>
            <div style={{ padding: "0.75rem", background: "#dbeafe", borderRadius: "0.5rem", borderLeft: "4px solid #3b82f6", fontWeight: "500" }}>
              <strong>✅ Evaluate:</strong> What makes a good writer's voice?
            </div>
          </div>
          <button
            onClick={() => setScheduleViewed(true)}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#1e40af",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Let's Begin ↓
          </button>
        </section>
      )}

      {/* Learning Objective */}
      {scheduleViewed && (
        <section style={{ borderRadius: "1rem", padding: "1rem 1.25rem", border: "1px solid #e5e7eb", background: "#f0fdf4", marginBottom: "1.5rem" }}>
          <h2 style={{ marginTop: 0, color: "#16a34a", fontSize: "1.1rem" }}>📚 Learning Objective</h2>
          <p style={{ marginBottom: "1rem", color: "#166534", fontSize: "1rem" }}>To explore and develop distinct narrator voices.</p>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#16a34a", fontSize: "0.95rem" }}>Lesson Objectives:</h3>
            <ul style={{ marginLeft: "1.5rem", color: "#166534", lineHeight: "1.8" }}>
              <li>Identify how writers create a distinct voice</li>
              <li>Explore tone and perspective in storytelling</li>
              <li>Write our own short piece with a clear narrator's voice</li>
            </ul>
          </div>
        </section>
      )}

      {/* ZoR Check-in */}
      {scheduleViewed && (
        <ZoRCheck label="🧠 ZoR Check-in" onComplete={(zone) => console.log("Zone:", zone)} />
      )}

      {/* Level 1 - Engage */}
      <LevelSection
        unlocked={scheduleViewed}
        title="🎣 Level 1 - Engage: Hook"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 1
        </p>

        {/* Voice Activity */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#ecfdf5", borderRadius: "0.75rem", border: "1px solid #86efac" }}>
          <h3 style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "700", marginTop: 0, marginBottom: "1.5rem" }}>
            🎣 Engage: Hook
          </h3>
          <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", marginTop: 0, marginBottom: "1rem" }}>
            Let's read out these sentences:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac", fontStyle: "italic" }}>
              "Do I have to go? It's boring!"
            </div>
            <div style={{ padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac", fontStyle: "italic" }}>
              "Please make sure you're ready to leave on time."
            </div>
            <div style={{ padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac", fontStyle: "italic" }}>
              "I remember when we used to walk there every Sunday…"
            </div>
          </div>

          {/* Discussion Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
              <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
                👂 Who do you think is speaking in each line — a child, a teacher, or a grandparent?
              </p>
              <textarea
                placeholder="Share your thoughts..."
                style={{
                  width: "100%",
                  minHeight: "60px",
                  padding: "0.5rem",
                  border: "1px solid #86efac",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
              <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
                💭 What clues in the words or tone helped you decide?
              </p>
              <textarea
                placeholder="Share your thoughts..."
                style={{
                  width: "100%",
                  minHeight: "60px",
                  padding: "0.5rem",
                  border: "1px solid #86efac",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Link to Learning */}
          <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "0.5rem", border: "2px solid #fcd34d" }}>
            <p style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
              🔗 Link to Learning:
            </p>
            <p style={{ fontSize: "0.9rem", color: "#92400e", margin: 0, lineHeight: "1.6" }}>
              Today we'll see how authors use language to make a narrator's voice sound real.
            </p>
          </div>

          {/* SPaG Activity */}
          <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
              ✏️ SPaG Activity
            </h3>
            <p style={{ fontSize: "1.05rem", color: "#92400e", fontWeight: "500", marginBottom: "1.5rem" }}>
              Select the correct words that make the sentence correct.
            </p>
            <div style={{ padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d", fontSize: "1.1rem", color: "#333", lineHeight: "2.2" }}>
              <p style={{ margin: 0 }}>
                The{" "}
                <select
                  value={spagAnswers.word1}
                  onChange={(e) => setSpagAnswers({ ...spagAnswers, word1: e.target.value })}
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.3rem",
                    border: "1px solid #fcd34d",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="dog">dog</option>
                  <option value="dawg">dawg</option>
                </select>{" "}
                ran{" "}
                <select
                  value={spagAnswers.word2}
                  onChange={(e) => setSpagAnswers({ ...spagAnswers, word2: e.target.value })}
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.3rem",
                    border: "1px solid #fcd34d",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="across">across</option>
                  <option value="acros">acros</option>
                  <option value="accross">accross</option>
                </select>{" "}
                the{" "}
                <select
                  value={spagAnswers.word3}
                  onChange={(e) => setSpagAnswers({ ...spagAnswers, word3: e.target.value })}
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.3rem",
                    border: "1px solid #fcd34d",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="yard">yard</option>
                  <option value="yerd">yerd</option>
                </select>
                , chasing a{" "}
                <select
                  value={spagAnswers.word4}
                  onChange={(e) => setSpagAnswers({ ...spagAnswers, word4: e.target.value })}
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.3rem",
                    border: "1px solid #fcd34d",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="squirel">squirel</option>
                  <option value="squirrel">squirrel</option>
                  <option value="squirrell">squirrell</option>
                </select>{" "}
                that moved{" "}
                <select
                  value={spagAnswers.word5}
                  onChange={(e) => setSpagAnswers({ ...spagAnswers, word5: e.target.value })}
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.3rem",
                    border: "1px solid #fcd34d",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="quick">quick</option>
                  <option value="quickly">quickly</option>
                </select>{" "}
                up the{" "}
                <select
                  value={spagAnswers.word6}
                  onChange={(e) => setSpagAnswers({ ...spagAnswers, word6: e.target.value })}
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.3rem",
                    border: "1px solid #fcd34d",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="tall">tall</option>
                  <option value="talle">talle</option>
                </select>{" "}
                tree.
              </p>
            </div>

            {/* Check Button */}
            <button
              onClick={() => {
                const correct =
                  spagAnswers.word1 === "dog" &&
                  spagAnswers.word2 === "across" &&
                  spagAnswers.word3 === "yard" &&
                  spagAnswers.word4 === "squirrel" &&
                  spagAnswers.word5 === "quickly" &&
                  spagAnswers.word6 === "tall";

                if (correct) {
                  setSpagFeedback("correct");
                } else {
                  setSpagFeedback("incorrect");
                }
              }}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#f59e0b",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}
            >
              Check Answers
            </button>

            {spagFeedback === "correct" && (
              <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
                ✓ Correct! All answers are right!
              </p>
            )}
            {spagFeedback === "incorrect" && (
              <p style={{ marginTop: "0.75rem", color: "#dc2626", fontWeight: "bold", fontSize: "0.9rem" }}>
                ✗ Not quite right. Check your answers and try again!
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => markComplete("levelOne", 15)}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelOne ? "#16a34a" : "#f59e0b",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelOne}
        >
          {completedSteps.levelOne ? "✓ Complete" : "Complete"}
        </button>
        {completedSteps.levelOne && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +10 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Explore: Starter Section */}
      <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#f0fdf4", borderRadius: "0.75rem", border: "1px solid #86efac" }}>
        <h3 style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "700", marginTop: 0, marginBottom: "1.5rem" }}>
          🔍 Explore: Starter
        </h3>

        <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", marginBottom: "1rem" }}>
          As a class, read aloud or write this sentence twice in your books:
        </p>

        <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "1.05rem", color: "#166534", fontStyle: "italic", fontWeight: "500", margin: 0, textAlign: "center" }}>
            "The door opened"
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "#ecfdf5", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
            <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
              1. As if spoken by a small child.
            </p>
          </div>

          <div style={{ padding: "0.75rem", backgroundColor: "#ecfdf5", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
            <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
              2. As if spoken by a grumpy old man.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
            <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
              How did word choice change the tone?
            </p>
            <textarea
              placeholder="Share your thoughts..."
              style={{
                width: "100%",
                minHeight: "60px",
                padding: "0.5rem",
                border: "1px solid #86efac",
                borderRadius: "0.4rem",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
            <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
              What did you imagine about each speaker?
            </p>
            <textarea
              placeholder="Share your thoughts..."
              style={{
                width: "100%",
                minHeight: "60px",
                padding: "0.5rem",
                border: "1px solid #86efac",
                borderRadius: "0.4rem",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
            />
          </div>
        </div>
      </div>

      {/* Level 2 - Hook */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelOne}
        title="📖 Level 2 - Explore: Key Terms"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 2
        </p>

        <div style={{ padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
            ✏️ Match the Definitions
          </h3>
          <p style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600", marginBottom: "1.5rem" }}>
            Select the correct term for each definition.
          </p>

          {/* Word Bank */}
          <div style={{ padding: "0.75rem", backgroundColor: "#fdf2f8", borderRadius: "0.5rem", border: "1px solid #fbcfe8", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#831843", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Word Bank:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {["Perspective", "Tone", "Voice", "Diction"].map((word) => (
                <span
                  key={word}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "white",
                    border: "1px solid #fbcfe8",
                    borderRadius: "0.4rem",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#831843"
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Definition 1 */}
          <DefinitionInput
            value={level2Answers.def1}
            onChange={handleDef1Change}
            definition="The viewpoint from which a story is told"
          />

          {/* Definition 2 */}
          <DefinitionInput
            value={level2Answers.def2}
            onChange={handleDef2Change}
            definition="The general character or attitude of a piece of writing"
          />

          {/* Definition 3 */}
          <DefinitionInput
            value={level2Answers.def3}
            onChange={handleDef3Change}
            definition="The individual style in which a story is written, reflecting the narrator's personality."
          />

          {/* Definition 4 */}
          <DefinitionInput
            value={level2Answers.def4}
            onChange={handleDef4Change}
            definition="The choice and use of words and phrases in speech or writing."
          />

          {/* Check Button */}
          <button
            onClick={() => {
              const correct =
                level2Answers.def1.toLowerCase() === "perspective" &&
                level2Answers.def2.toLowerCase() === "tone" &&
                level2Answers.def3.toLowerCase() === "voice" &&
                level2Answers.def4.toLowerCase() === "diction";

              if (correct) {
                setLevel2Feedback("correct");
                markComplete("levelTwo", 15);
              } else {
                setLevel2Feedback("incorrect");
              }
            }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: completedSteps.levelTwo ? "#16a34a" : "#f59e0b",
              color: "white",
              cursor: completedSteps.levelTwo ? "default" : "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem"
            }}
            disabled={completedSteps.levelTwo}
          >
            {completedSteps.levelTwo ? "✓ Complete" : "Check Answers"}
          </button>

          {level2Feedback === "correct" && (
            <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
              ✓ Correct! All definitions match!
            </p>
          )}
          {level2Feedback === "incorrect" && (
            <p style={{ marginTop: "0.75rem", color: "#dc2626", fontWeight: "bold", fontSize: "0.9rem" }}>
              ✗ Not quite right. Check your answers and try again!
            </p>
          )}
        </div>
      </LevelSection>

      {/* Level 3 - Explain */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelTwo}
        title="💡 Level 3 - Explain: Paddy Clarke Ha Ha Ha"
        bgColor="#dcfce7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 3
        </p>

        <div style={{ padding: "1rem", backgroundColor: "#ecfdf5", borderRadius: "0.75rem", border: "1px solid #86efac", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
            📖 Analysing Narrator's Perspective in "Paddy Clarke Ha Ha Ha" by Roddy Doyle
          </h3>

          <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", marginBottom: "1.5rem" }}>
            Together as a class, we'll be reading and analysing an AQA story opening to explore how writers create perspective, tone, voice and diction. All needed for your own narrative story.
          </p>

          <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", marginBottom: "1rem" }}>
            As we read the story, how does the author model:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "#fef3c7", borderRadius: "0.4rem", border: "1px solid #fcd34d", fontSize: "0.95rem", color: "#92400e", fontWeight: "500" }}>
              ✏️ Diction (word choice)
            </div>
            <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "#fef3c7", borderRadius: "0.4rem", border: "1px solid #fcd34d", fontSize: "0.95rem", color: "#92400e", fontWeight: "500" }}>
              🎭 Tone
            </div>
            <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "#fef3c7", borderRadius: "0.4rem", border: "1px solid #fcd34d", fontSize: "0.95rem", color: "#92400e", fontWeight: "500" }}>
              📝 Sentence Structure
            </div>
            <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "#fef3c7", borderRadius: "0.4rem", border: "1px solid #fcd34d", fontSize: "0.95rem", color: "#92400e", fontWeight: "500" }}>
              👁️ Perspective (Narrative Viewpoint)
            </div>
          </div>

          <div style={{ padding: "0.75rem", backgroundColor: "#fef9e7", borderRadius: "0.5rem", border: "1px solid #fcd34d" }}>
            <p style={{ fontSize: "0.9rem", color: "#92400e", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
              📑 Ask Miss for printout.
            </p>
          </div>
        </div>

        <button
          onClick={() => markComplete("levelThree", 25)}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelThree ? "#16a34a" : "#16a34a",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelThree}
        >
          {completedSteps.levelThree ? "✓ Complete" : "Complete"}
        </button>
        {completedSteps.levelThree && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +25 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 4 - Explain */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelThree}
        title="📚 Level 4 - Explain"
        bgColor="#dcfce7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 4
        </p>
        <p style={{ fontSize: "1rem", color: "#166534", marginBottom: "1rem" }}>
          Content to be added
        </p>
        <button
          onClick={() => markComplete("levelFour", 20)}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFour ? "#16a34a" : "#16a34a",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelFour}
        >
          {completedSteps.levelFour ? "✓ Complete" : "Complete"}
        </button>
        {completedSteps.levelFour && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +20 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 5 - Elaborate */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelFour}
        title="✨ Level 5 - Elaborate"
        bgColor="#dbeafe"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 5
        </p>
        <p style={{ fontSize: "1rem", color: "#0c4a6e", marginBottom: "1rem" }}>
          Content to be added
        </p>
        <button
          onClick={() => markComplete("levelFive", 25)}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFive ? "#0369a1" : "#0369a1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelFive}
        >
          {completedSteps.levelFive ? "✓ Complete Lesson" : "Complete Lesson"}
        </button>
        {completedSteps.levelFive && (
          <p style={{ marginTop: "0.75rem", color: "#0369a1", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +25 XP earned! Lesson Complete!
          </p>
        )}
      </LevelSection>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/n3")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#0369a1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => navigate("/n5")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#0369a1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default N4;
