const spawn = require('child_process').spawn;
const wmic = spawn('wmic', []);

let cpuUsage = 0;
let updateDelaySeconds = 10;

wmic.stdout.on('data', (data) => {
    if (!data.toString().includes('wmic:root')) {
        const value = parseInt(data.toString().split(',')[2]);
        if (!isNaN(value)) cpuUsage = value;
    }
});

wmic.stderr.on('data', (data) => {
    console.log('Error! - ' + data);
});

wmic.on('close', (code) => {
    console.log('Spawned process ended with code: ' + code);
});

wmic.stdin.end(`cpu get loadpercentage /format:csv /EVERY:${updateDelaySeconds}`);

function getCPUPercent() {
    return cpuUsage;
}

module.exports = {
    cpuPercentage: getCPUPercent,
};
