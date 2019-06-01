# jira-cli

A CLI tool for [JIRA](`https://www.atlassian.com/software/jira`) for day to day usage with JIRA client.

## Prerequisites

You are required to have [Node.js](https://nodejs.org/) installed to run the app locally.

## Getting Started

1. Log in to [Atlassian](https://id.atlassian.com/manage/api-tokens) and        generate your API TOKEN.
2. Copy the API TOKEN

## Login In Cli

```sh
jira-cli --login
```

This will prompt few questions to enter your credentials please enter the credentials to use the CLI

```sh
$ Host Name to use JIRA API 
$ Your Jira User Name 
$ YOUR API TOKEN 
```

## Cli help
```sh
jira-cli --help 
```

## Contribution

Here in the CLI tool only few of the use cases have been implemented which are more basic usage with JIRA client.
You can help with code contribution to add more functionality to the CLI tool.

## License

**JIRA-CLI** is available under the **MIT license**. See the [LICENSE](https://github.com/junipdewan/jira-cli/blob/master/LICENSE) file for more info.