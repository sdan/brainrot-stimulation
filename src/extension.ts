// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const videoCategories = [
    { label: "Subway Surfers", value: "subwaysurfer" },
    { label: "Brainrot", value: "brainrot" },
    { label: "Minecraft", value: "minecraft" },
    { label: "Slice It", value: "sliceit" },
    { label: "Slime", value: "slime" },
    { label: "Stim Raw", value: "stimraw" }
];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand("brainrot-stimulation.overstimulate", async () => {
        const selectedCategory = await showVideoSelectionMenu();
        if (selectedCategory) {
            showVideo(selectedCategory);
        }
    });

    context.subscriptions.push(disposable);
}

async function showVideoSelectionMenu(): Promise<string> {
    const configuration = vscode.workspace.getConfiguration();
    const defaultCategory = configuration.get<string>("brainrot-stimulation.videoCategory") || "subwaysurfer";

    const selectedItem = await vscode.window.showQuickPick(videoCategories, {
        placeHolder: "Choose your overstimulation method",
    });

    if (selectedItem) {
        configuration.update("brainrot-stimulation.videoCategory", selectedItem.value, true);
        return selectedItem.value;
    }

    return defaultCategory;
}

function showVideo(videoCategory: string) {
    const column = {
        viewColumn: vscode.ViewColumn.Beside,
        preserveFocus: true,
    };

    const options = { enableScripts: true };

    const panel = vscode.window.createWebviewPanel(
        "brainrot-stimulation.video",
        "Skibidi rizz 🤯🫵",
        column,
        options
    );

    const videoUrls = getVideoUrls(videoCategory);
    const html = getVideoPlayerHtml(videoUrls);

    panel.reveal();
    panel.webview.html = html;
}

function getVideoUrls(videoCategory: string): string[] {
    const baseUrl = `https://brainrot-vscode-ext.sdan.io/videos/${videoCategory}`;
    const numParts = 20; // Adjust the number of parts based on your video split
    const videoUrls = [];

    for (let i = 1; i <= numParts; i++) {
        videoUrls.push(`${baseUrl}_part${i}.mp4`);
    }

    return videoUrls;
}

function getVideoPlayerHtml(videoUrls: string[]): string {
    const videoSources = videoUrls.map(url => `<source src="${url}" type="video/mp4">`).join('\n');

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
                <video id="fullscreen-video" autoplay muted playsinline>
                    ${videoSources}
                    Your browser does not support the video tag.
                </video>
            </div>
            <script>
                const video = document.getElementById('fullscreen-video');
                const videoSources = video.getElementsByTagName('source');
                let currentSource = 0;

                function playNextVideo() {
                    if (currentSource < videoSources.length - 1) {
                        currentSource++;
                        video.src = videoSources[currentSource].src;
                        video.play();
                    }
                }

                video.addEventListener('ended', playNextVideo);

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
