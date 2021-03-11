// [%bs.raw {| require("./app.css") |}];

type tiles = list(Tile.tile);

type action =
  | CreateTile
  | DeleteTile(Tile.tile)
  | ChangeTiles(tiles)
  | ChangeNewTodo(string);

type state = {
  tiles: list(Tile.tile),
  newTodo: string,
};

module Root = {
  let channel = Socket.channel;

  [@react.component]
  let make = () => {
    let (state, dispatch) =
      React.useReducer(
        (state, action) =>
          switch (action) {
          | CreateTile => {
              tiles: [Tile.createNewTile(state.newTodo), ...state.tiles],
              newTodo: "",
            }
          | DeleteTile(tile) => {
              ...state,
              tiles: List.filter(candidate => tile != candidate, state.tiles),
            }
          | ChangeNewTodo(text) => {...state, newTodo: text}
          | ChangeTiles(tiles) => {...state, tiles}
          },
        {tiles: [], newTodo: ""},
      );
    let loadInitialTiles = resp => {
      Js.log(resp);
      dispatch(ChangeTiles([]));
    };
    React.useEffect0(() => {
      channel
      |> Phx.joinChannel(_)
      |> Phx.putReceive("ok", loadInitialTiles(_))
      |> Phx.putReceive("error", resp => Js.log(resp))
      |> ignore;
      None;
    });
    let deleteTodo = tile => DeleteTile(tile) |> dispatch;
    let handleSubmit = event => {
      event->ReactEvent.Synthetic.preventDefault;

      dispatch(CreateTile);
    };

    let handleChange = event =>
      dispatch(ChangeNewTodo(ReactEvent.Form.target(event)##value));
    open Tile;
    let todoItems =
      state.tiles
      |> List.map(tile => {<Tile key={tile.id} tile onClick=deleteTodo />})
      |> Array.of_list;

    <div className="reason-root">
      <form className="todo-input" onSubmit={e => handleSubmit(e) |> ignore}>
        <input
          type_="text"
          className="todo-input__text"
          value={state.newTodo}
          onChange={e => handleChange(e) |> ignore}
        />
        <input className="todo-input__submit" type_="submit" />
      </form>
      <ol className="todo-list"> {React.array(todoItems)} </ol>
    </div>;
  };
};

ReactDOMRe.renderToElementWithId(<Root />, "react-app");
