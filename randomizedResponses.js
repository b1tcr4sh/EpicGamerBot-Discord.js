module.exports = {
    sendRandomMessage: function (message) {
        const messages = ['Harder Daddy!', 'Shut the Fuck Up', 'Your Mom!!', 'Get Bonked Child']

        let randomInt = Math.random();
        if (randomInt < .02) {
            message.reply(messages[Math.floor(Math.random() * messages.length)])
            .catch(error => console.error(error));
        }
    }
}