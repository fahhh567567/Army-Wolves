function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// ----------------------
// BACKGROUNDS
// ----------------------
export const backgrounds = {
  lobby: loadImage("/assets/backgrounds/lobby.png"),
  room1: loadImage("/assets/backgrounds/room1.png")
};

// ----------------------
// PLAYER SPRITES
// ----------------------
export const avatars = {
  down: loadImage("/assets/player/player_down.png"),
  up: loadImage("/assets/player/player_up.png"),
  left: loadImage("/assets/player/player_left.png"),
  right: loadImage("/assets/player/player_right.png")
};

// ----------------------
// UI
// ----------------------
export const ui = {
  toolbar: loadImage("/assets/ui/empty_toolbar.png"),
  map: loadImage("/assets/ui/mapicon.png"),

  autochat: loadImage("/assets/ui/toolbarbuttons/autochat.png"),
  avatarcard: loadImage("/assets/ui/toolbarbuttons/avatarcard.png"),
  base: loadImage("/assets/ui/toolbarbuttons/base.png"),
  emotions: loadImage("/assets/ui/toolbarbuttons/emotions.png"),
  send: loadImage("/assets/ui/toolbarbuttons/send.png"),
  settings: loadImage("/assets/ui/toolbarbuttons/settings.png"),
  snowball: loadImage("/assets/ui/toolbarbuttons/snowball.png"),
  social: loadImage("/assets/ui/toolbarbuttons/social.png"),
  wave: loadImage("/assets/ui/toolbarbuttons/wave.png")
};