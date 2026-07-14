
// Splash animation: HATE YOUR PROD flows into BILLIONAIRES CLUB.
window.addEventListener("load", () => {
  const loader = document.getElementById("loaderScreen");
  if (!loader) return;

  document.body.style.overflow = "hidden";

  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    document.body.style.overflow = "";

    window.setTimeout(() => {
      loader.remove();
    }, 750);
  document.body.classList.add('app-ready');
  }, 2400);
});

const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor("#000000"); tg.setBackgroundColor("#000000"); } catch(e) {}
}

const course = {
  "intro": {
    "index": "01",
    "title": "ИНТРО",
    "description": "Вступление в курс и знакомство с логикой дальнейшего обучения.",
    "lessons": [
      {
        "id": "intro-1",
        "title": "Вступление",
        "url": "https://kinescope.io/wSPsWT8KkzqfvpnTP6TzaY/plhDoayj"
      }
    ]
  },
  "theory": {
    "index": "02",
    "title": "ТЕОРИЯ",
    "description": "Теоретическая база: монтажное мышление и подготовка к съёмке.",
    "lessons": [
      {
        "id": "theory-1",
        "title": "Теория",
        "url": "https://kinescope.io/uvgNYjcjs6w27qpgYTdw7j/plIizIPE"
      },
      {
        "id": "theory-2",
        "title": "Теория съёмка",
        "url": "https://kinescope.io/cuE1YDPKnBaS2KAhwHKWF8/plB9txaf"
      }
    ]
  },
  "editing": {
    "index": "03",
    "title": "МОНТАЖ",
    "description": "Практическая часть курса: от отбора материала до финального цвета.",
    "lessons": [
      {
        "id": "edit-1",
        "title": "База. Отбор кадров.",
        "url": "https://kinescope.io/wPpgvn5qyc43cWcjQV8B5b/plRKqpMX"
      },
      {
        "id": "edit-2",
        "title": "Отбор кадров #2",
        "url": "https://kinescope.io/rUzmw3Fv1nxBoJptqWCN2v"
      },
      {
        "id": "edit-3",
        "title": "Сборка интро",
        "url": "https://kinescope.io/ck3Y39GuT96EGM275Ktn2w/pll1GDzJ"
      },
      {
        "id": "edit-4",
        "title": "Чистовой монтаж",
        "url": "https://kinescope.io/cjKA6C6gSt1wWkK88ugiDh/plwmkiOU"
      },
      {
        "id": "edit-5",
        "title": "Цвет финал",
        "url": "https://kinescope.io/0mGtC6yxEe3jBigTRkmHjq/pl6pbouI"
      }
    ]
  },
  "materials": {
    "index": "04",
    "title": "МАТЕРИАЛЫ К КУРСУ",
    "description": "Файлы и ресурсы курса. Ссылки добавим, когда ты их пришлёшь.",
    "materials": [
      {
        "title": "Исходники",
        "subtitle": "Ссылка будет добавлена"
      },
      {
        "title": "Шрифты и графика",
        "subtitle": "Ссылка будет добавлена"
      },
      {
        "title": "Музыка",
        "subtitle": "Ссылка будет добавлена"
      },
      {
        "title": "Пресеты",
        "subtitle": "Ссылка будет добавлена"
      }
    ]
  },
  "extra": {
    "index": "05",
    "title": "ДОПОЛНИТЕЛЬНЫЕ МАТЕРИАЛЫ",
    "description": "Бонусные разборы, гайды и полезные ресурсы.",
    "materials": [
      {
        "title": "Полезные ссылки",
        "subtitle": "Ссылка будет добавлена"
      },
      {
        "title": "Бонусные разборы",
        "subtitle": "Ссылка будет добавлена"
      }
    ]
  }
};

const sectionScreen = document.getElementById("sectionScreen");
const lessonScreen = document.getElementById("lessonScreen");
const sectionKicker = document.getElementById("sectionKicker");
const sectionTitle = document.getElementById("sectionTitle");
const sectionIndex = document.getElementById("sectionIndex");
const sectionHeading = document.getElementById("sectionHeading");
const sectionDescription = document.getElementById("sectionDescription");
const lessonList = document.getElementById("lessonList");

const lessonVideo = document.getElementById("lessonVideo");
const lessonSectionLabel = document.getElementById("lessonSectionLabel");
const lessonHeaderTitle = document.getElementById("lessonHeaderTitle");
const lessonKicker = document.getElementById("lessonKicker");
const lessonTitle = document.getElementById("lessonTitle");
const prevLesson = document.getElementById("prevLesson");
const nextLesson = document.getElementById("nextLesson");

