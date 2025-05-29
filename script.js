vkBridge.send("VKWebAppInit");

let userName = "Гость";

vkBridge.send("VKWebAppGetUserInfo")
  .then(data => {
    userName = `${data.first_name} ${data.last_name}`;
  })
  .catch(console.error);

document.getElementById("generateBtn").addEventListener("click", () => {
  const car = random(cars);
  const type = random(types);
  const trait = random(traits);

  document.getElementById("personaText").innerText = `${userName}, ты — ${car.name} ${type}! ${trait}`;
  document.getElementById("carImage").src = car.image;
  document.getElementById("carImage").alt = car.name;
  document.getElementById("result").classList.remove("hidden");

  // Сохраняем для share
  lastResult = { car, type, trait };
});

let lastResult;

document.getElementById("shareBtn").addEventListener("click", () => {
  const { car, type, trait } = lastResult || {};
  const message = `${userName} узнал, что он — ${car.name} ${type}!\n${trait}\nПопробуй и ты! 🚗`;

  vkBridge.send("VKWebAppShare", {
    link: "https://auto-persona.vercel.app" // ← замени на актуальную ссылку
  });
});
