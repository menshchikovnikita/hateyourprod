// Supabase: проверка доступа по Telegram ID
const SUPABASE_URL = "https://luubcpgvsftmdxkoymiw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6ZUQv65vku0qGTQj3MiBOw_Hfl-mYss";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkAccess() {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const telegramId = tgUser?.id;

  if (!telegramId) return false;

  try {
    const { data, error } = await supabaseClient
      .from("KURS")
      .select("id")
      .eq("telegram_id", telegramId)
      .limit(1);

    if (error) {
      console.error("Ошибка проверки доступа:", error);
      return false;
    }
    return Array.isArray(data) && data.length > 0;
  } catch (e) {
    console.error("Ошибка запроса к Supabase:", e);
    return false;
  }
}

// Splash animation: HATE YOUR PROD flows into BILLIONAIRES CLUB.
window.addEventListener("load", async () => {
  const loader = document.getElementById("loaderScreen");
  const deniedScreen = document.getElementById("accessDeniedScreen");
  if (!loader) return;

  document.body.style.overflow = "hidden";

  const [allowed] = await Promise.all([
    checkAccess(),
    new Promise(resolve => window.setTimeout(resolve, 3450))
  ]);

  if (!allowed) {
    loader.remove();
    deniedScreen.classList.add("is-visible");
    deniedScreen.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    return;
  }

  loader.classList.add("is-hidden");
  document.body.style.overflow = "";

  window.setTimeout(() => {
    loader.remove();
  }, 750);
  document.body.classList.add('app-ready');
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
