const axios = require('axios')

const API_BASE = "http://localhost:7000/api";
const API_RANKINGS = "/get/allTop10";
const API_SCORES = "/rankScore"


const computeRankScores = () => {
    console.log("compute");
    const map = new Map();
    axios.get(`${API_BASE}${API_RANKINGS}`)
        .then((response) => {
            data = response.data;
            size = data.length;
            console.log(response.data);
            for (let i = 0; i < size; i++) {
                let list = JSON.parse(data[i].top10_list);
                console.log(list);
                for (let j = 0; j < 10; j++) {
                    let slug = list[j];
                    if (!map.has(slug)) {
                        map.set(slug, {sum: 0, entries: 0, avg: 0})
                    }
                    map.set(slug, {sum: map.get(slug).sum + (j+1), entries: map.get(slug).entries + 1, avg: 0})
                }
            }
            map.forEach((value, key) => {
                //console.log(value.avg);
                map.set(key, {sum: value.sum, entries: value.entries, avg: (value.sum / value.entries)})
            });
            console.log(map);

            submitRankScores(map);
        })
        .catch(() => {
            console.log("API error")
        });
    return (map);
};

const submitRankScores = ( map ) => {
    console.log("A: " + map);
    map.forEach((value, key) => {
        console.log(key + value.avg);
        axios.post(`${API_BASE}${API_SCORES}`, {
            slug: key,
            score: value.avg
        });
    });

};

// let scores = new Map();
let scores = computeRankScores();
//console.log(scores);

// export default findConsensus;