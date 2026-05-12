const socket = new WebSocket("ws://localhost:3000");

export let playerId = null;
export const stateBuffer = [];

socket.onopen = () => {
  console.log("Connected to server");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "init") {
    playerId = data.id;
  }

  if (data.type === "state") {
    stateBuffer.push({
      time: data.time,
      players: structuredClone(data.players)
    });

    if (stateBuffer.length > 10) {
      stateBuffer.shift();
    }
  }
};

export function sendMove(x, y) {
  socket.send(JSON.stringify({
    type: "move",
    x,
    y
  }));
}