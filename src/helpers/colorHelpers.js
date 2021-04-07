// code taken from colt-steele git hub

import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function makePalette(startPalette) {
  let newPalette = {
    paletteName: startPalette.paletteName,
    id: startPalette.id,
    emoji: startPalette.emoji,
    colors: {},
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of startPalette.colors) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }

  //return
  return newPalette;
}

function getScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.3).hex(), hexColor, end];
}
