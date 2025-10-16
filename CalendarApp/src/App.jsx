import { useState } from "react";
import "./App.css";

function App() {
  const events = [
    { date: "2025-10-10", title: "Samyak", description: "Samyak Events start today." },
    { date: "2025-10-11", title: "Samyak", description: "2nd day of Samyak Events." },
    { date: "2025-10-16", title: "Lab Exam", description: "FEDF In Sem Lab Exam." },
    { date: "2025-10-25", title: "NPTEL Exam", description: "Machine Learning exam." },
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  // Calendar setup for October 2025
  const year = 2025;
  const month = 9; // JS months are 0-indexed (0=Jan, 9=Oct)
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, ...
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create calendar grid with blanks before first day
  const daysArray = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const selectedEvents = events.filter(
    (event) => event.date === `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
  );

  const eventDays = events.map((event) => Number(event.date.split("-")[2]));

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>October 2025 Calendar</h2>

      {/* Weekday headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          maxWidth: "400px",
          margin: "10px auto",
          fontWeight: "bold",
          color: "#05104fff",
        }}
      >
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          maxWidth: "400px",
          margin: "10px auto",
        }}
      >
        {daysArray.map((day, index) => {
          if (day === null) {
            return <div key={index}></div>; // empty space before month starts
          }

          const isSelected = selectedDate === day;
          const hasEvent = eventDays.includes(day);

          let backgroundColor = "#f0f0f0";
          let color = "black";

          if (hasEvent) {
            backgroundColor = "#8495ac"; // light blue for event days
          }
          if (isSelected) {
            backgroundColor = "#2e28a6"; // dark blue for selected
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

      {/* Event details */}
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
