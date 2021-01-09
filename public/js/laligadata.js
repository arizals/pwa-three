function laligaDataTeams(data) {
    let teamsHTML = "";
    data.teams.forEach(function (team) {
        teamsHTML += `
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-content center">
                        <span class="card-title grey-text text-darken-4 truncate">${team.name}</span>
                    </div>
                    <div class="card-image waves-effect waves-block waves-light card-image-custom">
                        <a href="./club.html?id=${team.id}">
                            <img src="${team.crestUrl}" class="responsive-img" onerror="this.onerror=null; this.src='/images/laliga-256.png'">
                        </a>
                    </div>
                    <div class="card-content center">
                        <p>${team.website}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("clubs").innerHTML = teamsHTML;
}

function laligaTeamDetail(data) {
    const teamHTML = `
        <div class="card mt-2">
            <div class="card-content center">
                <span class="card-title grey-text text-darken-4 truncate">${data.name}</span>
            </div>

            <div class="row">
                <div class="col s12 m3 center card-content card-image-custom">
                    <img src="${data.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                    )}" class="responsive-img"/> 
                </div>
                <div class="col s12 m9 card-content">
                    <table>
                        <tbody>
                            <tr>
                                <th>Team Name</th>
                                <td>${data.name}</td>
                            </tr>
                            <tr>
                                <th>Short Name</th>
                                <td>${data.shortName ? data.shortName : "-"}</td>
                            </tr>
                            <tr>
                                <th>Club Colors</th>
                                <td>${data.clubColors ? data.clubColors : "-"}</td>
                            </tr>
                            <tr>
                                <th>Venue</th>
                                <td>${data.venue ? data.venue : "-"}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>${data.address ? data.address : "-"}</td>
                            </tr>
                                <th>Country</th>
                                <td>${data.area.name ? data.area.name : "-"}</td>
                            </tr>
                            <tr>
                                <th>Founded</th>
                                <td>${data.founded ? data.founded : "-"}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>${data.website ? data.website : "-"}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>${data.email ? data.email : "-"}</td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>

        </div>
    `;
    document.getElementById("content").innerHTML = teamHTML;
}

function laligaStandings(data) {
    let standingSeason = `
        <div class="card">
            <div class="card-content center">
                <p>Start: <b>${data.season.startDate}</b> - End: <b>${data.season.endDate}</b></p>
            </div>            
        </div>
    `;
    let standingTableHTML = "";
    data.standings.forEach(function (standing) {
        let dataStanding = "";
        standing.table.forEach(function (dataClub) {
            dataClub = JSON.parse(
                JSON.stringify(dataClub).replace(/http:/g, "https:")
            );
            dataStanding += `
            <tr>
                <td class="center-align">${dataClub.position}</td>
                <td class="">
                <a href="./club.html?id=${dataClub.team.id}">
                    <p class="hide-on-small-only">
                        <img class ="show-on-medium-and-up show-on-medium-and-down img-club-standing" src=${dataClub.team.crestUrl}  alt="logo">
                        ${dataClub.team.name}
                    </p>
                    <p class="hide-on-med-and-up">
                        <img src=${dataClub.team.crestUrl}  alt="logo" class="img-club-standing">
                    </p>
                </a>
                </td>
                <td class="center-align">${dataClub.playedGames}</td>
                <td class="center-align">${dataClub.won}</td>
                <td class="center-align">${dataClub.draw}</td>
                <td class="center-align">${dataClub.lost}</td>
                <td class="center-align">${dataClub.goalsFor}</td>
                <td class="center-align">${dataClub.goalsAgainst}</td>
                <td class="center-align">${dataClub.goalDifference}</td>
                <td class="center-align">${dataClub.points}</td>
            </tr>`;
        });

        standingTableHTML += `
            <div class="card">
                <div class="card-content">
                    <table class="responsive-table striped" >
                        <thead>
                        <tr>
                            <th class="center-align">Position</th>
                            <th>Team</th>
                            <th class="center-align">Played</th>
                            <th class="center-align">Won</th>
                            <th class="center-align">Draw</th>
                            <th class="center-align">Lost</th>
                            <th class="center-align">GF</th>
                            <th class="center-align">GA</th>
                            <th class="center-align">GD</th>
                            <th class="center-align">Points</th>
                        </tr>
                        </thead>
                        <tbody>` +
            dataStanding +
            `</tbody>
                    </table>
                </div>
            </div>`;
    });
    document.getElementById("standings").innerHTML = standingSeason + standingTableHTML;
}