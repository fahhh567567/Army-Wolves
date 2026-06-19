// --------------------------------------------------
// CLIENT → SERVER
// --------------------------------------------------
export const C2S = {
  AUTH: "auth",
  MOVE: "move",
  CHAT: "chat",
  PING: "ping",
  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room"
};

// --------------------------------------------------
// SERVER → CLIENT
// --------------------------------------------------
export const S2C = {
  INIT: "init",
  STATE: "state",
  PLAYER_JOIN: "player_join",
  PLAYER_LEAVE: "player_leave",
  CHAT: "chat",
  ROOM_DATA: "room_data",
  ERROR: "error"
};