const completeLesson = document.getElementById("completeLesson");
const completeLabel = completeLesson.querySelector(".complete-label");
const sectionProgressText = document.getElementById("sectionProgressText");
const sectionProgressBar = document.getElementById("sectionProgressBar");
const overallProgressText = document.getElementById("overallProgressText");
const overallProgressBar = document.getElementById("overallProgressBar");
const lessonSearch = document.getElementById("lessonSearch");
const videoLoader = document.getElementById("videoLoader");
const videoFrame = lessonVideo.closest(".video-frame");

const PROGRESS_KEY = "hyp_course_progress_v1";
let completed = new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]"));

function saveProgress(){
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]));
  updateOverallProgress();
}

function allLessons(){
  return Object.values(course).flatMap(section => section.lessons || []);
}

function updateOverallProgress(){
  const total = allLessons().length;
  const count = allLessons().filter(lesson => completed.has(lesson.id)).length;
  const percent = total ? Math.round(count / total * 100) : 0;
  overallProgressText.textContent = `${percent}%`;
  overallProgressBar.style.width = `${percent}%`;
}

function updateSectionProgress(){
  const lessons = course[activeSection]?.lessons || [];
  const count = lessons.filter(lesson => completed.has(lesson.id)).length;
  sectionProgressText.textContent = `${count} из ${lessons.length}`;
  sectionProgressBar.style.width = lessons.length ? `${count / lessons.length * 100}%` : "0%";
}

function updateCompleteButton(){
  const lesson = course[activeSection]?.lessons?.[activeLessonIndex];
  const done = lesson && completed.has(lesson.id);
  completeLesson.classList.toggle("is-complete", Boolean(done));
  completeLabel.textContent = done ? "УРОК ПРОЙДЕН" : "ОТМЕТИТЬ ПРОЙДЕННЫМ";
}

let activeSection = null;
let activeLessonIndex = 0;

