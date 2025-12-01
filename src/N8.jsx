import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

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

// Memoized Key Term Input Component
const KeyTermInput = React.memo(({ itemId, definition, value, onChange }) => {
  const inputRef = useRef(null);

  return (
    <div style={{ marginBottom: "1rem", padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d" }}>
      <p style={{ fontSize: "0.9rem", color: "#333", margin: "0 0 0.5rem 0", fontWeight: "500" }}>
        {definition}
      </p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter term"
        value={value}
        onChange={(e) => onChange(itemId, e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "0.3rem",
          border: "1px solid #d1d5db",
          fontSize: "0.9rem",
          boxSizing: "border-box"
        }}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  // Return TRUE if props are the same (don't re-render), FALSE if different (do re-render)
  return prevProps.value === nextProps.value && 
         prevProps.itemId === nextProps.itemId && 
         prevProps.definition === nextProps.definition;
});

KeyTermInput.displayName = "KeyTermInput";

// Isolated Level 2 SPaG Activity Component
const Level2SPaG = ({ onComplete }) => {
  const [adjective, setAdjective] = useState("");
  const [adverb, setAdverb] = useState("");
  const [error, setError] = useState("");

  const handleValidate = () => {
    const adjTrimmed = adjective.trim().toLowerCase();
    const advTrimmed = adverb.trim().toLowerCase();
    
    if (adjTrimmed === "fierce" && advTrimmed === "angrily") {
      setError("");
      onComplete();
    } else {
      setError("❌ Not quite right. The adjective should be 'fierce' and the adverb should be 'angrily'.");
    }
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d", marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: "1.1rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
        🎯 Explore: SPaG Activity
      </h3>

      <p style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600", marginBottom: "1.5rem" }}>
        Fill in the blanks with the correct word forms:
      </p>

      {/* Word Bank */}
      <div style={{ padding: "0.75rem", backgroundColor: "#fdf2f8", borderRadius: "0.5rem", border: "1px solid #fbcfe8", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "#831843", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Word Bank:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {["angrily", "fierce"].map((word) => (
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

      {/* Sentence with blanks */}
      <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d", marginBottom: "1.5rem", fontSize: "1rem", color: "#333", lineHeight: "1.8" }}>
        <p style={{ margin: 0 }}>
          The{" "}
          <input
            type="text"
            placeholder="[adjective]"
            value={adjective}
            onChange={(e) => {
              setAdjective(e.target.value);
              setError("");
            }}
            style={{
              width: "120px",
              padding: "0.4rem 0.6rem",
              borderRadius: "0.3rem",
              border: "1px solid #fcd34d",
              fontSize: "0.95rem",
              fontWeight: "500",
              textAlign: "center"
            }}
          />{" "}
          wolf knocked{" "}
          <input
            type="text"
            placeholder="[adverb]"
            value={adverb}
            onChange={(e) => {
              setAdverb(e.target.value);
              setError("");
            }}
            style={{
              width: "120px",
              padding: "0.4rem 0.6rem",
              borderRadius: "0.3rem",
              border: "1px solid #fcd34d",
              fontSize: "0.95rem",
              fontWeight: "500",
              textAlign: "center"
            }}
          />{" "}
          on the little pig's door.
        </p>
      </div>

      <button
        onClick={handleValidate}
        style={{
          padding: "0.65rem 1.5rem",
          borderRadius: "0.5rem",
          border: "none",
          background: "#f59e0b",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.9rem",
          marginBottom: "1rem"
        }}
      >
        Check Answer & Complete
      </button>
      {error && (
        <p style={{ color: "#dc2626", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

// Isolated Level 3 Key Terms Section Component
const Level3KeyTerms = React.memo(({ onComplete }) => {
  const [localResponses, setLocalResponses] = useState(() => {
    const saved = localStorage.getItem("level3Responses");
    return saved ? JSON.parse(saved) : {};
  });
  const [feedback, setFeedback] = useState(null);

  // Save to localStorage whenever responses change
  useEffect(() => {
    localStorage.setItem("level3Responses", JSON.stringify(localResponses));
  }, [localResponses]);

  const handleKeyTermChange = useCallback((itemId, value) => {
    setLocalResponses((prev) => ({
      ...prev,
      [itemId]: value
    }));
  }, []);

  const definitions = useMemo(() => [
    { id: "def1", definition: "when the reader feels tension or uncertainty", correct: "suspense" },
    { id: "def2", definition: "how fast or slow events unfold", correct: "pacing" },
    { id: "def3", definition: "the most dramatic moment", correct: "climax" },
    { id: "def4", definition: "how the problem is solved", correct: "resolution" },
    { id: "def5", definition: "hints about what will happen later", correct: "foreshadowing" }
  ], []);

  return (
    <div style={{ padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d", marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: "1.1rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
        ✏️ Explore: Key Terms
      </h3>

      <p style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600", marginBottom: "1.5rem" }}>
        Write the correct term on each blank!
      </p>

      {/* Word Bank */}
      <div style={{ padding: "0.75rem", backgroundColor: "#fdf2f8", borderRadius: "0.5rem", border: "1px solid #fbcfe8", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "#831843", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Word Bank:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {["foreshadowing", "climax", "pacing", "resolution", "suspense"].map((word) => (
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

      {/* Matching Activity */}
      <div style={{ marginBottom: "1.5rem" }}>
        {definitions.map((item) => (
          <KeyTermInput
            key={item.id}
            itemId={item.id}
            definition={item.definition}
            value={localResponses[item.id] || ""}
            onChange={handleKeyTermChange}
          />
        ))}
      </div>

      <button
        onClick={() => {
          const answers = {
            def1: "suspense",
            def2: "pacing",
            def3: "climax",
            def4: "resolution",
            def5: "foreshadowing"
          };

          let allCorrect = true;
          for (let key in answers) {
            if ((localResponses[key] || "").toLowerCase().trim() !== answers[key].toLowerCase()) {
              allCorrect = false;
              break;
            }
          }

          if (allCorrect) {
            setFeedback("correct");
          } else {
            setFeedback("incorrect");
          }
        }}
        style={{
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

      {feedback === "correct" && (
        <p style={{ color: "#059669", fontWeight: "bold", marginTop: "0.75rem" }}>
          ✅ All correct!
        </p>
      )}
      {feedback === "incorrect" && (
        <p style={{ color: "#dc2626", fontWeight: "bold", marginTop: "0.75rem" }}>
          ❌ Some answers are incorrect. Try again!
        </p>
      )}

      {feedback === "correct" && (
        <button
          onClick={onComplete}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#10b981",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          Complete Level 3 (+20 XP)
        </button>
      )}
    </div>
  );
});

const Lesson8 = () => {
  const navigate = useNavigate();
  const level5Ref = useRef(null);
  const beforeYouLeaveRef = useRef(null);
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
  const [completedSteps, setCompletedSteps] = useState({
    levelOne: false,
    levelTwo: false,
    levelThree: false,
    levelFour: false,
    levelFive: false,
    zorOut: false,
    zorIn: false
  });
  const [studentResponses, setStudentResponses] = useState({});
  const [level3Feedback, setLevel3Feedback] = useState(null);
  const [revealStates, setRevealStates] = useState({
    suspenseRevealed: false,
    pacingRevealed: false,
    climaxRevealed: false,
    resolutionRevealed: false,
    foreshadowingRevealed: false,
    risingActionRevealed: false,
    climaxPartRevealed: false,
    fallingActionRevealed: false,
    resolutionPartRevealed: false,
    expositionRevealed: false,
    incitingIncidentRevealed: false,
    birdsExpositionRevealed: false,
    birdsIncitingIncidentRevealed: false,
    birdsRisingActionRevealed: false,
    birdsClimaxRevealed: false,
    birdsFallingActionRevealed: false,
    birdsResolutionRevealed: false
  });

  const markComplete = useCallback((stepKey, points, category, data) => {
    setCompletedSteps((prev) => {
      if (!prev[stepKey]) {
        setXp((prevXp) => prevXp + points);
        // Store the response data
        if (data) {
          setStudentResponses((prevResponses) => ({ ...prevResponses, [stepKey]: data }));
        }
        return { ...prev, [stepKey]: true };
      }
      return prev;
    });
  }, []);

  const handleLevel3Complete = useCallback(() => {
    markComplete("levelThree", 20);
  }, [markComplete]);

  // Store scroll position to prevent unwanted jumps during component updates
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Print page to PDF
  const handlePrintPage = () => {
    window.print();
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

  const LevelSection = ({ unlocked, title, children, bgColor = "#f9fafb" }) => {
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

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#1e40af", fontSize: "1.5rem" }}>
          Autumn II - Narrative Writing
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "1.5rem" }}>
          Lesson 8
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

      {/* Learning Schedule */}
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
              <strong>💡 Explain:</strong> Narrative Structure (For the Birds Pixar Short)
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>📝 Elaborate:</strong> Draft your narrative essay plan (brainstorming)
            </div>
            <div style={{ padding: "0.75rem", background: "#dbeafe", borderRadius: "0.5rem", borderLeft: "4px solid #3b82f6", fontWeight: "500" }}>
              <strong>✅ Evaluate:</strong> Reflect on our narrative plan
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
          <p style={{ marginBottom: "1rem", color: "#166534", fontSize: "1rem" }}>To understand and apply narrative structure (beginning, middle, climax, resolution) to plan an effective narrative.</p>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#16a34a", fontSize: "0.95rem" }}>Success Criteria:</h3>
            <ul style={{ marginLeft: "1.5rem", color: "#166534", lineHeight: "1.8" }}>
              <li>I can identify key structural elements in a narrative.</li>
              <li>I can explain how suspense, pacing, and foreshadowing work in a story.</li>
              <li>I can begin planning my own narrative using the correct structure.</li>
            </ul>
          </div>
        </section>
      )}

      {/* ZoR Check-in */}
      {scheduleViewed && (
        <ZoRCheck label="🧠 ZoR Check-in" onComplete={(zone) => markComplete("zorIn", 0, null, { zone })} />
      )}

      {/* Level 1 */}
      <LevelSection
        unlocked={scheduleViewed}
        title="📖 Level 1 - Engage: Hook"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 1
        </p>

        <div style={{ padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
            🎯 Engage: Hook
          </h3>

          <p style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600", marginBottom: "1rem" }}>
            Look at this diagram:
          </p>

          <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d", marginBottom: "1.5rem", textAlign: "center" }}>
            <img 
              src="/src/assets/pyramid.jpg" 
              alt="Story Structure Pyramid" 
              style={{ maxWidth: "60%", height: "auto", borderRadius: "0.4rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
              <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
                What kind of journey does this graph show?
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
              <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
                How might a story follow a similar path?
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
          <div style={{ padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "0.5rem", border: "2px solid #fcd34d" }}>
            <p style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
              🔗 Link to Learning:
            </p>
            <p style={{ fontSize: "0.9rem", color: "#92400e", margin: 0, lineHeight: "1.6" }}>
              Writers structure stories just like this - building tension, reaching a peak, then resolving events.
            </p>
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
            🎉 +15 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 2 */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelOne}
        title="🎯 Level 2 - Explore: SPaG Activity"
        bgColor="#dcfce7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 2
        </p>

        <Level2SPaG onComplete={() => markComplete("levelTwo", 20)} />

        {completedSteps.levelTwo && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +20 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Narrative Image Section */}
      <div style={{ padding: "2rem 0", textAlign: "center" }}>
        <img
          src="/src/assets/narrative.jpg"
          alt="Narrative Structure Diagram"
          style={{
            maxWidth: "70%",
            height: "auto",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      {/* Level 3 */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelTwo}
        title="🎯 Level 3 - Explore: Key Terms"
        bgColor="#dcfce7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 3
        </p>

        <Level3KeyTerms
          onComplete={handleLevel3Complete}
        />
      </LevelSection>

      {/* Explore: Starter Section */}
      <div style={{ padding: "1.5rem", backgroundColor: "#f0fdf4", borderRadius: "0.75rem", border: "1px solid #86efac", marginBottom: "2rem", marginTop: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
          🎬 Explore: Starter - The Three Little Pigs
        </h3>

        <h4 style={{ fontSize: "1rem", color: "#166534", fontWeight: "600", marginBottom: "1rem" }}>
          Main Points
        </h4>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img
            src="/src/assets/pigs.jpg"
            alt="The Three Little Pigs"
            style={{
              maxWidth: "40%",
              height: "auto",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>

        <ul style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8", paddingLeft: "1.5rem", margin: "1rem 0" }}>
          <li style={{ marginBottom: "0.75rem" }}>
            Three pigs each build a house: one of straw, one of sticks, one of bricks.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            A wolf blows down the first two houses; the pigs hide in the brick house.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            The wolf fails to break in and is defeated when he falls down the chimney.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            The pigs stay safe in the strong brick house.
          </li>
        </ul>

        <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
          <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", marginBottom: "1.5rem" }}>
            Can you give an example of how the key terms (suspense, pacing, climax, resolution, foreshadowing) fit into The Three Little Pigs?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Suspense */}
            <div style={{ borderLeft: "4px solid #fcd34d", paddingLeft: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#78350f" }}>Suspense</span>
                <button
                  onClick={() => {
                    setRevealStates({
                      ...revealStates,
                      suspenseRevealed: !revealStates.suspenseRevealed
                    });
                  }}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#fef3c7",
                    color: "#78350f",
                    border: "1px solid #fcd34d",
                    borderRadius: "0.3rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  {revealStates.suspenseRevealed ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealStates.suspenseRevealed && (
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#fef9e7", borderRadius: "0.3rem" }}>
                  When the wolf reaches each house and the reader wonders: Will the pig escape? Will the wolf blow the house down?
                </p>
              )}
            </div>

            {/* Pacing */}
            <div style={{ borderLeft: "4px solid #86efac", paddingLeft: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#166534" }}>Pacing</span>
                <button
                  onClick={() => {
                    setRevealStates({
                      ...revealStates,
                      pacingRevealed: !revealStates.pacingRevealed
                    });
                  }}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    border: "1px solid #86efac",
                    borderRadius: "0.3rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  {revealStates.pacingRevealed ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealStates.pacingRevealed && (
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.3rem" }}>
                  The story moves quickly through the first two pigs building weak houses, then slows down for longer tension at the brick house.
                </p>
              )}
            </div>

            {/* Climax */}
            <div style={{ borderLeft: "4px solid #a5f3fc", paddingLeft: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#164e63" }}>Climax</span>
                <button
                  onClick={() => {
                    setRevealStates({
                      ...revealStates,
                      climaxRevealed: !revealStates.climaxRevealed
                    });
                  }}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#cffafe",
                    color: "#164e63",
                    border: "1px solid #a5f3fc",
                    borderRadius: "0.3rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  {revealStates.climaxRevealed ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealStates.climaxRevealed && (
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#ecfdfd", borderRadius: "0.3rem" }}>
                  When the wolf climbs down the chimney to get the third pig — the most dramatic moment.
                </p>
              )}
            </div>

            {/* Resolution */}
            <div style={{ borderLeft: "4px solid #f0abfc", paddingLeft: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#581c87" }}>Resolution</span>
                <button
                  onClick={() => {
                    setRevealStates({
                      ...revealStates,
                      resolutionRevealed: !revealStates.resolutionRevealed
                    });
                  }}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#f3e8ff",
                    color: "#581c87",
                    border: "1px solid #f0abfc",
                    borderRadius: "0.3rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  {revealStates.resolutionRevealed ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealStates.resolutionRevealed && (
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#faf5ff", borderRadius: "0.3rem" }}>
                  The wolf falls into the pot, the third pig survives, and the danger is over.
                </p>
              )}
            </div>

            {/* Foreshadowing */}
            <div style={{ borderLeft: "4px solid #d1d5db", paddingLeft: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937" }}>Foreshadowing</span>
                <button
                  onClick={() => {
                    setRevealStates({
                      ...revealStates,
                      foreshadowingRevealed: !revealStates.foreshadowingRevealed
                    });
                  }}
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#f3f4f6",
                    color: "#1f2937",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.3rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  {revealStates.foreshadowingRevealed ? "Hide" : "Reveal"}
                </button>
              </div>
              {revealStates.foreshadowingRevealed && (
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#fafafa", borderRadius: "0.3rem" }}>
                  Early clues that something bad will happen — for example: The first two pigs rushing to build weak houses hints that trouble is coming.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Level 4 */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelThree}
        title="💡 Level 4 - Explain: Freytag's Pyramid"
        bgColor="#cffafe"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 4
        </p>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img
            src="/src/assets/pyramid.jpg"
            alt="Freytag's Pyramid"
            style={{
              maxWidth: "30%",
              height: "auto",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>

        <h3 style={{ fontSize: "1.1rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1.5rem" }}>
          Explain: Freytag's Pyramid - Narrative Structure
        </h3>

        {/* Beginning Section */}
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #a5f3fc" }}>
          <h4 style={{ fontSize: "1rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1rem", marginTop: 0 }}>
            Beginning
          </h4>

          {/* Exposition */}
          <div style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "3px solid #d8b4fe" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#6b21a8" }}>Exposition</span>
              <button
                onClick={() => {
                  setStudentResponses({
                    ...studentResponses,
                    expositionRevealed: !studentResponses.expositionRevealed
                  });
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#f3e8ff",
                  color: "#6b21a8",
                  border: "1px solid #d8b4fe",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                {studentResponses.expositionRevealed ? "Hide" : "Reveal"}
              </button>
            </div>
            {studentResponses.expositionRevealed && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#faf5ff", borderRadius: "0.3rem", fontWeight: "600" }}>
                  Beginning of the story where characters and setting are introduced
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #d8b4fe" }}>
                  Three little pigs leave home to build their own houses.
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.5rem", paddingLeft: "0.75rem", borderLeft: "2px solid #d8b4fe" }}>
                  We learn each pig chooses a different material: straw, sticks, bricks.
                </p>
              </div>
            )}
          </div>

          {/* Inciting Incident */}
          <div style={{ paddingLeft: "1rem", borderLeft: "3px solid #a5f3fc" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#0c4a6e" }}>Inciting Incident</span>
              <button
                onClick={() => {
                  setStudentResponses({
                    ...studentResponses,
                    incitingIncidentRevealed: !studentResponses.incitingIncidentRevealed
                  });
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#cffafe",
                  color: "#164e63",
                  border: "1px solid #a5f3fc",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                {studentResponses.incitingIncidentRevealed ? "Hide" : "Reveal"}
              </button>
            </div>
            {studentResponses.incitingIncidentRevealed && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#ecfdfd", borderRadius: "0.3rem", fontWeight: "600" }}>
                  The initial event that takes place where the main characters will face a problem
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #a5f3fc" }}>
                  The Big Bad Wolf arrives and threatens to blow their houses down.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Divider for Middle Section */}
        <div style={{ margin: "2rem 0", borderTop: "2px solid #a5f3fc", paddingTop: "2rem" }}>
          <h4 style={{ fontSize: "1rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1rem", marginTop: 0 }}>
            Middle
          </h4>
        </div>

        {/* Middle Section */}
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #a5f3fc" }}>
          {/* Rising Action */}
          <div style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "3px solid #86efac" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#166534" }}>Rising Action</span>
              <button
                onClick={() => {
                  setStudentResponses({
                    ...studentResponses,
                    risingActionRevealed: !studentResponses.risingActionRevealed
                  });
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#dcfce7",
                  color: "#166534",
                  border: "1px solid #86efac",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                {studentResponses.risingActionRevealed ? "Hide" : "Reveal"}
              </button>
            </div>
            {studentResponses.risingActionRevealed && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "0.3rem", fontWeight: "600" }}>
                  Series of events that create suspense, interest, and tension in a story
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem", padding: "0.5rem", fontStyle: "italic" }}>
                  Longest portion of a story
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #86efac" }}>
                  The wolf destroys the straw and stick houses; the pigs flee to the brick house.
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.5rem", paddingLeft: "0.75rem", borderLeft: "2px solid #86efac" }}>
                  The wolf repeatedly tries to break into the strong brick house.
                </p>
              </div>
            )}
          </div>

          {/* Climax */}
          <div style={{ paddingLeft: "1rem", borderLeft: "3px solid #fb923c" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#9a3412" }}>Climax (Turning Point)</span>
              <button
                onClick={() => {
                  setStudentResponses({
                    ...studentResponses,
                    climaxPartRevealed: !studentResponses.climaxPartRevealed
                  });
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#ffedd5",
                  color: "#9a3412",
                  border: "1px solid #fb923c",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                {studentResponses.climaxPartRevealed ? "Hide" : "Reveal"}
              </button>
            </div>
            {studentResponses.climaxPartRevealed && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#fed7aa", borderRadius: "0.3rem", fontWeight: "600" }}>
                  The most exciting or intense part of a story
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem", padding: "0.5rem", fontStyle: "italic" }}>
                  When the main problem reaches its peak!
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #fb923c" }}>
                  The wolf goes down the chimney—and lands in the pot of boiling water.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Divider for End Section */}
        <div style={{ margin: "2rem 0", borderTop: "2px solid #a5f3fc", paddingTop: "2rem" }}>
          <h4 style={{ fontSize: "1rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1rem", marginTop: 0 }}>
            End
          </h4>
        </div>

        {/* End Section */}
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #a5f3fc" }}>
          {/* Falling Action */}
          <div style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "3px solid #ef4444" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#991b1b" }}>Falling Action</span>
              <button
                onClick={() => {
                  setStudentResponses({
                    ...studentResponses,
                    fallingActionRevealed: !studentResponses.fallingActionRevealed
                  });
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                  border: "1px solid #ef4444",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                {studentResponses.fallingActionRevealed ? "Hide" : "Reveal"}
              </button>
            </div>
            {studentResponses.fallingActionRevealed && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#fecaca", borderRadius: "0.3rem", fontWeight: "600" }}>
                  When the major conflict in the story moves towards a resolution - tension begins to decrease
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem", padding: "0.5rem", fontStyle: "italic" }}>
                  Falling action = satisfying ending
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #ef4444" }}>
                  The wolf flees after being burned.
                </p>
              </div>
            )}
          </div>

          {/* Resolution */}
          <div style={{ paddingLeft: "1rem", borderLeft: "3px solid #7f1d1d" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#7f1d1d" }}>Resolution</span>
              <button
                onClick={() => {
                  setStudentResponses({
                    ...studentResponses,
                    resolutionPartRevealed: !studentResponses.resolutionPartRevealed
                  });
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#ffe4e4",
                  color: "#7f1d1d",
                  border: "1px solid #7f1d1d",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                {studentResponses.resolutionPartRevealed ? "Hide" : "Reveal"}
              </button>
            </div>
            {studentResponses.resolutionPartRevealed && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#fccac9", borderRadius: "0.3rem", fontWeight: "600" }}>
                  Occurs at the end of a story and concludes the story's plot
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem", padding: "0.5rem", fontStyle: "italic" }}>
                  Main problem is resolved - any loose ends are tied up
                </p>
                <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #7f1d1d" }}>
                  All three pigs live safely together in the sturdy brick house; the danger is over.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => markComplete("levelFour", 25)}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFour ? "#16a34a" : "#0284c7",
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
            🎉 +25 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Explain: Student Activity Section */}
      <div style={{ padding: "1.5rem", backgroundColor: "#fef3c7", borderRadius: "0.75rem", border: "2px solid #fcd34d", marginBottom: "2rem", marginTop: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
          ✏️ Explain: Student Activity
        </h3>

        <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d", marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#333", fontWeight: "600", marginBottom: "0.75rem" }}>
            Task:
          </p>
          <ul style={{ fontSize: "0.95rem", color: "#333", lineHeight: "1.8", paddingLeft: "1.5rem", margin: 0 }}>
            <li style={{ marginBottom: "0.75rem" }}>
              👉 Watch video: Pixar short "For the Birds"
            </li>
            <li>
              Orally go through Freytag's Pyramid Elements
            </li>
          </ul>
        </div>

        <h4 style={{ fontSize: "1rem", color: "#92400e", fontWeight: "600", marginBottom: "1.5rem", marginTop: "1.5rem" }}>
          Freytag's Pyramid Elements - "For the Birds"
        </h4>

        {/* Exposition - Birds */}
        <div style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #d8b4fe" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#6b21a8" }}>Exposition</span>
            <button
              onClick={() => {
                setRevealStates({
                  ...revealStates,
                  birdsExpositionRevealed: !revealStates.birdsExpositionRevealed
                });
              }}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#f3e8ff",
                color: "#6b21a8",
                border: "1px solid #d8b4fe",
                borderRadius: "0.3rem",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              {revealStates.birdsExpositionRevealed ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealStates.birdsExpositionRevealed && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #d8b4fe" }}>
                A group of small, identical birds perch on a wire, bickering and mocking each other.
              </p>
            </div>
          )}
        </div>

        {/* Inciting Incident - Birds */}
        <div style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #d8b4fe" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#6b21a8" }}>Inciting Incident</span>
            <button
              onClick={() => {
                setRevealStates({
                  ...revealStates,
                  birdsIncitingIncidentRevealed: !revealStates.birdsIncitingIncidentRevealed
                });
              }}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#f3e8ff",
                color: "#6b21a8",
                border: "1px solid #d8b4fe",
                borderRadius: "0.3rem",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              {revealStates.birdsIncitingIncidentRevealed ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealStates.birdsIncitingIncidentRevealed && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #d8b4fe" }}>
                A large, awkward bird lands on the same wire, trying to be friendly.
              </p>
            </div>
          )}
        </div>

        {/* Rising Action - Birds */}
        <div style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #86efac" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#166534" }}>Rising Action</span>
            <button
              onClick={() => {
                setRevealStates({
                  ...revealStates,
                  birdsRisingActionRevealed: !revealStates.birdsRisingActionRevealed
                });
              }}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#dcfce7",
                color: "#166534",
                border: "1px solid #86efac",
                borderRadius: "0.3rem",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              {revealStates.birdsRisingActionRevealed ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealStates.birdsRisingActionRevealed && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #86efac" }}>
                The small birds make fun of him, peck at him, and force him to hang upside down from the wire.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.5rem", paddingLeft: "0.75rem", borderLeft: "2px solid #86efac" }}>
                They continue mocking him while trying to push him off.
              </p>
            </div>
          )}
        </div>

        {/* Climax - Birds */}
        <div style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #fb923c" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#9a3412" }}>Climax</span>
            <button
              onClick={() => {
                setRevealStates({
                  ...revealStates,
                  birdsClimaxRevealed: !revealStates.birdsClimaxRevealed
                });
              }}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#ffedd5",
                color: "#9a3412",
                border: "1px solid #fb923c",
                borderRadius: "0.3rem",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              {revealStates.birdsClimaxRevealed ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealStates.birdsClimaxRevealed && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #fb923c" }}>
                The heavy big bird stretches the wire down—then the small birds peck at his toes until he loses grip.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.5rem", paddingLeft: "0.75rem", borderLeft: "2px solid #fb923c" }}>
                When he lets go, the wire slingshots the small birds high into the air.
              </p>
            </div>
          )}
        </div>

        {/* Falling Action - Birds */}
        <div style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #ef4444" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#991b1b" }}>Falling Action</span>
            <button
              onClick={() => {
                setRevealStates({
                  ...revealStates,
                  birdsFallingActionRevealed: !revealStates.birdsFallingActionRevealed
                });
              }}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #ef4444",
                borderRadius: "0.3rem",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              {revealStates.birdsFallingActionRevealed ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealStates.birdsFallingActionRevealed && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #ef4444" }}>
                The small birds fall back to the ground completely featherless.
              </p>
            </div>
          )}
        </div>

        {/* Resolution - Birds */}
        <div style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "3px solid #7f1d1d" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#7f1d1d" }}>Resolution</span>
            <button
              onClick={() => {
                setRevealStates({
                  ...revealStates,
                  birdsResolutionRevealed: !revealStates.birdsResolutionRevealed
                });
              }}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: "#ffe4e4",
                color: "#7f1d1d",
                border: "1px solid #7f1d1d",
                borderRadius: "0.3rem",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              {revealStates.birdsResolutionRevealed ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealStates.birdsResolutionRevealed && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.75rem", paddingLeft: "0.75rem", borderLeft: "2px solid #7f1d1d" }}>
                The big bird laughs, amused by the situation.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.5rem", paddingLeft: "0.75rem", borderLeft: "2px solid #7f1d1d" }}>
                The small birds hide, embarrassed and defeated.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Elaborate: Writing Task Section */}
      <div style={{ padding: "1.5rem", backgroundColor: "#f3f4f6", borderRadius: "0.75rem", border: "2px solid #d1d5db", marginBottom: "2rem", marginTop: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", color: "#374151", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
          📝 Elaborate: Writing Task
        </h3>

        <p style={{ fontSize: "0.95rem", color: "#333", marginBottom: "1.5rem" }}>
          Start planning your narrative coursework piece using the worksheet provided.
        </p>

        <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #d1d5db", marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#333", fontWeight: "600", marginBottom: "1rem" }}>
            Steps:
          </p>

            {/* Step 1 - Main Character */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: "0.95rem", color: "#333", fontWeight: "600", marginBottom: "0.75rem" }}>
              1. Select your main character(s)
            </p>
            <textarea
              placeholder="Write your main character(s) here..."
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.3rem",
                border: "1px solid #d1d5db",
                fontSize: "0.9rem",
                boxSizing: "border-box",
                backgroundColor: "#fef3c7",
                minHeight: "80px",
                fontFamily: "inherit"
              }}
            />
          </div>

          {/* Step 2 - Setting */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: "0.95rem", color: "#333", fontWeight: "600", marginBottom: "0.75rem" }}>
              2. Choose your setting.
            </p>
            <textarea
              placeholder="Write your setting here..."
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.3rem",
                border: "1px solid #d1d5db",
                fontSize: "0.9rem",
                boxSizing: "border-box",
                backgroundColor: "#dcfce7",
                minHeight: "80px",
                fontFamily: "inherit"
              }}
            />
          </div>

          {/* Step 3 - Freytag's Pyramid */}
          <div>
            <p style={{ fontSize: "0.95rem", color: "#333", fontWeight: "600", marginBottom: "1rem" }}>
              3. Fill out the Freytag's Pyramid diagram for your story
            </p>

            {/* Exposition */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.9rem", color: "#6b21a8", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                a. Exposition
              </label>
              <textarea
                placeholder="Write your exposition here..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.3rem",
                  border: "1px solid #d8b4fe",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#faf5ff",
                  minHeight: "70px",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Inciting Incident */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.9rem", color: "#1e40af", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                b. Inciting Incident
              </label>
              <textarea
                placeholder="Write your inciting incident here..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.3rem",
                  border: "1px solid #93c5fd",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#eff6ff",
                  minHeight: "70px",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Rising Action */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.9rem", color: "#166534", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                c. Rising Action
              </label>
              <textarea
                placeholder="Write your rising action here..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.3rem",
                  border: "1px solid #86efac",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#f0fdf4",
                  minHeight: "70px",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Climax */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.9rem", color: "#9a3412", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                d. Climax
              </label>
              <textarea
                placeholder="Write your climax here..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.3rem",
                  border: "1px solid #fb923c",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#ffedd5",
                  minHeight: "70px",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Falling Action */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "0.9rem", color: "#991b1b", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                e. Falling Action
              </label>
              <textarea
                placeholder="Write your falling action here..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.3rem",
                  border: "1px solid #ef4444",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#fee2e2",
                  minHeight: "70px",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Resolution */}
            <div style={{ marginBottom: "0" }}>
              <label style={{ fontSize: "0.9rem", color: "#7f1d1d", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                f. Resolution
              </label>
              <textarea
                placeholder="Write your resolution here..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.3rem",
                  border: "1px solid #7f1d1d",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  backgroundColor: "#ffe4e4",
                  minHeight: "70px",
                  fontFamily: "inherit"
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => markComplete("levelFive", 20)}
          style={{
            marginTop: "1.5rem",
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFive ? "#16a34a" : "#16a34a",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelFive}
        >
          {completedSteps.levelFive ? "✓ Complete" : "Complete"}
        </button>
        {completedSteps.levelFive && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +20 XP earned!
          </p>
        )}
      </div>

      {/* Evaluate: Reflect Section */}
      <div style={{ padding: "1.5rem", backgroundColor: "#f0fdf4", borderRadius: "0.75rem", border: "2px solid #86efac", marginBottom: "2rem", marginTop: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
          💚 Evaluate: Reflect
        </h3>

        <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac", marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "600", marginBottom: "1rem" }}>
            Before you leave, answer verbally:
          </p>

          <p style={{ fontSize: "0.95rem", color: "#333", marginBottom: "1rem", lineHeight: "1.6" }}>
            What part of narrative structure do you think you're strongest at? What do you need to work on next lesson?
          </p>

          <textarea
            placeholder="Write your reflection here..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.3rem",
              border: "1px solid #86efac",
              fontSize: "0.9rem",
              boxSizing: "border-box",
              backgroundColor: "#f0fdf4",
              minHeight: "100px",
              fontFamily: "inherit"
            }}
          />
        </div>
      </div>

      {/* ZoR Check-out */}
      {scheduleViewed && (
        <ZoRCheck label="🧠 ZoR Check-out" onComplete={(zone) => markComplete("zorOut", 0, null, { zone })} />
      )}

      {/* Print PDF Button */}
      <div style={{ marginTop: "2rem", textAlign: "center", padding: "2rem", backgroundColor: "#f3f4f6", borderRadius: "0.75rem" }}>
        <button
          onClick={handlePrintPage}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#1e40af",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            marginBottom: "1rem"
          }}
        >
          🖨️ Print Lesson to PDF
        </button>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
          Download a PDF copy of your lesson
        </p>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/n7")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            background: "#f9fafb",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
        >
          ← Previous Lesson
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#1e40af",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
};

export default Lesson8;
