// Configuration - Edit these values
const SERVER_IP = 'Gamerytsmp.aternos.me'; // Change this to your actual server IP
const DISCORD_INVITE = 'https://discord.gg/9CrwuSNubU'; // Change to your Discord invite
const VOTE_URL = 'https://vote.yoursite.com'; // Change to your voting site
const STORE_URL = 'https://store.yoursite.com'; // Change to your store URL

// DOM Elements
const serverName = document.getElementById('server-name');
const serverTagline = document.getElementById('server-tagline');
const serverIpSpan = document.getElementById('server-ip');
const mcVersion = document.getElementById('mc-version');
const serverStatus = document.getElementById('server-status');
const playerCount = document.getElementById('player-count');
const joinIp = document.getElementById('join-ip');
const statusDisplay = document.getElementById('status-display');
const copyIpBtn = document.getElementById('copy-ip');
const voteBtn = document.getElementById('vote-btn');
const discordBtn = document.getElementById('discord-btn');
const buyBtns = document.querySelectorAll('.buy-btn');

// Set initial values
serverIpSpan.textContent = SERVER_IP;
joinIp.textContent = SERVER_IP;

// Copy IP functionality
copyIpBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        alert('Server IP copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

// Button links
voteBtn.addEventListener('click', () => {
    window.open(VOTE_URL, '_blank');
});

discordBtn.addEventListener('click', () => {
    window.open(DISCORD_INVITE, '_blank');
});

buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.open(STORE_URL, '_blank');
    });
});

// Fetch server status
async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/premium-in01.solohost.fun:25576
`);
        const data = await response.json();

        if (data.online) {
            serverStatus.textContent = '🟢 Online';
            playerCount.textContent = `${data.players.online} / ${data.players.max}`;
            statusDisplay.innerHTML = `
                <p><strong>Status:</strong> Online</p>
                <p><strong>Players:</strong> ${data.players.online}/${data.players.max}</p>
                <p><strong>MOTD:</strong> ${data.motd.clean.join(' ')}</p>
            `;
        } else {
            serverStatus.textContent = '🔴 Offline';
            playerCount.textContent = '0 / 0';
            statusDisplay.innerHTML = '<p>Server is currently offline.</p>';
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        serverStatus.textContent = '❌ Error';
        statusDisplay.innerHTML = '<p>Unable to fetch server status.</p>';
    }
}

// Initial fetch and set interval for auto-refresh every 10 seconds
fetchServerStatus();
setInterval(fetchServerStatus, 1000);
