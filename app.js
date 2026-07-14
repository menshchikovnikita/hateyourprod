const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  const user = tg.initDataUnsafe?.user;
  if (user?.first_name) {
    document.getElementById("avatarLetter").textContent = user.first_name[0].toUpperCase();
  }
}

const course = [
  {
    title: "Основы монтажа",
    lessons: [
      { id: "1-1", title: "Знакомство с курсом", duration: "08 мин", description: "Как устроен курс и как получить максимальный результат.", video: "" },
      { id: "1-2", title: "Интерфейс программы", duration: "14 мин", description: "Основные панели, таймлайн, медиатека и организация проекта.", video: "" },
      { id: "1-3", title: "Первый монтаж", duration: "22 мин", description: "Собираем первый ролик: импорт, нарезка, ритм и экспорт.", video: "" }
    ]
  },
  {
    title: "Динамичный монтаж",
    lessons: [
      { id: "2-1", title: "Ритм и музыкальные акценты", duration: "18 мин", description: "Как синхронизировать монтаж с музыкой и удерживать внимание.", video: "" },
      { id: "2-2", title: "Speed Ramp", duration: "16 мин", description: "Ускорения и замедления без ощущения дешёвого эффекта.", video: "" },
      { id: "2-3", title: "Переходы", duration: "20 мин", description: "Практичные переходы, которые работают в коммерческом видео.", video: "" }
    ]
  },
  {
    title: "Цвет и стиль",
    lessons: [
      { id: "3-1", title: "Базовая цветокоррекция", duration: "19 мин", description: "Экспозиция, баланс белого, контраст и работа с кожей.", video: "" },
      { id: "3-2", title: "LUT и авторский визуал", duration: "17 мин", description: "Как использовать LUT корректно и создавать собственный стиль.", video: "" }
    ]
  },
  {
    title: "Reels и Shorts",
    lessons: [
      { id: "4-1", title: "Хук первых секунд", duration: "13 мин", description: "Как собрать сильное начало ролика и не потерять зрителя.", video: "" },
      { id: "4-2", title: "Субтитры и графика", duration: "15 мин", description: "Читаемые субтитры и графика, которая усиливает монтаж.", video: "" },
      { id: "4-3", title: "Экспорт без потери качества", duration: "11 мин", description: "Оптимальные настройки для Instagram, TikTok и Telegram.", video: "" }
    ]
  }
];

const completed = new Set(JSON.parse(localStorage.getItem("bc_completed") || "[]"));
const modulesEl = document.getElementById("modules");
const modal = document.getElementById("lessonModal");
let activeLesson = null;

function render() {
  modulesEl.innerHTML = "";
  let total = 0;

  course.forEach((module, moduleIndex) => {
    total += module.lessons.length;
    const wrap = document.createElement("article");
    wrap.className = "module";
    wrap.innerHTML = `
      <div class="module-head">
        <div>
          <div class="module-index">МОДУЛЬ ${String(moduleIndex + 1).padStart(2, "0")}</div>
          <div class="module-title">${module.title}</div>
        </div>
        <div class="chevron">＋</div>
      </div>
      <div class="lessons">
        ${module.lessons.map((lesson, i) => `
          <div class="lesson ${completed.has(lesson.id) ? "completed" : ""}" data-id="${lesson.id}">
            <div class="lesson-num">${String(i + 1).padStart(2, "0")}</div>
            <div>
              <h4>${lesson.title}</h4>
              <p>${lesson.duration}</p>
            </div>
            <div class="done">✓</div>
          </div>
        `).join("")}
      </div>
    `;

    wrap.querySelector(".module-head").addEventListener("click", () => {
      wrap.classList.toggle("open");
    });

    wrap.querySelectorAll(".lesson").forEach(el => {
      el.addEventListener("click", () => {
        const lesson = module.lessons.find(x => x.id === el.dataset.id);
        openLesson(module.title, lesson);
      });
    });

    modulesEl.appendChild(wrap);
  });

  document.getElementById("lessonsCount").textContent = `${total} уроков`;
  const percent = total ? Math.round((completed.size / total) * 100) : 0;
  document.getElementById("progressText").textContent = `${percent}%`;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

function openLesson(moduleTitle, lesson) {
  activeLesson = lesson;
  document.getElementById("modalModule").textContent = moduleTitle.toUpperCase();
  document.getElementById("modalTitle").textContent = lesson.title;
  document.getElementById("modalDescription").textContent = lesson.description;

  const shell = document.getElementById("videoShell");
  if (lesson.video) {
    shell.innerHTML = `<iframe src="${lesson.video}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
  } else {
    shell.innerHTML = `<div class="video-placeholder"><div class="play">▶</div><p>Вставь сюда Kinescope-плеер</p></div>`;
  }

  document.getElementById("completeBtn").textContent =
    completed.has(lesson.id) ? "Урок уже пройден ✓" : "Отметить урок пройденным";

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

document.getElementById("completeBtn").addEventListener("click", () => {
  if (!activeLesson) return;
  completed.add(activeLesson.id);
  localStorage.setItem("bc_completed", JSON.stringify([...completed]));
  document.getElementById("completeBtn").textContent = "Урок уже пройден ✓";
  render();
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", e => {
  if (e.target === modal) document.getElementById("closeModal").click();
});

document.getElementById("chatBtn").addEventListener("click", () => {
  const url = "https://t.me/PUT_YOUR_CHAT_USERNAME";
  if (tg) tg.openTelegramLink(url);
  else window.open(url, "_blank");
});

document.getElementById("materialsBtn").addEventListener("click", () => {
  alert("Здесь можно добавить материалы курса: PDF, пресеты, исходники и ссылки.");
});

render();
