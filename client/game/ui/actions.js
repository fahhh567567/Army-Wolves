import { uiState } from "../state/uistate.js";
import { invalidateLayout } from "../render/drawUI.js";

export function openMap() {
  uiState.mapOpen = !uiState.mapOpen;
  invalidateLayout();
  console.log("MAP:", uiState.mapOpen);
}