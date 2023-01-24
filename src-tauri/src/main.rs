#![cfg_attr(
    all(not(debug_assertions), target_os = "universal-apple-darwin"),
    windows_subsystem = "windows"
)]

use tauri::api::notification::Notification;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet1(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }
const APP_NAME:&str = "Sample Tauri app";

#[tauri::command]
fn send_notificaiton(title: &str , body:&str ) {
    Notification::new(APP_NAME)
      .title(title)
      .body(body)
      .show()
      .expect("Can not send the notification");
}


fn main() {

  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![send_notificaiton])
  .run(tauri::generate_context!())
  .expect("unable to run Tauri application");
    
}
