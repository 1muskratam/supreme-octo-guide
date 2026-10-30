"use strict";
const products=[
  {
    "title": "Двухслойные самоклеящиеся этикетки",
    "image": "assets/74640.png",
    "description": "Больше информации на той же площади. Двухслойная конструкция позволяет разместить дополнительное описание продукта и инструкции."
  },
  {
    "title": "Самоклеящиеся этикетки на бумаге",
    "image": "assets/f07f8.png",
    "description": "Бумажные этикетки для оформления продукции. Поможем подобрать материал, формат и способ отделки под вашу задачу."
  },
  {
    "title": "Самоклеящиеся этикетки на плёнке",
    "image": "assets/faa56.png",
    "description": "Плёночная основа для выразительного оформления упаковки. Подберём решение с учётом условий использования продукта."
  },
  {
    "title": "Самоклеящиеся этикетки на металлизированной основе",
    "image": "assets/1209a.png",
    "description": "Металлизированная основа придаёт оформлению выразительный блеск и помогает выделить отдельные элементы дизайна."
  },
  {
    "title": "Этикетки-пломбы",
    "image": "assets/27b25.png",
    "description": "Этикетки для контроля вскрытия упаковки. Материал и конструкцию подбираем под поверхность и условия применения."
  },
  {
    "title": "Этикетки на термобумаге",
    "image": "assets/ad95c.png",
    "description": "Решения для переменной информации и маркировки. Уточним размер, требования к печати и совместимость с вашим оборудованием."
  },
  {
    "title": "Этикетки на прозрачной плёнке",
    "image": "assets/32a33.png",
    "description": "Прозрачная основа сохраняет видимость упаковки и продукта. Обсудим особенности макета и печати на выбранном материале."
  },
  {
    "title": "Этикетки с тиснением фольгой",
    "image": "assets/36363.png",
    "description": "Акцентная отделка фольгой для логотипа, надписей и декоративных элементов. Поможем подготовить макет к производству."
  }
];
const menuToggle=document.querySelector(".menu-toggle");
const menu=document.querySelector("#main-menu");
function closeMenu(){menu.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Открыть меню");}
menuToggle.addEventListener("click",()=>{const open=menuToggle.getAttribute("aria-expanded")!=="true";menu.classList.toggle("is-open",open);menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Закрыть меню":"Открыть меню");});
menu.addEventListener("click",e=>{if(e.target.closest("a"))closeMenu();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
const dialog=document.querySelector("#info-dialog"),dialogTitle=document.querySelector("#dialog-title"),dialogDescription=document.querySelector("#dialog-description"),dialogImage=document.querySelector(".dialog-image"),dialogContact=document.querySelector("#dialog-contact");
let previousFocus=null;
function openDialog(title,description,image,contact=true){previousFocus=document.activeElement;dialogTitle.textContent=title;dialogDescription.textContent=description;dialogImage.hidden=!image;if(image){dialogImage.src=image;dialogImage.alt=title;}else{dialogImage.removeAttribute("src");dialogImage.alt="";}dialogContact.hidden=!contact;dialog.showModal();document.body.classList.add("modal-open");}
document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>{const p=products[Number(button.dataset.product)];openDialog(p.title,p.description,p.image);}));
document.querySelector("[data-open-about]").addEventListener("click",()=>openDialog("Надёжный партнёр в мире этикетки","MEGAFLEX — производственная компания, основанная в 2023 году в Казахстане. Мы объединяем опыт команды, технологии печати и внимательный сервис.\n\nРаботаем с бумажными и плёночными материалами, флексографической печатью и послепечатной отделкой. Сопровождаем проект от подготовки макета до готового рулона.\n\nСвяжитесь с нами — обсудим материал, тираж, формат и особенности вашей продукции."));
document.querySelector("[data-open-privacy]").addEventListener("click",()=>openDialog("Конфиденциальность","На этой странице нет формы сбора персональных данных. Для связи используются ссылки на телефон, электронную почту и WhatsApp.\n\nПри переходе во внешние приложения действуют их условия обработки данных. Информацию, которую вы отправляете MEGAFLEX по почте или в мессенджере, вы передаёте для обсуждения вашего обращения.\n\nПо вопросам обработки ваших обращений напишите на megaflex.kz@mail.ru.",null,false));
document.querySelectorAll("[data-social]").forEach(button=>button.addEventListener("click",()=>openDialog(button.dataset.social+" — MEGAFLEX","Ссылка на официальный аккаунт пока не указана. Свяжитесь с нашей командой по телефону, электронной почте или в WhatsApp.")));
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener("close",()=>{document.body.classList.remove("modal-open");previousFocus?.focus();});
dialogContact.addEventListener("click",()=>dialog.close());

