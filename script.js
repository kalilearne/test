async function loadData() {
    const response = await fetch('data.txt');
    const dataText = await response.text();
    const data = JSON.parse(dataText);
    return data;
}

function updateLeaderboard(data) {
    const leaderboard = document.getElementById('leaderboard');
    const newRows = data.map(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.rank}</td>
            <td>${item.player}</td>
            <td>${item.score}</td>
        `;
        return row;
    });

    while (leaderboard.firstChild) {
        leaderboard.removeChild(leaderboard.firstChild);
    }

    newRows.forEach(row => leaderboard.appendChild(row));
}

loadData().then(data => {
    updateLeaderboard(data);
});
