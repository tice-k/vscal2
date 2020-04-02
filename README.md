# vscal README

This is aiming to provide an easier way to show monthly calendar, like the one you have on the wall in your house, on screen without switching windows (ie. inside current VS Code instance). At the moment, the activation is a little tedious, UI is premitive, it works only on Mac or Linux, but does the job (for me). Hopefully somebody (or I) can find time to make this better, quicker, prettier soon...

## Features

Shows the 3-month calender as a new tab by going to Command Palette > "Calendar" (and you'll just close/dismiss that tab afterwards).

## Requirements

This works only on Mac or Linux at this time.

## Extension Settings

None for now, but perhaps "how many months to show" could be?

## Known Issues

This works only on Mac or Linux at this time.

## Release Notes

### v0.0.2

No code change, but useability enhancement by hooking up the command to [vscode-statusbar-commands](https://github.com/AnWeber/vscode-statusbar-command) extension. After installing that awesome extension, just go in to `$HOME/.vscode/anweber.statusbar-commands-0.1.0/package.json` and edit the `default` array element like;
```
"default": [
   {
       "text": "$(calendar)",
       "tooltip": "monthly calendar",
       "alignment": "right",
       "command": "extension.calendar"
   }
]
```
 And you'll have a calendar icon appearing on the status bar and clicking it, boom, the calendar doc opens.

### v0.0.1

Early build, not even a "release," just locally installed (by copying `package.json` and `out` to `$HOME/.vscode/extensions/miyamotoh-vscal-0.0.1` dir) but works.. :blush: