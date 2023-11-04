function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getRandom() {
    return parseInt(Math.random() * 60)
}

(() => {
    // Get the current date and time
    const currentDate = new Date();

    // Calculate the date and time 7 days ago
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setMinutes(currentDate.getMinutes() - 4 * 60);

    // Initialize a loop counter and an array to store the dates
    let loopDate = new Date(sevenDaysAgo);

    // Run the loop until the loopDate is less than or equal to the current date
    // console.log("timestamp,metric_name,metric_value")
    while (loopDate <= currentDate) {
        console.log(`usage,${formatDateTime(loopDate)},${getRandom()},3.16_101.71`)
        loopDate.setMinutes(loopDate.getMinutes() + 1); // Increment the date by 1 minute
    }
})()