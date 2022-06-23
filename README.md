community-js-qiita-orbit 
=================

Simply activity tracker for Orbit.
We can track the creating content activity in Qiita using Qiita API(v2).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g community-js-qiita-orbit
$ orbit-zenn COMMAND
running command...
$ orbit-zenn (--version)
community-js-qiita-orbit/0.2.0 darwin-x64 node-v16.13.1
$ orbit-zenn --help [COMMAND]
USAGE
  $ orbit-zenn COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`orbit-zenn activities put KEYWORD`](#orbit-zenn-activities-put-keyword)
* [`orbit-zenn help [COMMAND]`](#orbit-zenn-help-command)
* [`orbit-zenn search members KEYWORD`](#orbit-zenn-search-members-keyword)
* [`orbit-zenn search posts KEYWORD`](#orbit-zenn-search-posts-keyword)

## `orbit-zenn activities put KEYWORD`

Put contenct creation activity to Orbit

```
USAGE
  $ orbit-zenn activities put [KEYWORD] [-d] [-a <value>] [-w <value>]

ARGUMENTS
  KEYWORD  Search keyword

FLAGS
  -a, --api-key=<value>         Orbit API key
  -d, --debug                   Show process log
  -w, --workspace-name=<value>  Orbit workspace name

DESCRIPTION
  Put contenct creation activity to Orbit

EXAMPLES
  $ orbit-zenn activities put <keyword>: Put contenct creation activity to Orbit

  $ orbit-zenn activities put <keyword> -w orbit-workspace-name -a obw_xxx : Put contenct creation activity to Orbit
```

## `orbit-zenn help [COMMAND]`

Display help for orbit-zenn.

```
USAGE
  $ orbit-zenn help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for orbit-zenn.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `orbit-zenn search members KEYWORD`

Search Orbit member by the username each source.

```
USAGE
  $ orbit-zenn search members [KEYWORD] [-f json|table] [-t <value>] [-a <value>] [-w <value>]

ARGUMENTS
  KEYWORD  Search keyword

FLAGS
  -a, --api-key=<value>         Orbit API key
  -f, --format=(json|table)     [default: json]
  -t, --target=<value>          [default: tag]
  -w, --workspace-name=<value>  Orbit workspace name

DESCRIPTION
  Search Orbit member by the username each source.

EXAMPLES
  $ orbit-zenn search members username -t twitter : search username from Twitter source

  $ orbit-zenn search members username -t Custom : search username from custom source

  $ orbit-zenn search members username -t Custom -f table : Show result as a table

  $ orbit-zenn search members username -t Custom -w orbit-workspace-name -a obw_xxx
```

## `orbit-zenn search posts KEYWORD`

search Qiita posts

```
USAGE
  $ orbit-zenn search posts [KEYWORD] [-f json|table] [-t <value>]

ARGUMENTS
  KEYWORD  Search keyword

FLAGS
  -f, --format=(json|table)  [default: json]
  -t, --target=<value>       [default: tag]

DESCRIPTION
  search Qiita posts

EXAMPLES
  $ orbit-zenn search posts qiita : search by tag

  $ orbit-zenn search posts qiita -f table : search by tag (table style)
```
<!-- commandsstop -->
