# webpack5 和 Babel7 从头开始创建React应用程序
## 一、配置webpack
1、基本安装
首先我们创建一个目录webpack-react，初始化 npm，然后在本地安装 webpack，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：
```shell
mkdir webpack-react && cd webpack-react
npm init -y
npm install webpack webpack-cli --save-dev
```

2.更新 package.json 文件：
```shell
{
  "name": "webpack-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "webpack": "^5.3.2",
    "webpack-cli": "^4.1.0"
  }
}
```
注：这里package.json文件我只列举了重要信息。

3、现在我们将在项目根目录创建以下目录结构、文件和内容：
* src目录结构：

![src](https://i.niupic.com/images/2020/10/30/8VZu.png
)

* 项目根目录下创建index.html文件
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React、webpack5 and Babel7</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

## 二、配置React和Babel
1、安装react和react-dom作为依赖：
```shell
npm install --save react react-dom
```

2、安装 babel7相关模块
```shell
npm install --save-dev babel-loader @babel/preset-react @babel/preset-env @babel/core
```
* babel-loader：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器
* @babel/preset-react：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数
* @babel/preset-env：根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性
* @babel/core：即 babel-core，将 ES6 代码转换为 ES5

3、创建 webpack.config.js 和 .babelrc 文件，并配置 babel-loader 及 babel 选项
* 创建webpack.config.js文件，并按如下配置：
```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};
```
* 创建.babelrc文件并添加配置信息：
```js
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            // 大于相关浏览器版本无需用到 preset-env
            "edge": 17,
            "firefox": 60,
            "chrome": 67,
            "safari": 11.1
          },
          // 根据代码逻辑中用到的 ES6+语法进行方法的导入，而不是全部导入
          "useBuiltIns": "usage"
        }
      ],
      "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

4、在src目录下创建index.js文件渲染组件
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

5、安装 html-webpack-plugin和clean-webpack-plugin 作为 dev 依赖项，并配置 webpack.config.js
```shell
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'React,webpack5 and Babel7',
            template: 'index.html',
            filename: 'index.html'
        })
    ]
};
```

运行npm run build生成dist目录：

![打包dist目录](https://i.niupic.com/images/2020/10/30/8W0h.png)


## 三、配置webpack-dev-server
1、安装项目
```js
npm install --save-dev webpack-dev-server
```

2、更新package.json文件
```js
{
  "name": "webpack-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --env mode",
    "build": "webpack --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.12.3",
    "@babel/preset-env": "^7.12.1",
    "@babel/preset-react": "^7.12.1",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^5.3.2",
    "webpack-cli": "^4.1.0",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {
    "classnames": "^2.2.6",
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  }
}
```
3、执行npm run start,在浏览器打开localhost:8080页面

## 四、配置CSS、图片
1、安装
```js
npm install --save-dev css-loader style-loader
```

2、配置webpack.config.js
```js
const path = require('path');

module.exports = {
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
```

以上就完成配置react应用程序，若有帮助，赏个star☺️。
