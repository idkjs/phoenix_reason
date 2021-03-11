type tile = {
  id: string,
  content: string,
  completed: bool,
};

let createNewTile = content => {
  id: Js.Float.toString(Js.Date.now()),
  content,
  completed: false,
};



[@react.component]
let make = (~tile, ~onClick) => {
  let className = tile => "tile" ++ (tile.completed ? " tile__completed" : "");
  <li className={className(tile)} onClick={_event => onClick(tile)}>
    {React.string(tile.content)}
  </li>;
};
