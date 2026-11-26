// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    #[cfg(target_os = "linux")]
    {
        std::env::set_var("GDK_BACKEND", "wayland");
        // Do NOT set WEBKIT_DISABLE_COMPOSITING_MODE or
        // WEBKIT_DISABLE_DMABUF_RENDERER here: both turn off WebKitGTK's
        // accelerated compositing, which silently disables every
        // `backdrop-filter` (header, navbar, Modal, Sheet glass blur).
        std::env::set_var("GTK_CSD", "1");
    }
    dr_house_lib::run()
}
