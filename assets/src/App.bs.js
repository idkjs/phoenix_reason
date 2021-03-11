'use strict';

var Phx = require("bucklescript-phx/src/phx.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");
var Tile$Phoenix_reason = require("./Tile.bs.js");
var Socket$Phoenix_reason = require("./Socket.bs.js");

((require("css/app.css")));

function App$Root(Props) {
  var match = React.useReducer((function (state, action) {
          if (typeof action === "number") {
            return {
                    tiles: {
                      hd: Tile$Phoenix_reason.createNewTile(state.newTodo),
                      tl: state.tiles
                    },
                    newTodo: ""
                  };
          }
          switch (action.TAG | 0) {
            case /* DeleteTile */0 :
                var tile = action._0;
                return {
                        tiles: List.filter(function (candidate) {
                                return Caml_obj.caml_notequal(tile, candidate);
                              })(state.tiles),
                        newTodo: state.newTodo
                      };
            case /* ChangeTiles */1 :
                return {
                        tiles: action._0,
                        newTodo: state.newTodo
                      };
            case /* ChangeNewTodo */2 :
                return {
                        tiles: state.tiles,
                        newTodo: action._0
                      };
            
          }
        }), {
        tiles: /* [] */0,
        newTodo: ""
      });
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          Phx.putReceive("error", (function (resp) {
                  console.log(resp);
                  
                }), Phx.putReceive("ok", (function (__x) {
                      console.log(__x);
                      return Curry._1(dispatch, {
                                  TAG: /* ChangeTiles */1,
                                  _0: /* [] */0
                                });
                    }), Phx.joinChannel(undefined, Socket$Phoenix_reason.channel)));
          
        }), []);
  var deleteTodo = function (tile) {
    return Curry._1(dispatch, {
                TAG: /* DeleteTile */0,
                _0: tile
              });
  };
  var handleSubmit = function ($$event) {
    $$event.preventDefault();
    return Curry._1(dispatch, /* CreateTile */0);
  };
  var handleChange = function ($$event) {
    return Curry._1(dispatch, {
                TAG: /* ChangeNewTodo */2,
                _0: $$event.target.value
              });
  };
  var todoItems = $$Array.of_list(List.map((function (tile) {
              return React.createElement(Tile$Phoenix_reason.make, {
                          tile: tile,
                          onClick: deleteTodo,
                          key: tile.id
                        });
            }), state.tiles));
  return React.createElement("div", {
              className: "reason-root"
            }, React.createElement("form", {
                  className: "todo-input",
                  onSubmit: (function (e) {
                      handleSubmit(e);
                      
                    })
                }, React.createElement("input", {
                      className: "todo-input__text",
                      type: "text",
                      value: state.newTodo,
                      onChange: (function (e) {
                          handleChange(e);
                          
                        })
                    }), React.createElement("input", {
                      className: "todo-input__submit",
                      type: "submit"
                    })), React.createElement("ol", {
                  className: "todo-list"
                }, todoItems));
}

var Root = {
  channel: Socket$Phoenix_reason.channel,
  make: App$Root
};

ReactDOMRe.renderToElementWithId(React.createElement(App$Root, {}), "react-app");

exports.Root = Root;
/*  Not a pure module */
