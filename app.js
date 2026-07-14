const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor("#000000"); tg.setBackgroundColor("#000000"); } catch(e) {}
}

const data = {
  intro: {
    kicker: "РАЗДЕЛ 01",
    title: "ИНТРО",
    text: "Старт курса и логика прохождения.",
    items: ["Вступление", "Как устроен курс", "Что будет на выходе"]
  },
  theory: {
    kicker: "РАЗДЕЛ 02",
    title: "ТЕОРИЯ",
    text: "Мышление монтажёра, ритм, драматургия и работа со вниманием.",
    items: ["Логика кадра", "Ритм и внимание", "Драматургия короткого видео"]
  },
  editing: {
    kicker: "РАЗДЕЛ 03",
    title: "МОНТАЖ",
    text: "Практический процесс от отбора материала до финального экспорта.",
    items: ["Отбор кадров", "Сборка интро", "Чистовой монтаж", "Цвет и финал"]
  },
  materials: {
    kicker: "РАЗДЕЛ 04",
    title: "МАТЕРИАЛЫ К КУРСУ",
    text: "Файлы и ресурсы для прохождения курса.",
    items: ["Исходники", "Музыка", "Шрифты", "Пресеты"]
  },
  extra: {
    kicker: "РАЗДЕЛ 05",
    title: "ДОПОЛНИТЕЛЬНЫЕ МАТЕРИАЛЫ",
    text: "Дополнительные разборы, бонусы и полезные ресурсы.",
    items: ["Полезные ссылки", "Дополнительные разборы", "Бонусные материалы"]
  },
  info: {
    kicker: "HATE YOUR PROD",
    title: "ЛОГИКА МОНТАЖА",
    text: "Я монтирую — ты смотришь.",
    items: ["Авторский курс", "BILLIONAIRES CLUB", "Telegram Mini App"]
  }
};

const modal = document.getElementById("modal");
const kicker = document.getElementById("kicker");
const title = document.getElementById("title");
const text = document.getElementById("text");
const items = document.getElementById("items");

function openSection(id){
  const d = data[id];
  if(!d) return;
  kicker.textContent = d.kicker;
  title.textContent = d.title;
  text.textContent = d.text;
  items.innerHTML = d.items.map((v,i)=>`<div class="item"><span>${String(i+1).padStart(2,"0")} — ${v}</span><span>↗</span></div>`).join("");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}

document.querySelectorAll("[data-section]").forEach(el=>{
  el.addEventListener("click",()=>openSection(el.dataset.section));
});

document.querySelectorAll("[data-scroll]").forEach(el=>{
  el.addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  });
});

document.getElementById("close").addEventListener("click",()=>{
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
});

modal.addEventListener("click",e=>{
  if(e.target===modal){
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");
  }
});
