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


console.log('axios ', axios);


// const agent = tunnel.httpsOverHttp({
//     proxy: {
//         host: '127.0.0.1',
//         port: 9090,
//     },
// });

// console.log('agent ', agent)

const handleHtml = () => {

}

//todo: 需要维护一个白名单，放统计的sdk等
//需要考虑科学上网
//处理科学上网的链接
//https://segmentfault.com/a/1190000039412894 axios访问国外接口
//https://cnodejs.org/topic/5954c901ff46b8a921c947d8
// https://janmolak.com/node-js-axios-behind-corporate-proxies-8b17a6f31f9d
// https://segmentfault.com/a/1190000020008982

const readHtml = () => {
    fs.readFile('../index.html', 'utf8', (err, data) => {
        if (err) throw err;
        const regexp = /"https?:\/\/.+?"/g;
        let matches = Array.from(data.matchAll(regexp));
        matches = matches.slice(0, 2);

        matches && matches.forEach((item, idx) => {
            console.log('itemx ', item[0]);
            // "http://www.sail.name/"
            // "https://github.com/iamsail/Resource"
            axios.options(item[0])
                .then(res => {
                    console.log('res--> ', res);
                })
        });
    });
}

const main = () => {
    // readHtml();

    // const urls = [
    //     // 'https://www.villainhr.com/',
    //     'http://www.sail.name/',
    //     // 'https://www.baidu.com/',
    // ];
    // urls && urls.forEach((item, idx) => {
    //     console.log('itemx ', item);
    //     // "http://www.sail.name/"
    //     // "https://github.com/iamsail/Resource"
    //     axios.get(item)
    //         .then(res => {
    //             console.log('res--> ', res);
    //         })
    // });


    // let url = 'https://www.baidu.com/';
    // let url = 'https://www.qq.com/';
    // let url = 'http://www.sail.name/';
    // let url = 'https://tech.meituan.com/';
    // let url = 'https://xxx.sail.name/';
    // let url = 'https://kankandou.com/';
    // let url = 'https://www.facebook.com/';
    let url = 'https://www.google.com/';
    
    // axios.options(url, {
    axios.get(url, {
        // proxy: {
        //     // protocol: 'https',
        //     protocol: 'http',
        //     host: '127.0.0.1',
        //     port: 9090,
        // }
        
        // httpsAgent: agent,
        // httpAgent: agent,
        // proxy: false, 
    })
        .then(res => {
            console.log('res--> ', res.data);
        }).catch(err => {
            // console.log('xxx--> ', xxx);
            // console.log('xxx--> ', xxx);
            if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') >-1) {
                console.log(`${url} 网络请求超时了, 可能被墙了`)
            } else {
                //todo： 这种情况下要不要考虑重新请求一次
                // 参考文章
                // https://juejin.cn/post/6844903585751236621 
                // https://huangwang.github.io/2019/11/11/Axios%E8%AF%B7%E6%B1%82%E8%B6%85%E6%97%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95/
                console.log(`${url}网络请求失败 ${err.code} ${err.message}`);
            }
        })
}

main();