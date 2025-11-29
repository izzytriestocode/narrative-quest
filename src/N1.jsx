import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timelineImage from "./assets/gcse-timeline.svg";
import year11TimelineImage from "./assets/year11-timeline.svg";
import fireworksImage from "./assets/fireworks.jpg";

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

const XPBar = ({ xp }) => {
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

const N1 = () => {
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
    levelFive: false,
    exploreLookingBack: false,
    explainPersuasiveWriting: false
  });
  const [levelOneAnswer, setLevelOneAnswer] = useState("");
  const [improvedIn, setImprovedIn] = useState("");
  const [stillChallenging, setStillChallenging] = useState("");
  const [hardToDo, setHardToDo] = useState("");
  const [wantToImprove, setWantToImprove] = useState("");
  const [explainPointIndex, setExplainPointIndex] = useState(0);
  const [quickCheckFeeling, setQuickCheckFeeling] = useState("");
  const [proudOf, setProudOf] = useState("");
  const [nextTime, setNextTime] = useState("");

  const markComplete = (stepKey, points) => {
    if (!completedSteps[stepKey]) {
      setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
      setXp((prev) => prev + points);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#1e40af", fontSize: "1.5rem" }}>
          Autumn II - Narrative Writing
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "1.5rem" }}>
          Lesson 1
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

        <XPBar xp={xp} />
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
              <strong>🔍 Explore:</strong> Recap on Persuasive Writing
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>💡 Explain:</strong> Introduce Narrative Writing
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>📝 Elaborate:</strong> Co-construct a story together
            </div>
            <div style={{ padding: "0.75rem", background: "#dbeafe", borderRadius: "0.5rem", borderLeft: "4px solid #3b82f6", fontWeight: "500" }}>
              <strong>✅ Evaluate:</strong> Self-evaluation and goal setting
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
          <p style={{ marginBottom: "1rem", color: "#166534", fontSize: "1rem" }}>Reflecting on Past Progress</p>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.75rem", color: "#16a34a", fontSize: "0.95rem" }}>Lesson Objectives:</h3>
            <ul style={{ marginLeft: "1.5rem", color: "#166534", lineHeight: "1.8" }}>
              <li>Reflect on our writing progress</li>
              <li>Collaboratively build a story</li>
              <li>Set new narrative writing goals</li>
              <li>Practise spelling and grammar skills</li>
            </ul>
          </div>
        </section>
      )}

      {/* GCSE Coursework Timeline */}
      {scheduleViewed && (
        <section style={{ marginBottom: "2rem", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid #e5e7eb" }}>
          <h2 style={{ marginTop: 0, color: "#1e40af", fontSize: "1.3rem" }}>Year 10's GCSE English Coursework Timeline</h2>
          <img 
            src={timelineImage}
            alt="GCSE English Coursework Timeline"
            style={{ width: "100%", maxWidth: "100%", borderRadius: "0.5rem", marginTop: "1rem" }}
          />
        </section>
      )}

      {/* Year 11 GCSE Coursework Timeline */}
      {scheduleViewed && (
        <section style={{ marginBottom: "2rem", padding: "2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid #e5e7eb" }}>
          <h2 style={{ marginTop: 0, color: "#1e40af", fontSize: "1.3rem" }}>Year 11's GCSE English Coursework Timeline</h2>
          <img 
            src={year11TimelineImage}
            alt="Year 11 GCSE English Coursework Timeline"
            style={{ width: "100%", maxWidth: "100%", borderRadius: "0.5rem", marginTop: "1rem" }}
          />
        </section>
      )}

      {/* Engage: Hook */}
      {scheduleViewed && (
        <section style={{ marginBottom: "2rem", padding: "1.5rem", background: "#fef3c7", borderRadius: "1rem", border: "1px solid #f59e0b" }}>
          <h3 style={{ marginTop: 0, color: "#92400e", fontSize: "1.1rem" }}>🎣 Engage: Hook</h3>
          <p style={{ fontSize: "1rem", color: "#92400e", marginBottom: "1rem", fontWeight: "500" }}>What kinds of things might go wrong on New Year's Eve? (BE CREATIVE!)</p>
          
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <img 
              src={fireworksImage}
              alt="Fireworks"
              style={{ width: "100%", maxWidth: "500px", height: "auto", borderRadius: "0.5rem" }}
            />
          </div>
          
          <p style={{ fontSize: "0.95rem", color: "#92400e", marginBottom: "1.5rem", fontStyle: "italic" }}>Possible Examples: fireworks gone wrong, a power cut, missing the countdown</p>
          
          <div style={{ padding: "1rem", background: "#fef9e7", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem", marginTop: "1rem" }}>
            <p style={{ marginTop: 0, color: "#92400e", fontSize: "0.95rem", lineHeight: "1.6" }}>
              <strong>Link to Learning:</strong> Today we'll think about how we've grown as writers &amp; what we want to achieve next — all through a bit of creative storytelling!
            </p>
          </div>
        </section>
      )}

      {/* Engage: SPaG Activity Title */}
      {scheduleViewed && (
        <h3 style={{ marginTop: "2rem", marginBottom: "1rem", color: "#92400e", fontSize: "1.1rem" }}>✏️ Engage: SPaG Activity</h3>
      )}

      {/* Level 1 - Engage */}
      <LevelSection
        unlocked={scheduleViewed}
        title="🎯 Level 1 - Engage: Introduction to Narrative"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 1
        </p>
        <div style={{ padding: "1rem", backgroundColor: "#fef9e7", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <p style={{ marginBottom: "0.75rem", color: "#92400e", fontWeight: "bold" }}>
            ✏️ Activity: Fix capital letters, tense and punctuation
          </p>
          <p style={{ marginBottom: "0.75rem", color: "#92400e", fontSize: "0.95rem" }}>
            Read the sentence below. It has mistakes with:
          </p>
          <ul style={{ marginLeft: "1.5rem", color: "#92400e", fontSize: "0.95rem", marginBottom: "1rem" }}>
            <li>Capital letters</li>
            <li>Verb tense</li>
            <li>Punctuation</li>
          </ul>
          <div style={{ backgroundColor: "#fff8dc", padding: "0.75rem", borderRadius: "0.5rem", marginBottom: "1rem", borderLeft: "3px solid #dc2626", fontStyle: "italic", color: "#666", fontSize: "1.2rem" }}>
            the fireworks were bright and people was happy
          </div>
          <p style={{ marginBottom: "0.5rem", color: "#92400e", fontWeight: "bold", fontSize: "0.95rem" }}>
            Rewrite the sentence below:
          </p>
          <textarea
            value={levelOneAnswer}
            onChange={(e) => setLevelOneAnswer(e.target.value)}
            placeholder="Write the corrected sentence here..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              marginBottom: "1rem",
              resize: "vertical"
            }}
          />
          <button
            onClick={() => {
              const correctAnswer = "The fireworks were bright, and people were happy.";
              if (levelOneAnswer === correctAnswer) {
                markComplete("levelOne", 20);
              } else {
                alert("Not quite right. Try again!");
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
            {completedSteps.levelOne ? "✓ Complete" : "Complete"}
          </button>
          {completedSteps.levelOne && (
            <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
              🎉 +10 XP earned!
            </p>
          )}
        </div>
      </LevelSection>

      {/* Explore: Looking Back to Move Forward */}
      {scheduleViewed && (
        <section style={{ marginBottom: "2rem", padding: "1.5rem", background: "#dcfce7", borderRadius: "1rem", border: "1px solid #16a34a" }}>
          <h3 style={{ marginTop: 0, color: "#166534", fontSize: "1.1rem" }}>🔍 Explore: Looking Back to Move Forward</h3>
          
          <p style={{ color: "#166534", fontSize: "0.95rem", marginBottom: "1rem" }}>
            Complete these sentences about your work from last term. You can use the word bank for help.
          </p>
          
          <div style={{ padding: "1rem", background: "#f0fdf4", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "1px solid #16a34a" }}>
            <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "#166534", fontWeight: "bold", fontSize: "0.9rem" }}>
              📚 Word Bank:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["writing", "punctuation", "spelling", "sentences", "adjectives", "ideas", "paragraphs"].map((word) => (
                <span
                  key={word}
                  style={{
                    padding: "0.4rem 0.75rem",
                    background: "white",
                    border: "1px solid #16a34a",
                    borderRadius: "0.25rem",
                    fontSize: "0.85rem",
                    color: "#166534",
                    fontWeight: "500"
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
          
          <div style={{ display: "grid", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "500", marginBottom: "0.5rem", color: "#166534" }}>
                I am good at...
              </label>
              <textarea
                value={improvedIn}
                onChange={(e) => setImprovedIn(e.target.value)}
                placeholder="Enter your answer here..."
                style={{
                  width: "100%",
                  minHeight: "50px",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "500", marginBottom: "0.5rem", color: "#166534" }}>
                I enjoy writing about...
              </label>
              <textarea
                value={stillChallenging}
                onChange={(e) => setStillChallenging(e.target.value)}
                placeholder="Enter your answer here..."
                style={{
                  width: "100%",
                  minHeight: "50px",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "500", marginBottom: "0.5rem", color: "#166534" }}>
                It's hard to...
              </label>
              <textarea
                value={hardToDo}
                onChange={(e) => setHardToDo(e.target.value)}
                placeholder="Enter your answer here..."
                style={{
                  width: "100%",
                  minHeight: "50px",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "500", marginBottom: "0.5rem", color: "#166534" }}>
                Next time, I want to get better at...
              </label>
              <textarea
                value={wantToImprove}
                onChange={(e) => setWantToImprove(e.target.value)}
                placeholder="Enter your answer here..."
                style={{
                  width: "100%",
                  minHeight: "50px",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>
          
          <button
            onClick={() => {
              if (improvedIn.trim() && stillChallenging.trim() && hardToDo.trim() && wantToImprove.trim()) {
                markComplete("exploreLookingBack", 30);
              } else {
                alert("Please fill in all text boxes.");
              }
            }}
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: completedSteps.exploreLookingBack ? "#16a34a" : "#16a34a",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.95rem"
            }}
            disabled={completedSteps.exploreLookingBack}
          >
            {completedSteps.exploreLookingBack ? "✓ Complete" : "Complete"}
          </button>
          {completedSteps.exploreLookingBack && (
            <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
              🎉 +15 XP earned!
            </p>
          )}
        </section>
      )}

      {/* Explain: What did we Learn from Persuasive Writing */}
      {scheduleViewed && (
        <section style={{ marginBottom: "2rem", padding: "1.5rem", background: completedSteps.exploreLookingBack ? "#dcfce7" : "#f8fafc", borderRadius: "1rem", border: `1px solid ${completedSteps.exploreLookingBack ? "#16a34a" : "#cbd5e1"}`, opacity: completedSteps.exploreLookingBack ? 1 : 0.6 }}>
          <h3 style={{ marginTop: 0, color: completedSteps.exploreLookingBack ? "#166534" : "#94a3b8", fontSize: "1.1rem" }}>💡 Explain: What did we Learn from Persuasive Writing?</h3>
          {!completedSteps.exploreLookingBack ? (
            <p style={{ color: "#64748b", fontStyle: "italic" }}>
              🔒 Complete "Explore: Looking Back to Move Forward" to unlock this section.
            </p>
          ) : (
            <>
              <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {[...Array(Math.min(explainPointIndex + 1, 6))].map((_, i) => (
                  <div key={i} style={{ padding: "0.75rem", background: "white", borderRadius: "0.5rem", border: "1px solid #d1d5db", color: "#166534" }}>
                    <strong>{["How to use PEEL paragraphs", "How to use AFOREST Techniques", "How to make FOR and AGAINST arguments", "How to make EXPLICIT and IMPLICIT connections", "How to form our own opinions", "How to identify bias in articles"][i]}</strong>
                  </div>
                ))}
              </div>
              {explainPointIndex < 6 && (
                <button
                  onClick={() => {
                    if (explainPointIndex === 5) {
                      markComplete("explainPersuasiveWriting", 10);
                    }
                    setExplainPointIndex(explainPointIndex + 1);
                  }}
                  style={{
                    padding: "0.65rem 1.5rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    background: "#16a34a",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.95rem"
                  }}
                >
                  Next →
                </button>
              )}
              {explainPointIndex === 6 && (
                <>
                  <p style={{ color: "#16a34a", fontWeight: "bold", fontSize: "0.95rem" }}>
                    ✅ You've learned all the key persuasive writing techniques!
                  </p>
                  {completedSteps.explainPersuasiveWriting && (
                    <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
                      🎉 +5 XP earned!
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </section>
      )}

      {/* Key Elements to Create a Story */}
      {scheduleViewed && completedSteps.explainPersuasiveWriting && (
        <section style={{ marginBottom: "2rem", padding: "1.5rem", background: "#dcfce7", borderRadius: "1rem", border: "1px solid #16a34a" }}>
          <h3 style={{ marginTop: 0, color: "#166534", fontSize: "1.1rem" }}>🎨 What are some Key Elements needed to Create a Story?</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "#fef3c7", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Theme</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>The main message or idea of the story.</p>
            </div>
            <div style={{ padding: "1rem", background: "#cffafe", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Plot</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>The sequence of events — what happens and why.</p>
            </div>
            <div style={{ padding: "1rem", background: "#dcfce7", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Characters</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>The people or figures in the story.</p>
            </div>
            <div style={{ padding: "1rem", background: "#f3e8ff", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Conflict</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>The main problem or challenge the characters face.</p>
            </div>
            <div style={{ padding: "1rem", background: "#dbeafe", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Setting</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>Where and when the story takes place.</p>
            </div>
            <div style={{ padding: "1rem", background: "#fcd34d", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Point of View</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>The perspective the story is told from.</p>
            </div>
            <div style={{ padding: "1rem", background: "#e5e7eb", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}>
              <p style={{ marginTop: 0, marginBottom: "0.5rem", color: "#166534", fontWeight: "bold" }}>Style</p>
              <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>The author's unique way of writing (word choice, tone, and structure).</p>
            </div>
          </div>
        </section>
      )}

      {/* Level 2 - Elaborate */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelOne}
        title="✍️ Level 2 - Elaborate: My Writing Goals"
        bgColor="#fef3c7"
      >
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "0rem" }}>
          LEVEL 2
        </p>
        <p style={{ fontSize: "1rem", color: "#92400e", marginBottom: "1rem" }}>
          Write two goals for your narrative writing this term. Try to choose goals that are specific and possible to work on.
        </p>
        <div style={{ padding: "1rem", backgroundColor: "#fef9e7", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "#92400e", fontWeight: "bold" }}>
            📝 Examples:
          </p>
          <ul style={{ marginLeft: "1.5rem", color: "#92400e", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            <li>"I am good at using adjectives."</li>
            <li>"I want to improve my use of dialogue."</li>
            <li>"To do this, I will plan conversations before writing."</li>
          </ul>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", backgroundColor: "white", borderRadius: "0.5rem", overflow: "hidden", border: "1px solid #d1d5db" }}>
          <thead>
            <tr style={{ background: "#f59e0b" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", color: "white", fontWeight: "bold", fontSize: "0.95rem", borderRight: "1px solid #d1d5db" }}>My Goal</th>
              <th style={{ padding: "0.75rem", textAlign: "left", color: "white", fontWeight: "bold", fontSize: "0.95rem" }}>How I Will Get Better</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.75rem", borderBottom: "1px solid #d1d5db", borderRight: "1px solid #d1d5db", color: "#666", fontSize: "0.95rem", minHeight: "60px", verticalAlign: "top" }}>
                <textarea
                  placeholder="I want to get better at…"
                  style={{
                    width: "100%",
                    minHeight: "50px",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                />
              </td>
              <td style={{ padding: "0.75rem", borderBottom: "1px solid #d1d5db", color: "#666", fontSize: "0.95rem", minHeight: "60px", verticalAlign: "top" }}>
                <textarea
                  placeholder="I will practise by…"
                  style={{
                    width: "100%",
                    minHeight: "50px",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", borderRight: "1px solid #d1d5db", color: "#666", fontSize: "0.95rem", minHeight: "60px", verticalAlign: "top" }}>
                <textarea
                  placeholder="I want to get better at…"
                  style={{
                    width: "100%",
                    minHeight: "50px",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                />
              </td>
              <td style={{ padding: "0.75rem", color: "#666", fontSize: "0.95rem", minHeight: "60px", verticalAlign: "top" }}>
                <textarea
                  placeholder="I will practise by…"
                  style={{
                    width: "100%",
                    minHeight: "50px",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => markComplete("levelTwo", 30)}
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

      {/* Checkout Section */}
      {scheduleViewed && (
        <>
          {/* Quick Check */}
          <section style={{
            borderRadius: "1rem",
            padding: "1rem 1.25rem",
            border: "1px solid #e5e7eb",
            background: "#fef2f2",
            marginBottom: "1rem"
          }}>
            <h3 style={{ marginTop: 0, color: "#dc2626" }}>📋 Quick Check</h3>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>Pick one emoji to show how you feel about your writing right now:</p>
            
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", fontSize: "2.5rem" }}>
              <button
                onClick={() => setQuickCheckFeeling("confident")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: quickCheckFeeling === "confident" ? 1 : 0.5,
                  transform: quickCheckFeeling === "confident" ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.2s ease"
                }}
                title="Confident"
              >
                😀
              </button>
              <button
                onClick={() => setQuickCheckFeeling("okay")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: quickCheckFeeling === "okay" ? 1 : 0.5,
                  transform: quickCheckFeeling === "okay" ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.2s ease"
                }}
                title="Okay"
              >
                😐
              </button>
              <button
                onClick={() => setQuickCheckFeeling("needsHelp")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: quickCheckFeeling === "needsHelp" ? 1 : 0.5,
                  transform: quickCheckFeeling === "needsHelp" ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.2s ease"
                }}
                title="Need more help"
              >
                😟
              </button>
            </div>
            
            {quickCheckFeeling && (
              <div style={{ marginBottom: "1rem", fontSize: "0.95rem", color: "#7c2d12" }}>
                {quickCheckFeeling === "confident" && "😀 Confident"}
                {quickCheckFeeling === "okay" && "😐 Okay"}
                {quickCheckFeeling === "needsHelp" && "😟 Need more help"}
              </div>
            )}

            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#7c2d12" }}>
                  Something I'm proud of:
                </label>
                <textarea
                  value={proudOf}
                  onChange={(e) => setProudOf(e.target.value)}
                  placeholder="What did you do well in your writing?"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #fed7aa",
                    background: "#fef3c7",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    boxSizing: "border-box",
                    minHeight: "80px",
                    resize: "vertical"
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#7c2d12" }}>
                  Something I'll try to do next time:
                </label>
                <textarea
                  value={nextTime}
                  onChange={(e) => setNextTime(e.target.value)}
                  placeholder="What will you improve next time?"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #fed7aa",
                    background: "#fef3c7",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    boxSizing: "border-box",
                    minHeight: "80px",
                    resize: "vertical"
                  }}
                />
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "0.5rem" }}>
            <h3 style={{ marginTop: 0, color: "#0369a1", fontSize: "1.1rem" }}>✅ Checkout: Zone of Regulation Check-in</h3>
            <p style={{ fontSize: "0.95rem", color: "#64748b", marginBottom: "0.5rem" }}>
              Before you finish, let's check in with your emotional state.
            </p>
          </section>
          <ZoRCheck 
            label="How are you feeling right now?"
            onComplete={(zone) => {
              markComplete("zorCheckIn", 10);
              console.log("Selected zone:", zone);
            }}
          />
        </>
      )}

      {/* Print PDF Button */}
      <div style={{ textAlign: "center", marginBottom: "2rem", marginTop: "2rem" }}>
        <button
          onClick={() => {
            window.print();
          }}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#7c3aed",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          🖨️ Print as PDF
        </button>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/")}
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
          ← Home
        </button>
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
          Next →
        </button>
      </div>
    </div>
  );
};

export default N1;
