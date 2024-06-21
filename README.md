# Custom Types Plugin

- [Custom Types Plugin](#custom-types-plugin)
  - [1. Overview](#1-overview)
  - [2. Context](#2-context)
  - [3. Development Test](#3-development-test)
  - [4. Prod](#4-prod)

## 1. Overview

## 2. Context

- [Intro to Plugins](https://www.builder.io/c/docs/plugins-intro)
- [Overview of Built-in Plugins](https://www.builder.io/c/docs/plugins-builtin-overview?_host=www.builder.io)
- [Making a Plugin](https://www.builder.io/c/docs/make-a-plugin)

## 3. Development Test

Steps

```
npm install
npm run start
```

Go to builder -> Plugins -> Advanced configuration

Add the following url:

```
http://localhost:1268/plugin.system.js
```

## 4. Prod

```
https://cdn.jsdelivr.net/gh/scalefast/builder-io-custom-types-plugin@v0.0.1/dist/plugin.system.js
```
