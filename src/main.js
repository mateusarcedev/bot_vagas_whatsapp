const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const axios = require('axios');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('message', async (message) => {
    const messageBody = message.body.toLowerCase(); 
    switch(messageBody) {
        case '1':
            message.reply('Resposta para o caso 1');
            break;
        case 'vagas_back':
            await sendBackJobsToWhatsApp(message.from)
            break;
        case 'vagas_front':
            await sendFrontJobsToWhatsApp(message.from);
            break;
        default:
            message.reply('Mensagem não reconhecida.');
            break;
    }
});

client.initialize();

async function sendFrontJobsToWhatsApp(sender) {
    try {
        const response = await axios.get('https://api.github.com/repos/frontendbr/vagas/issues');
        const issues = response.data;
        let issuesText = '';

        issues.forEach(issue => {
            issuesText += `*${issue.title}*\n${issue.html_url}\n\n`;
        });

        await client.sendMessage(sender, issuesText);
    } catch (error) {
        console.error('Erro ao enviar issues para o WhatsApp:', error);
    }
}



async function sendBackJobsToWhatsApp(sender) {
    try {
        const response = await axios.get('https://api.github.com/repos/backend-br/vagas/issues')
        const issues = response.data
        let issuesText = ''

        issues.forEach(issue => {
            issuesText += `*${issue.title}*\n${issue.html_url}\n\n`;
        })

        await client.sendMessage(sender, issuesText)
    } catch(error) {
        console.error('Erro ao enviar issues para o WhatsApp:', error);
    }
}