let argc = Array.length Sys.argv

let () = if argc <> 2 then failwith "Usage: node_wrapper.exe [test_file]"

let plonk_wasm_filename = "./plonk_wasm.js"

let code_for_lib =
  Printf.sprintf
    {|
(function () {
  var loader = require('%s');
  return loader().then(function(loaded) {
    console.log('plonk_wasm loaded');
    joo_global_object.plonk_wasm = loaded})
})
|}
    plonk_wasm_filename

let run i file args =
  let argv = "node" :: file :: args in
  let file =
    if Filename.is_implicit file then Filename.concat "." file else file
  in
  let argv = String.concat ", " (List.map (Printf.sprintf "%S") argv) in
  Printf.sprintf
    {|
function run_%d () {
  console.log('Ready to run %s with argv = [ %s ]');
  var old_argv = process.argv;
  process.argv = [%s];
  require('%s');
  process.argv = old_argv;
}
|}
    i file argv argv file

let files = ref []

let args = ref []

let () =
  List.iter
    (fun x ->
      match Filename.extension x with
      | ".js" ->
          files := x :: !files
      | _ ->
          args := x :: !args )
    (List.tl (Array.to_list Sys.argv))

let () =
  let codes = [ code_for_lib ] in
  let files = List.rev !files in
  let args = List.rev !args in
  let b = Buffer.create 1024 in
  Buffer.add_string b
    {|
process.on('uncaughtException', function (error) {
   console.error(error.stack);
});

var major = process.version.match(/^v?([0-9]+)\./)[1];
var minimum_major = 16
if(parseInt(major) < minimum_major){
    console.error("Error: nodejs v" + minimum_major + " or greater is needed. Current version is " + process.version);
    process.exit(1);
}
|} ;
  List.iteri
    (fun i init ->
      Buffer.add_string b (Printf.sprintf "var init_lib_%d = %s" i init) )
    codes ;
  List.iteri (fun i file -> Buffer.add_string b (run i file args)) files ;
  Buffer.add_string b "Promise.resolve('Loading')" ;
  List.iteri
    (fun i _ -> Buffer.add_string b (Printf.sprintf ".then(init_lib_%d)" i))
    codes ;
  List.iteri
    (fun i _file -> Buffer.add_string b (Printf.sprintf ".then(run_%d)" i))
    files ;
  Buffer.add_string b
    ".catch(function (e) { console.log(e); process.exit(1) })\n" ;
  print_newline () ;
  let () =
    match Unix.getenv "ORIGINAL_PATH" with
    | exception Not_found ->
        ()
    | path ->
        Unix.putenv "PATH" path
  in
  let oc = Unix.open_process_out "node" in
  Buffer.output_buffer oc b ;
  flush_all () ;
  match Unix.close_process_out oc with
  | WEXITED x ->
      exit x
  | WSIGNALED _ ->
      exit 1
  | WSTOPPED _ ->
      exit 1
