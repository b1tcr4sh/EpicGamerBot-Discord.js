module.exports = {
    async connectDB() {
        const mongoose = require(mongoose);

        const user = 'admin';
        const password = 'EKf31706';
        const hostname = '127.0.0.1';
        const port = '27017';
        const dbName = 'discordBot';

        const url = `mongodb://${user}:${password}@${hostname}:${port}/${dbName}?authSource=admin`;

        mongoose.connect(url, {useNewUrlParser: true});
        const db = mongoose.connection;
        
        db.on('error', error => {
            return console.error(error)
        });
        db.once('open', () => console.log(`Connected to DB on ${hostname}:${port}`))
    }
}