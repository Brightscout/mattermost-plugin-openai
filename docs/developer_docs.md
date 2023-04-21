# Mattermost OpenAI Plugin
## Table of Contents
- [License](#license)
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [References](#references)
- [Development](#development)

## License

See the [LICENSE](./LICENSE) file for license rights and limitations.

## Overview

This plugin integrates the services of OpenAI in Mattermost. For a stable production release, please download the latest version from the [Github Releases](https://github.com/Brightscout/mattermost-plugin-openai/releases) and follow the instructions to [install](#installation) and [setup](./plugin_setup.md) the plugin.

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
  
    **Note:**: The minimum supported Mattermost server for this plugin to run is v7.8.2

2. Upload this file to the Mattermost **System Console > Plugins > Management** page to install the plugin. To learn more about how to upload a plugin, [see the documentation](https://docs.mattermost.com/administration/plugins.html#plugin-uploads).
3. Enable the plugin from **System Console > Plugins > OpenAI**.

## Setup

  - [Developer Setup](./developer_docs.md)
  - [OpenAI API Key Setup](./openAI_api_key_setup.md)
  - [Plugin Setup](./plugin_setup.md)

## References
You can read the below mentioned documents to get knowledge about OpenAI services.

- [OpenAI](https://platform.openai.com/docs/api-reference)

## Development

### Setup

Make sure you have the following components installed:  

- Go - v1.18 - [Getting Started](https://golang.org/doc/install)
    > **Note:** If you have installed Go to a custom location, make sure the `$GOROOT` variable is set properly. Refer to [Installing to a custom location](https://golang.org/doc/install#install).
- Make

### Building the plugin

Run the following command in the plugin repo to prepare a compiled, distributable plugin zip:

```bash
make dist
```

After a successful build, a `.tar.gz` file in `/dist` folder will be created which can be uploaded to Mattermost. To avoid having to manually install your plugin, deploy your plugin using one of the following options.

### Deploying with Local Mode

If your Mattermost server is running locally, you can enable [local mode](https://docs.mattermost.com/administration/mmctl-cli-tool.html#local-mode) to streamline deploying your plugin. Edit your server configuration as follows:

```
{
    "ServiceSettings": {
        ...
        "EnableLocalMode": true,
        "LocalModeSocketLocation": "/var/tmp/mattermost_local.socket"
    },
}
```

and then deploy your plugin:

```bash
make deploy
```

You may also customize the Unix socket path:

```bash
export MM_LOCALSOCKETPATH=/var/tmp/alternate_local.socket
make deploy
```

If developing a plugin with a web app, watch for changes and deploy those automatically:

```bash
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_TOKEN=j44acwd8obn78cdcx7koid4jkr
make watch
```

### Deploying with credentials

Alternatively, you can authenticate with the server's API with credentials:

```bash
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_USERNAME=admin
export MM_ADMIN_PASSWORD=password
make deploy
```

or with a [personal access token](https://docs.mattermost.com/developer/personal-access-tokens.html):

```bash
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_TOKEN=j44acwd8obn78cdcx7koid4jkr
make deploy
```
