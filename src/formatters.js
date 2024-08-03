const combineBlockquotes = (text) => {
    /**
     * Combines multiline blockquotes into a single blockquote while keeping the \n characters.
     */
    const lines = text.split("\n");
    const combinedLines = [];
    let blockquoteLines = [];
    let inBlockquote = false;

    for (const line of lines) {
        if (line.startsWith(">")) {
            inBlockquote = true;
            blockquoteLines.push(line.slice(1).trim());
        } else {
            if (inBlockquote) {
                combinedLines.push(
                    `<blockquote>${blockquoteLines.join("\n")}</blockquote>`
                );
                blockquoteLines = [];
                inBlockquote = false;
            }
            combinedLines.push(line);
        }
    }

    if (inBlockquote) {
        combinedLines.push(
            `<blockquote>${blockquoteLines.join("\n")}</blockquote>`
        );
    }

    return combinedLines.join("\n");
};

module.exports = {
    combineBlockquotes
};
