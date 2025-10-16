import { useState } from "react";
import "./App.css";

function App() {
  const events = [
    { date: "2025-10-10", title: "Samyak", description: "Samyak Events start today." },
    { date: "2025-10-11", title: "Samyak", description: "2nd day of Samyak Events" },
    { date: "2025-10-16", title: "Lab Exam", description: "FEDF In Sem Lab Exam." },
    { date: "2025-10-25", title: "NPTEL Exam", description: "Today is NPTEL Machine Learning exam." },
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  // Generate days for current month (October 2025)
  const year = 2025;
  const month = 10;
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const selectedEvents = events.filter(
    (event) => event.date === `${year}-${String(month).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
  );

  // Extract all event days for highlighting
  const eventDays = events.map((event) => Number(event.date.split("-")[2]));

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>📅 October 2025 Calendar</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          maxWidth: "400px",
          margin: "20px auto",
        }}
      >
        {daysArray.map((day) => {
          const isSelected = selectedDate === day;
          const hasEvent = eventDays.includes(day);

          // Decide color based on status
          let backgroundColor = "#f0f0f0";
          let color = "black";

          if (hasEvent) {
            backgroundColor = "#8495acff"; // light blue for event days
          }
          if (isSelected) {
            backgroundColor = "#2e28a6ff"; // dark blue for selected
            color = "white";
          }

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(day)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor,
                color,
                transition: "0.2s",
                fontWeight: hasEvent ? "600" : "normal",
                boxShadow: hasEvent ? "0 0 4px rgba(79,70,229,0.3)" : "none",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "20px" }}>
        {selectedDate ? (
          selectedEvents.length > 0 ? (
            <div>
              <h3>Events on {selectedDate} October 2025</h3>
              {selectedEvents.map((e, i) => (
                <div
                  key={i}
                  style={{
                    margin: "10px auto",
                    padding: "10px",
                    backgroundColor: "#E0E7FF",
                    borderRadius: "8px",
                    maxWidth: "300px",
                  }}
                >
                  <strong>{e.title}</strong>
                  <p>{e.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events on this date.</p>
          )
        ) : (
          <p>Click a date to view events.</p>
        )}
      </div>
    </div>
  );
}

export default App;
