# js-formatter-chatgpt-telegram

Converted Node.js package of [formatter-chatgpt-telegram](https://github.com/Latand/formatter-chatgpt-telegram/tree/main)

## Installation

To install the package, use npm:

```bash
npm install js-formatter-chatgpt-telegram
```

## Usage

After installing, you can use the package in your Node.js application:

```javascript
const { telegramFormat } = require('js-formatter-chatgpt-telegram');

const markdownText = `
# Heading

This is **bold** text and this is _italic_ text.

\`\`\`python
print('Hello, world!')
\`\`\`

[Link](http://example.com)
`;

const htmlText = telegramFormat(markdownText);

console.log(htmlText);
```