function lockBody(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

function openSection(id) {
  if (!course[id]) {
    openInfo(id);
    return;
  }
  activeSection = id;
  const section = course[id];

  sectionKicker.textContent = `РАЗДЕЛ ${section.index}`;
  sectionTitle.textContent = section.title;
  sectionIndex.textContent = section.index;
  sectionHeading.textContent = section.title;
  sectionDescription.textContent = section.description;

  lessonSearch.value = "";

  if (section.lessons) {
    lessonSearch.style.display = "flex";
    lessonList.className = "lesson-list reveal";
    lessonList.innerHTML = section.lessons.map((lesson, index) => `
      <button class="lesson-card ${completed.has(lesson.id) ? "is-complete" : ""}" data-lesson="${index}" data-title="${lesson.title.toLowerCase()}">
        <span class="lesson-num">${completed.has(lesson.id) ? "✓" : String(index + 1).padStart(2, "0")}</span>
        <span>
          <strong>${lesson.title}</strong>
          <small>${completed.has(lesson.id) ? "ПРОЙДЕНО" : "СМОТРЕТЬ УРОК"}</small>
        </span>
        <span class="lesson-arrow">↗</span>
      </button>
    `).join("");

    lessonList.querySelectorAll("[data-lesson]").forEach(btn => {
      btn.addEventListener("click", () => openLesson(Number(btn.dataset.lesson)));
    });
    updateSectionProgress();
    document.getElementById("sectionProgress").style.display = "grid";
  } else {
    lessonSearch.style.display = "none";
    document.getElementById("sectionProgress").style.display = "none";
    lessonList.className = "material-grid reveal";
    lessonList.innerHTML = section.materials.map(material => `
      <button class="material-card" type="button">
        <span>МАТЕРИАЛ</span>
        <strong>${material.title}</strong>
        <small>${material.subtitle}</small>
      </button>
    `).join("");
  }

  sectionScreen.classList.add("show");
  sectionScreen.setAttribute("aria-hidden", "false");
  lockBody(true);
}

function openLesson(index) {
  const section = course[activeSection];
  const lesson = section.lessons[index];
  activeLessonIndex = index;

  videoFrame.classList.remove("is-loaded");
  lessonVideo.src = lesson.url;
  lessonSectionLabel.textContent = `РАЗДЕЛ ${section.index}`;
  lessonHeaderTitle.textContent = section.title;
  lessonKicker.textContent = `УРОК ${String(index + 1).padStart(2, "0")}`;
  lessonTitle.textContent = lesson.title;
  updateCompleteButton();

  prevLesson.disabled = index === 0;
  nextLesson.disabled = index === section.lessons.length - 1;

  lessonScreen.classList.add("show");
  lessonScreen.setAttribute("aria-hidden", "false");
  sectionScreen.classList.remove("show");
}

function openInfo(id) {
  
lessonVideo.addEventListener("load", () => {
  videoFrame.classList.add("is-loaded");
});

completeLesson.addEventListener("click", () => {
  const lesson = course[activeSection]?.lessons?.[activeLessonIndex];
  if (!lesson) return;
  if (completed.has(lesson.id)) completed.delete(lesson.id);
  else completed.add(lesson.id);
  saveProgress();
  updateCompleteButton();
});

lessonSearch.addEventListener("input", () => {
  const query = lessonSearch.value.trim().toLowerCase();
  lessonList.querySelectorAll(".lesson-card").forEach(card => {
    card.classList.toggle("is-hidden", !card.dataset.title.includes(query));
  });
});

const profilePanel = document.getElementById("profilePanel");
const profileBackdrop = document.getElementById("profileBackdrop");
function setProfile(open){
  profilePanel.classList.toggle("show", open);
  profileBackdrop.classList.toggle("show", open);
  profilePanel.setAttribute("aria-hidden", String(!open));
}
document.getElementById("openProfile").addEventListener("click", () => setProfile(true));
document.getElementById("closeProfile").addEventListener("click", () => setProfile(false));
profileBackdrop.addEventListener("click", () => setProfile(false));

updateOverallProgress();

const modal = document.getElementById("modal");
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const kicker = document.getElementById("kicker");

  kicker.textContent = "HATE YOUR PROD";
  if (id === "materials") {
    title.textContent = "МАТЕРИАЛЫ К КУРСУ";
    text.textContent = "Раздел будет добавлен после загрузки материалов.";
  } else if (id === "extra") {
    title.textContent = "ДОПОЛНИТЕЛЬНЫЕ МАТЕРИАЛЫ";
    text.textContent = "Раздел будет добавлен после загрузки дополнительных материалов.";
  } else {
    title.textContent = "ЛОГИКА МОНТАЖА";
    text.textContent = "Я монтирую — ты смотришь.";
  }
  modal.classList.add("show");
}

document.querySelectorAll("[data-section]").forEach(el => {
  el.addEventListener("click", () => openSection(el.dataset.section));
});


document.getElementById("backHome").addEventListener("click", () => {
  sectionScreen.classList.remove("show");
  sectionScreen.setAttribute("aria-hidden", "true");
  lockBody(false);
});

document.getElementById("backSection").addEventListener("click", () => {
  lessonVideo.src = "";
  lessonScreen.classList.remove("show");
  lessonScreen.setAttribute("aria-hidden", "true");
  openSection(activeSection);
});

prevLesson.addEventListener("click", () => {
  if (activeLessonIndex > 0) openLesson(activeLessonIndex - 1);
});
nextLesson.addEventListener("click", () => {
  if (activeLessonIndex < course[activeSection].lessons.length - 1) openLesson(activeLessonIndex + 1);
});


lessonVideo.addEventListener("load", () => {
  videoFrame.classList.add("is-loaded");
});

completeLesson.addEventListener("click", () => {
  const lesson = course[activeSection]?.lessons?.[activeLessonIndex];
  if (!lesson) return;
  if (completed.has(lesson.id)) completed.delete(lesson.id);
  else completed.add(lesson.id);
  saveProgress();
  updateCompleteButton();
});

lessonSearch.addEventListener("input", () => {
  const query = lessonSearch.value.trim().toLowerCase();
  lessonList.querySelectorAll(".lesson-card").forEach(card => {
    card.classList.toggle("is-hidden", !card.dataset.title.includes(query));
  });
});

const profilePanel = document.getElementById("profilePanel");
const profileBackdrop = document.getElementById("profileBackdrop");
function setProfile(open){
  profilePanel.classList.toggle("show", open);
  profileBackdrop.classList.toggle("show", open);
  profilePanel.setAttribute("aria-hidden", String(!open));
}
document.getElementById("openProfile").addEventListener("click", () => setProfile(true));
document.getElementById("closeProfile").addEventListener("click", () => setProfile(false));
profileBackdrop.addEventListener("click", () => setProfile(false));

updateOverallProgress();

const modal = document.getElementById("modal");
document.getElementById("close").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});
