const base_url = "https://api.football-data.org/v2/";
const id_liga = "2014"; // id for la liga

const endpoint_leagueteam = `${base_url}competitions/${id_liga}/teams`;
const endpoint_team = `${base_url}teams/`;
const endpoint_standing = `${base_url}competitions/${id_liga}/standings?standingType=TOTAL`;

const API_KEY = "e87537791f70438e9a67c30cd910664b";
const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(endpoint_leagueteam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          laligaDataTeams(data);
        });
      }
    });
  }

  fetchApi(endpoint_leagueteam)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      laligaDataTeams(data);
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(endpoint_team + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            laligaTeamDetail(data);
          });
        }
      });
    }

    fetchApi(endpoint_team + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        laligaTeamDetail(data);
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    let savedTeamsHTML = "";
    if (teams.length !== 0) {
      teams.forEach(function (team) {
        savedTeamsHTML += `
          <div class="col s12 m4 l4">
            <div class="card">
              <div class="card-content center">
                <span class="card-title grey-text text-darken-4 truncate">${
                  team.name
                }</span>
              </div>
              <div class="card-image waves-effect waves-block waves-light card-image-custom">
                <a href="./club.html?id=${team.id}&saved=true">
                <img src="${
                  team.crestUrl !== null
                    ? team.crestUrl.replace(/^http:\/\//i, "https://")
                    : "img/na.png"
                }" class="responsive-img" onerror="this.onerror=null; this.src='/images/laliga-256.png'">
                </a>
              </div>
              <div class="card-content center">
                <p>${team.website}</p>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      savedTeamsHTML += `
        <div class="col s12">
          <div class="card">
            <div class="card-content center">
              <span class="card-title grey-text text-darken-4 truncate">No Saved Teams</span>
            </div>
            <div class="card-content center">
              <p>Please Search Your Favorite Team</p>
            </div>            
          </div>
        </div>
      `;
    }
    document.getElementById("favorites").innerHTML = savedTeamsHTML;
  });
}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getSavedById(idParam).then(function (data) {
    console.log(data);
    laligaTeamDetail(data);
  });
}

function getStanding() {
  // if ("caches" in window) {
  //   caches.match(endpoint_standing).then(function (response) {
  //     if (response) {
  //       response.json().then(function (data) {
  //         laligaStandings(data);
  //       });
  //     }
  //   });
  // }

  fetchApi(endpoint_standing)
    .then(status)
    .then(json)
    .then(function (data) {
      laligaStandings(data);
    })
    .catch(error);
}