import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import kingImage from "./assets/king.jpg";

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

// LevelSection component - memoized to prevent re-renders
const LevelSection = React.memo(({ 
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
});

const N3 = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
  const [completedSteps, setCompletedSteps] = useState({
    levelOne: false,
    spagActivity2: false,
    levelTwo: false,
    levelThree: false,
    levelFour: false
  });
  const [spagAnswers, setSpagAnswers] = useState({
    word1: "",
    word2: "",
    word3: "",
    word4: "",
    word5: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: ""
  });
  const [visibleHints, setVisibleHints] = useState({
    hint2: false,
    hint3: false,
    hint5: false,
    hint6: false
  });
  const [questionFeedback, setQuestionFeedback] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null
  });
  const [level2Matches, setLevel2Matches] = useState({
    perspective: "",
    tone: "",
    voice: "",
    diction: ""
  });
  const [level2Feedback, setLevel2Feedback] = useState(null);
  const [quoteAnswers, setQuoteAnswers] = useState({
    why: "",
    intentions: ""
  });
  const [quoteFeedback, setQuoteFeedback] = useState(null);

  const markComplete = (stepKey, points) => {
    if (!completedSteps[stepKey]) {
      setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
      setXp((prev) => prev + points);
    }
  };

  // Check if all SPaG questions have been checked and unlock next level
  useEffect(() => {
    const allQuestionsChecked = 
      questionFeedback.q1 !== null &&
      questionFeedback.q2 !== null &&
      questionFeedback.q3 !== null &&
      questionFeedback.q4 !== null &&
      questionFeedback.q5 !== null &&
      questionFeedback.q6 !== null;
    
    if (allQuestionsChecked && !completedSteps.spagActivity2) {
      markComplete("spagActivity2", 15);
    }
  }, [questionFeedback, completedSteps.spagActivity2]);

  // Memoized callbacks for SPaG textareas
  const handleQ2Change = useCallback((e) => {
    setSpagAnswers((prev) => ({ ...prev, q2: e.target.value }));
  }, []);

  const handleQ3Change = useCallback((e) => {
    setSpagAnswers((prev) => ({ ...prev, q3: e.target.value }));
  }, []);

  const handleQ5Change = useCallback((e) => {
    setSpagAnswers((prev) => ({ ...prev, q5: e.target.value }));
  }, []);

  const handleQ6Change = useCallback((e) => {
    setSpagAnswers((prev) => ({ ...prev, q6: e.target.value }));
  }, []);

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
          Lesson 3
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
              <strong>💡 Explain:</strong> Analyse opening of I'm the King of the Castle
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>📝 Elaborate:</strong> Write your own story opening
            </div>
            <div style={{ padding: "0.75rem", background: "#dbeafe", borderRadius: "0.5rem", borderLeft: "4px solid #3b82f6", fontWeight: "500" }}>
              <strong>✅ Evaluate:</strong> What makes a great opening?
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
          <p style={{ marginBottom: "1rem", color: "#166534", fontSize: "1rem" }}>Crafting Engaging Story Openings</p>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#16a34a", fontSize: "0.95rem" }}>Lesson Objectives:</h3>
            <ul style={{ marginLeft: "1.5rem", color: "#166534", lineHeight: "1.8" }}>
              <li>Use tone and voice to grab the reader's attention</li>
              <li>Create atmosphere and mood through word choice</li>
              <li>Write our own story openings</li>
            </ul>
          </div>
        </section>
      )}

      {/* ZoR Check-in */}
      {scheduleViewed && (
        <ZoRCheck label="🧠 ZoR Check-in" onComplete={(zone) => console.log("Zone:", zone)} />
      )}

      {/* Level 1 - Engage: SPaG Activity */}
      <LevelSection
        unlocked={scheduleViewed}
        title="✏️ Level 1 - Engage: SPaG Activity"
        bgColor="#fef3c7"
      >
        <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem", color: "#92400e" }}>
          👇 Engage: Select the Correct Words
        </h3>

        <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "#fef9e7", borderRadius: "0.5rem", borderLeft: "4px solid #b45309" }}>
          <p style={{ fontSize: "1rem", color: "#92400e", lineHeight: "1.8", margin: 0 }}>
            The{" "}
            <select
              value={spagAnswers.word1}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, word1: e.target.value })}
              style={{
                padding: "0.4rem 0.6rem",
                borderRadius: "0.3rem",
                border: "2px solid #b45309",
                background: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <option value="">Select...</option>
              <option value="thick">thick</option>
              <option value="thik">thik</option>
            </select>
            {" "}fog{" "}
            <select
              value={spagAnswers.word2}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, word2: e.target.value })}
              style={{
                padding: "0.4rem 0.6rem",
                borderRadius: "0.3rem",
                border: "2px solid #b45309",
                background: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <option value="">Select...</option>
              <option value="crept">crept</option>
              <option value="creep">creep</option>
            </select>
            {" "}
            <select
              value={spagAnswers.word3}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, word3: e.target.value })}
              style={{
                padding: "0.4rem 0.6rem",
                borderRadius: "0.3rem",
                border: "2px solid #b45309",
                background: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <option value="">Select...</option>
              <option value="eerily">eerily</option>
              <option value="earily">earily</option>
            </select>
            {" "}into the{" "}
            <select
              value={spagAnswers.word4}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, word4: e.target.value })}
              style={{
                padding: "0.4rem 0.6rem",
                borderRadius: "0.3rem",
                border: "2px solid #b45309",
                background: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <option value="">Select...</option>
              <option value="dark">dark</option>
              <option value="darck">darck</option>
            </select>
            {" "}
            <select
              value={spagAnswers.word5}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, word5: e.target.value })}
              style={{
                padding: "0.4rem 0.6rem",
                borderRadius: "0.3rem",
                border: "2px solid #b45309",
                background: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              <option value="">Select...</option>
              <option value="streets">streets</option>
              <option value="streets'">streets'</option>
            </select>
            .
          </p>
        </div>

        <button
          onClick={() => {
            const correctAnswers = {
              word1: "thick",
              word2: "crept",
              word3: "eerily",
              word4: "dark",
              word5: "streets"
            };
            const allCorrect = Object.keys(correctAnswers).every(
              (key) => spagAnswers[key] === correctAnswers[key]
            );
            if (allCorrect) {
              markComplete("levelOne", 10);
            } else {
              alert("Not quite right. Try again! Check your spelling and verb tenses.");
            }
          }}
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
          {completedSteps.levelOne ? "✓ Complete" : "Check Answers"}
        </button>
        {completedSteps.levelOne && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +10 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 2 - SPaG Activity */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelOne}
        title="✏️ Level 2 - SPaG Activity - Easy Fix It Sheet"
        bgColor="#fef9e7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#92400e", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          SPELLING & GRAMMAR PRACTICE
        </p>
        
        <div style={{ backgroundColor: "#fffbeb", padding: "1rem", borderRadius: "0.75rem", marginBottom: "1.5rem", border: "1px solid #fbbf24" }}>
          <p style={{ marginTop: 0, fontSize: "0.95rem", color: "#92400e", marginBottom: "0.75rem" }}>
            <strong>Instructions:</strong> Read each sentence carefully and choose or fill in the correct answers.
          </p>
        </div>

        {/* Question 1 */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginTop: 0, marginBottom: "0.5rem" }}>
            <strong>1️⃣ Choose the correct word</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
            The boy <strong>(run / runs)</strong> to the bus every morning.
          </p>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
            <input
              type="radio"
              name="q1"
              value="run"
              onChange={(e) => setSpagAnswers({ ...spagAnswers, q1: e.target.value })}
              checked={spagAnswers.q1 === "run"}
            />
            run
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
            <input
              type="radio"
              name="q1"
              value="runs"
              onChange={(e) => setSpagAnswers({ ...spagAnswers, q1: e.target.value })}
              checked={spagAnswers.q1 === "runs"}
            />
            runs
          </label>
          <button
            onClick={() => {
              if (spagAnswers.q1 === "runs") {
                setQuestionFeedback({ ...questionFeedback, q1: "correct" });
              } else {
                setQuestionFeedback({ ...questionFeedback, q1: "incorrect" });
              }
            }}
            style={{
              marginTop: "0.75rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Check Answer
          </button>
          {questionFeedback.q1 === "correct" && (
            <p style={{ marginTop: "0.5rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✓ Correct!
            </p>
          )}
          {questionFeedback.q1 === "incorrect" && (
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✗ Try again!
            </p>
          )}
        </div>

        {/* Question 2 */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginTop: 0, marginBottom: "0.5rem" }}>
            <strong>2️⃣ Fix the spelling mistake</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
            <em>Incorrect:</em> The class will congragate in the hall.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
            <em>Correct:</em> The class will
          </p>
          <input
            type="text"
            value={spagAnswers.q2 || ""}
            onChange={handleQ2Change}
            placeholder=""
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "0.5rem",
              border: "1px solid #fcd34d",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={() => setVisibleHints({ ...visibleHints, hint2: !visibleHints.hint2 })}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "1px solid #b8860b",
              background: visibleHints.hint2 ? "#fcd34d" : "white",
              color: "#b8860b",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            {visibleHints.hint2 ? "Hide Hint" : "Show Hint"}
          </button>
          {visibleHints.hint2 && (
            <p style={{ fontSize: "0.8rem", color: "#b8860b", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              Hint: c-o-n-g-r-e-g-a-t-e
            </p>
          )}
          <button
            onClick={() => {
              if (spagAnswers.q2?.toLowerCase() === "congregate") {
                setQuestionFeedback({ ...questionFeedback, q2: "correct" });
              } else {
                setQuestionFeedback({ ...questionFeedback, q2: "incorrect" });
              }
            }}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Check Answer
          </button>
          {questionFeedback.q2 === "correct" && (
            <p style={{ marginTop: "0.5rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✓ Correct!
            </p>
          )}
          {questionFeedback.q2 === "incorrect" && (
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✗ Try again!
            </p>
          )}
        </div>

        {/* Question 3 */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginTop: 0, marginBottom: "0.5rem" }}>
            <strong>3️⃣ Add punctuation to the sentence</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
            Incorrect: the teacher said we have a trip tomorrow
          </p>
          <textarea
            value={spagAnswers.q3 || ""}
            onChange={handleQ3Change}
            placeholder=""
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              border: "1px solid #fcd34d",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={() => setVisibleHints({ ...visibleHints, hint3: !visibleHints.hint3 })}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "1px solid #b8860b",
              background: visibleHints.hint3 ? "#fcd34d" : "white",
              color: "#b8860b",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            {visibleHints.hint3 ? "Hide Hint" : "Show Hint"}
          </button>
          {visibleHints.hint3 && (
            <p style={{ fontSize: "0.8rem", color: "#b8860b", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              Hint: Add a capital letter at the start and a full stop at the end.
            </p>
          )}
          <button
            onClick={() => {
              const correct = spagAnswers.q3?.trim().toLowerCase().startsWith("the teacher said") && spagAnswers.q3?.trim().endsWith(".");
              if (correct) {
                setQuestionFeedback({ ...questionFeedback, q3: "correct" });
              } else {
                setQuestionFeedback({ ...questionFeedback, q3: "incorrect" });
              }
            }}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Check Answer
          </button>
          {questionFeedback.q3 === "correct" && (
            <p style={{ marginTop: "0.5rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✓ Correct!
            </p>
          )}
          {questionFeedback.q3 === "incorrect" && (
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✗ Try again!
            </p>
          )}
        </div>

        {/* Question 4 */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginTop: 0, marginBottom: "0.5rem" }}>
            <strong>4️⃣ Choose the right word</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
            She <strong>(dont / doesn't)</strong> like apples.
          </p>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
            <input
              type="radio"
              name="q4"
              value="dont"
              onChange={(e) => setSpagAnswers({ ...spagAnswers, q4: e.target.value })}
              checked={spagAnswers.q4 === "dont"}
            />
            She dont like apples.
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
            <input
              type="radio"
              name="q4"
              value="doesn't"
              onChange={(e) => setSpagAnswers({ ...spagAnswers, q4: e.target.value })}
              checked={spagAnswers.q4 === "doesn't"}
            />
            She doesn't like apples.
          </label>
          <button
            onClick={() => {
              if (spagAnswers.q4 === "doesn't") {
                setQuestionFeedback({ ...questionFeedback, q4: "correct" });
              } else {
                setQuestionFeedback({ ...questionFeedback, q4: "incorrect" });
              }
            }}
            style={{
              marginTop: "0.75rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Check Answer
          </button>
          {questionFeedback.q4 === "correct" && (
            <p style={{ marginTop: "0.5rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✓ Correct!
            </p>
          )}
          {questionFeedback.q4 === "incorrect" && (
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✗ Try again!
            </p>
          )}
        </div>

        {/* Question 5 */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginTop: 0, marginBottom: "0.5rem" }}>
            <strong>5️⃣ Fill in the blanks with correct spelling and punctuation</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
            <em>Incorrect:</em> i am goin to the shop after lunch
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
            <em>Correct:</em>
          </p>
          <textarea
            value={spagAnswers.q5 || ""}
            onChange={handleQ5Change}
            placeholder=""
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              border: "1px solid #fcd34d",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={() => setVisibleHints({ ...visibleHints, hint5: !visibleHints.hint5 })}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "1px solid #b8860b",
              background: visibleHints.hint5 ? "#fcd34d" : "white",
              color: "#b8860b",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            {visibleHints.hint5 ? "Hide Hint" : "Show Hint"}
          </button>
          {visibleHints.hint5 && (
            <p style={{ fontSize: "0.8rem", color: "#b8860b", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              Hint: Fix the capital letter, spelling of "going", and add a full stop.
            </p>
          )}
          <button
            onClick={() => {
              const correct = spagAnswers.q5?.toLowerCase().includes("i am going") && spagAnswers.q5?.trim().endsWith(".");
              if (correct) {
                setQuestionFeedback({ ...questionFeedback, q5: "correct" });
              } else {
                setQuestionFeedback({ ...questionFeedback, q5: "incorrect" });
              }
            }}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Check Answer
          </button>
          {questionFeedback.q5 === "correct" && (
            <p style={{ marginTop: "0.5rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✓ Correct!
            </p>
          )}
          {questionFeedback.q5 === "incorrect" && (
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✗ Try again!
            </p>
          )}
        </div>

        {/* Question 6 - Paragraph Correction */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginTop: 0, marginBottom: "0.5rem" }}>
            <strong>6️⃣ Punctuation Challenge: Rewrite the paragraph</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem", fontStyle: "italic" }}>
            <em>Incorrect:</em> yesterday we went on a school trip to the museum it was very big and there were lots of dinosaurs my favourite part was the gift shop did you like the trip too
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
            <em>Rewrite with capital letters, full stops, commas, and question marks:</em>
          </p>
          <textarea
            value={spagAnswers.q6 || ""}
            onChange={handleQ6Change}
            placeholder=""
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "0.75rem",
              border: "1px solid #fcd34d",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={() => setVisibleHints({ ...visibleHints, hint6: !visibleHints.hint6 })}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "1px solid #b8860b",
              background: visibleHints.hint6 ? "#fcd34d" : "white",
              color: "#b8860b",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            {visibleHints.hint6 ? "Hide Hint" : "Show Hint"}
          </button>
          {visibleHints.hint6 && (
            <p style={{ fontSize: "0.8rem", color: "#b8860b", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              Hint: Start sentences with capital letters, use full stops between sentences, add a question mark for the question, and use commas to separate items.
            </p>
          )}
          <button
            onClick={() => {
              const correct = spagAnswers.q6?.toLowerCase().includes("yesterday") && spagAnswers.q6?.toLowerCase().includes("did you like");
              if (correct) {
                setQuestionFeedback({ ...questionFeedback, q6: "correct" });
                markComplete("spagActivity2", 15);
              } else {
                setQuestionFeedback({ ...questionFeedback, q6: "incorrect" });
              }
            }}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderRadius: "0.4rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Check Answer
          </button>
          {questionFeedback.q6 === "correct" && (
            <p style={{ marginTop: "0.5rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✓ Correct!
            </p>
          )}
          {questionFeedback.q6 === "incorrect" && (
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "0.85rem", fontWeight: "bold" }}>
              ✗ Try again!
            </p>
          )}
          {completedSteps.spagActivity2 && (
            <p style={{ marginTop: "0.75rem", color: "#16a34a", fontSize: "0.9rem", fontWeight: "bold" }}>
              🎉 +25 XP earned! Level 1 Complete!
            </p>
          )}
        </div>
      </LevelSection>

      {/* Level 2 - Explore: Key Terms */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.spagActivity2}
        title="🔍 Level 2 - Explore: Key Terms"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 2
        </p>
        <p style={{ fontSize: "1rem", color: "#92400e", marginBottom: "1.5rem" }}>
          <strong>Match each key term with its correct definition:</strong>
        </p>

        {/* Terms Display - Single Line */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#92400e", marginBottom: "0.75rem" }}>Terms:</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {["Perspective", "Tone", "Voice", "Diction"].map((term) => (
              <div key={term} style={{ padding: "0.5rem 1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d" }}>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#666", fontWeight: "500" }}>
                  {term}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Matching Grid */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef9e7", borderRadius: "0.75rem", border: "1px solid #fcd34d" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#92400e", marginBottom: "1rem" }}>Definitions - Select the matching term for each:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { key: "perspective", def: "The viewpoint from which a story is told" },
                  { key: "tone", def: "The general character or attitude of a piece of writing" },
                  { key: "voice", def: "The individual style in which a story is written, reflecting the narrator's personality." },
                  { key: "diction", def: "The choice and use of words and phrases in speech or writing." }
                ].map((item) => (
                  <div key={item.key} style={{ padding: "0.75rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fcd34d" }}>
                    <select
                      value={level2Matches[item.key]}
                      onChange={(e) => setLevel2Matches({ ...level2Matches, [item.key]: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        fontSize: "0.85rem",
                        border: "1px solid #fcd34d",
                        borderRadius: "0.4rem",
                        backgroundColor: "white",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">-- Select a term --</option>
                      <option value="Perspective">Perspective</option>
                      <option value="Tone">Tone</option>
                      <option value="Voice">Voice</option>
                      <option value="Diction">Diction</option>
                    </select>
                    <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.95rem", color: "#92400e", fontStyle: "italic" }}>
                      {item.def}
                    </p>
                  </div>
                ))}
            </div>
        </div>

        <button
          onClick={() => {
            const correct =
              level2Matches.perspective === "Perspective" &&
              level2Matches.tone === "Tone" &&
              level2Matches.voice === "Voice" &&
              level2Matches.diction === "Diction";
            
            if (correct) {
              setLevel2Feedback("correct");
              markComplete("levelTwo", 25);
            } else {
              setLevel2Feedback("incorrect");
            }
          }}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelTwo ? "#16a34a" : "#f59e0b",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelTwo}
        >
          {completedSteps.levelTwo ? "✓ Complete" : "Check Answers"}
        </button>

        {level2Feedback === "correct" && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            ✓ Correct! All matches are perfect!
          </p>
        )}
        {level2Feedback === "incorrect" && (
          <p style={{ marginTop: "0.75rem", color: "#dc2626", fontWeight: "bold", fontSize: "0.9rem" }}>
            ✗ Not quite right. Check your matches and try again!
          </p>
        )}
        {completedSteps.levelTwo && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +25 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Book Reference */}
      <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f0f9ff", borderRadius: "0.75rem", border: "1px solid #0369a1" }}>
        <p style={{ margin: 0, fontSize: "1.25rem", color: "#1e40af", fontWeight: "500", marginBottom: "1rem" }}>
          📖 Explain: <em>I'm the King of the Castle</em> by Susan Hill
        </p>

        {/* Book Description */}
        <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #bfdbfe" }}>
          <p style={{ fontSize: "1.15rem", color: "#1e40af", lineHeight: "1.6", margin: 0 }}>
            <em>I'm the King of the Castle</em> by Susan Hill is a dark story about two boys, Edmund Hooper and Charles Kingshaw, forced to live together in a gloomy house. Edmund bullies Charles relentlessly, claiming, "I'm the King of the Castle."
          </p>
          <p style={{ fontSize: "1.15rem", color: "#1e40af", lineHeight: "1.6", marginTop: "0.75rem", margin: "0.75rem 0 0 0" }}>
            As the adults ignore the cruelty, Charles becomes more isolated, leading to a tragic ending that explores power, fear, and loneliness.
          </p>
        </div>

        {/* Book Image */}
        {kingImage && (
          <div style={{ textAlign: "center" }}>
            <img 
              src={kingImage} 
              alt="I'm the King of the Castle book cover" 
              style={{ 
                maxWidth: "100%", 
                height: "auto", 
                maxHeight: "300px", 
                borderRadius: "0.5rem",
                border: "1px solid #0369a1"
              }} 
            />
          </div>
        )}

        {/* Questions to Consider */}
        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#ecfdf5", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
          <p style={{ fontSize: "1.05rem", color: "#1e40af", fontWeight: "600", margin: "0 0 1rem 0" }}>
            As we read the opening of the story, we will ask ourselves:
          </p>
          <ul style={{ fontSize: "1rem", color: "#1e40af", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
            <li>What tone is established?</li>
            <li>What do we infer about the relationship between characters?</li>
            <li>What is hinted about the theme or plot?</li>
          </ul>
        </div>

        {/* Printout Request */}
        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "0.5rem", border: "2px solid #f59e0b" }}>
          <p style={{ fontSize: "1.05rem", color: "#92400e", fontWeight: "600", margin: 0, textAlign: "center" }}>
            📄 Ask Miss for printout of text.
          </p>
        </div>

        {/* Before Analysing Section */}
        <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#ecfdf5", borderRadius: "0.75rem", border: "1px solid #86efac" }}>
          <h3 style={{ fontSize: "1.15rem", color: "#1e40af", fontWeight: "700", marginTop: 0, marginBottom: "1rem" }}>
            Before Analysing... What does this Quote mean?
          </h3>

          {/* Quote Box */}
          <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "2px solid #0369a1", fontStyle: "italic" }}>
            <p style={{ fontSize: "1.05rem", color: "#1e40af", margin: 0, textAlign: "center" }}>
              "I'm never afraid," said Edmund.
            </p>
          </div>

          {/* Question 1 */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#166534", display: "block", marginBottom: "0.5rem" }}>
              Why does Edmund say this?
            </label>
            <textarea
              value={quoteAnswers.why}
              onChange={(e) => setQuoteAnswers({ ...quoteAnswers, why: e.target.value })}
              placeholder="Optional - Share your thoughts..."
              style={{
                width: "100%",
                minHeight: "80px",
                padding: "0.75rem",
                border: "1px solid #86efac",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Question 2 */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#166534", display: "block", marginBottom: "0.5rem" }}>
              What are his intentions?
            </label>
            <textarea
              value={quoteAnswers.intentions}
              onChange={(e) => setQuoteAnswers({ ...quoteAnswers, intentions: e.target.value })}
              placeholder="Optional - Share your thoughts..."
              style={{
                width: "100%",
                minHeight: "80px",
                padding: "0.75rem",
                border: "1px solid #86efac",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Confirm Answer Button */}
          <button
            onClick={() => {
              setQuoteFeedback("confirmed");
              markComplete("levelTwo", 25);
            }}
            style={{
              padding: "0.65rem 1.5rem",
              fontSize: "0.95rem",
              borderRadius: "0.5rem",
              border: "none",
              background: quoteFeedback === "confirmed" ? "#16a34a" : "#10b981",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s"
            }}
          >
            {quoteFeedback === "confirmed" ? "✓ Confirmed" : "Confirm Answers"}
          </button>

          {quoteFeedback === "confirmed" && (
            <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
              ✓ Thank you for sharing your thoughts!
            </p>
          )}
        </div>
      </div>

      {/* Analysing the Opening Section */}
      <div style={{ marginBottom: "1.5rem", padding: "1.5rem", backgroundColor: "#fefce8", borderRadius: "0.75rem", border: "1px solid #fbbf24" }}>
        <h3 style={{ fontSize: "1.2rem", color: "#92400e", fontWeight: "700", marginTop: 0, marginBottom: "1.5rem" }}>
          📊 Analysing the Opening of <em>I'm the King of the Castle</em>
        </h3>

        {/* Question with yellow highlight */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "0.5rem", border: "2px solid #fcd34d" }}>
          <p style={{ fontSize: "1.2rem", color: "#92400e", fontWeight: "600", margin: 0 }}>
            What tone is established?
          </p>
        </div>

        {/* Analysis Points */}
        <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #fbbf24" }}>
          <ul style={{ fontSize: "1.1rem", color: "#92400e", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
            <li>The opening feels cold, tense, and unsettling.</li>
            <li>Death, silence, and the gloomy house create a dark, uneasy mood.</li>
            <li>The setting hints that this will not be a happy or comforting story.</li>
          </ul>
        </div>

        {/* Character Relationship Section */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#cffafe", borderRadius: "0.5rem", border: "2px solid #06b6d4" }}>
          <p style={{ fontSize: "1.2rem", color: "#164e63", fontWeight: "600", margin: "0 0 1rem 0" }}>
            What do we infer about the relationship between characters?
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #06b6d4" }}>
          <ul style={{ fontSize: "1.1rem", color: "#164e63", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
            <li>Edmund seems emotionally distant from his father and grandfather.</li>
            <li>His line, "I'm never afraid," shows defiance rather than empathy.</li>
            <li>There's little warmth or comfort — suggesting strained family ties.</li>
          </ul>
        </div>

        {/* Theme and Plot Section */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f0e7ff", borderRadius: "0.5rem", border: "2px solid #d946ef" }}>
          <p style={{ fontSize: "1.2rem", color: "#6b21a8", fontWeight: "600", margin: "0 0 1rem 0" }}>
            What is hinted about the theme or plot?
          </p>
        </div>

        <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #d946ef" }}>
          <ul style={{ fontSize: "1.1rem", color: "#6b21a8", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
            <li>The focus on death, inheritance, and isolation foreshadows tension and power struggles.</li>
            <li>The house feels symbolic — a place of control and loneliness.</li>
            <li>We sense this will be a story about conflict, pride, and emotional neglect.</li>
          </ul>
        </div>
      </div>

      {/* Level 3 - Elaborate */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelTwo}
        title="✍️ Level 3 - Elaborate: Write Your Own Story Opening"
        bgColor="#dcfce7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
          LEVEL 3
        </p>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f0fdf4", borderRadius: "0.75rem", border: "1px solid #86efac" }}>
          <p style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "600", margin: "0 0 1rem 0" }}>
            Task: Write the first few sentences of a story that makes the reader want to keep reading.
          </p>
          <p style={{ fontSize: "1rem", color: "#166534", margin: "0 0 1rem 0" }}>
            Choose one:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", fontSize: "1rem", color: "#166534", cursor: "pointer" }}>
              <input 
                type="radio" 
                name="storyPrompt" 
                value="The House on the Hill"
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
              />
              The House on the Hill
            </label>
            <label style={{ display: "flex", alignItems: "center", fontSize: "1rem", color: "#166534", cursor: "pointer" }}>
              <input 
                type="radio" 
                name="storyPrompt" 
                value="Joseph's War"
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
              />
              Joseph's War
            </label>
            <label style={{ display: "flex", alignItems: "center", fontSize: "1rem", color: "#166534", cursor: "pointer" }}>
              <input 
                type="radio" 
                name="storyPrompt" 
                value="A Quiet Boy"
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
              />
              A Quiet Boy
            </label>
          </div>

          <div style={{ padding: "1rem", backgroundColor: "#ecfdf5", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
            <p style={{ fontSize: "1rem", color: "#166534", fontWeight: "600", margin: "0 0 0.75rem 0" }}>
              💡 Use one of these sentence starters to help you begin:
            </p>
            <ul style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.6", margin: 0, paddingLeft: "1.5rem" }}>
              <li>"It was only when the knock came at midnight that I realised…"</li>
              <li>"The house on the hill had been empty for years…"</li>
              <li>"Joseph hadn't spoken to anyone since the fire."</li>
            </ul>
          </div>

          {/* Planning Grid */}
          <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#f5f3ff", borderRadius: "0.5rem", border: "1px solid #ddd6fe" }}>
            <p style={{ fontSize: "1rem", color: "#5b21b6", fontWeight: "600", margin: "0 0 1rem 0" }}>
              🧱 Planning Grid (Fill in before writing):
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.95rem", color: "#5b21b6", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
                  Where is your story set?
                </p>
              </div>
              <div>
                <textarea
                  placeholder="Describe the setting..."
                  style={{
                    width: "100%",
                    minHeight: "60px",
                    padding: "0.5rem",
                    border: "1px solid #ddd6fe",
                    borderRadius: "0.4rem",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <p style={{ fontSize: "0.95rem", color: "#5b21b6", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
                  Who is in your story?
                </p>
              </div>
              <div>
                <textarea
                  placeholder="List your characters..."
                  style={{
                    width: "100%",
                    minHeight: "60px",
                    padding: "0.5rem",
                    border: "1px solid #ddd6fe",
                    borderRadius: "0.4rem",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <p style={{ fontSize: "0.95rem", color: "#5b21b6", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
                  How do they feel? <span style={{ fontSize: "0.85rem", color: "#7c3aed" }}>(e.g., scared, sad, lonely)</span>
                </p>
              </div>
              <div>
                <textarea
                  placeholder="Describe their emotions..."
                  style={{
                    width: "100%",
                    minHeight: "60px",
                    padding: "0.5rem",
                    border: "1px solid #ddd6fe",
                    borderRadius: "0.4rem",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <p style={{ fontSize: "0.95rem", color: "#5b21b6", fontWeight: "500", margin: "0 0 0.5rem 0" }}>
                  What is one thing that might go wrong?
                </p>
              </div>
              <div>
                <textarea
                  placeholder="Describe a problem or conflict..."
                  style={{
                    width: "100%",
                    minHeight: "60px",
                    padding: "0.5rem",
                    border: "1px solid #ddd6fe",
                    borderRadius: "0.4rem",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Writing Section */}
          <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "0.5rem", border: "1px solid #fcd34d" }}>
            <p style={{ fontSize: "1rem", color: "#92400e", fontWeight: "600", margin: "0 0 1rem 0" }}>
              ✍️ Now start your story:
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.95rem", color: "#92400e", fontWeight: "500", marginBottom: "0.5rem" }}>
                Title:
              </label>
              <input
                type="text"
                placeholder="Give your story a title..."
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #fcd34d",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.95rem", color: "#92400e", fontWeight: "500", marginBottom: "0.5rem" }}>
                My story begins when…
              </label>
              <textarea
                placeholder="Start writing your story opening here..."
                style={{
                  width: "100%",
                  minHeight: "120px",
                  padding: "0.75rem",
                  border: "1px solid #fcd34d",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />
            </div>
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

      {/* Level 4 - Evaluate */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelThree}
        title="✨ Level 4 - Evaluate"
        bgColor="#dbeafe"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 4
        </p>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#ecfdf5", borderRadius: "0.75rem", border: "1px solid #86efac" }}>
          <h3 style={{ fontSize: "1.1rem", color: "#166534", fontWeight: "700", marginTop: 0, marginBottom: "1.5rem" }}>
            💭 Evaluate: Reflect
          </h3>

          <p style={{ fontSize: "1rem", color: "#166534", fontWeight: "600", marginBottom: "1rem" }}>
            Before you leave, answer verbally:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
              <p style={{ fontSize: "1rem", color: "#166534", fontWeight: "600", margin: "0 0 0.75rem 0" }}>
                What makes a story opening powerful?
              </p>
              <textarea
                placeholder="Share your thoughts..."
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "0.75rem",
                  border: "1px solid #86efac",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
              <p style={{ fontSize: "1rem", color: "#166534", fontWeight: "600", margin: "0 0 0.75rem 0" }}>
                Which technique did you try today?
              </p>
              <textarea
                placeholder="Describe the technique..."
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "0.75rem",
                  border: "1px solid #86efac",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #86efac" }}>
              <p style={{ fontSize: "1rem", color: "#166534", fontWeight: "600", margin: "0 0 0.75rem 0" }}>
                What effect did you want to create for your reader?
              </p>
              <textarea
                placeholder="Explain your intention..."
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "0.75rem",
                  border: "1px solid #86efac",
                  borderRadius: "0.4rem",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => markComplete("levelFour", 35)}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFour ? "#0369a1" : "#0369a1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelFour}
        >
          {completedSteps.levelFour ? "✓ Complete Lesson" : "Complete Lesson"}
        </button>
        {completedSteps.levelFour && (
          <p style={{ marginTop: "0.75rem", color: "#0369a1", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +35 XP earned! Lesson Complete!
          </p>
        )}
      </LevelSection>

      {/* ZoR Check-out */}
      {scheduleViewed && (
        <ZoRCheck label="🧠 ZoR Check-out" onComplete={(zone) => console.log("Zone:", zone)} />
      )}

      {/* Print to PDF Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#6366f1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          🖨️ Print Page as PDF
        </button>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/n2")}
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
          onClick={() => navigate("/n4")}
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

export default N3;
