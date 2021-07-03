// 本脚本需要node版本>=12,否则matchAll函数会报错


const fs = require('fs');
const axios = require('axios');
// const axios = require('axios-https-proxy-fix')
const tunnel = require('tunnel');

axios.defaults.timeout = 5000;

const TUNNEL_OPTIONS = {
    proxy: {
        host: '127.0.0.1',
        port: 7890,
    }
}

axios.interceptors.request.use(function (config) {
    config.proxy = false // 强制禁用环境变量中的代理配置
    config.httpAgent = tunnel.httpOverHttp(TUNNEL_OPTIONS)
    config.httpsAgent = tunnel.httpsOverHttp(TUNNEL_OPTIONS)
    return config
})

//todo: 需要维护一个白名单，放统计的sdk等
//需要考虑科学上网
//处理科学上网的链接
//https://segmentfault.com/a/1190000039412894 axios访问国外接口
//https://cnodejs.org/topic/5954c901ff46b8a921c947d8
// https://janmolak.com/node-js-axios-behind-corporate-proxies-8b17a6f31f9d
// https://segmentfault.com/a/1190000020008982

const readHtml = async () => {
    fs.readFile('../index.html', 'utf8', async (err, data) => {
        if (err) throw err;
        const regexp = /"https?:\/\/.+?"/g;
        
        let matches = Array.from(data.matchAll(regexp));
        
        // 测试才需要这一行代码
        matches = matches.slice(0 ,10)

        for (let match of matches) {
            const url = match[0].slice(1, -1);
            try {
                await validUrl(url);
            } catch (e) {

            }
            
        }
    });
}


const validUrl = (url) => {
    const pro = new Promise((resolve, reject) => {
        console.log('开始校验url ', url);
        axios.get(url)
        .then(res => {
            console.log(`res--> ${url}请求成功`);
            resolve(res);
        }).catch(err => {
            let errlog = url;
            if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') >-1) {
                console.log(`${url} 网络请求超时了, 可能被墙了`)
                errlog = `${url} 网络请求超时了, 可能被墙了`;
            } else {
                //todo： 这种情况下要不要考虑重新请求一次
                // 参考文章
                // https://juejin.cn/post/6844903585751236621 
                // https://huangwang.github.io/2019/11/11/Axios%E8%AF%B7%E6%B1%82%E8%B6%85%E6%97%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95/
                console.log(`${url} 网络请求失败 ${err.code} ${err.message}`);
                errlog = `${url} 网络请求失败 ${err.code} ${err.message}`;
            }

            fs.writeFile('error.log',  errlog + '\n' , {flag: 'a+'}, function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log("写日志");
            });
            reject()
        })
    });
    return pro;
}


const main = () => {

    fs.writeFile('error.log',  '' , {flag: 'w'}, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("清空日志文件");
    });

    readHtml();

    // 测试代码
    // let url = 'https://www.baidu.com/';
    // let url = 'https://www.qq.com/';
    // let url = 'http://www.sail.name/';
    // let url = 'https://xxx.sail.name/';
    // let url = 'https://kankandou.com/';
    // let url = 'https://www.facebook.com/';
    // let url = 'https://www.google.com/';
    // validUrl(url);
}

main();