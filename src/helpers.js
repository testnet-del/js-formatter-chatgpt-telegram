const removeBlockquoteEscaping = (output) => {
    /**
     * Removes the escaping from blockquote tags.
     */
    output = output.replace(/&lt;blockquote&gt;/g, "<blockquote>").replace(/&lt;\/blockquote&gt;/g, "</blockquote>");
    return output;
};

module.exports = {
    removeBlockquoteEscaping
};
