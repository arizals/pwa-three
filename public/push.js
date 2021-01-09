var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BEHmBNReg3qTd0YP0AMpyx5V8iIROFAllaBailZyMpN-8Uuf6Q11pcORFilorvD5yZOUCldxoVi7xDZKeCF2-gU",
    "privateKey": "4DOQgMQh9xLMgK-pgPOLwlV27t20A_J4xJG1ls7GiLs"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fj9eUOAQP70:APA91bHCeE3gzFRezdpREV_i9jLTk7S2l12vaQBkcfZgM5ZpqYTd2T5qFOqG5MqSJOi3YfDAIuexH2O_oCMQpQSEVoKxYfIykBtfDQJiX9XAqTG3Xh967z8ceOOnH9tHdy6w9npFo9z8",
    "keys": {
        "p256dh": "BHyIsHqs6vYXIxHWWQMKka1fO/mLY+LkQfJyaKDj5OJItxzY4qUUlyiaDejoYq+v/S2vSF/onjYnHiDL9NUvUQI=",
        "auth": "wenkI0SbhL7kNguq7hPAnA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '805848381109',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);