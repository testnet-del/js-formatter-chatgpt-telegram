const convertHtmlChars = (text) => {
    /**
     * Converts HTML reserved symbols to their respective character references.
     */
    text = text.replace(/&/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    return text;
};

const splitByTag = (outText, mdTag, htmlTag) => {
    /**
     * Splits the text by markdown tag and replaces it with the specified HTML tag.
     */
    const tagPattern = new RegExp(`(?<!\\w)${escapeRegExp(mdTag)}(.*?)${escapeRegExp(mdTag)}(?!\\w)`, 'gs');
    return outText.replace(tagPattern, `<${htmlTag}>$1</${htmlTag}>`);
};

const escapeRegExp = (string) => {
    /**
     * Escapes special characters in a string to be used in a regular expression.
     */
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = {
    convertHtmlChars,
    splitByTag
};
