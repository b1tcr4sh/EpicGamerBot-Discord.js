module.exports = {
    harder: function (message) {
        let randomInt = Math.random();
        if (randomInt < .05) {
            message.channel.send('Harder Daddy!');
        }
    }
}