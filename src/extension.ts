// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

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

        // Define video sources based on the selected category
        const videoSources: VideoSource[] = [
            {
                label: "Subway Surfers",
                videos: ["nNGQ7kMhGuQ", "Tqne5J7XdPA", "hs7Z0JUgDeA", "iYgYfHb8gbQ"],
                width: 300,
                muted: true,
            },
            {
                label: "Minecraft Parkour",
                videos: ["intRX7BRA90", "n_Dv4JMiwK8", "GTaXbH6iSFA", "t3SpmH9QQew"],
                width: 600,
                muted: true
            },
            {
                label: "CS:GO Surfing",
                videos: ["Lixl3-jz7k8", "3GWPJtSGm8c", "I-VQuQu2_lc"],
                width: 600,
                muted: true
            },
            {
                label: "Satisfying Videos",
                videos: ["zPhjxwTDdLY", "etp46Aca_UM", "wjQq0nSGS28", "mQGT4BzeUUc"],
                width: 600,
                muted: true
            },
        ].filter(source => source.label.toLowerCase() === videoCategory.toLowerCase());

        if (videoSources.length === 0) {
            vscode.window.showErrorMessage(`No videos found for category: ${videoCategory}`);
            return;
        }

        const items: vscode.QuickPickItem[] = videoSources.map((source) => ({
            label: source.label,
            alwaysShow: true,
        }));

        vscode.window.showQuickPick(items, { placeHolder: "Choose your overstimulation method" }).then((selection: vscode.QuickPickItem | undefined) => {
            if (!selection) {
                return;
            }

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

            const source = videoSources.find((source) => source.label === selection.label)!;
            const html = getVideoPlayerHtml(source);

            panel.reveal();
            panel.webview.html = html;
        });
    });

    context.subscriptions.push(disposable);
}

function getVideoPlayerHtml(source: VideoSource): string {
    // Implementation of HTML template generation
    // This function should return the HTML string for the video player
    // You may need to implement this based on your specific requirements
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${source.label}</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                #video-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                video {
                    width: ${source.width}px;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <div id="video-container">
                <video autoplay loop ${source.muted ? 'muted' : ''} controls>
                    <source src="${source.videos[Math.floor(Math.random() * source.videos.length)]}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <script>
                const video = document.querySelector('video');
                const videos = ${JSON.stringify(source.videos)};
                video.addEventListener('ended', () => {
                    video.src = videos[Math.floor(Math.random() * videos.length)];
                    video.play();
                });
            </script>
        </body>
        </html>
    `;
}

// This method is called when your extension is deactivated
export function deactivate() {}
