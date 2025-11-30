(async function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // повторяем, пока в списке есть хоть один чат
  while (true) {
    // первый чат в списке слева
    const firstChat = document.querySelector("[data-qa^='chatik-open-chat-']");
    if (!firstChat) {
      alert("Чаты закончились 🎉");
      break;
    }

    // открыть чат
    firstChat.scrollIntoView({ block: "center" });
    firstChat.click();
    await sleep(800);

    // кнопка меню в шапке чата
    let menuBtn = null;
    for (let i = 0; i < 15; i++) {
      menuBtn =
        document.querySelector("[data-qa='chatik-chat-menu']") ||
        document.querySelector("div.main-content--duqM70SHgIZ7Kw4a div.header--jAe1p3UW6UE0bk7P svg");
      if (menuBtn) break;
      await sleep(200);
    }
    if (!menuBtn) continue;
    menuBtn.click();
    await sleep(400);

    // кнопка «Покинуть чат»
    let leaveBtn = null;
    for (let i = 0; i < 15; i++) {
      leaveBtn =
        document.querySelector("[data-qa='chatik-chat-leave-chat'] span.magritte-button__label___zplmt_6-0-21") ||
        Array.from(document.querySelectorAll("[data-qa='chatik-chat-leave-chat'] span, span"))
          .find(el => /Покинуть чат/i.test(el.textContent || ""));
      if (leaveBtn) break;
      await sleep(200);
    }
    if (!leaveBtn) continue;
    leaveBtn.click();

    // даём hh время убрать чат из списка
    await sleep(1000);
  }
})();
