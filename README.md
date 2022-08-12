# app-store-connect-slack-report-example

## Setup for GitHub Actions

Set [secrets](https://docs.github.com/ja/actions/security-guides/encrypted-secrets) listed in .env.example to your project.

`PRIVATE_KEY` must be base64 encoded string. You can use `base64` command.

```
$ base64 /path/to/p8/file
```

## Run locally

```bash
$ npm install
$ cp .env.example .env
# set environment variables in .env
$ direnv allow .
$ npm run notify
```

