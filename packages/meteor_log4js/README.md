
# 环境变量默认支持

> 在meteor项目中，推荐使用settings.json配置代替。

```bash
export LOG4JS_CONFIG=path/to/file.json
```

# 使用log4js

第一次引入log4js的工程，需要下载代码到meteor的packages目录中：

```bash
git submodule add git@gitlab.astoyw.com:root/meteor_log4js.git log4js
```

已经引入log4js的工程，需要执行`git submodule`命令进行更新本地目录：

```bash
git submodule init
git submodule update --remote
```

下载好了log4js代码以后，引入log4js库到meteor工程，执行命令`meteor add wangxq:log4js`，然后在服务器代码中使用：

> 默认在meteor服务端提供了全局变量：logger，可直接使用。

```javascript
var logger = log4js.getLogger('my-absolute-logger');
logger.debug('this is a debug message');
logger.warn('this is a warn message');
logger.info('this is a info message');
```

客户端中的日志对象，默认是`logger = log4js.getLogger('client-logger');`全局变量，不要修改。在浏览器端使用：

```javascript
logger.debug('debug message');
logger.info('info message');
logger.warn('warn message');
logger.error('error message');
```

## 配置文件（通过环境变量）

关于配置文件的引入。将其使用环境变量`export LOG4JS_CONFIG=/path/to/log4js_config.json`进行指定。

> 注意，配置文件中的`"category": "client-logger"`，是要配合`log4js.getLogger("client-logger")`这样的日志记录者，并且名字一一对应的。用法同`log4j`。

### 案例 log4js_config.json

```json
{
  "appenders": [
    {
      "host": "192.168.4.136",
      "port": 4564,
      "type": "logstashUDP",
      "layout": {
        "type": "pattern",
        "pattern": "%m"
      },
      "fields": {
        "field1": "value1",
        "field2": "value2"
      },
      "category": "client-logger"
    },
    {
      "type": "console"
    },
    {
      "type": "file",
      "absolute": true,
      "filename": "/tmp/log_file.log",
      "maxLogSize": 20480,
      "backups": 3,
      "category": "client-logger"
    }
  ]
}
```


## 配置文件（通过settings.json）

在发布工具 meteor up 发布工程的时候，我们不能够上传一些文件作为配置文件。因此，我们一般会采用配置settings.json来解决实际问题。

