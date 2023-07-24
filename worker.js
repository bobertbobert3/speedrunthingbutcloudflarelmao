addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    let lastSavedDate = new Date('1970-01-01');
    let run = '';

    async function fetchLatestRun() {
        if (new Date().toISOString().split('T')[0] > lastSavedDate.toISOString().split('T')[0]) {
            const url = 'https://www.speedrun.com/api/v1/categories/mkeyl926/variables';
            const response = await fetch(url);
            const data = await response.json();

            const variableId = 'mln68v0q';
            const label = data.data[0].values.values[variableId].label;

            const values = {
                r8rg67rn: '21d4zvp1',
                wl33kew: '4qye4731',
            };

            let leaderboardUrl = 'https://www.speedrun.com/api/v1/leaderboards/j1npme6p/category/mkeyl926';
            leaderboardUrl += `?top=1&var-r8rg67rn=${values.r8rg67rn}&var-wl33kew=${values.wl33kew}`;

            const leaderboardResponse = await fetch(leaderboardUrl);
            const leaderboardData = await leaderboardResponse.json();
            const runData = leaderboardData.data.runs[0].run;
            run = runData.videos.links[0].uri;
            lastSavedDate = new Date().toISOString().split('T')[0];
        }
    }

    await fetchLatestRun();
    return Response("", {
        status: 302,
        headers: {
            "X-Source":
                "https://github.com/bobertbobert3/speedrunthingbutcloudflarelmao",
            "Location": run,
            "Cache-Control": "no-cache",
        },
    });
}
// bro has the most nonsensical commit messages i have ever seen