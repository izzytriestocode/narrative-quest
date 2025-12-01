import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import alleyImage from "./assets/alley.jpg";
import sidewalkImage from "./assets/sidewalk.jpg";

// Memoized LevelSection component to prevent unnecessary re-renders
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

LevelSection.displayName = 'LevelSection';

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

const N2 = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
  const [completedSteps, setCompletedSteps] = useState({
    levelOne: false,
    spagActivity: false,
    levelTwo: false,
    levelThree: false,
    levelFour: false,
    levelFive: false
  });
  const [whatHappened, setWhatHappened] = useState("");
  const [whoIsNarrator, setWhoIsNarrator] = useState("");
  const [feelingAboutImage, setFeelingAboutImage] = useState("");
  const [spagAnswer, setSpagAnswer] = useState("");
  const [andysFeeling, setAndysFeeling] = useState("");
  const [moodExample, setMoodExample] = useState("");
  const [viewpointExample, setViewpointExample] = useState("");
  const [keyTermMatches, setKeyTermMatches] = useState({
    Narrative: "",
    Characterisation: "",
    Atmosphere: "",
    Viewpoint: "",
    Suspense: ""
  });
  const [characterisationExample, setCharacterisationExample] = useState("");
  const [atmosphereTechnique, setAtmosphereTechnique] = useState("");
  const [viewpointClue, setViewpointClue] = useState("");
  const [powerfulReflection, setPowerfulReflection] = useState("");
  const [techniqueForCoursework, setTechniqueForCoursework] = useState("");

  // Memoized onChange handlers for textareas
  const handleAndysFeelingChange = useCallback((e) => setAndysFeeling(e.target.value), []);
  const handleMoodExampleChange = useCallback((e) => setMoodExample(e.target.value), []);
  const handleViewpointExampleChange = useCallback((e) => setViewpointExample(e.target.value), []);
  const handleWhatHappenedChange = useCallback((e) => setWhatHappened(e.target.value), []);
  const handleWhoIsNarratorChange = useCallback((e) => setWhoIsNarrator(e.target.value), []);
  const handleFeelingAboutImageChange = useCallback((e) => setFeelingAboutImage(e.target.value), []);

  // Memoized style objects for textareas
  const textareaStyleGreen = useMemo(() => ({
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #86efac",
    background: "#f0fdf4",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    minHeight: "80px",
    resize: "vertical",
    marginBottom: "2rem"
  }), []);

  const textareaStyleGreenAlt = useMemo(() => ({
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #86efac",
    background: "#f0fdf4",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    minHeight: "80px",
    resize: "vertical",
    marginBottom: "1.5rem"
  }), []);

  const textareaStyleCyan = useMemo(() => ({
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #06b6d4",
    background: "#ecfdf5",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    minHeight: "80px",
    resize: "vertical",
    marginBottom: "1.5rem"
  }), []);

  const textareaStyleOrange = useMemo(() => ({
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #fed7aa",
    background: "#fffbeb",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    minHeight: "60px",
    resize: "vertical"
  }), []);

  // Memoized styles for Engage section
  const engageQuoteBoxStyle = useMemo(() => ({
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "#fef9e7",
    borderRadius: "0.5rem",
    borderLeft: "4px solid #b45309"
  }), []);

  const engageImageStyle = useMemo(() => ({
    width: "100%",
    borderRadius: "0.75rem",
    marginBottom: "1.5rem",
    maxHeight: "400px",
    objectFit: "cover"
  }), []);

  const engageGridStyle = useMemo(() => ({
    display: "grid",
    gap: "1rem",
    marginBottom: "1.5rem"
  }), []);

  const engageLabelStyle = useMemo(() => ({
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#92400e",
    fontSize: "0.95rem"
  }), []);

  const markComplete = (stepKey, points) => {
    if (!completedSteps[stepKey]) {
      setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
      setXp((prev) => prev + points);
    }
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

      {/* ZoR Check-in */}
      {scheduleViewed && (
        <ZoRCheck label="🧠 ZoR Check-in" onComplete={(zone) => console.log("Zone:", zone)} />
      )}

      {/* Level 1 - Engage */}
      <LevelSection
        unlocked={scheduleViewed}
        title="🎯 Level 1 - Engage: Hook"
        bgColor="#fef3c7"
      >
        <h3 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#b45309", fontSize: "1.6rem", fontWeight: "600" }}>
          📝 Engage: Hook
        </h3>
        
        <div style={engageQuoteBoxStyle}>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#92400e", margin: 0, lineHeight: "1.6" }}>
            "It was a place where secrets breathed louder than footsteps."
          </p>
        </div>

        <img 
          src={alleyImage}
          alt="Dark alley with street lights"
          style={engageImageStyle}
        />

        <div style={engageGridStyle}>
          <div>
            <label style={engageLabelStyle}>
              What might have happened here?
            </label>
            <textarea
              key="whatHappened"
              value={whatHappened}
              onChange={handleWhatHappenedChange}
              placeholder="Write your thoughts..."
              style={textareaStyleOrange}
            />
          </div>

          <div>
            <label style={engageLabelStyle}>
              Who might the narrator be?
            </label>
            <textarea
              key="whoIsNarrator"
              value={whoIsNarrator}
              onChange={handleWhoIsNarratorChange}
              placeholder="Write your thoughts..."
              style={textareaStyleOrange}
            />
          </div>

          <div>
            <label style={engageLabelStyle}>
              How do you feel looking at this image?
            </label>
            <textarea
              key="feelingAboutImage"
              value={feelingAboutImage}
              onChange={handleFeelingAboutImageChange}
              placeholder="Write your thoughts..."
              style={textareaStyleOrange}
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            markComplete("levelOne", 14);
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
            🎉 +14 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Link to Learning */}
      <section style={{
        borderRadius: "1rem",
        padding: "1.5rem 1.25rem",
        border: "2px solid #3b82f6",
        background: "#dbeafe",
        marginBottom: "2rem"
      }}>
        <h3 style={{ marginTop: 0, color: "#1e40af", fontSize: "1.1rem" }}>🔗 Link to Learning</h3>
        <p style={{ fontSize: "1rem", color: "#1e3a8a", lineHeight: "1.6", margin: 0 }}>
          By the end of today, you'll know how to make your story openings pull readers in and set the tone — just like professional writers do!
        </p>
      </section>

      {/* SPaG Activity Level */}
      <LevelSection
        unlocked={scheduleViewed}
        title="✏️ Level 1 - SPaG Activity"
        bgColor="#f3e8ff"
      >
        <h3 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#6b21a8", fontSize: "1.1rem", fontWeight: "600" }}>
          Engage: Fix Capital Letters, Tense & Punctuation
        </h3>
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem" }}>
          LEVEL 1
        </p>
        
        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#faf5ff", borderRadius: "0.5rem", border: "1px solid #e9d5ff" }}>
          <p style={{ fontSize: "1rem", color: "#581c87", margin: 0, fontStyle: "italic" }}>
            the man walk down the alley he scared
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#6b21a8", fontSize: "0.95rem" }}>
            Corrected sentence:
          </label>
          <textarea
            value={spagAnswer}
            onChange={(e) => setSpagAnswer(e.target.value)}
            placeholder="Rewrite the sentence with correct capital letters, tense, and punctuation..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d8b4fe",
              background: "#faf5ff",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              minHeight: "80px",
              resize: "vertical"
            }}
          />
        </div>

        <button
          onClick={() => {
            const correctAnswer = "The man walked down the alley. He was scared.";
            if (spagAnswer.trim() === correctAnswer) {
              markComplete("spagActivity", 11);
            } else {
              alert("Not quite right. Try again! Hint: Check capital letters, verb tense, and punctuation.");
            }
          }}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.spagActivity ? "#16a34a" : "#9333ea",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.spagActivity}
        >
          {completedSteps.spagActivity ? "✓ Complete" : "Complete"}
        </button>
        {completedSteps.spagActivity && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +11 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 2 - Explore */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.spagActivity}
        title="🔍 Level 2 - Explore"
        bgColor="#dbeafe"
      >
        <h3 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#0369a1", fontSize: "1.1rem", fontWeight: "600" }}>
          📚 Explore: Match the Key Terms
        </h3>
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1.5rem" }}>
          LEVEL 2
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#0369a1", marginBottom: "1rem", fontWeight: "500" }}>
            Match each term with its correct definition by selecting from the dropdown:
          </p>

          <div style={{ display: "grid", gap: "1rem" }}>
            {Object.keys(keyTermMatches).map((term) => (
              <div key={term} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "center" }}>
                <div style={{ padding: "0.75rem", background: "#e0f2fe", borderRadius: "0.5rem", border: "1px solid #0369a1", fontWeight: "600", color: "#0369a1" }}>
                  {term}
                </div>
                <select
                  value={keyTermMatches[term]}
                  onChange={(e) => setKeyTermMatches({ ...keyTermMatches, [term]: e.target.value })}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #0369a1",
                    background: keyTermMatches[term] ? "#cffafe" : "white",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    color: "#0369a1"
                  }}
                >
                  <option value="">-- Select Definition --</option>
                  <option value="the perspective it's told from (1st or 3rd)">the perspective it's told from (1st or 3rd)</option>
                  <option value="The mood or feeling of a story">The mood or feeling of a story</option>
                  <option value="A feeling of tension or wanting to know what happens next">A feeling of tension or wanting to know what happens next</option>
                  <option value="How a writer shows what a character is like">How a writer shows what a character is like</option>
                  <option value="The story being told">The story being told</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const correctMatches = {
              Narrative: "The story being told",
              Characterisation: "How a writer shows what a character is like",
              Atmosphere: "The mood or feeling of a story",
              Viewpoint: "the perspective it's told from (1st or 3rd)",
              Suspense: "A feeling of tension or wanting to know what happens next"
            };
            
            const allCorrect = Object.keys(correctMatches).every(
              (term) => keyTermMatches[term] === correctMatches[term]
            );
            
            if (allCorrect) {
              markComplete("levelTwo", 14);
            } else {
              alert("Not all matches are correct. Try again!");
            }
          }}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelTwo ? "#16a34a" : "#3b82f6",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}
          disabled={completedSteps.levelTwo}
        >
          {completedSteps.levelTwo ? "✓ Complete" : "Check Answers"}
        </button>
        {completedSteps.levelTwo && (
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +14 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Model Text - On the Sidewalk Bleeding */}
      <section style={{
        borderRadius: "1rem",
        padding: "1.5rem 1.25rem",
        border: "1px solid #10b981",
        background: "#f0fdf4",
        marginBottom: "2rem"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#16a34a", fontSize: "1.2rem", fontWeight: "600" }}>
          📖 <em>On the Sidewalk Bleeding</em> by Evan Hunter
        </h3>
        
        <img 
          src={sidewalkImage}
          alt="Sidewalk scene"
          style={{
            width: "100%",
            borderRadius: "0.75rem",
            marginBottom: "1rem",
            maxHeight: "280px",
            objectFit: "contain"
          }}
        />
        
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.7", marginBottom: "1rem" }}>
            The story follows a 16-year-old boy named Andy, who lies in an alley after being stabbed. He's part of a gang called The Royals, and he was attacked because of his purple Royal jacket—not because of who he really is.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.7" }}>
            As Andy bleeds and waits for help, he realizes people only see him as a gang member, not as himself. Several people pass by but don't help. Andy regrets joining the gang and wishes to be seen as just Andy, but it's too late.
          </p>
        </div>
      </section>

      {/* What We'll Learn Section */}
      <section style={{
        borderRadius: "1rem",
        padding: "1.5rem 1.25rem",
        border: "1px solid #059669",
        background: "#ecfdf5",
        marginBottom: "2rem"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#047857", fontSize: "1.1rem", fontWeight: "600" }}>
          🎯 As we read the opening of the story, we will identify how the author:
        </h3>
        <ul style={{ marginLeft: "1.5rem", color: "#065f46", lineHeight: "2.5", fontSize: "0.95rem", listStyle: "none", padding: 0 }}>
          <li style={{ backgroundColor: "#fef08a", padding: "0.5rem 0.75rem", borderRadius: "0.25rem", marginBottom: "0.5rem" }}>Introduces a character or setting clearly</li>
          <li style={{ backgroundColor: "#dcfce7", padding: "0.5rem 0.75rem", borderRadius: "0.25rem", marginBottom: "0.5rem" }}>Establishes mood and atmosphere</li>
          <li style={{ backgroundColor: "#f3e8ff", padding: "0.5rem 0.75rem", borderRadius: "0.25rem", marginBottom: "0.5rem" }}>Uses language to hint at backstory or emotion</li>
          <li style={{ backgroundColor: "#cffafe", padding: "0.5rem 0.75rem", borderRadius: "0.25rem" }}>Maintains a consistent viewpoint (1st or 3rd person)</li>
        </ul>
      </section>

      {/* Printout Request */}
      <section style={{
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        border: "2px solid #f59e0b",
        background: "#fffbeb",
        marginBottom: "2rem"
      }}>
        <p style={{ margin: 0, fontSize: "1rem", color: "#92400e", fontWeight: "600", textAlign: "center" }}>
          📄 Ask Miss for the printout of the text.
        </p>
      </section>

      {/* Before Analysing Section */}
      <section style={{
        borderRadius: "1rem",
        padding: "1.5rem 1.25rem",
        border: "1px solid #8b5cf6",
        background: "#faf5ff",
        marginBottom: "2rem"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#7c3aed", fontSize: "1.2rem", fontWeight: "600" }}>
          🤔 Before Analysing...
        </h3>
        <ul style={{ marginLeft: "1.5rem", color: "#6d28d9", lineHeight: "2", fontSize: "1.05rem", fontWeight: "500" }}>
          <li style={{ marginBottom: "1rem" }}>What do we already know about Andy and his situation?</li>
          <li style={{ marginBottom: "1rem" }}>How does the writer create such a strong first impression?</li>
          <li>Which detail stands out most to you, and why?</li>
        </ul>
      </section>

      {/* Level 3 - Explain */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelTwo}
        title="💡 Level 3 - Explain"
        bgColor="#dcfce7"
      >
        <h3 style={{ marginTop: 0, marginBottom: "0.5rem", color: "#16a34a", fontSize: "1.4rem", fontWeight: "700" }}>
          Explain: Analysing the Opening of On the Sidewalk Bleeding
        </h3>
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem" }}>
          LEVEL 3
        </p>

        {/* How does the author section */}
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", fontStyle: "italic" }}>
          How does the author...
        </p>

        <div style={{ backgroundColor: "#fef08a", padding: "1rem 1.25rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <h4 style={{ marginTop: 0, marginBottom: 0, color: "#92400e", fontSize: "1.15rem", fontWeight: "600" }}>
            Introduce a Character or Setting Clearly:
          </h4>
        </div>

        <div style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "4px solid #10b981" }}>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The story begins right in the middle of action — we immediately meet "the boy."
          </p>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The setting is shown through short, direct details: "in the rain" — outside, late, and dangerous.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8" }}>
            Readers quickly understand who the story focuses on, Andy, and where it takes place.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#16a34a", marginBottom: "0.75rem", marginTop: 0, textDecoration: "underline" }}>
            📝 Task: Find one sentence that shows what Andy is feeling.
          </h4>
          <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#059669", marginBottom: "0.5rem" }}>
            ✏️ My Explanation (start your sentence):
          </p>
          <p style={{ fontSize: "0.85rem", color: "#10b981", marginBottom: "1rem", fontStyle: "italic" }}>
            💡 Helpful words: scared, cold, weak, upset, hurt, worried
          </p>
          <textarea
            key="andysFeeling"
            value={andysFeeling}
            onChange={handleAndysFeelingChange}
            placeholder="Write the sentence here..."
            style={textareaStyleGreen}
          />
        </div>

        {/* How does the author section - Establish Mood and Atmosphere */}
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", fontStyle: "italic" }}>
          How does the author...
        </p>

        <div style={{ backgroundColor: "#bbf7d0", padding: "1rem 1.25rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <h4 style={{ marginTop: 0, marginBottom: 0, color: "#16a34a", fontSize: "1.15rem", fontWeight: "600" }}>
            Establish Mood and Atmosphere:
          </h4>
        </div>

        <div style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "4px solid #10b981" }}>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The setting is bleak and grim — a cold, rainy night in an alley.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The rain, darkness, and bleeding all create a gloomy, tense, and hopeless mood.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The reader senses fear and danger right away.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#166534", lineHeight: "1.8" }}>
            The tone makes us want to know what happened and if he'll survive.
          </p>
        </div>

        {/* Task for Mood and Atmosphere */}
        <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#16a34a", marginBottom: "0.75rem", marginTop: "1.5rem", textDecoration: "underline" }}>
          📝 Task: Find one example that shows the mood or feeling in the story.
        </h4>
        <p style={{ fontSize: "0.85rem", color: "#059669", marginBottom: "1rem", fontStyle: "italic" }}>
          (Think about weather, setting, silence, or word choice.)
        </p>
        <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#059669", marginBottom: "0.5rem" }}>
          ✏️ My Explanation (start your sentence):
        </p>
        <p style={{ fontSize: "0.85rem", color: "#10b981", marginBottom: "1rem", fontStyle: "italic" }}>
          💡 Helpful words: dark, rainy, quiet, lonely, dangerous, sad
        </p>
        <textarea
          key="moodExample"
          value={moodExample}
          onChange={handleMoodExampleChange}
          placeholder="Write your example here..."
          style={textareaStyleGreenAlt}
        />

        {/* How does the author section - Uses language to hint at backstory or emotion */}
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", fontStyle: "italic" }}>
          How does the author...
        </p>

        <div style={{ backgroundColor: "#f3e8ff", padding: "1rem 1.25rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <h4 style={{ marginTop: 0, marginBottom: 0, color: "#7c3aed", fontSize: "1.15rem", fontWeight: "600" }}>
            Uses language to hint at backstory or emotion:
          </h4>
        </div>

        <div style={{ marginBottom: "3.5rem", paddingLeft: "1rem", borderLeft: "4px solid #a78bfa" }}>
          <p style={{ fontSize: "0.95rem", color: "#581c87", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The "bright purple jacket" and the words "THE ROYALS" hint at a gang connection.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#581c87", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            We predict this may be the reason he's been attacked — the story gives clues without explaining everything.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#581c87", lineHeight: "1.8" }}>
            The short, simple sentences show shock and emotion without directly saying how he feels.
          </p>
        </div>

        {/* How does the author section - Maintains a consistent viewpoint */}
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", fontStyle: "italic" }}>
          How does the author...
        </p>

        <div style={{ backgroundColor: "#cffafe", padding: "1rem 1.25rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <h4 style={{ marginTop: 0, marginBottom: 0, color: "#0369a1", fontSize: "1.15rem", fontWeight: "600" }}>
            Maintains a consistent viewpoint (1st or 3rd person):
          </h4>
        </div>

        <div style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "4px solid #06b6d4" }}>
          <p style={{ fontSize: "0.95rem", color: "#164e63", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            The story uses third-person limited viewpoint, following Andy closely.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#164e63", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            We only see what he experiences — his pain, fear, and regret.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#164e63", lineHeight: "1.8" }}>
            This viewpoint helps the reader connect emotionally while still observing from outside.
          </p>
        </div>

        {/* Task for Maintains consistent viewpoint */}
        <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#0369a1", marginBottom: "0.75rem", marginTop: "1.5rem", textDecoration: "underline" }}>
          📝 Task: Highlight/ underline a sentence that shows what Andy is thinking or feeling inside.
        </h4>
        <p style={{ fontSize: "0.85rem", color: "#0369a1", marginBottom: "1rem", fontStyle: "italic" }}>
          Is the story told in first person ("I") or third person ("he" / "she")?
        </p>
        <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0369a1", marginBottom: "0.5rem" }}>
          ✏️ My Explanation (start your sentence):
        </p>
        <p style={{ fontSize: "0.85rem", color: "#0555a1", marginBottom: "1rem", fontStyle: "italic" }}>
          💡 Helpful words: he is thinking, remembers, hopes, regrets
        </p>
        <textarea
          key="viewpointExample"
          value={viewpointExample}
          onChange={handleViewpointExampleChange}
          placeholder="Write your example here..."
          style={textareaStyleCyan}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            markComplete("levelThree", 25);
          }}
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

      {/* Level 4 - Elaborate */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelThree}
        title="📚 Level 4 - Elaborate: Writing Task"
        bgColor="#fef3c7"
      >
        <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem", color: "#92400e" }}>
          ✍️ Elaborate: Writing Task
        </h3>
        
        <p style={{ fontSize: "0.95rem", color: "#333", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          Reread the opening of <em>On the Sidewalk Bleeding</em>. In pairs or individually, find and annotate:
        </p>

        {/* Task 1 */}
        <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #fcd34d" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#92400e", marginBottom: "0.5rem" }}>
            1. One example of strong characterisation
          </h4>
          <p style={{ fontSize: "0.9rem", color: "#78350f", marginBottom: "1rem", fontStyle: "italic" }}>
            (What do we learn about Andy?)
          </p>
          <textarea
            value={characterisationExample}
            onChange={(e) => setCharacterisationExample(e.target.value)}
            placeholder="Write your example here..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #fcd34d",
              background: "#fffbeb",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              minHeight: "100px",
              resize: "vertical"
            }}
          />
        </div>

        {/* Task 2 */}
        <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #fcd34d" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#92400e", marginBottom: "0.5rem" }}>
            2. One technique that builds atmosphere
          </h4>
          <p style={{ fontSize: "0.9rem", color: "#78350f", marginBottom: "1rem", fontStyle: "italic" }}>
            (What makes it tense or emotional?)
          </p>
          <textarea
            value={atmosphereTechnique}
            onChange={(e) => setAtmosphereTechnique(e.target.value)}
            placeholder="Write your example here..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #fcd34d",
              background: "#fffbeb",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              minHeight: "100px",
              resize: "vertical"
            }}
          />
        </div>

        {/* Task 3 */}
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#92400e", marginBottom: "0.5rem" }}>
            3. One clue about viewpoint or emotion
          </h4>
          <p style={{ fontSize: "0.9rem", color: "#78350f", marginBottom: "1rem", fontStyle: "italic" }}>
            (How do we know how Andy feels?)
          </p>
          <textarea
            value={viewpointClue}
            onChange={(e) => setViewpointClue(e.target.value)}
            placeholder="Write your example here..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #fcd34d",
              background: "#fffbeb",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              minHeight: "100px",
              resize: "vertical"
            }}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            markComplete("levelFour", 18);
          }}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFour ? "#16a34a" : "#b45309",
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
            🎉 +18 XP earned!
          </p>
        )}
      </LevelSection>

      {/* Level 5 - Evaluate */}
      <LevelSection
        unlocked={scheduleViewed && completedSteps.levelFour}
        title="✨ Level 5 - Evaluate: Reflect"
        bgColor="#e0e7ff"
      >
        <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem", color: "#3730a3" }}>
          🤔 Evaluate: Reflect
        </h3>

        <p style={{ fontSize: "0.95rem", color: "#333", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          Before you leave, answer verbally:
        </p>

        {/* Reflection 1 */}
        <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #c7d2fe" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#3730a3", marginBottom: "0.5rem" }}>
            What makes <em>On the Sidewalk Bleeding</em> powerful from the start?
          </h4>
          <textarea
            value={powerfulReflection}
            onChange={(e) => setPowerfulReflection(e.target.value)}
            placeholder="Write your reflection here..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #c7d2fe",
              background: "#f0f4ff",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              minHeight: "100px",
              resize: "vertical"
            }}
          />
        </div>

        {/* Reflection 2 */}
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#3730a3", marginBottom: "0.5rem" }}>
            What technique will you include in your story opening for your coursework?
          </h4>
          <textarea
            value={techniqueForCoursework}
            onChange={(e) => setTechniqueForCoursework(e.target.value)}
            placeholder="Write your reflection here..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #c7d2fe",
              background: "#f0f4ff",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              minHeight: "100px",
              resize: "vertical"
            }}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            markComplete("levelFive", 18);
          }}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: completedSteps.levelFive ? "#16a34a" : "#6366f1",
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
          <p style={{ marginTop: "0.75rem", color: "#16a34a", fontWeight: "bold", fontSize: "0.9rem" }}>
            🎉 +18 XP earned! Lesson Complete!
          </p>
        )}
      </LevelSection>

      {/* Print PDF Button */}
      <section style={{
        borderRadius: "1rem",
        padding: "2rem 1.25rem",
        background: "#f3f4f6",
        marginBottom: "2rem",
        textAlign: "center"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#374151", fontSize: "1.1rem" }}>
          📄 Download Your Work
        </h3>
        <button
          onClick={() => window.print()}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#7c3aed",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          🖨️ Print/Download as PDF
        </button>
      </section>

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
