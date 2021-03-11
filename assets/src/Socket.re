
let socket = Phx.initSocket("/socket") |> Phx.connectSocket(_);

let channel = socket |> Phx.initChannel("todo",_);
