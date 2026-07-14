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
  }, 3450);
});


const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor("#050505");
    tg.setBackgroundColor("#050505");
  } catch(e) {}
}

document.querySelectorAll(".video-shell").forEach(shell => {
  const button = shell.querySelector(".video-poster");
  button.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = shell.dataset.video;
    iframe.title = "Видео урока";
    iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    shell.innerHTML = "";
    shell.appendChild(iframe);
  });
});

const key = "hyp_long_course_progress";
const completed = new Set(JSON.parse(localStorage.getItem(key) || "[]"));

function renderProgress(){
  document.querySelectorAll(".lesson-card").forEach(card => {
    card.classList.toggle("is-complete", completed.has(card.dataset.lessonId));
  });
}

document.querySelectorAll(".complete-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".lesson-card");
    const id = card.dataset.lessonId;
    if (completed.has(id)) completed.delete(id);
    else completed.add(id);
    localStorage.setItem(key, JSON.stringify([...completed]));
    renderProgress();
  });
});

renderProgress();
