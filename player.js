// DOM references
let track_name = document.querySelector(".songtitle");
let playpause_btn = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.getElementById("music");

// Playlist
let track_list = [
  { name: "Thương - Lê Cát Trọng Lý", path: "https://files.catbox.moe/nkxza5.mp3" },
  { name: "Shooting Arrows - The Cat's Whiskers", path: "https://files.catbox.moe/zj81lr.mp3" },
  { name: "4 REAL - The Cat's Whiskers", path: "https://files.catbox.moe/fxd8fo.mp3" },
  { name: "My Sweetest Love - ft. Kazuma Mitchell", path: "https://files.catbox.moe/qe4he5.mp3" },
  { name: "Mercy On Me - The Cat's Whiskers", path: "https://files.catbox.moe/w7nnf9.mp3" }
];

// Load track
function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[index].path;
  curr_track.load();

  track_name.textContent = track_list[index].name;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

// Reset UI
function resetValues() {
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

// Play / Pause system
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;

  document.querySelector(".playpause-track").className =
    "playpause-track fas fa-pause";
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  document.querySelector(".playpause-track").className =
    "playpause-track fas fa-play";
}

// Navigation
function nextTrack() {
  track_index = (track_index + 1) % track_list.length;
  loadTrack(track_index);
  if (isPlaying) playTrack();
}

function prevTrack() {
  track_index = track_index > 0 ? track_index - 1 : track_list.length - 1;
  loadTrack(track_index);
  if (isPlaying) playTrack();
}

// Volume
let audio = curr_track;
let currentVolume = audio.volume;

function volumeUp() {
  if (currentVolume < 1.0) {
    currentVolume += 0.2;
    audio.volume = currentVolume;
  }
}

function volumeDown() {
  if (currentVolume > 0.0) {
    currentVolume -= 0.2;
    audio.volume = currentVolume;
  }
}

// Seeking
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  if (!isNaN(curr_track.duration)) {
    let position =
      curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = position;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime % 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration % 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

// Initialize
loadTrack(track_index);