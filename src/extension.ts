// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

type VideoSource = {
    label: string;
    videos: string[];
    width: number;
    muted?: boolean;
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand("brainrot-stim.overstimulate", () => {
        const configuration = vscode.workspace.getConfiguration();
        const videoCategory: string = configuration.get("brainrot-stim.videoCategory") || "subwaysurfer";

        // Define video configuration based on the selected category
        const videoConfig: VideoSource = {
            label: videoCategory,
            videos: [`https://brainrot-vscode-ext.sdan.io/videos/${videoCategory}.mp4`],
            width: 600,
            muted: true
        };

        const column = {
            viewColumn: vscode.ViewColumn.Beside,
            preserveFocus: true,
        };

        const options = { enableScripts: true };

        const panel = vscode.window.createWebviewPanel(
            "brainrot-stim.video",
            "Skibidi rizz 🤯🫵",
            column,
            options
        );

        const html = getVideoPlayerHtml(videoCategory);

        panel.reveal();
        panel.webview.html = html;
    });

    context.subscriptions.push(disposable);
}

function getVideoPlayerHtml(videoCategory: string): string {
    const baseDomain = 'https://brainrot-vscode-ext.sdan.io/videos/';
    const videoFile = `${videoCategory}.mp4`;
    const videoUrl = `${baseDomain}${videoFile}`;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Brainrot Stimulation</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                #video-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                }
                #fullscreen-video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            </style>
        </head>
        <body>
            <div id="video-container">
                <video id="fullscreen-video" autoplay loop muted playsinline>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <script>
                const video = document.getElementById('fullscreen-video');

                function enterFullscreen() {
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.mozRequestFullScreen) { // Firefox
                        video.mozRequestFullScreen();
                    } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
                        video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) { // IE/Edge
                        video.msRequestFullscreen();
                    }
                }

                document.addEventListener('click', enterFullscreen);
                document.addEventListener('touchstart', enterFullscreen);
            </script>
        </body>
        </html>
    `;
}

// This method is called when your extension is deactivated
export function deactivate() {}
