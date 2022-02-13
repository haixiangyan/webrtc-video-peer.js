const randomId = () => ''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0)

const peer = new Peer(randomId(), {
  host: location.hostname,
  debug: 1,
  path: '/myapp'
});

window.peer = peer;

function getLocalStream() {
  navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
    window.localStream = stream; // A
    window.localAudio.srcObject = stream; // B
    window.localAudio.autoplay = true; // C
  }).catch( err => {
    console.log("u got an error:" + err)
  });
}

getLocalStream();

peer.on('open', function () {
  window.caststatus.textContent = `Your device ID is: ${peer.id}`;
});

const audioContainer = document.querySelector('.call-container');

