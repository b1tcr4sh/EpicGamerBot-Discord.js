const Event = require('../models/serverEvents');

module.exports = {
    async create(message, title, desc, date, participants, recoccurring) {
        let newEvent = new Event({
            title: title,
            description: desc,
            time: date,
            participants: participants,
            recoccurring: recoccurring
        })
        await newEvent.save(error => {
            if (error) {
                console.error(`Was unable to save new event: ${title} to mongoDB`);
                Message.reply(`Was unable to write event ${title} to the database`);
                return;
            }
            else {
                console.log(`Successfully wrote ${title} to mongoDB`);
            }
        })
    }
}