const removeAllSpecialCharacters = (text) => {
    return text.toString().replace(/[^a-zA-Z0-9 ]/g, '');
};

module.exports = { removeAllSpecialCharacters };