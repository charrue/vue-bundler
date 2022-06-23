## 说明

vue3-bundler提供了Vue3的单文件的打包功能，其构建产物为
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
# 依赖于Vue3
npm install vue @charrue/vue3-bundler -D
```

## 使用

1. 设置npm scripts
``` json
{
  "scripts": {
    "build": "vue3-bundler"
  }
}
```

2. 创建配置文件
``` js
// charrue.config.js
import { defineConfig } from "@charrue/vue3-bundler"

export default defineConfig({
  vueBuild: {
    input: "src/index.ts",
    outputDir: "dist",
    name: "Foo"
  }
})
```
