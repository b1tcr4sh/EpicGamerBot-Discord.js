const Parser = require('rss-parser');
const fs = require('fs/promises');

module.exports = {
    async sendStatusUpdateMessage(message, Discord) {
        let statusMessage = await fetchStatusUpdate();
        if (statusMessage === -1) return message.reply('No new status updates were available');

        // Send Embed Containing Status title and Snippets
    },
     async updateCache(currentStatus) {
        if (currentStatus === undefined) {
            const parser = new Parser();
            let currentFeed = await parser.parseURL('https://status.shockbyte.com/history.rss');

            var currentStatus = findCurrentStatus(currentFeed)
            console.log(currentStatus);
        }
        
        await fs.writeFile('previousShockbyteStatus.json', JSON.stringify(currentStatus, ['content'], '\t'), error => {
            if (error) console.error(error);
        })
    }
}

async function fetchStatusUpdate() {
    const previousStatusCache = require('./previousShockbyteStatus.json');
    const parser = new Parser();

    let currentFeed = await parser.parseURL('https://status.shockbyte.com/history.rss');
    const currentStatus = await findCurrentStatus(currentFeed);
    const previousStatus = previousStatusCache;
    console.log(previousStatus);

    if (isUpdatedStatus(currentStatus, previousStatus)) {
        console.log('Found new status update!');
        console.log(currentStatus);

        module.exports.updateCache(currentStatus); //Undefined (Needs to access upper object)
        return currentStatus
    }
    else {
        return -1;
    }
}
function isUpdatedStatus(currentStatus, previousStatus) {
    if (currentStatus !== previousStatus) {
        return true;
    } else {
        return false;
    }
}
function findCurrentStatus(currentFeed) {
    for (const element of currentFeed.items) {
        if (element.title.includes('NA')) {
            return element
        }
    }
}