export const initialSequences = [
  {
    beats: null,
    sound: null,
    instrument: {
      name: "Kick",
      style: "rock",
      audio: "./tones/kick-acoustic01.wav"
    }
  },
  {
    beats: null,
    sound: null,
    instrument: {
      name: "Snare",
      style: "rock",
      audio: "./tones/snare-acoustic01.wav"
    }
  },
  {
    beats: null,
    sound: null,
    instrument: {
      name: "HiHat",
      style: "rock",
      audio: "./tones/hihat-acoustic01.wav"
    }
  },
  {
    beats: null,
    sound: null,
    instrument: {
      name: "Crash",
      style: "rock",
      audio: "./tones/crash-acoustic.wav"
    }
  },
  {
    beats: null,
    sound: null,
    instrument: {
      name: "Tom1",
      style: "rock",
      audio: "./tones/tom-acoustic01.wav"
    }
  },
  {
    beats: null,
    sound: null,
    instrument: {
      name: "Tom2",
      style: "rock",
      audio: "./tones/tom-acoustic02.wav"
    }
  }
];

export const audios = {
  rock: [
    {
      name: "Kick",
      audio: "./tones/kick-acoustic01.wav"
    },
    {
      name: "Snare",
      audio: "./tones/snare-acoustic01.wav"
    },
    {
      name: "HiHat",
      audio: "./tones/hihat-acoustic01.wav"
    },
    {
      name: "Crash",
      audio: "./tones/crash-acoustic.wav"
    },
    {
      name: "Tom1",
      audio: "./tones/tom-acoustic01.wav"
    },
    {
      name: "Tom2",
      audio: "./tones/tom-acoustic02.wav"
    }
  ],
  electro: [
    {
      name: "Kick",
      audio: "./tones/kick-electro02.wav"
    },
    {
      name: "Snare",
      audio: "./tones/snare-electro.wav"
    },
    {
      name: "HiHat",
      audio: "./tones/hihat-electro.wav"
    },
    {
      name: "Crash",
      audio: "./tones/snare-modular.wav"
    },
    {
      name: "Tom1",
      audio: "./tones/tom-analog.wav"
    },
    {
      name: "Tom2",
      audio: "./tones/clap-slapper.wav"
    }
  ]
};

export const musicStyles = [
  { id: 1, name: "rock" },
  { id: 2, name: "electro" }
];

export const resetBeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];
