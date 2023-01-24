#![cfg_attr(
    all(not(debug_assertions), target_os = "universal-apple-darwin"),
    windows_subsystem = "windows"
)]

use tauri::api::notification::Notification;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet1(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn send_notificaiton() -> String {
    // format!("hello")
    println!("Hello world");
    Notification::new("Something").title("title");
    // .expect("The notification is not working");
    format!("Hello world")
}


fn main() {
   use tauri::api::notification::Notification;

// on an actual app, remove the string argument
let context = tauri::generate_context!();
let identifier = context.config().tauri.bundle.identifier.clone();

tauri::Builder::default()
  .setup(move |app| {
    Notification::new(&identifier)
      .title("Tauri")
      .body("Tauri is awesome!")
      .show()
      .unwrap();
    //   .notify(&app.handle())
    //   .unwrap();
    Ok(())
  })
  .run(context)
  .expect("error while running tauri application");
    
}
