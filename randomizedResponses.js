module.exports = {
    harder: function (message) {
        let randomInt = Math.random();
        if (randomInt < .02) {
            message.reply('Harder Daddy!');
        }
    }
}