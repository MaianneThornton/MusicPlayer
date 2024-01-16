const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
    },
];
// creates a new HML5 audio element
const audio = new Audio();

// spread (...) the contents of the allSongs array to the userData object to allow users to delete and shuffle songs from their playlists without disturbing the allSongs array.
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0
};

//implements the functionality for playing the displayed songs.
const playSong = (id) => {
    //iterates through the userData?.songs array, searching for a song that corresponds to the id passed into the playSong function using the find() method.
    const song = userData?.songs.find((song) => song.id === id);
    // tells the audio element where to find the audio data for the selected song.
    audio.src = song.src;
    //tells the audio element what to display as the title of the song.
    audio.title = song.title;
    //if statement to check whether the userData?.currentSong is null or if userData?.currentSong.id is strictly not equal song.id. If condition is true then the song starts playing from the beginning
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        // else play from current user position.
        audio.currentTime = userData.songCurrentTime;
    }
    //update the current song being played.
    userData.currentSong = song;
    playButton.classList.add("playing");
    //play() is a method from the web audio API for playing an mp3 file.
    audio.play();
};

//function to display the songs in the UI
const renderSongs = (array) => {
    //loop through array and build HTML for all the songs using the map() method to iterate through an array and return a new array.
    const songsHTML = array
        .map((song) => {
            return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
            // Use the join() method to combine the songsHTML markup into a single string.
        })
        .join("");
    //update the playlist in your HTML document to display the songs.

    playlistSongs.innerHTML = songsHTML;
};
//adds playButton functionality
playButton.addEventListener('click', () => {
    if (userData?.currentSong === null) {
        //this will ensure the first song in the playlist is played first.
        playSong(userData?.songs[0].id);
    } else {
        //This ensures that the currently playing song will continue to play when the play button is clicked.
        playSong(userData?.currentSong.id);
    }
});
//Optional chaining (?.) helps prevent errors when accessing nested properties that might be null or undefined.
renderSongs(userData?.songs);
