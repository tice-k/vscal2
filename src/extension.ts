// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscal" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.calendar', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const cp = require('child_process')
		cp.exec('MON=$(date +%-m); DAY=$(date +%-d); cd /tmp ; cal -h -m $(expr $MON - 1) > .vscal-1.txt; cal -h -m $(expr $MON + 1) > .vscal-3.txt; (cal -h -m $MON | sed "s/ $DAY /\[$DAY\]/") > .vscal-2.md; paste .vscal-1.txt .vscal-2.md .vscal-3.txt > .vscal.md ; rm -f .vscal-[123]*', 2000);
		let calendar = vscode.Uri.file('/tmp/.vscal.md');
		vscode.window.showTextDocument(calendar);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
