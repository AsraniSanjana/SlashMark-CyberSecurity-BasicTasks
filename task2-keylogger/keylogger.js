const { GlobalKeyboardListener } = require('node-global-key-listener');

const listener = new GlobalKeyboardListener();
let dynamicKeyPattern = '';

listener.addListener((e, down) => {
  if (e.state === "DOWN") {
    console.log(`Key pressed: ${e.name}`);
    // Check if shiftKey is pressed to determine uppercase
    const keyName = e.shiftKey ? e.name.toUpperCase() : e.name.toLowerCase();
    dynamicKeyPattern += keyName;
  } else {
    console.log(`Key released: ${e.name}`);
  }
  console.log(dynamicKeyPattern);
});
