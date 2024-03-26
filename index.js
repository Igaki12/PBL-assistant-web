const PORT = process.env.PORT || 3000;
const express = require('express');
const axios = require('axios');

const cheerio = require('cheerio');
const app = express();

// Web scraping
const search_word = 'プロゴルファー';
const URL_component = encodeURIComponent(search_word);
console.log(URL_component);
const URL = `https://ja.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fja.dbpedia.org&query=select+distinct+*+where+%7B+%3Chttp%3A%2F%2Fja.dbpedia.org%2Fresource%2F${URL_component}%3E+%3Fp+%3Fo+.+%7D%0D%0A&format=text%2Fhtml&timeout=0&signal_void=on`;
// const URL = 'https://ja.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fja.dbpedia.org&query=select+distinct+*+where+%7B+%3Chttp%3A%2F%2Fja.dbpedia.org%2Fresource%2F%E6%9D%B1%E4%BA%AC%E9%83%BD%3E+%3Fp+%3Fo+.+%7D%0D%0A&format=text%2Fhtml&timeout=0&signal_void=on';
// const URL = 'https://ja.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fja.dbpedia.org&query=select+distinct+*+where+%7B+%3Chttp%3A%2F%2Fja.dbpedia.org%2Fresource%2F%E6%9D%B1%E4%BA%AC%E9%83%BD%3E+%3Fp+%3Fo+.+%7D%0D%0A&format=text%2Fhtml&timeout=0&signal_void=on",
// const URL = 'https://ja.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fja.dbpedia.org&query=select+distinct+*+where+%7B+%3Chttp%3A%2F%2Fja.dbpedia.org%2Fresource%E6%9D%B1%E4%BA%AC%E9%83%BD&format=text%2Fhtml&timeout=0&signal_void=on",
const data = [];
axios.get(URL).then(response => {
    const htmlPerser = response.data;
    // console.log(htmlPerser);
    const $ = cheerio.load(htmlPerser);
    $('tr').each((i, element) => {
        const $element = $(element);
        const $td = $element.find('td');
        const obj = {
            p: $td.eq(0).text(),
            o: $td.eq(1).text()
        };
        data.push(obj);
        console.log(data);
        console.log(data.length);
    });
}).catch(error => {
    console.log(error);
});




app.listen(PORT, console.log(`Server is running on port ${PORT}`));