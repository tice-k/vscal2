// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// let button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
	// button.text = '$(calendar)';
	// button.command = 'extension.calendar';
	// button.color = 'White';
	// button.show();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.calendar', () => {
		// The code you place here will be executed every time your command is executed

		// user-defined parameters
		const numMonthsToShowBefore = 1;
		const numMonthsToShowAfter = 1;
		const numMonthsPerRow = 3;
		const extraHorizontalSpace = 1;
		const extraVerticalSpace = 1;

		const c = require('./cal');
		let data : string = c.createFile(numMonthsToShowBefore, numMonthsToShowAfter, numMonthsPerRow, extraHorizontalSpace, extraVerticalSpace);
		const fs = require('fs');
		const path = require('path');
		let p = path.dirname(process.execPath);
		fs.writeFile(`${p}/calendar.md`, data, (err: any) => {
			if (err) {throw err;}
		});
		let calendar = vscode.Uri.file(`${p}/calendar.md`);

		vscode.window.showTextDocument(calendar);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
