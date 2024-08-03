const { convertHtmlChars, splitByTag } = require('./converters');
const { extractAndConvertCodeBlocks, reinsertCodeBlocks } = require('./extractors');
const { combineBlockquotes } = require('./formatters');
const { removeBlockquoteEscaping } = require('./helpers');

function telegramFormat(text) {
    /**
     * Converts markdown in the provided text to HTML supported by Telegram.
     */

    // Step 0: Combine blockquotes
    text = combineBlockquotes(text);

    // Step 1: Convert HTML reserved symbols
    text = convertHtmlChars(text);

    // Step 2: Extract and convert code blocks first
    let [ output, codeBlocks ] = extractAndConvertCodeBlocks(text);

    // Step 3: Escape HTML special characters in the output text
    output = output.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Inline code
    output = output.replace(/`(.*?)`/g, '<code>$1</code>');

    // Nested Bold and Italic
    output = output.replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>');
    output = output.replace(/___(.*?)___/g, '<u><i>$1</i></u>');

    // Process markdown formatting tags (bold, underline, italic, strikethrough)
    output = splitByTag(output, '**', 'b');
    output = splitByTag(output, '__', 'u');
    output = splitByTag(output, '_', 'i');
    output = splitByTag(output, '*', 'i');
    output = splitByTag(output, '~~', 's');

    // Remove storage links
    output = output.replace(/【[^】]+】/g, '');

    // Convert links
    output = output.replace(/!?\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Convert headings
    output = output.replace(/^\s*#+ (.+)/gm, '<b>$1</b>');

    // Convert unordered lists, preserving indentation
    output = output.replace(/^(\s*)[-*] (.+)/gm, '$1• $2');

    // Step 4: Reinsert the converted HTML code blocks
    output = reinsertCodeBlocks(output, codeBlocks);

    // Step 5: Remove blockquote escaping
    output = removeBlockquoteEscaping(output);

    return output;
}

module.exports = { telegramFormat };
