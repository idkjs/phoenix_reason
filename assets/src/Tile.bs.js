'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function createNewTile(content) {
  return {
          id: Date.now().toString(),
          content: content,
          completed: false
        };
}

function Tile(Props) {
  var tile = Props.tile;
  var onClick = Props.onClick;
  var className = function (tile) {
    return "tile" + (
            tile.completed ? " tile__completed" : ""
          );
  };
  return React.createElement("li", {
              className: className(tile),
              onClick: (function (_event) {
                  return Curry._1(onClick, tile);
                })
            }, tile.content);
}

var make = Tile;

exports.createNewTile = createNewTile;
exports.make = make;
/* react Not a pure module */
