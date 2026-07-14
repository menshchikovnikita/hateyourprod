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
        "title": "Теория",
        "url": "https://kinescope.io/uvgNYjcjs6w27qpgYTdw7j/plIizIPE"
      },
      {
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
        "title": "База. Отбор кадров.",
        "url": "https://kinescope.io/wPpgvn5qyc43cWcjQV8B5b/plRKqpMX"
      },
      {
        "title": "Отбор кадров #2",
        "url": "https://kinescope.io/rUzmw3Fv1nxBoJptqWCN2v"
      },
      {
        "title": "Сборка интро",
        "url": "https://kinescope.io/ck3Y39GuT96EGM275Ktn2w/pll1GDzJ"
      },
      {
        "title": "Чистовой монтаж",
        "url": "https://kinescope.io/cjKA6C6gSt1wWkK88ugiDh/plwmkiOU"
      },
      {
        "title": "Цвет финал",
        "url": "https://kinescope.io/0mGtC6yxEe3jBigTRkmHjq/pl6pbouI"
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
const openExternal = document.getElementById("openExternal");
const prevLesson = document.getElementById("prevLesson");
const nextLesson = document.getElementById("nextLesson");

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

  lessonList.innerHTML = section.lessons.map((lesson, index) => `
    <button class="lesson-card" data-lesson="${index}">
      <span class="lesson-num">${String(index + 1).padStart(2, "0")}</span>
      <span>
        <strong>${lesson.title}</strong>
        <small>СМОТРЕТЬ УРОК</small>
      </span>
      <span class="lesson-arrow">↗</span>
    </button>
  `).join("");

  lessonList.querySelectorAll("[data-lesson]").forEach(btn => {
    btn.addEventListener("click", () => openLesson(Number(btn.dataset.lesson)));
  });

  sectionScreen.classList.add("show");
  sectionScreen.setAttribute("aria-hidden", "false");
  lockBody(true);
}

function openLesson(index) {
  const section = course[activeSection];
  const lesson = section.lessons[index];
  activeLessonIndex = index;

  lessonVideo.src = lesson.url;
  lessonSectionLabel.textContent = `РАЗДЕЛ ${section.index}`;
  lessonHeaderTitle.textContent = section.title;
  lessonKicker.textContent = `УРОК ${String(index + 1).padStart(2, "0")}`;
  lessonTitle.textContent = lesson.title;
  openExternal.href = lesson.url;

  prevLesson.disabled = index === 0;
  nextLesson.disabled = index === section.lessons.length - 1;

  lessonScreen.classList.add("show");
  lessonScreen.setAttribute("aria-hidden", "false");
  sectionScreen.classList.remove("show");
}

function openInfo(id) {
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
  sectionScreen.classList.add("show");
});

prevLesson.addEventListener("click", () => {
  if (activeLessonIndex > 0) openLesson(activeLessonIndex - 1);
});
nextLesson.addEventListener("click", () => {
  if (activeLessonIndex < course[activeSection].lessons.length - 1) openLesson(activeLessonIndex + 1);
});

const modal = document.getElementById("modal");
document.getElementById("close").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});
