# jirax-cli
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)  [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)



![made with nodejs](https://img.shields.io/badge/madewith-node.js-green.svg) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](http://makeapullrequest.com) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![license](https://img.shields.io/github/license/visionmedia/superagent.svg)](LICENSE)



A CLI tool for [JIRA](`https://www.atlassian.com/software/jira`) for day to day usage with JIRA client.

## Prerequisites

You are required to have [Node.js](https://nodejs.org/) installed to run the app locally.

## Getting Started

1. Log in to [Atlassian](https://id.atlassian.com/manage/api-tokens) and        generate your API TOKEN.
2. Copy the API TOKEN

## Making executable

After cloning the repository. Run this command this command will automatically create plateform specific executables.

```sh
 npm run build
```

## Login In Cli

```sh
jirax-cli --login
```

This will prompt few questions to enter your credentials please enter the credentials to use the CLI

```sh
$ Host name to use JIRA (for eg: something.atlassian.com)
$ Your Jira User Name
$ Your API Token 
```

## Cli help
```sh
jirax-cli --help 
```

## Contribution

Here in the CLI tool only few of the use cases have been implemented which are more basic usage with JIRA client.
You can help with code contribution to add more functionality to the CLI tool.

## License

**JIRA-CLI** is available under the **MIT license**. See the [LICENSE](https://github.com/junipdewan/jira-cli/blob/master/LICENSE) file for more info.