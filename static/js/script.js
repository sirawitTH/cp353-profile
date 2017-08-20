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

function send(msg) {
    msg = msg.trim();
    if (!msg) {
        return;
    }
    firebase.database().ref('messages/')
        .push()
        .set({
            text: msg,
            timestamp: new Date().getTime()
        });
}

var messagesRef = firebase.database().ref('messages/').orderByKey().limitToLast(20);
messagesRef.on('child_added', function (data) {
    addToChatbox(data.val());
});

function addToChatbox(msg) {
    var chatbox = document.getElementById('chatbox');
    var span = document.createElement('p');
    span.setAttribute('title', getDate(msg.timestamp));
    span.setAttribute('data-toggle', 'tooltip');
    span.setAttribute('data-placement', 'right');
    span.innerText = msg.text;
    chatbox.appendChild(span);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getDate(timestamp) {
    var date = new Date(timestamp);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' +date.getHours() + ':' + date.getMinutes() +':'+ date.getSeconds();
}
