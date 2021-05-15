// Needs to be refactored into a class


async function sendStatusUpdateMessage(message, Discord) {
    let statusMessage = await fetchStatusUpdate();
    console.log(statusMessage);
    if (statusMessage === -1) return message.reply('No new status updates were available');

    // Send Embed Containing Status title and Snippets
}

async function fetchStatusUpdate() {
    const previousStatusCache = require('./previousShockbyteStatus.json');
    const parser = new Parser();

    let currentFeed = await parser.parseURL('https://status.shockbyte.com/history.rss');
    const currentStatus = await findCurrentStatus(currentFeed);
    const previousStatus = JSON.parse(previousStatusCache);

    if (isUpdatedStatus(currentStatus, previousStatus)) {
        console.log('Found new status update!');

        updateCache(currentStatus);
        return currentStatus
    }
    else {
        return -1;
    }
}
function isUpdatedStatus(currentStatus, previousStatus) {
    if (currentStatus !== previousStatus) {
        console.log(`Found new status update from Shockbyte: ${currentStatus.title}`)
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
async function updateCache(currentStatus) {
    if (currentStatus === undefined) {
        const parser = new Parser();
        let currentFeed = await parser.parseURL('https://status.shockbyte.com/history.rss');

        var currentStatus = findCurrentStatus(currentFeed);
    }
    fs.writeFileSync('../previousShockbyteStatus.json', JSON.stringify(currentStatus));
}