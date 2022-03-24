const cronJob = require("cron").CronJob;

function jobStatusStart() {
    console.log("Job started")
};

function jobStatusEnd() {
    console.log("JOB ENDED");
}

// to run every month */1
const schedOptions = {
    cronTime: '*/2 14 24 */1 4',
    onTick: jobStatusStart,
    onComplete: jobStatusEnd,
    timeZone: 'Africa/Lagos'
}

const job = new cronJob(schedOptions);
job.start();