const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentMonth = 0; // January (Ocak'tan başlasın)
let currentYear = 2025;

// Not saklama objesi
const notes = {};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInCurrentMonth() {
  if (currentMonth === 1 && isLeapYear(currentYear)) return 29;
  return daysInMonth[currentMonth];
}

function getFirstDayOfMonth() {
  const date = new Date(currentYear, currentMonth, 1);
  return (date.getDay() + 6) % 7; // Monday=0 format
}

// Not anahtarı oluştur (örnek: "2025-1-15")
function getNoteKey(day) {
  return `${currentYear}-${currentMonth}-${day}`;
}

// Not varsa al
function getNote(day) {
  return notes[getNoteKey(day)] || "";
}

// Not kaydet
function saveNote(day, note) {
  const key = getNoteKey(day);
  if (note.trim() === "") {
    delete notes[key]; // Boş not varsa sil
  } else {
    notes[key] = note;
  }
}

function createCalendar() {
  calendarGrid.innerHTML = "";
  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const totalDays = getDaysInCurrentMonth();
  const firstDay = getFirstDayOfMonth();

  // Empty cells for alignment
  for (let i = 0; i < firstDay; i++) {
    const emptyElement = document.createElement("div");
    emptyElement.className = "calendar-day empty";
    calendarGrid.appendChild(emptyElement);
  }

  // Actual days
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";

    // Gün numarası
    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = day;

    // Not alanı
    const noteArea = document.createElement("div");
    noteArea.className = "day-note";
    const existingNote = getNote(day);
    noteArea.textContent = existingNote;

    // Not varsa farklı renk
    if (existingNote) {
      dayElement.classList.add("has-note");
    }

    dayElement.appendChild(dayNumber);
    dayElement.appendChild(noteArea);

    // Tıklama olayı - Not ekleme
    dayElement.addEventListener("click", function () {
      const currentNote = getNote(day);
      const newNote = prompt(
        `${monthNames[currentMonth]} ${day}, ${currentYear} için not:`,
        currentNote
      );

      if (newNote !== null) {
        // Cancel'a basmadıysa
        saveNote(day, newNote);
        createCalendar(); // Takvimi yenile
      }
    });

    calendarGrid.appendChild(dayElement);
  }
}

prevBtn.addEventListener("click", function () {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  createCalendar();
});

nextBtn.addEventListener("click", function () {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  createCalendar();
});

createCalendar();
