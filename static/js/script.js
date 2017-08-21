$("body").tooltip({ selector: '[data-toggle=tooltip]' });
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQqrQIcIlgLRS7NkHiaOoI--uRz6vqph8",
    authDomain: "cp353-profile.firebaseapp.com",
    databaseURL: "https://cp353-profile.firebaseio.com",
    projectId: "cp353-profile",
    storageBucket: "",
    messagingSenderId: "372797654845"
};
firebase.initializeApp(config);

var ip;
$.get('https://api.ipify.org/?format=json', function (data) {
    ip = data.ip;
    firebase.database().ref('views/')
        .push()
        .set({
            ip: ip,
            timestamp: new Date().getTime()
        });
});

function send(msg) {
    msg = msg.trim();
    if (!msg) {
        return;
    }
    firebase.database().ref('messages/')
        .push()
        .set({
            text: msg,
            timestamp: new Date().getTime(),
            ip: ip
        });
}

var messagesRef = firebase.database().ref('messages/').orderByKey().limitToLast(20);
messagesRef.on('child_added', function (data) {
    addToChatbox(data.val());
});

function addToChatbox(msg) {
    var chatbox = document.getElementById('chatbox');
    var p = document.createElement('p');
    p.setAttribute('title', getDate(msg.timestamp));
    p.setAttribute('data-toggle', 'tooltip');
    p.setAttribute('data-placement', 'right');
    p.innerText = msg.text;
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getDate(timestamp) {
    var date = new Date(timestamp);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
