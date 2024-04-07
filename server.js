const express = require("express");
const app = express();
const port = 3000;
const PROJECT_DOMAIN = process.env.PROJECT_DOMAIN;
var exec = require("child_process").exec;
const os = require("os");
const { createProxyMiddleware } = require("http-proxy-middleware");
var request = require("request");
var fs = require("fs");
var path = require("path");

function authMiddleware(req, res, next) {
    const authToken = process.env.AUTH_TOKEN;
  
    if (authToken) {
        const reqAuthToken = req.headers.authorization;
        if (reqAuthToken && reqAuthToken === `Bearer ${authToken}`) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        next();
    }
  }

//获取系统进程表
app.get("/status", (req, res) => {
    let cmdStr = "ps -ef";
    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            res.type("html").send("<pre>命令行执行错误：\n" + err + "</pre>");
        } else {
            res.type("html").send("<pre>命令行执行结果：\n" + stdout + "</pre>");
        }
    });
});

// 获取系统监听端口
app.get("/listen", function (req, res) {
    let cmdStr = "ss -nltp";
    exec(cmdStr, function (err, stdout, stderr) {
      if (err) {
        res.type("html").send("<pre>命令行执行错误：\n" + err + "</pre>");
      } else {
        res.type("html").send("<pre>获取系统监听端口：\n" + stdout + "</pre>");
      }
    });
  });

//获取系统版本、内存信息
app.get("/info", (req, res) => {
    let cmdStr = "cat /etc/*release | grep -E ^NAME";
    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            res.send("命令行执行错误：" + err);
        } else {
            res.send(
                "命令行执行结果：\n" +
                "Linux System:" +
                stdout +
                "\nRAM:" +
                os.totalmem() / 1000 / 1000 +
                "MB"
            );
        }
    });
});

//文件系统只读测试
app.get("/test", (req, res) => {
    fs.writeFile("./test.txt", "这里是新创建的文件内容!", function (err) {
        if (err) res.send("创建文件失败，文件系统权限为只读：" + err);
        else res.send("创建文件成功，文件系统权限为非只读：");
    });
});

app.use(
    "/" + "*", authMiddleware, 
    createProxyMiddleware({
        target: "http://127.0.0.1:3040/", 
        changeOrigin: false, 
        ws: true,
        logLevel: "error",
        onProxyReq: function onProxyReq(proxyReq, req, res) { }
    })
);

function keepalive() {
    let glitch_app_url = `https://${PROJECT_DOMAIN}.glitch.me`;
    exec("curl " + glitch_app_url, function (err, stdout, stderr) { });

    exec("curl " + glitch_app_url + "/status", function (err, stdout, stderr) {
        if (!err) {
            if (stdout.indexOf("node app.js") != -1) {
            } else {
                exec("node app.js");
            }
        } else console.log("保活-请求服务器进程表-命令行执行错误: " + err);
    });
}
setInterval(keepalive, 9 * 1000);

function keep_argo_alive() {
    exec("pgrep -laf cloudflared", function (err, stdout, stderr) {
      // 1.查后台系统进程，保持唤醒
      if (stdout.includes("./cloudflared tunnel")) {
        console.log("Argo 正在运行");
      } else {
        //Argo 未运行，命令行调起
        exec("bash argo.sh 2>&1 &", function (err, stdout, stderr) {
          if (err) {
            console.log("保活-调起Argo-命令行执行错误:" + err);
          } else {
            console.log("保活-调起Argo-命令行执行成功!");
          }
        });
      }
    });
  }
  setInterval(keep_argo_alive, 30 * 1000);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
