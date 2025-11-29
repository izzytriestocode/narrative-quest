import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import celebrationImg from "./assets/celebration.png";
import bodiesBookImg from "./assets/bodies-book.jpg";

const BringUpTheBodies = () => {
  const navigate = useNavigate();
  const level5Ref = useRef(null);
  const level6Ref = useRef(null);
  const exploreStarterRef = useRef(null);
  const beforeYouLeaveRef = useRef(null);
  const [xp, setXp] = useState(0);
  const [scheduleViewed, setScheduleViewed] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentDate, setStudentDate] = useState("");
  const [completedSteps, setCompletedSteps] = useState({
    levelOne: false,
    spag: false,
    keyTerms: false,
    exploreStarter: false,
    characterAnalysis: false,
    annotating: false,
    writing: false,
    zorOut: false
  });
  const [studentResponses, setStudentResponses] = useState({});
  // WritingTask state is now local to WritingTask component to prevent parent re-renders

  const markComplete = (stepKey, points, category, data) => {
    if (!completedSteps[stepKey]) {
      setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
      setXp((prev) => prev + points);
      // Store the response data
      if (data) {
        setStudentResponses((prev) => ({ ...prev, [stepKey]: data }));
      }
    }
  };

  useEffect(() => {
    if (completedSteps.keyTerms && exploreStarterRef.current && !completedSteps.exploreStarter) {
      setTimeout(() => {
        exploreStarterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [completedSteps.keyTerms, completedSteps.exploreStarter]);

  useEffect(() => {
    if (completedSteps.characterAnalysis && level5Ref.current && !completedSteps.writing) {
      setTimeout(() => {
        level5Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [completedSteps.characterAnalysis, completedSteps.writing]);

  // Store scroll position to prevent unwanted jumps during component updates
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate complete lesson PDF at main level so ZoRCheckOut can access it
  const generateCompleteLessonPDF = () => {
    // Create a printable HTML version that matches the web app styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bring Up the Bodies - Complete Lesson</title>
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
          .quote {
            font-style: italic;
            font-weight: bold;
            padding: 1rem;
            background-color: #f0f9ff;
            border-left: 4px solid #0369a1;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }
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
          <h2>Autumn II - Historical Fiction</h2>
          <h1 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Bring up the Bodies – Character & Language Analysis</h1>
          <p class="subheader">Explore character development and figurative language in Hilary Mantel's historical novel.</p>

          <div class="info-box">
            <h3 style="margin: 0 0 0.5rem 0; color: #0369a1; font-size: 1.1rem;">Learning Objective</h3>
            <p style="margin: 0; font-size: 1rem;">To extract strong evidence to support arguments.</p>
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

          <div class="level-box level-blue">
            <div class="level-title">Level 1 – Lesson Objectives</div>
            <p style="margin-bottom: 1rem; color: #4b5563;">By the end of this lesson, you will be able to:</p>
            <div style="display: grid; gap: 0.75rem;">
              <div style="padding: 0.75rem 1rem; background: #dcfce7; border-left: 4px solid #16a34a; border-radius: 0.5rem; font-weight: 500;">
                <span style="display: inline-block; margin-right: 0.5rem; font-weight: bold;">✓</span>
                I can identify descriptive language and figurative techniques.
              </div>
              <div style="padding: 0.75rem 1rem; background: #dcfce7; border-left: 4px solid #16a34a; border-radius: 0.5rem; font-weight: 500;">
                <span style="display: inline-block; margin-right: 0.5rem; font-weight: bold;">✓</span>
                I can explain how language builds character and mood.
              </div>
              <div style="padding: 0.75rem 1rem; background: #dcfce7; border-left: 4px solid #16a34a; border-radius: 0.5rem; font-weight: 500;">
                <span style="display: inline-block; margin-right: 0.5rem; font-weight: bold;">✓</span>
                I can connect characterisation to Tudor history and context.
              </div>
            </div>
          </div>

          ${studentResponses.spag ? `
          <div class="level-box level-yellow">
            <div class="level-title">🎯 Engage: Hook (Level 2)</div>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Consider this striking sentence from the novel:</p>
            <p class="quote">"His children are falling from the sky."</p>
            <div class="response-box">
              <strong>Is it literal or metaphorical?</strong><br>
              ${studentResponses.spag.literalOrMeta === "Metaphorical" ? '<span class="correct">✓ Metaphorical</span>' : studentResponses.spag.literalOrMeta || "Not answered"}
            </div>
            <div class="response-box">
              <strong>What could this mean?</strong><br>
              ${studentResponses.spag.meaning || "[No response]"}
            </div>
            <div class="response-box">
              <strong>What might it suggest about the speaker's emotions or relationships?</strong><br>
              ${studentResponses.spag.emotion || "[No response]"}
            </div>
          </div>
          ` : ''}

          ${studentResponses.keyTerms ? `
          <div class="level-box level-green">
            <div class="level-title">🎯 Engage: SPaG Activity (Level 3)</div>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Read each sentence and identify whether it's a simile or metaphor. Then match each one to what it tells us about Henry VIII.</p>
            ${studentResponses.keyTerms.sentences.map((item, idx) => {
              const sentenceTexts = ["Henry's anger burned like fire in the forge.", "The crown weighed like iron upon his head.", "The court was a glittering cage filled with ambition."];
              return '<div class="response-box" style="margin-bottom: 1.5rem;"><strong>Sentence ' + (idx + 1) + ':</strong> "' + sentenceTexts[idx] + '"<br><br><strong>Type Identified:</strong> ' + (item.selectedType || "Not answered") + ' ' + (item.correct ? '<span class="correct">✓ Correct!</span>' : '<span style="color: #ef4444;">✗</span>') + '<br><strong>What it shows about Henry:</strong> ' + (item.selectedCharacteristics && item.selectedCharacteristics.length > 0 ? item.selectedCharacteristics.join(", ") : "[Not selected]") + '</div>';
            }).join('')}
          </div>
          ` : ''}

          ${studentResponses.exploreStarter ? `
          <div class="level-box level-purple">
            <div class="level-title">📚 Explore: Starter</div>
            <p style="margin-bottom: 1rem;"><strong>What is Historical Fiction?</strong></p>
            <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
              <li style="margin-bottom: 0.5rem;">A story set in the past, often during a real historical period or event.</li>
              <li style="margin-bottom: 0.5rem;">Combines real facts with imagined characters, dialogue, and scenes.</li>
              <li>Helps readers experience history through storytelling.</li>
            </ul>
            <p style="margin-bottom: 1rem;"><strong>How does an author make the past feel real while still telling a story?</strong></p>
            <ul style="padding-left: 1.5rem;">
              <li style="margin-bottom: 0.5rem;"><strong>Authentic Detail:</strong> clothing, customs, language, and settings that feel true to the time.</li>
              <li style="margin-bottom: 0.5rem;"><strong>Vivid Atmosphere:</strong> sensory descriptions that make the past come alive.</li>
              <li style="margin-bottom: 0.5rem;"><strong>Believable Characterisation:</strong> people who act, think, and speak in ways suited to their era.</li>
              <li><strong>Real Historical Context:</strong> based on real events or figures, such as Henry VIII.</li>
            </ul>
          </div>
          ` : ''}

          ${studentResponses.characterAnalysis ? `
          <div class="level-box level-cyan">
            <div class="level-title">📚 Explore: Key Terms (Level 4)</div>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Match each literary term to its definition.</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 0.75rem; text-align: left; border: 1px solid #d1d5db; font-weight: bold;">Term</th>
                <th style="padding: 0.75rem; text-align: left; border: 1px solid #d1d5db; font-weight: bold;">Definition</th>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold; background: #fef3c7;">Setting</td>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db;">The place or type of surroundings where something happens</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold; background: #dcfce7;">Imagery</td>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Visually descriptive or figurative language</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold; background: #f3e8ff;">Mood</td>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db;">The atmosphere or emotional feeling created</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold; background: #fed7aa;">Connotation</td>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db;">The idea or feeling a word suggests beyond its literal meaning</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db; font-weight: bold; background: #fce7f3;">Figurative Language</td>
                <td style="padding: 0.75rem; border: 1px solid #d1d5db;">Language that uses expressions with a meaning different from the literal</td>
              </tr>
            </table>
          </div>
          ` : ''}

          ${studentResponses.annotating ? `
          <div class="level-box level-pink">
            <div class="level-title">📝 Explain: Bring Up the Bodies (Level 5)</div>
            <p style="margin-bottom: 1rem;">Student analyzed figurative language techniques in selected quotes from the novel.</p>
            
            <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: #7c2d12; font-size: 1rem;">👨 Character Traits</h4>
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #fffbeb; border-left: 4px solid #fef3c7; border-radius: 0.5rem;">
              <p style="margin: 0 0 0.5rem 0; color: #7c2d12; font-size: 0.95rem; font-style: italic;"><strong>Example:</strong></p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "Though the day is over, Henry seems disinclined to go indoors."</p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> This shows restlessness and dominance — Henry doesn't follow others' pace or customs.</p>
            </div>
            ` + 
            (studentResponses.annotating.characterTraits && (studentResponses.annotating.characterTraits.quote || studentResponses.annotating.characterTraits.annotation) ? 
              '<div style="margin-bottom: 1.5rem; padding: 1rem; background: #fffbeb; border-left: 4px solid #fef3c7; border-radius: 0.5rem;"><p style="margin: 0 0 0.5rem 0; color: #7c2d12; font-size: 0.95rem; font-style: italic;"><strong>Student Response:</strong></p>' + 
              (studentResponses.annotating.characterTraits.quote ? '<p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "' + studentResponses.annotating.characterTraits.quote + '"</p>' : '') + 
              (studentResponses.annotating.characterTraits.annotation ? '<p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> ' + studentResponses.annotating.characterTraits.annotation + '</p>' : '') + 
              '</div>' 
            : '') + 
            `
            <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: #166534; font-size: 1rem;">💚 Motivations &amp; Relationships</h4>
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f0fdf4; border-left: 4px solid #dcfce7; border-radius: 0.5rem;">
              <p style="margin: 0 0 0.5rem 0; color: #166534; font-size: 0.95rem; font-style: italic;"><strong>Example:</strong></p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "A broad, brick-red streak of sunburn."</p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> Imagery — Mantel uses physical detail to suggest Henry's earthy, human side, not just royal formality.</p>
            </div>
            ` + 
            (studentResponses.annotating.motivations && (studentResponses.annotating.motivations.quote || studentResponses.annotating.motivations.annotation) ? 
              '<div style="margin-bottom: 1.5rem; padding: 1rem; background: #f0fdf4; border-left: 4px solid #dcfce7; border-radius: 0.5rem;"><p style="margin: 0 0 0.5rem 0; color: #166534; font-size: 0.95rem; font-style: italic;"><strong>Student Response:</strong></p>' + 
              (studentResponses.annotating.motivations.quote ? '<p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "' + studentResponses.annotating.motivations.quote + '"</p>' : '') + 
              (studentResponses.annotating.motivations.annotation ? '<p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> ' + studentResponses.annotating.motivations.annotation + '</p>' : '') + 
              '</div>' 
            : '') + 
            `
            <h4 style="margin-top: 1.5rem; margin-bottom: 1rem; color: #6b21a8; font-size: 1rem;">✍️ Figurative Language</h4>
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #faf5ff; border-left: 4px solid #f3e8ff; border-radius: 0.5rem;">
              <p style="margin: 0 0 0.5rem 0; color: #6b21a8; font-size: 0.95rem; font-style: italic;"><strong>Example (Sensory detail):</strong></p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "Inhaling horse sweat."</p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> This ties Henry to the physical, masculine world of hunting and labour.</p>
            </div>
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #faf5ff; border-left: 4px solid #f3e8ff; border-radius: 0.5rem;">
              <p style="margin: 0 0 0.5rem 0; color: #6b21a8; font-size: 0.95rem; font-style: italic;"><strong>Example (Metaphor and Irony):</strong></p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "'Cromwell has the skin of a lily'… 'The only particular in which he resembles that or any other blossom.'"</p>
              <p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> Henry's teasing tone shows familiarity and subtle power; Cromwell is both trusted and mocked.</p>
            </div>
            ` + 
            (studentResponses.annotating.figurativeLanguage && (studentResponses.annotating.figurativeLanguage.quote || studentResponses.annotating.figurativeLanguage.annotation) ? 
              '<div style="margin-bottom: 1.5rem; padding: 1rem; background: #faf5ff; border-left: 4px solid #f3e8ff; border-radius: 0.5rem;"><p style="margin: 0 0 0.5rem 0; color: #6b21a8; font-size: 0.95rem; font-style: italic;"><strong>Student Response:</strong></p>' + 
              (studentResponses.annotating.figurativeLanguage.quote ? '<p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Quote:</strong> "' + studentResponses.annotating.figurativeLanguage.quote + '"</p>' : '') + 
              (studentResponses.annotating.figurativeLanguage.annotation ? '<p style="margin: 0.25rem 0; color: #2c3e50; font-size: 0.9rem;"><strong>Annotation:</strong> ' + studentResponses.annotating.figurativeLanguage.annotation + '</p>' : '') + 
              '</div>' 
            : '') + 
            `
          </div>
          ` : ''}

          ${studentResponses.writing ? `
          <div class="level-box level-red">
            <div class="level-title">📝 Level 6 – Character Paragraph</div>
            <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Step 1 - Descriptive Phrases:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 0.75rem; text-align: left; border: 1px solid #d1d5db; font-weight: bold;">Quote from the text</th>
                <th style="padding: 0.75rem; text-align: left; border: 1px solid #d1d5db; font-weight: bold;">What it shows</th>
              </tr>
              ${[
                [studentResponses.writing.phrase1 || "[Empty]", studentResponses.writing.type1 || ""],
                [studentResponses.writing.phrase2 || "[Empty]", studentResponses.writing.type2 || ""],
                [studentResponses.writing.phrase3 || "[Empty]", studentResponses.writing.type3 || ""]
              ].map(row => `
                <tr>
                  <td style="padding: 0.75rem; border: 1px solid #d1d5db;">${row[0]}</td>
                  <td style="padding: 0.75rem; border: 1px solid #d1d5db;">${row[1]}</td>
                </tr>
              `).join('')}
            </table>

            <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Step 2 - Character Analysis:</h3>
            <div class="response-box">
              <strong>Selected Character:</strong> ${studentResponses.writing.character || "[Not selected]"}
            </div>

            <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Step 3 - Fill-in-the-Blanks Analysis Paragraph:</h3>
            <div class="response-box" style="border-left-color: #0369a1;">
              ${`In Bring Up the Bodies, Mantel uses "${studentResponses.writing.ans1 || '[Empty]'}" and "${studentResponses.writing.ans2 || '[Empty]'}" to describe "${studentResponses.writing.ans3 || '[Empty]'}". The writer shows this through the phrase "${studentResponses.writing.ans4 || '[Empty]'}". This "${studentResponses.writing.ans5 || '[Empty]'}" helps the "${studentResponses.writing.ans6 || '[Empty]'}" imagine life in "${studentResponses.writing.ans7 || '[Empty]'}". It also shows that the character has "${studentResponses.writing.ans8 || '[Empty]'}" and is important in the story.`}
            </div>
            <p style="color: #16a34a; font-weight: bold; margin-top: 1rem;">✓ Great work! You've earned 25 XP.</p>
          </div>
          ` : ''}

          ${studentResponses.zorIn ? `
          <div class="level-box level-blue">
            <div class="level-title">✨ ZoR Check-In</div>
            <p style="margin-bottom: 1rem;">How are you feeling at the start of this lesson?</p>
            <div class="response-box">
              <strong>Zone Selected:</strong> ${studentResponses.zorIn.zone || "[Not selected]"}
            </div>
          </div>
          ` : ''}

          ${studentResponses.zorOut ? `
          <div class="level-box level-purple">
            <div class="level-title">🎉 ZoR Check-Out</div>
            <p style="margin-bottom: 1rem;">How are you feeling after completing this lesson?</p>
            <div class="response-box">
              <strong>Zone Selected:</strong> ${studentResponses.zorOut.zone || "[Not selected]"}
            </div>
          </div>
          ` : ''}

          <div class="level-box" style="background: #f5f3ff; border: 1px solid #d8b4fe;">
            <div class="level-title">🌟 Your Learning Journey</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
              <div style="padding: 1rem; background: white; border-radius: 0.5rem; border-left: 4px solid #0369a1;">
                <h4 style="margin: 0 0 0.5rem 0; color: #0369a1; font-size: 1rem;">Levels Completed</h4>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem;">
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.levelOne ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.levelOne ? '✓' : '○'}</span>Level 1 – Lesson Objectives</li>
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.spag ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.spag ? '✓' : '○'}</span>Level 2 – Engage: Hook</li>
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.keyTerms ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.keyTerms ? '✓' : '○'}</span>Level 3 – Engage: SPaG</li>
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.exploreStarter ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.exploreStarter ? '✓' : '○'}</span>Level 4 – Explore: Key Terms</li>
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.characterAnalysis ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.characterAnalysis ? '✓' : '○'}</span>Level 5 – Explain: Analysis</li>
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.annotating ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.annotating ? '✓' : '○'}</span>Level 6 – Elaborate: Annotation</li>
                  <li style="margin-bottom: 0.35rem; color: ${completedSteps.writing ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.writing ? '✓' : '○'}</span>Level 7 – Evaluate: Writing Task</li>
                  <li style="color: ${completedSteps.zorOut ? '#16a34a' : '#9ca3af'};"><span style="margin-right: 0.35rem;">${completedSteps.zorOut ? '✓' : '○'}</span>Level 8 – Check-Out</li>
                </ul>
              </div>
              <div style="padding: 1rem; background: white; border-radius: 0.5rem; border-left: 4px solid #a855f7;">
                <h4 style="margin: 0 0 0.5rem 0; color: #a855f7; font-size: 1rem;">Reflection</h4>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.95rem; line-height: 1.5;">
                  <strong>Key Achievements:</strong><br>
                  Throughout this lesson, you developed critical reading and analytical writing skills. You explored how historical fiction combines authentic detail with imaginative storytelling, and learned to identify and explain figurative language techniques.
                </p>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
                  <strong>Next Steps:</strong><br>
                  Apply these techniques to your own creative writing and continue analysing texts with a critical eye.
                </p>
              </div>
            </div>
          </div>

          <div class="footer">
            <p><strong>Lesson Complete!</strong></p>
            <p>Total XP Earned: ${xp} | Submitted: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-')}</p>
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

  const canAccess = useMemo(() => ({
    levelOne: true,
    spag: completedSteps.levelOne,
    keyTerms: completedSteps.spag,
    exploreStarter: completedSteps.keyTerms,
    characterAnalysis: completedSteps.exploreStarter,
    annotating: completedSteps.characterAnalysis,
    writing: completedSteps.annotating,
    zorOut: completedSteps.writing
  }), [completedSteps]);

  const LevelLockWrapper = ({ title, unlocked, children, bgColor = "#eff6ff", ref }) => {
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

  const IntroductionSchedule = ({ scheduleViewed, onScheduleView }) => {
    const [open, setOpen] = useState(null);

    const toggle = (id) => {
      setOpen(open === id ? null : id);
    };

    if (!scheduleViewed) {
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
          <h2 style={{ marginTop: 0, color: "#1e40af" }}>Your Learning Journey</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div style={{ padding: "0.75rem", background: "#fef3c7", borderRadius: "0.5rem", borderLeft: "4px solid #f59e0b", fontWeight: "500" }}>
              <strong>🎯 Engage:</strong> Sentence Warm-up
            </div>
            <div style={{ padding: "0.75rem", background: "#fef3c7", borderRadius: "0.5rem", borderLeft: "4px solid #f59e0b", fontWeight: "500" }}>
              <strong>🎣 Hook:</strong> Opening the Text
            </div>
            <div style={{ padding: "0.75rem", background: "#dcfce7", borderRadius: "0.5rem", borderLeft: "4px solid #16a34a", fontWeight: "500" }}>
              <strong>🔍 Explore:</strong> Key Terms
            </div>
            <div style={{ padding: "0.75rem", background: "#f3e8ff", borderRadius: "0.5rem", borderLeft: "4px solid #a855f7", fontWeight: "500" }}>
              <strong>💡 Explain:</strong> Character Analysis
            </div>
            <div style={{ padding: "0.75rem", background: "#fce7f3", borderRadius: "0.5rem", borderLeft: "4px solid #ec4899", fontWeight: "500" }}>
              <strong>📝 Elaborate:</strong> Annotating Figurative Language
            </div>
            <div style={{ padding: "0.75rem", background: "#fee2e2", borderRadius: "0.5rem", borderLeft: "4px solid #dc2626", fontWeight: "500" }}>
              <strong>✅ Evaluate:</strong> Character Paragraph
            </div>
          </div>
          <button
            onClick={onScheduleView}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "#0369a1",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Let's begin! ↓
          </button>
        </section>
      );
    }

    return null;
  };

  const LevelOne = ({ onComplete, isCompleted }) => {
    const [step, setStep] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(isCompleted);

    const objectives = [
      "I can identify descriptive language and figurative techniques.",
      "I can explain how language builds character and mood.",
      "I can connect characterisation to Tudor history and context."
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
        <h2 style={{ marginTop: 0 }}>Level 1 – Lesson Objectives</h2>
        <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
          By the end of this lesson, you will be able to:
        </p>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {objectives.map((objective, index) => (
            <div
              key={index}
              style={{
                padding: "0.75rem 1rem",
                background: (step > index || hasCompleted) ? "#dcfce7" : "#fef3c7",
                borderLeft: "4px solid",
                borderLeftColor: (step > index || hasCompleted) ? "#16a34a" : "#f59e0b",
                borderRadius: "0.5rem",
                transition: "all 0.3s ease",
                fontWeight: "500"
              }}
            >
              <span style={{ display: "inline-block", marginRight: "0.5rem", fontWeight: "bold" }}>
                {(step > index || hasCompleted) ? "✓" : `${index + 1}.`}
              </span>
              {objective}
            </div>
          ))}
        </div>
        <button
          onClick={revealNext}
          disabled={step >= objectives.length}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: step >= objectives.length ? "#d1d5db" : "#0369a1",
            color: "white",
            cursor: step >= objectives.length ? "default" : "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          {step >= objectives.length ? "Let's begin! ✓" : "Let's begin!"}
        </button>
      </section>
    );
  };

  const Engage = () => {
    const [response, setResponse] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleComplete = () => {
      if (response.trim()) {
        setCompleted(true);
        markComplete("engage", 5, "engage", { response });
      } else {
        alert("Please write a response.");
      }
    };

    return (
      <>
        <h2 style={{ marginTop: 0 }}>Level 2 – 🎯 Engage: Sentence Warm-up</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          What do you notice about this sentence? Describe the language and any interesting techniques used.
        </p>
        <p style={{ fontSize: "1.3rem", fontStyle: "italic", fontWeight: "bold", marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f0f9ff", borderLeft: "4px solid #0369a1", borderRadius: "0.5rem" }}>
          "His children are falling from the sky."
        </p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="What do you notice about this sentence?"
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "2px solid #0369a1",
            fontSize: "1rem",
            boxSizing: "border-box",
            marginBottom: "1rem"
          }}
        />
        <button
          onClick={handleComplete}
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
          Submit
        </button>
        {completed && (
          <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
            ✓ Great observation! You've earned 5 XP.
          </p>
        )}
      </>
    );
  };

  const Hook = () => {
    const [meaningResponse, setMeaningResponse] = useState("");
    const [literalOrMeta, setLiteralOrMeta] = useState("");
    const [emotionResponse, setEmotionResponse] = useState("");
    const [completed, setCompleted] = useState(false);
    const hasCalledMarkComplete = useRef(false);

    const handleMetaphorSelect = (selection) => {
      setLiteralOrMeta(selection);
    };

    // Use effect to mark complete after state has been updated
    useEffect(() => {
      if (literalOrMeta === "Metaphorical" && !completed && !hasCalledMarkComplete.current) {
        hasCalledMarkComplete.current = true;
        setCompleted(true);
        markComplete("spag", 10, "spag", {
          meaning: meaningResponse,
          literalOrMeta: literalOrMeta,
          emotion: emotionResponse
        });
      }
    }, [literalOrMeta]);

    return (
      <>
        <h2 style={{ marginTop: 0 }}>🎯 Engage: Hook (Level 2)</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          Consider this striking sentence from the novel:
        </p>
        <p style={{ fontSize: "1.3rem", fontStyle: "italic", fontWeight: "bold", marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f0f9ff", borderLeft: "4px solid #0369a1", borderRadius: "0.5rem" }}>
          "His children are falling from the sky."
        </p>

        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <img
            src={celebrationImg}
            alt="Celebration illustration"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold", display: "block", marginBottom: "0.75rem" }}>
            What could this mean?
          </label>
          <textarea
            value={meaningResponse}
            onChange={(e) => setMeaningResponse(e.target.value)}
            placeholder="Share your thoughts..."
            disabled={completed}
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              boxSizing: "border-box",
              opacity: completed ? 0.6 : 1,
              cursor: completed ? "not-allowed" : "text"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold", display: "block", marginBottom: "0.75rem" }}>
            Is it literal or metaphorical?
          </label>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => handleMetaphorSelect("Literal")}
              disabled={completed}
              style={{
                flex: 1,
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: literalOrMeta === "Literal" ? "2px solid #0369a1" : "1px solid #cbd5e1",
                background: literalOrMeta === "Literal" ? "#e0f2fe" : "white",
                color: literalOrMeta === "Literal" ? "#0369a1" : "#2c3e50",
                cursor: completed ? "not-allowed" : "pointer",
                fontWeight: literalOrMeta === "Literal" ? "bold" : "normal",
                fontSize: "1rem",
                opacity: completed ? 0.6 : 1
              }}
            >
              Literal
            </button>
            <button
              onClick={() => handleMetaphorSelect("Metaphorical")}
              disabled={completed}
              style={{
                flex: 1,
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: literalOrMeta === "Metaphorical" ? "2px solid #0369a1" : "1px solid #cbd5e1",
                background: literalOrMeta === "Metaphorical" ? "#e0f2fe" : "white",
                color: literalOrMeta === "Metaphorical" ? "#0369a1" : "#2c3e50",
                cursor: completed ? "not-allowed" : "pointer",
                fontWeight: literalOrMeta === "Metaphorical" ? "bold" : "normal",
                fontSize: "1rem",
                opacity: completed ? 0.6 : 1
              }}
            >
              Metaphorical
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold", display: "block", marginBottom: "0.75rem" }}>
            What might it suggest about the speaker's emotions or relationships?
          </label>
          <textarea
            value={emotionResponse}
            onChange={(e) => setEmotionResponse(e.target.value)}
            placeholder="Share your thoughts..."
            disabled={completed}
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              boxSizing: "border-box",
              opacity: completed ? 0.6 : 1,
              cursor: completed ? "not-allowed" : "text"
            }}
          />
        </div>

        {completed && (
          <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
            ✓ Great exploration! You've earned 10 XP.
          </p>
        )}

        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderLeft: "4px solid #f59e0b", borderRadius: "0.5rem" }}>
          <p style={{ margin: "0", fontSize: "1rem", color: "#92400e", fontWeight: "500" }}>
            <strong>🔗 Link to Learning:</strong> To explore how Mantel uses literary techniques to create vivid characterisation and atmosphere in Tudor England.
          </p>
        </div>
      </>
    );
  };

  const KeyTermsBTB = React.memo(() => {
    const [showSimileDefinition, setShowSimileDefinition] = useState(false);
    const [showMetaphorDefinition, setShowMetaphorDefinition] = useState(false);
    const [answers, setAnswers] = useState({});
    const [characteristics, setCharacteristics] = useState({});
    const [checkedSentences, setCheckedSentences] = useState({});
    const [sentenceCorrectness, setSentenceCorrectness] = useState({});
    const [completed, setCompleted] = useState(false);
    const hasCalledMarkComplete = useRef(false);

    const sentences = [
      { id: 1, text: "Henry's anger burned like fire in the forge.", correctType: "Simile", question: "What does it show about Henry? (pick two)", options: ["angry", "powerful", "dangerous"], maxOptions: 2, feedback: "Meaning / What It Shows About Henry\n\nShows Henry's anger and power — he can be fierce and uncontrollable." },
      { id: 2, text: "The crown weighed like iron upon his head.", correctType: "Simile", question: "What does it show about Henry?", options: ["tired", "responsible", "proud"], maxOptions: 1, feedback: "Meaning / What It Shows About Henry\n\nShows Henry feels the heavy responsibility of being king — ruling is a burden." },
      { id: 3, text: "The court was a glittering cage filled with ambition.", correctType: "Metaphor", question: "What does this suggest about the court?", options: ["trapped", "greedy", "rich"], maxOptions: 1, feedback: "Meaning / What It Shows About Henry\n\nCompares the court to a cage — beautiful but trapping; shows people were stuck or controlled despite luxury." }
    ];

    // Check if all sentences have been checked
    const allChecked = () => {
      return sentences.every(s => checkedSentences[s.id]);
    };

    // Mark level complete when all sentences are checked
    useEffect(() => {
      if (allChecked() && !completed && !hasCalledMarkComplete.current) {
        hasCalledMarkComplete.current = true;
        setCompleted(true);
        markComplete("keyTerms", 15, "keyTerms", {
          sentences: sentences.map(s => ({
            id: s.id,
            selectedType: answers[s.id],
            selectedCharacteristics: characteristics[s.id],
            correct: sentenceCorrectness[s.id]
          }))
        });
      }
    }, [checkedSentences, completed, answers, characteristics, sentenceCorrectness]);

    const handleOptionClick = (sentenceId, option) => {
      const sentence = sentences.find(s => s.id === sentenceId);
      const currentSelections = characteristics[sentenceId] || [];
      
      if (currentSelections.includes(option)) {
        // Remove if already selected
        setCharacteristics({
          ...characteristics,
          [sentenceId]: currentSelections.filter(o => o !== option)
        });
      } else if (currentSelections.length < sentence.maxOptions) {
        // Add if under max options
        setCharacteristics({
          ...characteristics,
          [sentenceId]: [...currentSelections, option]
        });
      }
    };

    const handleCheckSentence = (sentenceId) => {
      if (answers[sentenceId] && characteristics[sentenceId]?.length > 0) {
        const sentence = sentences.find(s => s.id === sentenceId);
        const isCorrect = answers[sentenceId] === sentence.correctType;
        setCheckedSentences({ ...checkedSentences, [sentenceId]: true });
        setSentenceCorrectness({ ...sentenceCorrectness, [sentenceId]: isCorrect });
      }
    };

    return (
      <>
        <h2 style={{ marginTop: 0 }}>🎯 Engage: SPaG Activity (Level 3)</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          Activity: Read each sentence and tick whether it's a simile or metaphor. Then match each one to what it tells us about Henry VIII.
        </p>

        <div style={{ marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <button
              onClick={() => setShowSimileDefinition(!showSimileDefinition)}
              style={{
                width: "100%",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #0369a1",
                background: showSimileDefinition ? "#e0f2fe" : "white",
                color: "#0369a1",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              Simile - click me to see what it means
            </button>
            {showSimileDefinition && (
              <p style={{ marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#f0f9ff", borderRadius: "0.5rem", color: "#0369a1" }}>
                Compares two things using <u>like</u> or <u>as</u>
              </p>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowMetaphorDefinition(!showMetaphorDefinition)}
              style={{
                width: "100%",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #0369a1",
                background: showMetaphorDefinition ? "#e0f2fe" : "white",
                color: "#0369a1",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              Metaphor - click me to see what it means
            </button>
            {showMetaphorDefinition && (
              <p style={{ marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#f0f9ff", borderRadius: "0.5rem", color: "#0369a1" }}>
                One thing is another thing (no <u>like</u> or <u>as</u>)
              </p>
            )}
          </div>
        </div>

        {sentences.map((sentence) => (
          <div key={sentence.id} id={`sentence-${sentence.id}`} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", backgroundColor: "#f9fafb" }}>
            <p style={{ fontSize: "1.1rem", fontStyle: "italic", marginBottom: "0.75rem" }}>
              "{sentence.text}"
            </p>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="radio"
                  name={`sentence-${sentence.id}`}
                  value="Simile"
                  checked={answers[sentence.id] === "Simile"}
                  onChange={(e) => setAnswers({ ...answers, [sentence.id]: e.target.value })}
                />
                Simile
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="radio"
                  name={`sentence-${sentence.id}`}
                  value="Metaphor"
                  checked={answers[sentence.id] === "Metaphor"}
                  onChange={(e) => setAnswers({ ...answers, [sentence.id]: e.target.value })}
                />
                Metaphor
              </label>
            </div>
            {sentence.question && (
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#2c3e50", marginBottom: "0.75rem" }}>
                  {sentence.question}
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  {sentence.options.map((option) => {
                    const isSelected = (characteristics[sentence.id] || []).includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(sentence.id, option)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          border: isSelected ? "2px solid #0369a1" : "1px solid #cbd5e1",
                          background: isSelected ? "#e0f2fe" : "white",
                          color: isSelected ? "#0369a1" : "#2c3e50",
                          cursor: "pointer",
                          fontWeight: isSelected ? "bold" : "normal",
                          fontSize: "0.95rem"
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <button
              onClick={() => handleCheckSentence(sentence.id)}
              disabled={!answers[sentence.id]}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                background: answers[sentence.id] ? "#0369a1" : "#cbd5e1",
                color: "white",
                cursor: answers[sentence.id] ? "pointer" : "not-allowed",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}
            >
              Check Answer
            </button>
            <div style={{ marginTop: "1rem", padding: checkedSentences[sentence.id] ? "1rem" : "0", backgroundColor: checkedSentences[sentence.id] ? (sentenceCorrectness[sentence.id] ? "#dcfce7" : "#fee2e2") : "transparent", border: checkedSentences[sentence.id] ? `1px solid ${sentenceCorrectness[sentence.id] ? "#86efac" : "#fecaca"}` : "none", borderRadius: "0.5rem", minHeight: checkedSentences[sentence.id] ? "auto" : "300px" }}>
              {checkedSentences[sentence.id] && (
                <>
                  <p style={{ color: sentenceCorrectness[sentence.id] ? "#16a34a" : "#ef4444", fontWeight: "bold", margin: "0 0 0.5rem 0" }}>
                    {sentenceCorrectness[sentence.id] ? "✓ Correct!" : "✗ Try again"}
                  </p>
                  <p style={{ color: sentenceCorrectness[sentence.id] ? "#166534" : "#991b1b", margin: 0 }}>
                    This is a <strong>{sentence.correctType}</strong>
                  </p>
                </>
              )}
            </div>
            {checkedSentences[sentence.id] && sentenceCorrectness[sentence.id] && (
              <div style={{ marginTop: "0.75rem", padding: "1rem", backgroundColor: "#fef3c7", border: "1px solid #fcd34d", borderRadius: "0.5rem" }}>
                <p style={{ whiteSpace: "pre-wrap", color: "#92400e", fontWeight: "bold", margin: 0 }}>
                  {sentence.feedback}
                </p>
              </div>
            )}
          </div>
        ))}

        {completed && (
          <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
            ✓ Great work! You've earned 15 XP.
          </p>
        )}
      </>
    );
  });

  const ExploreStarter = () => {
    const [revealedPoints, setRevealedPoints] = useState(0);
    const [showSecondBox, setShowSecondBox] = useState(false);
    const [secondBoxRead, setSecondBoxRead] = useState(false);
    const [completed, setCompleted] = useState(false);

    const points = [
      "A story set in the past, often during a real historical period or event.",
      "Combines real facts with imagined characters, dialogue, and scenes.",
      "Helps readers experience history through storytelling."
    ];

    const handleReveal = () => {
      if (revealedPoints < points.length) {
        const newRevealed = revealedPoints + 1;
        setRevealedPoints(newRevealed);
      }
    };

    const handleSecondBoxOpen = () => {
      setShowSecondBox(!showSecondBox);
    };

    const markSecondBoxAsRead = () => {
      setSecondBoxRead(true);
      checkCompletion();
    };

    const checkCompletion = () => {
      if (revealedPoints === points.length && secondBoxRead && !completed) {
        setCompleted(true);
        markComplete("exploreStarter", 0, "exploreStarter", {});
      }
    };

    return (
      <>
        <h2 style={{ marginTop: 0 }}>📚 Explore: Starter</h2>
        <button
          onClick={handleReveal}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #0369a1",
            background: revealedPoints > 0 ? "#e0f2fe" : "white",
            color: "#0369a1",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          What is Historical Fiction?
        </button>
        {revealedPoints === 0 && (
          <p style={{ fontSize: "0.9rem", color: "#0369a1", marginTop: "0.5rem", fontStyle: "italic" }}>
            Click to learn more
          </p>
        )}
        {revealedPoints > 0 && (
          <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0f9ff", border: "1px solid #0369a1", borderRadius: "0.5rem" }}>
            {points.slice(0, revealedPoints).map((point, index) => (
              <p key={index} style={{ margin: index === revealedPoints - 1 ? "0" : "0 0 0.75rem 0", color: "#0369a1", fontSize: "0.95rem" }}>
                • {point}
              </p>
            ))}
            {revealedPoints < points.length && (
              <button
                onClick={handleReveal}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "#0369a1",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem"
                }}
              >
                Learn More
              </button>
            )}
            {revealedPoints === points.length && (
              <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
                ✓ Section 1 complete!
              </p>
            )}
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={handleSecondBoxOpen}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #0369a1",
              background: showSecondBox ? "#e0f2fe" : "white",
              color: "#0369a1",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            How does an author make the past feel real while still telling a story?
          </button>
          {!showSecondBox && (
            <p style={{ fontSize: "0.9rem", color: "#0369a1", marginTop: "0.5rem", fontStyle: "italic" }}>
              Click to learn more
            </p>
          )}
          {showSecondBox && (
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0f9ff", border: "1px solid #0369a1", borderRadius: "0.5rem" }}>
              <ul style={{ color: "#0369a1", fontSize: "0.95rem", margin: "0", paddingLeft: "1.5rem" }}>
                <li style={{ marginBottom: "0.75rem" }}><strong style={{ backgroundColor: "#fef3c7", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>Authentic Detail</strong> – clothing, customs, language, and settings that feel true to the time.</li>
                <li style={{ marginBottom: "0.75rem" }}><strong style={{ backgroundColor: "#dcfce7", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>Vivid Atmosphere</strong> – sensory descriptions that make the past come alive.</li>
                <li style={{ marginBottom: "0.75rem" }}><strong style={{ backgroundColor: "#f3e8ff", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>Believable Characterisation</strong> – people who act, think, and speak in ways suited to their era.</li>
                <li><strong style={{ backgroundColor: "#cffafe", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>Real Historical Context</strong> – based on real events or figures, such as Henry VIII.</li>
              </ul>
              <button
                onClick={markSecondBoxAsRead}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "#0369a1",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem"
                }}
              >
                I've read this section
              </button>
              {secondBoxRead && (
                <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
                  ✓ Section 2 complete!
                </p>
              )}
            </div>
          )}
          {completed && (
            <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1.5rem", padding: "1rem", backgroundColor: "#dcfce7", borderRadius: "0.5rem", textAlign: "center" }}>
              ✓ Excellent! You've completed all sections. You can now unlock Level 4.
            </p>
          )}
        </div>
      </>
    );
  };

  const CharacterAnalysis = ({ isCompleted }) => {
    const [matches, setMatches] = useState({});
    const [completed, setCompleted] = useState(isCompleted);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedDefinition, setSelectedDefinition] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const colors = {
      1: "#fef3c7",
      2: "#dcfce7",
      3: "#f3e8ff",
      4: "#fed7aa",
      5: "#fce7f3"
    };

    const terms = [
      { id: 1, term: "Setting", definition: "The place or type of surroundings where something happens" },
      { id: 2, term: "Imagery", definition: "Visually descriptive or figurative language" },
      { id: 3, term: "Mood", definition: "The atmosphere or emotional feeling created" },
      { id: 4, term: "Connotation", definition: "The idea or feeling a word suggests beyond its literal meaning" },
      { id: 5, term: "Figurative Language", definition: "Language that uses expressions with a meaning different from the literal" }
    ];

    const handleTermClick = (termId) => {
      setSelectedTerm(termId);
    };

    const handleDefinitionClick = (definitionId) => {
      setSelectedDefinition(definitionId);
    };

    const handleMatch = () => {
      if (selectedTerm && selectedDefinition) {
        if (selectedTerm === selectedDefinition) {
          setMatches({ ...matches, [selectedTerm]: selectedDefinition });
          setFeedback({ type: "correct", termId: selectedTerm });
          setTimeout(() => setFeedback(null), 2000);
          setSelectedTerm(null);
          setSelectedDefinition(null);
        } else {
          setSelectedTerm(null);
          setSelectedDefinition(null);
        }
      }
    };

    const handleSubmit = () => {
      const allMatched = terms.every(t => matches[t.id] === t.id);
      if (allMatched) {
        setCompleted(true);
        markComplete("characterAnalysis", 20, "characterAnalysis", matches);
      } else {
        alert("Please match all terms with their definitions.");
      }
    };

    return (
      <>
        <h2 style={{ marginTop: 0 }}>📚 Explore: Key Terms (Level 4)</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          Match each literary term to its definition by clicking a term, then clicking the corresponding definition.
        </p>

        <div style={{
          padding: feedback ? "1rem" : "0",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          backgroundColor: feedback ? (feedback.type === "correct" ? "#dcfce7" : "#fee2e2") : "transparent",
          border: feedback ? (feedback.type === "correct" ? "2px solid #16a34a" : "2px solid #ef4444") : "none",
          minHeight: feedback ? "auto" : "80px"
        }}>
          {feedback && (
            <p style={{
              margin: 0,
              color: feedback.type === "correct" ? "#16a34a" : "#ef4444",
              fontWeight: "bold",
              fontSize: "1rem"
            }}>
              {feedback.type === "correct" ? "✓ Correct! Great match!" : "✗ Not quite! That's not the right match. Try again!"}
            </p>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#0369a1", marginBottom: "1rem" }}>Terms</h3>
            {terms.map((term) => (
              <div
                key={term.id}
                onClick={() => handleTermClick(term.id)}
                style={{
                  padding: "0.75rem 1rem",
                  marginBottom: "0.75rem",
                  backgroundColor: matches[term.id] ? colors[term.id] : (selectedTerm === term.id ? "#e0f2fe" : "#f9fafb"),
                  border: matches[term.id] ? `2px solid ${colors[term.id]}` : (selectedTerm === term.id ? "2px solid #0369a1" : "1px solid #e5e7eb"),
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  color: "#0369a1",
                  display: "block",
                  width: "fit-content",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {term.term}
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#0369a1", marginBottom: "1rem" }}>Definitions</h3>
            {terms.map((term) => (
              <button
                key={term.id}
                onClick={() => {
                  if (selectedTerm === term.id) {
                    // Correct match
                    setMatches({ ...matches, [selectedTerm]: term.id });
                    setFeedback({ type: "correct", termId: selectedTerm });
                    setTimeout(() => {
                      setFeedback(null);
                      setSelectedTerm(null);
                      setSelectedDefinition(null);
                    }, 2000);
                  } else if (selectedTerm) {
                    // Wrong match - show error
                    setFeedback({ type: "incorrect" });
                    setTimeout(() => {
                      setFeedback(null);
                      setSelectedTerm(null);
                      setSelectedDefinition(null);
                    }, 2000);
                  }
                }}
                style={{
                  width: "100%",
                  padding: "1rem",
                  marginBottom: "0.75rem",
                  backgroundColor: matches[term.id] ? colors[term.id] : (selectedDefinition === term.id ? "#e0f2fe" : "white"),
                  border: matches[term.id] ? `2px solid ${colors[term.id]}` : (selectedDefinition === term.id ? "2px solid #0369a1" : "1px solid #e5e7eb"),
                  borderRadius: "0.5rem",
                  color: matches[term.id] ? "#0369a1" : (selectedDefinition === term.id ? "#0369a1" : "#2c3e50"),
                  cursor: "pointer",
                  fontWeight: matches[term.id] || selectedDefinition === term.id ? "bold" : "normal",
                  fontSize: "0.95rem",
                  textAlign: "left",
                  transition: "all 0.2s ease"
                }}
              >
                {term.definition}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
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
          Next Activity
        </button>
        {completed && (
          <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
            ✓ Perfect! You've matched all terms correctly. You've earned 20 XP.
          </p>
        )}
      </>
    );
  };

  const AnnotatingFigurativeLanguage = () => {
    const [characterTraitsQuote, setCharacterTraitsQuote] = useState("");
    const [characterTraitsAnnotation, setCharacterTraitsAnnotation] = useState("");
    const [motivationsQuote, setMotivationsQuote] = useState("");
    const [motivationsAnnotation, setMotivationsAnnotation] = useState("");
    const [figurativeLangQuote, setFigurativeLangQuote] = useState("");
    const [figurativeLangAnnotation, setFigurativeLangAnnotation] = useState("");
    const [completed, setCompleted] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);

    const handleSubmit = () => {
      if (characterTraitsQuote.trim() || motivationsQuote.trim() || figurativeLangQuote.trim()) {
        setCompleted(true);
        markComplete("annotating", 20, "annotating", { 
          characterTraits: { quote: characterTraitsQuote, annotation: characterTraitsAnnotation },
          motivations: { quote: motivationsQuote, annotation: motivationsAnnotation },
          figurativeLanguage: { quote: figurativeLangQuote, annotation: figurativeLangAnnotation }
        });
        // Scroll to Level 6 after submission
        setTimeout(() => {
          if (level6Ref.current) {
            level6Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      } else {
        setAttemptCount(attemptCount + 1);
        let message;
        if (attemptCount === 0) {
          message = "Give it a go!";
        } else if (attemptCount === 1) {
          message = "Come on, you got this!";
        } else {
          message = "Are you distracted? Stop clicking me before you finish.";
        }
        alert(message);
      }
    };

    return (
      <>
        <h2 style={{ marginTop: 0 }}>📝 Explain: <i>Bring Up the Bodies</i> by Hilary Mantel (Level 5)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: "1.3rem", lineHeight: "1.8", color: "#2c3e50" }}>
              The story follows <strong>Thomas Cromwell</strong>, chief advisor to <strong>King Henry VIII</strong>, as he navigates the dangerous politics of Tudor England. The novel focuses on <strong>Henry's pursuit of Anne Boleyn</strong>, the annulment of his marriage to Katherine of Aragon, and the <strong>fall of Anne Boleyn</strong>, blending real events with imagined dialogue, inner thoughts, and personal motives to explore power, loyalty, and ambition in the Tudor court.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={bodiesBookImg}
              alt="Bring Up the Bodies book cover"
              style={{ maxWidth: "80%", height: "auto", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </div>
        <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#f0f9ff", borderRadius: "0.5rem", border: "1px solid #0369a1" }}>
          <h3 style={{ marginTop: 0, color: "#0369a1", fontSize: "1.2rem" }}>Now Your Turn</h3>
          <p style={{ fontSize: "1.2rem", color: "#2c3e50", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            We'll explore how Hilary Mantel's <i>Bring Up the Bodies</i> (set in Tudor England, 1535) explores:<br/>
            <br/>
            <span style={{ backgroundColor: "#fef3c7", padding: "0.2rem 0.4rem", borderRadius: "0.3rem", fontWeight: "bold" }}>Character Traits</span> <br/>
            <span style={{ backgroundColor: "#dcfce7", padding: "0.2rem 0.4rem", borderRadius: "0.3rem", fontWeight: "bold" }}>Motivations & Relationships</span><br/>
            <span style={{ backgroundColor: "#f3e8ff", padding: "0.2rem 0.4rem", borderRadius: "0.3rem", fontWeight: "bold" }}>Figurative Language</span> for ANNOTATION TECHNIQUES (imagery, metaphor, connotation, simile)
          </p>
          <p style={{ fontSize: "1.2rem", color: "#0369a1", fontWeight: "bold", marginTop: "1rem", padding: "1rem", backgroundColor: "#cffafe", borderRadius: "0.5rem", border: "3px solid #0369a1" }}>
            💡 Ask Miss for a printout of the text.
          </p>
          <h3 style={{ fontSize: "1.2rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem", marginBottom: "0.75rem", backgroundColor: "#fef3c7", padding: "0.5rem", borderRadius: "0.3rem", textDecoration: "underline" }}>
            👨 Character Traits
          </h3>
          <div style={{ backgroundColor: "#fffbeb", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #fef3c7" }}>
            <p style={{ fontSize: "0.95rem", color: "#7c2d12", fontStyle: "italic", marginBottom: "0.75rem" }}>
              For example:
            </p>
            <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "0.5rem" }}>
              <strong>Quote:</strong> "Though the day is over, Henry seems disinclined to go indoors."
            </p>
            <p style={{ fontSize: "1rem", color: "#2c3e50" }}>
              <strong>Annotation:</strong> This shows restlessness and dominance — Henry doesn't follow others' pace or customs.
            </p>
          </div>
          <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem" }}>
            Enter your chosen quote to look at <span style={{ backgroundColor: "#fef3c7", padding: "0.2rem 0.4rem", borderRadius: "0.3rem" }}>Character Traits</span>
          </p>
          <textarea
            value={characterTraitsQuote}
            onChange={(e) => setCharacterTraitsQuote(e.target.value)}
            placeholder="Enter your quote here..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #0369a1",
              fontSize: "1.05rem",
              boxSizing: "border-box",
              marginTop: "0.5rem"
            }}
          />
          <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem" }}>
            Write your annotation below:
          </p>
          <textarea
            value={characterTraitsAnnotation}
            onChange={(e) => setCharacterTraitsAnnotation(e.target.value)}
            placeholder="This shows..."
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #0369a1",
              fontSize: "1.05rem",
              boxSizing: "border-box",
              marginTop: "0.5rem"
            }}
          />
          <div style={{ height: "2rem" }} />
          <h3 style={{ fontSize: "1.2rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem", marginBottom: "0.75rem", backgroundColor: "#dcfce7", padding: "0.5rem", borderRadius: "0.3rem", textDecoration: "underline" }}>
            💚 Motivations & Relationships
          </h3>
          <div style={{ backgroundColor: "#f0fdf4", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #dcfce7" }}>
            <p style={{ fontSize: "0.95rem", color: "#166534", fontStyle: "italic", marginBottom: "0.75rem" }}>
              For example:
            </p>
            <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "0.5rem" }}>
              <strong>Quote:</strong> "A broad, brick-red streak of sunburn."
            </p>
            <p style={{ fontSize: "1rem", color: "#2c3e50" }}>
              <strong>Annotation:</strong> Imagery — Mantel uses physical detail to suggest Henry's earthy, human side, not just royal formality.
            </p>
          </div>
          <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem" }}>
            Enter your chosen quote to look at <span style={{ backgroundColor: "#dcfce7", padding: "0.2rem 0.4rem", borderRadius: "0.3rem", fontWeight: "bold" }}>Motivations & Relationships</span>
          </p>
          <textarea
            value={motivationsQuote}
            onChange={(e) => setMotivationsQuote(e.target.value)}
            placeholder="Enter your quote here..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #0369a1",
              fontSize: "1.05rem",
              boxSizing: "border-box",
              marginTop: "0.5rem"
            }}
          />
          <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem" }}>
            Write your annotation below:
          </p>
          <textarea
            value={motivationsAnnotation}
            onChange={(e) => setMotivationsAnnotation(e.target.value)}
            placeholder="This shows..."
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #0369a1",
              fontSize: "1.05rem",
              boxSizing: "border-box",
              marginTop: "0.5rem"
            }}
          />
          <div style={{ height: "2rem" }} />
          <h3 style={{ fontSize: "1.2rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem", marginBottom: "0.75rem", backgroundColor: "#f3e8ff", padding: "0.5rem", borderRadius: "0.3rem", textDecoration: "underline" }}>
            ✍️ Figurative Language
          </h3>
          <div style={{ marginLeft: "1rem", marginTop: "0.75rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginBottom: "0.75rem" }}>
              Sensory detail
            </h4>
            <div style={{ backgroundColor: "#faf5ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #e9d5ff" }}>
              <p style={{ fontSize: "0.95rem", color: "#6b21a8", fontStyle: "italic", marginBottom: "0.75rem" }}>
                For example:
              </p>
              <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "0.5rem" }}>
                <strong>Quote:</strong> "Inhaling horse sweat."
              </p>
              <p style={{ fontSize: "1rem", color: "#2c3e50" }}>
                <strong>Annotation:</strong> This ties Henry to the physical, masculine world of hunting and labour.
              </p>
            </div>
            <h4 style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginBottom: "0.75rem" }}>
              Metaphor and Irony
            </h4>
            <div style={{ backgroundColor: "#faf5ff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #e9d5ff" }}>
              <p style={{ fontSize: "0.95rem", color: "#6b21a8", fontStyle: "italic", marginBottom: "0.75rem" }}>
                For example:
              </p>
              <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "0.5rem" }}>
                <strong>Quote:</strong> "'Cromwell has the skin of a lily'… 'The only particular in which he resembles that or any other blossom.'"
              </p>
              <p style={{ fontSize: "1rem", color: "#2c3e50" }}>
                <strong>Annotation:</strong> Henry's teasing tone shows familiarity and subtle power; Cromwell is both trusted and mocked.
              </p>
            </div>
            <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginTop: "1.5rem" }}>
              Enter your chosen quote to look at <span style={{ backgroundColor: "#f3e8ff", padding: "0.2rem 0.4rem", borderRadius: "0.3rem", fontWeight: "bold" }}>Figurative Language</span>
            </p>
            <textarea
              value={figurativeLangQuote}
              onChange={(e) => setFigurativeLangQuote(e.target.value)}
              placeholder="Enter your quote here..."
              style={{
                width: "100%",
                minHeight: "70px",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid #c084fc",
                fontSize: "1.05rem",
                boxSizing: "border-box",
                marginBottom: "1rem"
              }}
            />
            <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Write your annotation below:
            </p>
            <textarea
              value={figurativeLangAnnotation}
              onChange={(e) => setFigurativeLangAnnotation(e.target.value)}
              placeholder="This shows..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid #0369a1",
                fontSize: "1.05rem",
                boxSizing: "border-box",
                marginBottom: "1.5rem"
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "1rem",
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
            Submit Annotations
          </button>
        </div>
        {completed && (
          <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
            ✓ Great annotations! You've earned 20 XP.
          </p>
        )}
      </>
    );
  };

  const WritingTask = () => {
    // Move all WritingTask state here to prevent parent re-renders
    const [character, setCharacter] = useState("Henry VIII");
    const [phrase1, setPhrase1] = useState("");
    const [type1, setType1] = useState("time");
    const [phrase2, setPhrase2] = useState("");
    const [type2, setType2] = useState("time");
    const [phrase3, setPhrase3] = useState("");
    const [type3, setType3] = useState("time");
    const [ans1, setAns1] = useState("");
    const [ans2, setAns2] = useState("");
    const [ans3, setAns3] = useState("");
    const [ans4, setAns4] = useState("");
    const [ans5, setAns5] = useState("");
    const [ans6, setAns6] = useState("");
    const [ans7, setAns7] = useState("");
    const [ans8, setAns8] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [completed, setCompleted] = useState(false);
    const [feedback, setFeedback] = useState("");
    
    const handleSubmit = () => {
      const normalize = (str) => str.trim().toLowerCase();
      
      let correct = 0;
      let total = 8;
      let incorrectBoxes = [];
      
      // Box 1: imagery or figurative language
      if (normalize(ans1) === "imagery" || normalize(ans1) === "figurative language") {
        correct++;
      } else {
        incorrectBoxes.push("Box 1");
      }
      
      // Box 2: imagery or figurative language
      if (normalize(ans2) === "imagery" || normalize(ans2) === "figurative language") {
        correct++;
      } else {
        incorrectBoxes.push("Box 2");
      }
      
      // Box 3: Tudor England
      if (normalize(ans3) === "tudor england") {
        correct++;
      } else {
        incorrectBoxes.push("Box 3");
      }
      
      // Box 4: optional
      correct++;
      
      // Box 5: description
      if (normalize(ans5) === "description") {
        correct++;
      } else {
        incorrectBoxes.push("Box 5");
      }
      
      // Box 6: reader
      if (normalize(ans6) === "reader") {
        correct++;
      } else {
        incorrectBoxes.push("Box 6");
      }
      
      // Box 7: Tudor England
      if (normalize(ans7) === "tudor england") {
        correct++;
      } else {
        incorrectBoxes.push("Box 7");
      }
      
      // Box 8: power
      if (normalize(ans8) === "power") {
        correct++;
      } else {
        incorrectBoxes.push("Box 8");
      }
      
      if (correct === total) {
        setCompleted(true);
        setFeedback("");
        // Delay calling markComplete to allow state to update first
        setTimeout(() => {
          markComplete("writing", 25, "writing", { 
            character,
            phrase1,
            type1,
            phrase2,
            type2,
            phrase3,
            type3,
            ans1,
            ans2,
            ans3,
            ans4,
            ans5,
            ans6,
            ans7,
            ans8
          });
          // Scroll to "Before you leave" section
          if (beforeYouLeaveRef.current) {
            beforeYouLeaveRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          alert("Excellent! All answers are correct! 🎉");
        }, 100);
      } else {
        setFeedback("Check your answers and try again.");
        alert("Well done for trying. Check your answers and submit again.");
      }
    };

    const generatePDF = () => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      let yPosition = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      const lineHeight = 7;

      // Helper function to add text with wrapping
      const addWrappedText = (text, x, y, maxWidth, fontSize, isBold = false) => {
        pdf.setFontSize(fontSize);
        if (isBold) {
          pdf.setFont(undefined, "bold");
        } else {
          pdf.setFont(undefined, "normal");
        }
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + lines.length * lineHeight;
      };

      // Title
      yPosition = addWrappedText("Writing Task Worksheet - Student Responses", margin, yPosition, contentWidth, 14, true);
      yPosition += 5;

      // Character selected
      yPosition = addWrappedText(`Character Selected: ${character}`, margin, yPosition, contentWidth, 11, true);
      yPosition += 5;

      // Step 1: Descriptive Phrases
      yPosition = addWrappedText("Step 1 - Highlighting Descriptive Phrases", margin, yPosition, contentWidth, 12, true);
      yPosition += 5;

      // Create table for Step 1
      const tableData = [
        [
          { content: "Quote from the text", styles: { fontStyle: "bold" } },
          { content: "What it shows (time/place/person)", styles: { fontStyle: "bold" } }
        ],
        [phrase1 || "[Empty]", type1],
        [phrase2 || "[Empty]", type2],
        [phrase3 || "[Empty]", type3]
      ];

      // Simple table rendering
      const cellHeight = 12;
      const col1Width = contentWidth * 0.6;
      const col2Width = contentWidth * 0.4;
      const tableX = margin;

      // Header
      pdf.setFillColor(243, 244, 246);
      pdf.rect(tableX, yPosition, col1Width, cellHeight, "F");
      pdf.rect(tableX + col1Width, yPosition, col2Width, cellHeight, "F");
      pdf.setFont(undefined, "bold");
      pdf.setFontSize(9);
      pdf.text("Quote from the text", tableX + 2, yPosition + 7);
      pdf.text("What it shows", tableX + col1Width + 2, yPosition + 7);
      yPosition += cellHeight;

      // Data rows
      pdf.setFont(undefined, "normal");
      [
        [phrase1 || "[Empty]", type1],
        [phrase2 || "[Empty]", type2],
        [phrase3 || "[Empty]", type3]
      ].forEach((row) => {
        pdf.rect(tableX, yPosition, col1Width, cellHeight);
        pdf.rect(tableX + col1Width, yPosition, col2Width, cellHeight);
        const col1Text = pdf.splitTextToSize(row[0], col1Width - 4);
        pdf.text(col1Text, tableX + 2, yPosition + 5);
        pdf.text(row[1], tableX + col1Width + 2, yPosition + 7);
        yPosition += cellHeight;
      });

      yPosition += 8;

      // Step 2: Character
      yPosition = addWrappedText("Step 2 - Character Selected", margin, yPosition, contentWidth, 12, true);
      yPosition += 3;
      yPosition = addWrappedText(`Selected: ${character}`, margin, yPosition, contentWidth, 11);
      yPosition += 8;

      // Step 3: Fill-in-the-Blanks
      yPosition = addWrappedText("Step 3 - Fill-in-the-Blanks Analysis Paragraph", margin, yPosition, contentWidth, 12, true);
      yPosition += 5;

      const paragraph = `In Bring Up the Bodies, Mantel uses "${ans1}" and "${ans2}" to describe "${ans3}". The writer shows this through the phrase "${ans4}". This "${ans5}" helps the "${ans6}" imagine life in "${ans7}". It also shows that the character has "${ans8}" and is important in the story.`;

      yPosition = addWrappedText(paragraph, margin, yPosition, contentWidth, 10);
      yPosition += 8;

      // Word bank
      yPosition = addWrappedText("Word Bank: imagery, figurative language, reader, power, Tudor England, description", margin, yPosition, contentWidth, 9);

      // Add page number at the bottom
      pdf.setFontSize(8);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, pageHeight - 10);

      // Save the PDF
      pdf.save(`Writing_Task_Worksheet_${new Date().getTime()}.pdf`);
    };

    return (
      <>
        <h2 style={{ marginTop: 0 }}>✅ Evaluate: Writing Task (Level 6)</h2>
        <p style={{ fontSize: "1.1rem" }}>
          Complete the worksheet:
        </p>
        <div style={{ backgroundColor: "#f0f9ff", padding: "1.5rem", borderRadius: "0.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #0369a1" }}>
          <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "1rem" }}>
            <strong>Step 1: Highlighting Descriptive Phrases</strong><br/>
            Find three descriptive phrases that tell you about the time, place, or people in the story.
          </p>
          <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "1rem" }}>
            <strong>Step 2: Choose a Character</strong><br/>
            Henry VIII or Thomas Cromwell
          </p>
          <p style={{ fontSize: "1rem", color: "#2c3e50", marginBottom: "1rem" }}>
            <strong>Step 3: Fill-in-the-Blanks Analysis Paragraph</strong><br/>
            Use the word bank to help you complete your paragraph.
          </p>
        </div>
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#0369a1" }}>Step 1 - Highlighting Descriptive Phrases</h3>
          <p style={{ fontSize: "0.95rem", color: "#2c3e50", marginBottom: "1rem" }}>
            Find three descriptive phrases that tell you about the time, place, or people in the story.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem", border: "1px solid #d1d5db" }}>
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6", borderBottom: "2px solid #d1d5db" }}>
                <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "bold", color: "#0369a1", border: "1px solid #d1d5db" }}>Quote from the text</th>
                <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "bold", color: "#0369a1", border: "1px solid #d1d5db" }}>What it shows (time/place/person)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "0.75rem", border: "1px solid #d1d5db" }}>
                  <input
                    type="text"
                    value={phrase1}
                    onChange={(e) => setPhrase1(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #d1d5db", fontSize: "0.9rem", boxSizing: "border-box" }}
                    placeholder="Enter a quote..."
                  />
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #d1d5db" }}>
                  <select
                    value={type1}
                    onChange={(e) => setType1(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #d1d5db", fontSize: "0.9rem", boxSizing: "border-box" }}
                  >
                    <option value="time">Time</option>
                    <option value="place">Place</option>
                    <option value="person">Person</option>
                  </select>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "0.75rem", border: "1px solid #d1d5db" }}>
                  <input
                    type="text"
                    value={phrase2}
                    onChange={(e) => setPhrase2(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #d1d5db", fontSize: "0.9rem", boxSizing: "border-box" }}
                    placeholder="Enter a quote..."
                  />
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #d1d5db" }}>
                  <select
                    value={type2}
                    onChange={(e) => setType2(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #d1d5db", fontSize: "0.9rem", boxSizing: "border-box" }}
                  >
                    <option value="time">Time</option>
                    <option value="place">Place</option>
                    <option value="person">Person</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid #d1d5db" }}>
                  <input
                    type="text"
                    value={phrase3}
                    onChange={(e) => setPhrase3(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #d1d5db", fontSize: "0.9rem", boxSizing: "border-box" }}
                    placeholder="Enter a quote..."
                  />
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #d1d5db" }}>
                  <select
                    value={type3}
                    onChange={(e) => setType3(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.3rem", border: "1px solid #d1d5db", fontSize: "0.9rem", boxSizing: "border-box" }}
                  >
                    <option value="time">Time</option>
                    <option value="place">Place</option>
                    <option value="person">Person</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <label style={{ fontSize: "1.1rem", display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Step 2 - Choose a character:
        </label>
        <select
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #0369a1",
            fontSize: "1rem",
            marginBottom: "1rem"
          }}
        >
          <option value="Henry VIII">Henry VIII</option>
          <option value="Thomas Cromwell">Thomas Cromwell</option>
        </select>
        <p style={{ fontSize: "0.95rem", color: "#2c3e50", marginBottom: "0.75rem", fontWeight: "500" }}>
          Write down three words to describe them:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
          <input type="text" style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", fontSize: "0.9rem" }} />
          <input type="text" style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", fontSize: "0.9rem" }} />
          <input type="text" style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", fontSize: "0.9rem" }} />
        </div>
        <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#f0f9ff", borderRadius: "0.5rem", border: "1px solid #0369a1", marginBottom: "1.5rem", minHeight: "500px", willChange: "transform" }}>
          <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#0369a1" }}>Step 3: Fill-in-the-Blanks Analysis Paragraph</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.8", marginBottom: "1rem" }}>
            In Bring Up the Bodies, Mantel uses <input type="text" value={ans1} onChange={(e) => setAns1(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} /> and <input type="text" value={ans2} onChange={(e) => setAns2(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} /> to describe <input type="text" value={ans3} onChange={(e) => setAns3(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} />.
            The writer shows this through the phrase <input type="text" value={ans4} onChange={(e) => setAns4(e.target.value)} style={{ width: "200px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} />.
            This <input type="text" value={ans5} onChange={(e) => setAns5(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} /> helps the <input type="text" value={ans6} onChange={(e) => setAns6(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} /> imagine life in <input type="text" value={ans7} onChange={(e) => setAns7(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} />.
            It also shows that the character has <input type="text" value={ans8} onChange={(e) => setAns8(e.target.value)} style={{ width: "120px", height: "32px", padding: "0.25rem 0.5rem", borderRadius: "0.3rem", border: "1px solid #0369a1", fontSize: "0.9rem" }} /> and is important in the story.
          </p>
          {feedback && (
            <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
              {feedback}
            </p>
          )}
          <div style={{ minHeight: "1.5rem" }}></div>
          <p style={{ fontSize: "0.9rem", color: "#2c3e50", marginBottom: "1rem", fontStyle: "italic" }}>
            All blanks should be filled in with one of these words from the word bank below.
          </p>
          <div style={{ padding: "0.75rem", backgroundColor: "#fff", borderRadius: "0.5rem", border: "1px solid #d1d5db", marginBottom: "1rem" }}>
            <strong style={{ fontSize: "1.1rem", color: "#0369a1" }}>Word bank:</strong> <span style={{ fontSize: "1rem" }}>imagery, figurative language, reader, power, Tudor England, description</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const scrollPos = window.scrollY;
              const activeEl = document.activeElement;
              handleSubmit();
              activeEl.blur();
              setTimeout(() => {
                window.scrollTo(0, scrollPos);
              }, 50);
            }}
            type="button"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#0369a1",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem"
            }}
          >
            Check Answers
          </button>
        </div>
        {completed && (
          <p style={{ color: "#16a34a", fontWeight: "bold", marginTop: "1rem" }}>
            ✓ Excellent work! You've earned 25 XP. Course complete!
          </p>
        )}
        {!completed && (
          <div style={{ height: "2rem" }}></div>
        )}
        <div ref={beforeYouLeaveRef} style={{ backgroundColor: "#fef3c7", padding: "1.5rem", borderRadius: "0.5rem", marginTop: "2rem", borderLeft: "4px solid #f59e0b" }}>
          <p style={{ fontSize: "1.1rem", color: "#2c3e50", fontWeight: "bold", marginBottom: "1rem" }}>
            Before you leave, answer verbally:
          </p>
          <ul style={{ fontSize: "1rem", color: "#2c3e50", lineHeight: "1.8", marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              What makes <em>Bring Up the Bodies</em> feel historically authentic?
            </li>
            <li>
              How does Mantel use language to make Henry's world vivid or emotional?
            </li>
          </ul>
          <button
            onClick={() => markComplete("zorOut", 0)}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#f59e0b",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            To ZoR Check out
          </button>
        </div>
      </>
    );
  };

  const ZoRCheckOut = () => {
    const [selectedZone, setSelectedZone] = useState(studentResponses.zorOut?.zone || null);

    const zones = [
      { name: "Red Zone", color: "#fee2e2", borderColor: "#dc2626", emoji: "🔴" },
      { name: "Yellow Zone", color: "#fef3c7", borderColor: "#eab308", emoji: "🟡" },
      { name: "Green Zone", color: "#dcfce7", borderColor: "#16a34a", emoji: "🟢" },
      { name: "Blue Zone", color: "#dbeafe", borderColor: "#0369a1", emoji: "🔵" }
    ];

    const handleZoneSelect = (zoneName) => {
      setSelectedZone(zoneName);
      setStudentResponses(prev => ({
        ...prev,
        zorOut: { zone: zoneName }
      }));
    };

    return (
      <>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img src={celebrationImg} alt="Celebration" style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem", borderRadius: "0.5rem" }} />
          <h2 style={{ fontSize: "2rem", color: "#1e40af", marginBottom: "0.5rem" }}>Congratulations! 🎉</h2>
          <p style={{ fontSize: "1.2rem", color: "#2c3e50", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Thank you for your efforts!
          </p>
        </div>

        <div style={{ backgroundColor: "#f0f9ff", padding: "1.5rem", borderRadius: "0.5rem", marginBottom: "2rem", border: "2px solid #0369a1" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#0369a1", fontWeight: "bold", marginBottom: "0.75rem" }}>
            📊 Your Achievement
          </h3>
          <p style={{ fontSize: "1.1rem", color: "#2c3e50", marginBottom: "0.5rem" }}>
            <strong>Total XP Earned:</strong> {xp} XP
          </p>
          <p style={{ fontSize: "1rem", color: "#2c3e50" }}>
            You've completed all 6 levels and mastered character and language analysis in historical fiction!
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.3rem", color: "#2c3e50", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
            What zone are you in?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {zones.map((zone) => (
              <button
                key={zone.name}
                onClick={() => handleZoneSelect(zone.name)}
                style={{
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  border: `3px solid ${zone.borderColor}`,
                  backgroundColor: zone.color,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#2c3e50",
                  transition: "transform 0.2s",
                  transform: selectedZone === zone.name ? "scale(1.05)" : "scale(1)"
                }}
              >
                {zone.emoji} {zone.name}
              </button>
            ))}
          </div>
          {selectedZone && (
            <p style={{ fontSize: "1rem", color: "#16a34a", fontWeight: "bold", marginTop: "1rem", textAlign: "center" }}>
              ✓ You selected: {selectedZone}
            </p>
          )}
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            onClick={generateCompleteLessonPDF}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#0369a1",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#0252a1"}
            onMouseLeave={(e) => e.target.style.background = "#0369a1"}
          >
            📤 Submit Lesson
          </button>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem", fontStyle: "italic" }}>
            This will download a PDF with all your responses
          </p>
        </div>
      </>
    );
  };

  const ZoRCheckIn = () => {
    const [selectedZone, setSelectedZone] = useState(studentResponses.zorIn?.zone || null);

    const zones = [
      { name: "Red Zone", color: "#fee2e2", borderColor: "#dc2626", emoji: "🔴" },
      { name: "Yellow Zone", color: "#fef3c7", borderColor: "#eab308", emoji: "🟡" },
      { name: "Green Zone", color: "#dcfce7", borderColor: "#16a34a", emoji: "🟢" },
      { name: "Blue Zone", color: "#dbeafe", borderColor: "#0369a1", emoji: "🔵" }
    ];

    const handleZoneSelect = (zoneName) => {
      setSelectedZone(zoneName);
      setStudentResponses(prev => ({
        ...prev,
        zorIn: { zone: zoneName }
      }));
    };

    return (
      <div style={{ backgroundColor: "#f0f9ff", padding: "1.5rem", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "2px solid #0369a1" }}>
        <h3 style={{ fontSize: "1.2rem", color: "#0369a1", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
          ✨ ZoR Check-In: What zone are you in?
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {zones.map((zone) => (
            <button
              key={zone.name}
              onClick={() => handleZoneSelect(zone.name)}
              style={{
                padding: "1.5rem",
                borderRadius: "0.5rem",
                border: `3px solid ${zone.borderColor}`,
                backgroundColor: zone.color,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#2c3e50",
                transition: "transform 0.2s",
                transform: selectedZone === zone.name ? "scale(1.05)" : "scale(1)"
              }}
            >
              {zone.emoji} {zone.name}
            </button>
          ))}
        </div>
        {selectedZone && (
          <p style={{ fontSize: "1rem", color: "#16a34a", fontWeight: "bold", marginTop: "1rem", textAlign: "center" }}>
            ✓ You selected: {selectedZone}
          </p>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem", minHeight: "100vh", maxWidth: "960px" }}>
      <h2 style={{ marginBottom: "0.5rem", fontSize: "2rem", color: "#1e40af" }}>Autumn II - Historical Fiction</h2>
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ marginBottom: "0.25rem", fontSize: "1.1rem" }}>
          Bring up the Bodies – Character & Language Analysis
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#4b5563" }}>
          Explore character development and figurative language in Hilary Mantel's historical novel.
        </p>
      </header>

      <div style={{ backgroundColor: "#ecf0f1", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", borderLeft: "4px solid #0369a1" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#0369a1", fontSize: "1.1rem" }}>Learning Objective</h3>
        <p style={{ margin: "0", fontSize: "1rem", color: "#2c3e50" }}>
          To extract strong evidence to support arguments.
        </p>
      </div>

      <IntroductionSchedule scheduleViewed={scheduleViewed} onScheduleView={() => setScheduleViewed(true)} />

      {completedSteps.zorOut ? (
        <ZoRCheckOut />
      ) : (
        scheduleViewed && (
          <>
            <XPBar />
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
            <LevelLockWrapper title="Level 1 – Lesson Objectives" unlocked={canAccess.levelOne} bgColor="#f0f9ff">
              <LevelOne onComplete={() => markComplete("levelOne", 10, null, null)} isCompleted={completedSteps.levelOne} />
            </LevelLockWrapper>
            {completedSteps.levelOne && <ZoRCheckIn />}
            <LevelLockWrapper title="Level 2 – Hook" unlocked={canAccess.spag} bgColor="#fef3c7">
              <Hook />
            </LevelLockWrapper>
            <LevelLockWrapper title="Level 3 – Key Terms" unlocked={canAccess.keyTerms} bgColor="#dcfce7">
              <KeyTermsBTB />
            </LevelLockWrapper>
            <LevelLockWrapper title="Explore: Starter" unlocked={canAccess.exploreStarter} bgColor="#f3e8ff" ref={exploreStarterRef}>
              <ExploreStarter />
            </LevelLockWrapper>
            <LevelLockWrapper title="Level 4 – Character Analysis" unlocked={canAccess.characterAnalysis} bgColor="#cffafe">
              <CharacterAnalysis isCompleted={completedSteps.characterAnalysis} />
            </LevelLockWrapper>
            <LevelLockWrapper title="Level 5 – Annotating Figurative Language" unlocked={canAccess.annotating} bgColor="#fce7f3" ref={level5Ref}>
              <AnnotatingFigurativeLanguage />
            </LevelLockWrapper>
            <LevelLockWrapper title="Level 6 – Character Paragraph" unlocked={canAccess.writing} bgColor="#fee2e2" ref={level6Ref}>
              <WritingTask />
            </LevelLockWrapper>
          </>
        )
      )}

      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", marginTop: "2rem", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/n5")}
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
          onClick={() => navigate("/n7")}
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
    </div>
  );
};

export default BringUpTheBodies;
