const ensureClosingDelimiters = (text) => {
    /**
     * Ensures that if an opening ` or ``` is found without a matching closing delimiter,
     * the missing delimiter is appended to the end of the text.
     */
    // For triple backticks
    if ((text.match(/```/g) || []).length % 2 !== 0) {
        text += "```";
    }
    // For single backticks
    if ((text.match(/`/g) || []).length % 2 !== 0) {
        text += "`";
    }
    return text;
};

const extractAndConvertCodeBlocks = (text,ignoreMarkdownBlock=false) => {
    /**
     * Extracts code blocks from the text, converting them to HTML <pre><code> format,
     * and replaces them with placeholders. Also ensures closing delimiters for unmatched blocks.
     */
    text = ensureClosingDelimiters(text);
    
    const placeholders = [];
    const codeBlocks = {};

    const replacer = (match, language, newline, codeContent,ignoreMarkdown) => {
        const placeholder = `CODEBLOCKPLACEHOLDER${placeholders.length}`;
        placeholders.push(placeholder);
        let htmlCodeBlock;
        if (!language) {
            htmlCodeBlock = `<pre><code>${codeContent}</code></pre>`;
        } else {
            if(language.toLowerCase()=='markdown' && ignoreMarkdown){
                htmlCodeBlock = codeContent;
            }else{
                htmlCodeBlock = `<pre><code class="language-${language}">${codeContent}</code></pre>`;
            }
        }
        return [placeholder, htmlCodeBlock];
    };

    let modifiedText = text;
    const codeBlockRegex = /```(\w*)?(\n)?(.*?)```/gs;
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
        const [fullMatch, language, newline, codeContent] = match;
        const [placeholder, htmlCodeBlock] = replacer(match, language, newline, codeContent,ignoreMarkdownBlock);
        codeBlocks[placeholder] = htmlCodeBlock;
        modifiedText = modifiedText.replace(fullMatch, placeholder);
    }

    return [modifiedText, codeBlocks];
};

const reinsertCodeBlocks = (text, codeBlocks) => {
    /**
     * Reinserts HTML code blocks into the text, replacing their placeholders.
     */
    for (const [placeholder, htmlCodeBlock] of Object.entries(codeBlocks)) {
        text = text.replace(placeholder, htmlCodeBlock);
    }
    return text;
};

module.exports = {
    ensureClosingDelimiters,
    extractAndConvertCodeBlocks,
    reinsertCodeBlocks
};
