# Mattermost OpenAI Plugin
## Table of Contents
- [License](#license)
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Development](#development)

## License

See the [LICENSE](./LICENSE) file for license rights and limitations.

## Overview

This plugin integrates the services of OpenAI in Mattermost. For a stable production release, please download the latest version from the [Github Releases](https://github.com/Brightscout/mattermost-plugin-openai/releases) and follow the instructions to [install](#installation) and [configure](#configuration) the plugin.

## Features

This plugin contains the following features:
- Chat with OpenAI in RHS: You can chat with OpenAI by typing texts in the input field present in RHS.
  ![image](https://user-images.githubusercontent.com/72438220/233341561-419b57ff-0737-4f87-9b79-738fd0926e7f.png)

- Generate images from text prompts in RHS: You can generate images using the slash command below in RHS.
    ```
    /image [x256 | x512 | x1024] [text prompt]
    ```
  ![image](https://user-images.githubusercontent.com/72438220/233342096-a7725ad5-a3a8-44db-bbc6-cc575bd04359.png)

- Summarize post threads in any channel: You can summarize any post threads of a channel by clicking on the option "Summarize" under "Message actions".
  ![image](https://user-images.githubusercontent.com/72438220/233342824-0c081093-a9e4-40d3-a5f2-9721347f3744.png)

## Installation

1. Go to the [releases page of this GitHub repository](https://github.com/Brightscout/mattermost-plugin-openai/releases) and download the latest release for your Mattermost server.
  
    **Note:** The minimum supported Mattermost server for this plugin to run is v7.8.2

2. Upload this file to the Mattermost **System Console > Plugins > Management** page to install the plugin. To learn more about how to upload a plugin, [see the documentation](https://docs.mattermost.com/administration/plugins.html#plugin-uploads).
3. Enable the plugin from **System Console > Plugins > OpenAI**.

## Setup

  - [Developer setup](./docs/developer_docs.md)
  - [OpenAI API key setup](./docs/openAI_api_key_setup.md)
  - [Plugin Setup](./docs/plugin_setup.md)
