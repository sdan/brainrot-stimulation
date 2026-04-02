# Brainrot Stimulation VSCode Extension

## How to Use

1. Open the Command Palette in VS Code by pressing `Cmd+Shift+P` (on macOS) or `Ctrl+Shift+P` (on Windows/Linux).
2. Type in `brain stimulation` and select the `Brainrot stimulation 🤯🫵` command.
3. Choose your preferred video category from the selection menu.
4. Enjoy the brainrot stimulation directly in your VS Code editor.


<img width="1511" alt="Screenshot 2024-08-16 at 12 16 30 AM" src="https://github.com/user-attachments/assets/bfcdc1fd-3a62-45d8-bcd8-41b879aa0b32">

This VSCode extension was original made by [@jirkavrba](https://github.com/jirkavrba) and was adapted to work with more brainrot and enhance the video experience which was discontinued in the original extension.

Enjoy skibidi rizz ohio brainrot stimulation right in your vscode editor! Feel the magic of brainrot in your code editor.

- [@jirkavrba](https://github.com/jirkavrba) for creating the original extension
- [@Abb1x](https://github.com/Abb1x) for adding Minecraft parkour videos!
- [@styxpilled](https://github.com/styxpilled) for adding Better Call Saul best moments
- [@paolomartinez](https://github.com/paolomartinez) for adding Family Guy best moments

## Cursor availability

Cursor does not always index all VS Code Marketplace extensions directly. To maximize compatibility, this project publishes to both marketplaces:

- VS Code Marketplace
- Open VSX (used by Cursor-compatible extension flows)

## Publishing

This repository includes a GitHub Actions workflow that publishes a new extension version when a tag like `v0.0.4` is pushed.

Required repository secrets:

- `VSCE_TOKEN` (Personal Access Token for VS Code Marketplace)
- `OPEN_VSX_TOKEN` (Personal Access Token for Open VSX)

Release steps:

1. Bump `version` in `package.json`.
2. Commit the change.
3. Create and push a tag that matches the new version (for example `v0.0.4`).

The workflow will package a `.vsix` and publish it to both registries.
