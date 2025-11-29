import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import poppyImage from "./assets/poppy.jpg";
import poppyAIImage from "./assets/poppy-AI.png";

const N5 = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
  const lessonObjectivesRef = useRef(null);
  const [spagAnswers, setSpagAnswers] = useState({ first: "", second: "", third: "" });
  const [spagChecked, setSpagChecked] = useState(false);
  const [spagCorrect, setSpagCorrect] = useState(null);
  const [objectivesRead, setObjectivesRead] = useState(false);
  const remembranceDayRef = useRef(null);
  const [keyTermMatches, setKeyTermMatches] = useState({ setting: "", imagery: "", mood: "", connotation: "", figurative: "" });
  const [draggedTerm, setDraggedTerm] = useState(null);
  const [keyTermsChecked, setKeyTermsChecked] = useState(false);
  const [keyTermsCorrect, setKeyTermsCorrect] = useState(null);

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem", minHeight: "100vh", maxWidth: "960px" }}>
      <h2 style={{ marginBottom: "0.5rem", fontSize: "2rem", color: "#1e40af" }}>Autumn II - Narrative Writing</h2>
      <header style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: "1.1rem", color: "#4b5563" }}>
          Explore character development and figurative language in Hilary Mantel's historical novel.
        </p>
      </header>

      <div style={{ backgroundColor: "#ecf0f1", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", borderLeft: "4px solid #0369a1" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0369a1", fontSize: "1.1rem" }}>Learning Objective</h3>
        <p style={{ margin: "0", fontSize: "1rem", color: "#2c3e50" }}>
          To understand how authors bring the past to life.
        </p>
      </div>

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

      <div style={{ padding: "1.5rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem", marginBottom: "2rem", border: "1px solid #e5e7eb" }}>
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
          background: "#f0f9ff",
          marginBottom: "1rem",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginTop: 0 }}>Task Schedule</h2>
        <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "0.75rem", background: "#fef3c7", borderRadius: "0.5rem", borderLeft: "4px solid #f59e0b", fontWeight: "500" }}>
            <strong>🎯 Engage:</strong> SPaG Activity & Hook
          </div>
          <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
            <strong>🔍 Explore:</strong> Key Terms
          </div>
          <div style={{ padding: "0.75rem", background: "#f3e8ff", borderRadius: "0.5rem", borderLeft: "4px solid #a855f7", fontWeight: "500" }}>
            <strong>💡 Explain:</strong> Analyse Importance of Historical Fiction - Bring up the Bodies
          </div>
          <div style={{ padding: "0.75rem", background: "#fce7f3", borderRadius: "0.5rem", borderLeft: "4px solid #ec4899", fontWeight: "500" }}>
            <strong>📝 Elaborate:</strong> Annotating Bring up the Bodies (Group Work)
          </div>
          <div style={{ padding: "0.75rem", background: "#fee2e2", borderRadius: "0.5rem", borderLeft: "4px solid #dc2626", fontWeight: "500" }}>
            <strong>✅ Evaluate:</strong> How Does Characterisation Reflect Historical Context? (2 Questions)
          </div>
        </div>
        <button
          onClick={() => lessonObjectivesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#0369a1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1.1rem",
            transition: "background 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.background = "#025a96"}
          onMouseLeave={(e) => e.target.style.background = "#0369a1"}
        >
          Let's Begin ↓
        </button>
      </section>

      <div style={{ height: "2rem" }} />

      <section
        ref={lessonObjectivesRef}
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#f0f9ff",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>Lesson Objectives</h2>
        <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
          By the end of this lesson, you will be able to:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div style={{ padding: "1.5rem", background: "#dcfce7", border: "2px solid #16a34a", borderRadius: "0.5rem", fontWeight: "500", minHeight: "140px", display: "flex", alignItems: "center", fontSize: "1.1rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.5rem", flexShrink: 0 }}>✓</span>
              <span>Use setting, imagery, mood, connotation and figurative language</span>
            </div>
          </div>
          <div style={{ padding: "1.5rem", background: "#fef3c7", border: "2px solid #f59e0b", borderRadius: "0.5rem", fontWeight: "500", minHeight: "140px", display: "flex", alignItems: "center", fontSize: "1.1rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.5rem", flexShrink: 0 }}>✓</span>
              <span>Explore how historical fiction brings past and present together</span>
            </div>
          </div>
          <div style={{ padding: "1.5rem", background: "#f3e8ff", border: "2px solid #a855f7", borderRadius: "0.5rem", fontWeight: "500", minHeight: "140px", display: "flex", alignItems: "center", fontSize: "1.1rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.5rem", flexShrink: 0 }}>✓</span>
              <span>Analyse how authors create believable voices for the past</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setObjectivesRead(true);
            setTimeout(() => remembranceDayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
          }}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            background: objectivesRead ? "#16a34a" : "#0369a1",
            color: "white",
            cursor: objectivesRead ? "default" : "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "background 0.2s ease"
          }}
          onMouseEnter={(e) => !objectivesRead && (e.target.style.background = "#025a96")}
          onMouseLeave={(e) => !objectivesRead && (e.target.style.background = "#0369a1")}
          disabled={objectivesRead}
        >
          {objectivesRead ? "✓ Read" : "I've read this"}
        </button>
      </section>

      {objectivesRead && (
        <>
      <section
        ref={remembranceDayRef}
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#fef3c7",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>🎯 Engage: What is Remembrance Day?</h2>
        
        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem" }}>
          <p style={{ marginTop: 0, color: "#92400e", fontWeight: "bold" }}>
            🕯️ Remembrance Day is observed on November 11th to honour soldiers who fought and died in wars, especially World War I.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem" }}>
          <p style={{ marginTop: 0, color: "#92400e", fontWeight: "bold" }}>
            ⏰ It began after the First World War to remember the moment fighting stopped — the 11th hour of the 11th day of the 11th month (1918).
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem" }}>
          <p style={{ marginTop: 0, color: "#92400e", fontWeight: "bold" }}>
            The poppy became a symbol of remembrance, inspired by a famous poem written by a Canadian soldier and poet — John McCrae.
          </p>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <img src={poppyImage} alt="Red Poppy" style={{ maxWidth: "200px", height: "auto" }} />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem" }}>
          <p style={{ marginTop: 0, color: "#92400e", fontWeight: "bold" }}>
            ✍️ McCrae wrote the poem "In Flanders Fields" in 1915 after witnessing the loss of his friend and the devastation of war.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem", borderWidth: "2px" }}>
          <p style={{ marginTop: 0, color: "#92400e", fontWeight: "bold" }}>
            💭 Why is this important to historical fiction?
          </p>
          <p style={{ margin: "0.5rem 0 0 0", color: "#92400e" }}>
            Understanding historical events helps us appreciate how authors bring real moments to life through character and language. When you read historical fiction set in wartime, the context and emotions become more powerful.
          </p>
        </div>
      </section>

      <section
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#fef3c7",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>🎣 Engage: Hook</h2>
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <img src={poppyAIImage} alt="Soldier and Poppy" style={{ maxWidth: "500px", height: "auto", borderRadius: "0.5rem" }} />
        </div>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div style={{ padding: "1.5rem", background: "#dbeafe", border: "2px solid #0369a1", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600", color: "#0369a1" }}>
              What if John McCrae could share his poem online today?
            </p>
          </div>
          <div style={{ padding: "1.5rem", background: "#dbeafe", border: "2px solid #0369a1", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600", color: "#0369a1" }}>
              How might people react or connect differently?
            </p>
          </div>
          <div style={{ padding: "1rem", background: "transparent", border: "none", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "4rem" }}>🤔</p>
          </div>
          <div style={{ padding: "1rem", background: "#fffbeb", border: "1px solid #f59e0b", borderRadius: "0.5rem" }}>
            <p style={{ margin: 0, fontSize: "1.05rem", fontWeight: "500", color: "#92400e" }}>
              💬 More people would read it instantly, but it might lose the same quiet reflection.
            </p>
          </div>
          <div style={{ padding: "1rem", background: "#fffbeb", border: "1px solid #f59e0b", borderRadius: "0.5rem" }}>
            <p style={{ margin: 0, fontSize: "1.05rem", fontWeight: "500", color: "#92400e" }}>
              🌐 It shows how the past can meet the present — just like in historical fiction.
            </p>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem" }}>
          <p style={{ margin: "0", fontSize: "1rem", fontWeight: "500", color: "#92400e" }}>
            <strong>🔗 Link to Learning:</strong> This transition introduces how writers use historical settings and modern perspectives to create historical fiction!
          </p>
        </div>
      </section>

      <section
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#fef3c7",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>✏️ Engage: SPaG Activity - Remembrance Day Edition</h2>
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 1
        </p>
        <p style={{ fontSize: "1.05rem", color: "#92400e", marginBottom: "1.5rem" }}>
          <strong>Activity:</strong> Use adjectives and adverbs from the word bank to expand the sentence below.
        </p>
        <div style={{ padding: "1rem", background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: "0.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ margin: "0 0 0.5rem 0", color: "#92400e", fontWeight: "600", fontSize: "0.95rem" }}>Word Bank:</p>
          <p style={{ margin: 0, color: "#92400e", fontSize: "1rem", letterSpacing: "0.1em" }}>
            <strong>quietly</strong> • <strong>empty</strong> • <strong>brave</strong>
          </p>
        </div>
        <div style={{ padding: "1.5rem", background: "#fffbeb", border: "2px solid #f59e0b", borderRadius: "0.5rem", marginBottom: "1.5rem", textAlign: "center", fontSize: "1.15rem", fontWeight: "500" }}>
          <p style={{ margin: "0 0 1.5rem 0", color: "#92400e", lineHeight: "2" }}>
            The <input 
              type="text" 
              placeholder="adjective" 
              value={spagAnswers.first}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, first: e.target.value })}
              style={{ width: "120px", padding: "0.5rem", border: "1px solid #f59e0b", borderRadius: "0.25rem", textAlign: "center", fontSize: "1rem" }} 
            /> soldier stood <input 
              type="text" 
              placeholder="adverb" 
              value={spagAnswers.second}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, second: e.target.value })}
              style={{ width: "120px", padding: "0.5rem", border: "1px solid #f59e0b", borderRadius: "0.25rem", textAlign: "center", fontSize: "1rem" }} 
            /> in the <input 
              type="text" 
              placeholder="adjective" 
              value={spagAnswers.third}
              onChange={(e) => setSpagAnswers({ ...spagAnswers, third: e.target.value })}
              style={{ width: "120px", padding: "0.5rem", border: "1px solid #f59e0b", borderRadius: "0.25rem", textAlign: "center", fontSize: "1rem" }} 
            /> field.
          </p>
          <button
            onClick={() => {
              if (spagAnswers.first.toLowerCase() === "brave" && spagAnswers.second.toLowerCase() === "quietly" && spagAnswers.third.toLowerCase() === "empty") {
                setSpagCorrect(true);
                setSpagChecked(true);
                setXp(xp + 10);
              } else {
                setSpagCorrect(false);
                setSpagChecked(true);
              }
            }}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.background = "#d97706"}
            onMouseLeave={(e) => e.target.style.background = "#f59e0b"}
          >
            Check Answer
          </button>
          {spagChecked && spagCorrect && (
            <div style={{ marginTop: "1rem", padding: "1rem", background: "#dcfce7", border: "2px solid #16a34a", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#16a34a" }}>
                ✓ Correct! Well done!
              </p>
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", fontStyle: "italic", color: "#16a34a" }}>
                You've earned 10 XP.
              </p>
            </div>
          )}
          {spagChecked && !spagCorrect && (
            <div style={{ marginTop: "1rem", padding: "1rem", background: "#fee2e2", border: "2px solid #dc2626", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#dc2626" }}>
                Good try, check your answers and try again.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#dcfce7",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>🔍 Explore: Starter</h2>
        <div style={{ padding: "1.5rem", background: "#ecfdf5", border: "2px solid #16a34a", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ marginTop: 0, color: "#166534" }}>What is Historical Fiction?</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#166534", fontWeight: "500" }}>
                📖 A story set in the <strong>past</strong>, often during a <strong>real historical period or event.</strong>
              </p>
            </div>
            <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#166534", fontWeight: "500" }}>
                ✍️ Combines <strong>real facts</strong> with <strong>imagined characters, dialogue, and scenes.</strong>
              </p>
            </div>
            <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#166534", fontWeight: "500" }}>
                🎭 Helps readers <strong>experience history</strong> through <strong>storytelling.</strong>
              </p>
            </div>
          </div>
        </div>
        <div style={{ padding: "1.5rem", background: "#fef9e7", border: "2px solid #d4af37", borderRadius: "0.5rem" }}>
          <h3 style={{ marginTop: 0, color: "#78350f" }}>How does an author make the past feel real while still telling a story?</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "#fffbeb", border: "1px solid #fef08a", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#78350f", fontWeight: "500" }}>
                🎨 <mark style={{ backgroundColor: "#fef08a", padding: "0.2rem 0.4rem", borderRadius: "0.25rem" }}>Authentic Detail</mark> – clothing, customs, language, and settings that feel true to the time.
              </p>
            </div>
            <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#166534", fontWeight: "500" }}>
                🌅 <mark style={{ backgroundColor: "#86efac", padding: "0.2rem 0.4rem", borderRadius: "0.25rem" }}>Vivid Atmosphere</mark> – sensory descriptions that make the past come alive.
              </p>
            </div>
            <div style={{ padding: "1rem", background: "#fce7f3", border: "1px solid #f472b6", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#831843", fontWeight: "500" }}>
                👥 <mark style={{ backgroundColor: "#f472b6", padding: "0.2rem 0.4rem", borderRadius: "0.25rem" }}>Believable Characterisation</mark> – people who act, think, and speak in ways suited to their era.
              </p>
            </div>
            <div style={{ padding: "1rem", background: "#cffafe", border: "1px solid #67e8f9", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, color: "#164e63", fontWeight: "500" }}>
                📚 <mark style={{ backgroundColor: "#67e8f9", padding: "0.2rem 0.4rem", borderRadius: "0.25rem" }}>Real Historical Context</mark> – based on real events or figures, such as Henry VIII.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e5e7eb",
          background: "#d1fae5",
          marginBottom: "1rem"
        }}
      >
        <h2 style={{ marginTop: 0 }}>🔍 Explore: Key Terms</h2>
        <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "#666", marginBottom: "1rem", marginTop: "-0.5rem" }}>
          LEVEL 2
        </p>
        <div style={{ padding: "1rem", backgroundColor: "#ecfdf5", borderLeft: "4px solid #10b981", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
          <p style={{ marginBottom: "0.75rem", color: "#166534", fontWeight: "bold" }}>📚 Key Terms Examples - Remembrance Day Edition:</p>
          <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.95rem", color: "#0c4a6e" }}>
            <p style={{ margin: 0 }}><strong>Setting:</strong> A muddy trench in Flanders, 1917</p>
            <p style={{ margin: 0 }}><strong>Imagery:</strong> "Grey mist hung like cobwebs over the field."</p>
            <p style={{ margin: 0 }}><strong>Mood:</strong> Tense, ominous, reflective</p>
            <p style={{ margin: 0 }}><strong>Connotation:</strong> The word "silence" in a war field means more than quietness — fear, loss</p>
            <p style={{ margin: 0 }}><strong>Figurative Language:</strong> "The bombs screamed overhead."</p>
          </div>
        </div>
        <p style={{ fontSize: "1rem", color: "#166534", marginBottom: "1.5rem" }}>
          <strong>Match the terms with their definitions by dragging and dropping:</strong>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Left side - Terms */}
          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                draggable
                onDragStart={() => setDraggedTerm("setting")}
                style={{
                  padding: "1rem",
                  background: "#e0f2fe",
                  border: "2px solid #0ea5e9",
                  borderRadius: "0.5rem",
                  cursor: "grab",
                  fontWeight: "500",
                  color: "#0c4a6e",
                  width: "100%",
                  opacity: keyTermMatches.setting ? 0.5 : 1,
                  transition: "opacity 0.2s ease"
                }}
              >
                📖 Setting
              </div>
            </div>
            <div
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                draggable
                onDragStart={() => setDraggedTerm("imagery")}
                style={{
                  padding: "1rem",
                  background: "#e0f2fe",
                  border: "2px solid #0ea5e9",
                  borderRadius: "0.5rem",
                  cursor: "grab",
                  fontWeight: "500",
                  color: "#0c4a6e",
                  width: "100%",
                  opacity: keyTermMatches.imagery ? 0.5 : 1,
                  transition: "opacity 0.2s ease"
                }}
              >
                🎨 Imagery
              </div>
            </div>
            <div
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                draggable
                onDragStart={() => setDraggedTerm("mood")}
                style={{
                  padding: "1rem",
                  background: "#e0f2fe",
                  border: "2px solid #0ea5e9",
                  borderRadius: "0.5rem",
                  cursor: "grab",
                  fontWeight: "500",
                  color: "#0c4a6e",
                  width: "100%",
                  opacity: keyTermMatches.mood ? 0.5 : 1,
                  transition: "opacity 0.2s ease"
                }}
              >
                💭 Mood
              </div>
            </div>
            <div
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                draggable
                onDragStart={() => setDraggedTerm("connotation")}
                style={{
                  padding: "1rem",
                  background: "#e0f2fe",
                  border: "2px solid #0ea5e9",
                  borderRadius: "0.5rem",
                  cursor: "grab",
                  fontWeight: "500",
                  color: "#0c4a6e",
                  width: "100%",
                  opacity: keyTermMatches.connotation ? 0.5 : 1,
                  transition: "opacity 0.2s ease"
                }}
              >
                📝 Connotation
              </div>
            </div>
            <div
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div
                draggable
                onDragStart={() => setDraggedTerm("figurative")}
                style={{
                  padding: "1rem",
                  background: "#e0f2fe",
                  border: "2px solid #0ea5e9",
                  borderRadius: "0.5rem",
                  cursor: "grab",
                  fontWeight: "500",
                  color: "#0c4a6e",
                  width: "100%",
                  opacity: keyTermMatches.figurative ? 0.5 : 1,
                  transition: "opacity 0.2s ease"
                }}
              >
                ✨ Figurative Language
              </div>
            </div>
          </div>

          {/* Right side - Definition slots */}
          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setKeyTermMatches({ ...keyTermMatches, mood: draggedTerm })}
              style={{
                padding: "1rem",
                background: keyTermMatches.mood ? "#f0fdf4" : "#fff5f5",
                border: keyTermMatches.mood ? "2px solid #16a34a" : "2px dashed #dc2626",
                borderRadius: "0.5rem",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#0c4a6e",
                fontSize: "0.95rem"
              }}
            >
              {keyTermMatches.mood && <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#166534" }}>{keyTermMatches.mood}</p>}
              <p style={{ margin: 0 }}>The atmosphere or emotional feeling created</p>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setKeyTermMatches({ ...keyTermMatches, figurative: draggedTerm })}
              style={{
                padding: "1rem",
                background: keyTermMatches.figurative ? "#f0fdf4" : "#fff5f5",
                border: keyTermMatches.figurative ? "2px solid #16a34a" : "2px dashed #dc2626",
                borderRadius: "0.5rem",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#0c4a6e",
                fontSize: "0.95rem"
              }}
            >
              {keyTermMatches.figurative && <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#166534" }}>{keyTermMatches.figurative}</p>}
              <p style={{ margin: 0 }}>Language that uses expressions with a meaning different from the literal</p>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setKeyTermMatches({ ...keyTermMatches, setting: draggedTerm })}
              style={{
                padding: "1rem",
                background: keyTermMatches.setting ? "#f0fdf4" : "#fff5f5",
                border: keyTermMatches.setting ? "2px solid #16a34a" : "2px dashed #dc2626",
                borderRadius: "0.5rem",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#0c4a6e",
                fontSize: "0.95rem"
              }}
            >
              {keyTermMatches.setting && <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#166534" }}>{keyTermMatches.setting}</p>}
              <p style={{ margin: 0 }}>The place or type of surroundings where something happens</p>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setKeyTermMatches({ ...keyTermMatches, connotation: draggedTerm })}
              style={{
                padding: "1rem",
                background: keyTermMatches.connotation ? "#f0fdf4" : "#fff5f5",
                border: keyTermMatches.connotation ? "2px solid #16a34a" : "2px dashed #dc2626",
                borderRadius: "0.5rem",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#0c4a6e",
                fontSize: "0.95rem"
              }}
            >
              {keyTermMatches.connotation && <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#166534" }}>{keyTermMatches.connotation}</p>}
              <p style={{ margin: 0 }}>The idea or feeling a word suggests beyond its literal meaning</p>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setKeyTermMatches({ ...keyTermMatches, imagery: draggedTerm })}
              style={{
                padding: "1rem",
                background: keyTermMatches.imagery ? "#f0fdf4" : "#fff5f5",
                border: keyTermMatches.imagery ? "2px solid #16a34a" : "2px dashed #dc2626",
                borderRadius: "0.5rem",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#0c4a6e",
                fontSize: "0.95rem"
              }}
            >
              {keyTermMatches.imagery && <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#166534" }}>{keyTermMatches.imagery}</p>}
              <p style={{ margin: 0 }}>Visually descriptive or figurative language</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            const allCorrect = keyTermMatches.setting === "setting" && keyTermMatches.imagery === "imagery" && keyTermMatches.mood === "mood" && keyTermMatches.connotation === "connotation" && keyTermMatches.figurative === "figurative";
            setKeyTermsCorrect(allCorrect);
            setKeyTermsChecked(true);
          }}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#0ea5e9",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "background 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.background = "#0284c7"}
          onMouseLeave={(e) => e.target.style.background = "#0ea5e9"}
        >
          Check Answer
        </button>
        {keyTermsChecked && keyTermsCorrect && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#dcfce7", border: "2px solid #16a34a", borderRadius: "0.5rem" }}>
            <p style={{ margin: "0", fontSize: "1.1rem", fontWeight: "bold", color: "#16a34a" }}>
              ✓ Correct! All matches are right!
            </p>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", fontStyle: "italic", color: "#16a34a" }}>
              You've earned 15 XP!
            </p>
          </div>
        )}
        {keyTermsChecked && !keyTermsCorrect && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#fee2e2", border: "2px solid #dc2626", borderRadius: "0.5rem" }}>
            <p style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "bold", color: "#dc2626" }}>
              Some matches need correction:
            </p>
            <div style={{ display: "grid", gap: "0.5rem", fontSize: "0.95rem", color: "#991b1b" }}>
              {keyTermMatches.setting !== "setting" && <p style={{ margin: 0 }}>❌ Setting match is incorrect</p>}
              {keyTermMatches.imagery !== "imagery" && <p style={{ margin: 0 }}>❌ Imagery match is incorrect</p>}
              {keyTermMatches.mood !== "mood" && <p style={{ margin: 0 }}>❌ Mood match is incorrect</p>}
              {keyTermMatches.connotation !== "connotation" && <p style={{ margin: 0 }}>❌ Connotation match is incorrect</p>}
              {keyTermMatches.figurative !== "figurative" && <p style={{ margin: 0 }}>❌ Figurative Language match is incorrect</p>}
            </div>
            <button
              onClick={() => {
                setKeyTermMatches({ setting: "", imagery: "", mood: "", connotation: "", figurative: "" });
                setKeyTermsChecked(false);
                setKeyTermsCorrect(false);
              }}
              style={{
                marginTop: "1rem",
                padding: "0.65rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#dc2626",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.95rem",
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.background = "#b91c1c"}
              onMouseLeave={(e) => e.target.style.background = "#dc2626"}
            >
              Try Again
            </button>
          </div>
        )}
      </section>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
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
          ← Previous
        </button>
        <button
          onClick={() => navigate("/n6")}
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
          Next Lesson →
        </button>
      </div>
        </>
      )}
    </div>
  );
};

export default N5;
