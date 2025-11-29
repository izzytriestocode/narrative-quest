import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const N2 = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
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
          Lesson 2
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
              <strong>💡 Explain:</strong> Model Narrative Opening - On the Sidewalk Bleeding
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>📝 Elaborate:</strong> Annotate On the Sidewalk Bleeding
            </div>
            <div style={{ padding: "0.75rem", background: "#dbeafe", borderRadius: "0.5rem", borderLeft: "4px solid #3b82f6", fontWeight: "500" }}>
              <strong>✅ Evaluate:</strong> Write a PEEL paragraph on annotations
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
          <p style={{ marginBottom: "1rem", color: "#166534", fontSize: "1rem" }}>To expand knowledge of literary genres and their characteristics.</p>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#16a34a", fontSize: "0.95rem" }}>Lesson Objectives:</h3>
            <ul style={{ marginLeft: "1.5rem", color: "#166534", lineHeight: "1.8" }}>
              <li>Build strong openings for stories</li>
              <li>Create characters and mood through language</li>
              <li>Analyse how writers use viewpoint</li>
            </ul>
          </div>
        </section>
      )}

      {/* Level 1 - Engage */}
      <LevelSection
        unlocked={scheduleViewed}
        title="🎯 Level 1 - Engage"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 1
        </p>
        <p style={{ fontSize: "1rem", color: "#92400e", marginBottom: "1rem" }}>
          Content to be added
        </p>
        <button
          onClick={() => markComplete("levelOne", 10)}
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

      {/* Level 2 - Hook */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelOne}
        title="🎣 Level 2 - Hook"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 2
        </p>
        <p style={{ fontSize: "1rem", color: "#92400e", marginBottom: "1rem" }}>
          Content to be added
        </p>
        <button
          onClick={() => markComplete("levelTwo", 15)}
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
          {completedSteps.levelTwo ? "✓ Complete" : "Complete"}
        </button>
        {completedSteps.levelTwo && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +15 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 3 - Explore */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelTwo}
        title="🔍 Level 3 - Explore"
        bgColor="#dcfce7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 3
        </p>
        <p style={{ fontSize: "1rem", color: "#166534", marginBottom: "1rem" }}>
          Content to be added
        </p>
        <button
          onClick={() => markComplete("levelThree", 15)}
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
            🎉 +15 XP earned!
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
          onClick={() => navigate("/n1")}
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
          Next →
        </button>
      </div>
    </div>
  );
};

export default N2;
