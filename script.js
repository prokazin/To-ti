const cars = [
  { name: "Москвич 412", https://raw.githubusercontent.com/prokazin/To-ti/main/images/moskvich412.png },
  { name: "ВАЗ 2107", https://raw.githubusercontent.com/prokazin/To-ti/main/images/vaz2107.png" },
  { name: "Toyota Mark II", https://raw.githubusercontent.com/prokazin/To-ti/main/images/mark2.png" },
  { name: "Газель NEXT", https://raw.githubusercontent.com/prokazin/To-ti/main/images/gazel.png" },
  { name: "УАЗ Hunter", https://raw.githubusercontent.com/prokazin/To-ti/main/images/uaz.png" },
];

const types = ["на газу", "в тюнинге", "без глушителя", "на коврах", "с душой"];
const traits = [
  "Не заводишься — но тебя уважают.",
  "Любишь стоять во дворе и философствовать.",
  "Громкий, дерзкий и без тормозов.",
  "Пахнешь бензином и ностальгией.",
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const car = random(cars);
  const type = random(types);
  const trait = random(traits);

  document.getElementById("personaText").innerText = `Ты — ${car.name} ${type}! ${trait}`;
  document.getElementById("carImage").src = car.image;
  document.getElementById("carImage").alt = car.name;

  document.getElementById("result").classList.remove("hidden");
});

// Заглушка для VK Share (реально подключим позже)
document.getElementById("shareBtn").addEventListener("click", () => {
  alert("Функция 'Поделиться' появится после подключения к ВКонтакте.");
});

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
