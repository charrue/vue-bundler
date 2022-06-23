#!/usr/bin/env node
const { start } = require("../dist/index.js");

start()
  .then()
  .catch((e) => {
    console.error(e);
  });
