const fs = require('fs');


const handleHtml = () => {

}

//todo: 需要维护一个白名单，放统计的sdk等
//需要考虑科学上网

const readHtml = () => {
    fs.readFile('../index.html', 'utf8', (err, data) => {
        if (err) throw err;
        const regexp = /"https?:\/\/.+?"/g;
        const matches = Array.from(data.matchAll(regexp));

        matches && matches.forEach((item, idx) => {
            console.log('itemx ', item[0]);
        });
    });
}

const main = () => {
    readHtml();
}

main();