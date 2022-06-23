## 说明

vue2-bundler提供了Vue2的单文件的打包功能，其构建产物为
```
es/
lib/
index.js
index.min.js
index.min.js.map
index.mjs
index.min.mjs
index.min.mjs.map
```


## 下载
``` bash
npm install @charrue/vue2-bundler -D
```

## 使用

1. 设置npm scripts
``` json
{
  "scripts": {
    "build": "vue2-bundler"
  }
}
```

2. 创建配置文件
``` js
// charrue.config.js
import { defineConfig } from "@charrue/vue2-bundler"

export default defineConfig({
  vueBuild: {
    input: "src/index.ts",
    outputDir: "dist",
    name: "Foo"
  }
})
```
