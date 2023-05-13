function countChars(s) {
    const letters = (s.match(/[a-zA-Z]/g) || []).length;
    const symbols = (s.match(/[^a-zA-Z0-9]/g) || []).length;
    const numbers = (s.match(/\d/g) || []).length;

    return { letters, symbols, numbers };
}


module.exports = countChars;