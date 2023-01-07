import wordBank from './wordle-bank.txt';

export const boardDefault = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

export const generateWordset = async() => {
    let wordSet;
    await fetch(wordBank)
        .then(res => res.text())
        .then((result) => {
            const wordArr = result.split("\n").map(word => word.substring(0, word.length-1));
            wordSet = new Set(wordArr);
        });
    
    return { wordSet };
}