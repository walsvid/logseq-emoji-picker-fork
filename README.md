## Repository description

This repository is a fork. The code is borrowed from [logseq-emoji-picker](https://github.com/logseq/logseq-plugin-samples/tree/master/logseq-emoji-picker).

The purpose of this code repository is to package and upload to the [marketplace](https://github.com/logseq/marketplace), in order to solve [this issue](https://github.com/logseq/logseq/issues/5816).

Thanks to everyone in the community for their contributions.

We will explore whether logseq can officially maintain this plugin in the future.

## News
- 2022-07-18
  - upgrade from `emoji-button` to `picmo`
  - support newer versions of emoji
  - support custom emoji

---

## Emoji Picker Sample

This is picker sample that show you how to use slash command and position popup ui :)

### Demo

![demo](./demo.gif)

### Adding a Custom Emoji (Hosted Online)

https://user-images.githubusercontent.com/55474996/227746263-eb160595-928b-4558-a63a-33221c8c6177.mp4

### API

[![npm version](https://badge.fury.io/js/%40logseq%2Flibs.svg)](https://badge.fury.io/js/%40logseq%2Flibs)

##### Logseq.App

- `registerSlashCommand: (tag: string, action: BlockCommandCallback | Array<SlashCommandAction>) => boolean`
- `getEditingCursorPosition: () => Promise<BlockCursorPosition | null>`

### Running the Sample

- `npm install && npm run build` in terminal to install dependencies
- navigate to the plugins dashboard: <kbd>t</kbd><kbd>p</kbd>
- click `Load unpacked plugin` button in Logseq Desktop client
- select this sample directory to load it

---

## Logseq Plugin Samples

This repository contains sample code illustrating the Logseq Plugin API. You can read, play with or adapt from these
samples to create your own plugins.

Plugin APIs: <https://plugins-doc.logseq.com>

### Prerequisites

You need to have [node](https://nodejs.org/) and [npm(or yarn)](https://yarnpkg.com/getting-started/install) installed
on your system to run the examples. Then install the latest Logseq Desktop App
from [here](https://github.com/logseq/logseq/releases).

#### Using `nvm` to install `node` and `npm`

For those who are not familiar with the installation of Node.js and NPM, a simple solution would be to install **Node
Version Manager (NVM)**[(link)](https://github.com/nvm-sh/nvm). The installation is straightforward: just download and
run the [installation bash script](https://github.com/nvm-sh/nvm/blob/v0.38.0/install.sh). You may need to give access
permissions to the script.

After installing `nvm`, using the command `nvm install 16`(for current) or `nvm install 14`(for LTS), you'll be able to
install the current version of node and npm on your machine. Because `nvm` installs locally, there is no need
for the `sudo` command.

For those familiar, `nvm` acts similarly to `anaconda`: the same way you can select your version of python with
anaconda, you can choose your version of node.js.

### Usage

- `git clone https://github.com/logseq/logseq-plugin-samples`
- open Logseq Desktop client and turn on `Developer mode` in user settings panel
- open the toolbar dot menus and navigate to plugins page
- read the README file of the sample you want to load, then determine if it should be
  rebuilt (`npm install && npm run build`)
- navigate to the plugins dashboard: <kbd>t</kbd><kbd>p</kbd>
- click `Load unpacked plugin` button, then select the sample directory to load it
