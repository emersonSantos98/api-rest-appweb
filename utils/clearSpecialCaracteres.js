async function clearSpecialCaracteres(string = '') {
    string = string.replace(/ /g, '-');
    string = string.replace(/[^A-Za-z0-9\-]/g, '');
    const specialCaracteres = ['“', '‘', '!', '@', '#', '$', '%', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', '<', '>', '.', ':', ';', '?', '/'];
    for (const char of specialCaracteres) {
        const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedChar, 'g');
        string = string.replace(regex, '');
    }
    return string;
}

module.exports = {clearSpecialCaracteres};
