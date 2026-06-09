import { uiState } from "./uiState.js";
import { invalidateLayout } from "../render/drawUI.js";

export function openMap() {
  uiState.mapOpen = !uiState.mapOpen;
  invalidateLayout();
  console.log("MAP:", uiState.mapOpen);
}