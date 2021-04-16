const { Channel } = require("discord.js");
const Rcon = require("rcon");

module.exports = {
    name: 'mcserver',
    description: "An array of commands for interacting with the minecraft server.",
    permissions: 'User',
    disabled: false,
    execute(message, args) {
        const acceptedArgs = ['ip', 'help', 'start'];
        if (!args.length) return message.channel.send('This command requires arguments!  Type "?mcserver help" for a list of supported arguments');
        

        if (args[0] === acceptedArgs[0]) {message.channel.send('The Bois Minecraft SMP IP: 54.39.252.230:25573')}
        else if (args[0] === acceptedArgs[1]) {
            message.channel.send('Currently Supported Arguments:');
            acceptedArgs.forEach(element => {
                message.channel.send('- ' + element);
            })
        }
        else if (args[0] === acceptedArgs[2]) {
            message.channel.send('This command is not currently functional!  Try again later');

            /*
            var options = {
                tcp: true,
                challenge: false
            };
            rconClient = new Rcon('54.39.252.230', '4864', 'UwUmoment', options);
            
            message.channel.send('RCON request sent... Awaiting response');
            rconClient.on('auth', function() {
                console.log('Authorized!');
            })
            rconClient.on('response', function(str) {
                message.channel.send(`Got Response: ${str}`);
            })
            rconClient.on('end', function() {
                console.log('Socket Closed');
                process.exit();
            })
            rconClient.on('error', function(error){
                message.channel.send(error);
            })

            rconClient.connect();
            */
        }
        else return message.channel.send(`Unsupported Argument: ${args[0]}`);
    }
}