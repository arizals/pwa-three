const dbPromised = idb.open("laliga-database", 1, function (upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function saveTeam(data) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            console.log(data);
            store.put(data);
            return tx.complete;
        })
        .then(function () {
            // alert(`${data.name} berhasil disimpan`);
            console.log(`Team ${data.name} berhasil disimpan.`);
        })
}

function deleteTeam(data) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            console.log(data);
            store.delete(data.id);
            return tx.complete;
        })
        .then(function () {
            console.log(`Team ${data.name} berhasil dihapus.`);
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getSavedById(idParam) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(parseInt(idParam));
            })
            .then(function (data) {
                resolve(data);
            });
    });
}