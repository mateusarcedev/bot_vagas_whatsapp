const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const axios = require("axios");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Cliente está pronto!");
});

client.on("message", async (message) => {
  const messageBody = message.body.toLowerCase();

  if (messageBody == "oi" || messageBody == "menu") {
    const menu = `
🌟 *SEJA BEM-VINDO AO BOT DE VAGAS* 🌟

Escolha uma opção:

1️⃣ - VAGAS ANDROID
2️⃣ - VAGAS BACKEND
3️⃣ - VAGAS FRONTEND
4️⃣ - VAGAS JAVA
5️⃣ - VAGAS QA
6️⃣ - VAGAS REACT
7️⃣ - VAGAS UX
8️⃣ - VAGAS JR OU ESTÁGIO`;

    message.reply(menu);
  }

  switch (messageBody) {
    case "1":
      await sendJobsToWhatsApp(message.from, "androiddevbr/vagas");
      break;
    case "2":
      androiddevbr / vagas;
      await sendJobsToWhatsApp(message.from, "backend-br/vagas");
      break;
    case "3":
      await sendJobsToWhatsApp(message.from, "frontendbr/vagas");
    case "4":
      await sendJobsToWhatsApp(message.from, "soujava/vagas-java");
    case "5":
      await sendJobsToWhatsApp(message.from, "qa-brasil/vagas");
    case "6":
      await sendJobsToWhatsApp(message.from, "react-brasil/vagas");
    case "7":
      await sendJobsToWhatsApp(message.from, "remotejobsbr/design-ux-vagas");
    case "8":
      await sendJobsToWhatsApp(
        message.from,
        "alinebastos/vagas-junior-estagio"
      );
    default:
      break;
  }
});

client.initialize();

async function sendJobsToWhatsApp(sender, repository) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repository}/issues`
    );
    const issues = response.data;
    let issuesText = "";

    issues.forEach((issue) => {
      issuesText += `*${issue.title}*\n${issue.html_url}\n\n`;
    });

    await client.sendMessage(sender, issuesText);
  } catch (error) {
    console.error("Erro ao enviar issues para o WhatsApp:", error);
  }
}
