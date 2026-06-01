import { openMap } from "./actions.js";

export const uiRegistry = {

  toolbar: {
    id: "toolbar"
  },

  toolbarButtons: [
    { id: "wave" },
    { id: "emotions" },
    { id: "snowball" },
    { id: "autochat" },
    { id: "send" },
    { id: "avatarcard" },
    { id: "base" },
    { id: "social" },
    { id: "settings" }
  ],

  map: {
    id: "map",
    action: openMap
  }
};