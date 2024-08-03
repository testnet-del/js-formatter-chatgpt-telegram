const { telegramFormat } = require('./src/telegramFormatter');

test('split by tag bold', () => {
    const text = "This is **bold** text";
    expect(telegramFormat(text)).toBe("This is <b>bold</b> text");
});

test('telegram format italic', () => {
    const text = "This is _italic_ text";
    const output = telegramFormat(text);
    expect(output).toBe("This is <i>italic</i> text");
});

test('telegram format italic star', () => {
    const text = "This is *italic* text";
    const output = telegramFormat(text);
    expect(output).toBe("This is <i>italic</i> text");
});

test('triple backticks with language', () => {
    const inputText = "```python\nprint('Hello, world!')\n```";
    const expectedOutput = '<pre><code class="language-python">print(\'Hello, world!\')\n</code></pre>';
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('bold and underline conversion', () => {
    const inputText = "This is **bold** and this is __underline__.";
    const expectedOutput = "This is <b>bold</b> and this is <u>underline</u>.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('escaping special characters', () => {
    const inputText = "Avoid using < or > in your HTML.";
    const expectedOutput = "Avoid using &lt; or &gt; in your HTML.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('nested markdown syntax', () => {
    const inputText = "This is **bold and _italic_** text.";
    const expectedOutput = "This is <b>bold and <i>italic</i></b> text.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('combination of markdown elements', () => {
    const inputText = `
# Heading
This is a test of **bold**, __underline__, and \`inline code\`.
- Item 1
* Item 2

\`\`\`python
for i in range(3):
    print(i)
\`\`\`

[Link](http://example.com)
`;
    const expectedOutput = `<b>Heading</b>\nThis is a test of <b>bold</b>, <u>underline</u>, and <code>inline code</code>.\n• Item 1\n• Item 2\n\n<pre><code class="language-python">for i in range(3):\n    print(i)\n</code></pre>\n\n<a href="http://example.com">Link</a>\n`;
    const output = telegramFormat(inputText);
    expect(output.trim()).toBe(expectedOutput.trim());
});

test('nested bold within italic', () => {
    const inputText = "This is *__bold within italic__* text.";
    const expectedOutput = "This is <i><u>bold within italic</u></i> text.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('italic within bold', () => {
    const inputText = "This is **bold and _italic_ together**.";
    const expectedOutput = "This is <b>bold and <i>italic</i> together</b>.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('inline code within bold text', () => {
    const inputText = "This is **bold and `inline code` together**.";
    const expectedOutput = "This is <b>bold and <code>inline code</code> together</b>.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('mixed formatting tags with lists and links', () => {
    const inputText = `
- This is a list item with **bold**, __underline__, and [a link](http://example.com)
- Another item with ***bold and italic*** text
`;
    const expectedOutput = `
• This is a list item with <b>bold</b>, <u>underline</u>, and <a href="http://example.com">a link</a>
• Another item with <b><i>bold and italic</i></b> text
`;
    const output = telegramFormat(inputText);
    expect(output.trim()).toBe(expectedOutput.trim());
});

test('special characters within code blocks', () => {
    const inputText = "Here is a code block: ```<script>alert('Hello')</script>```";
    const expectedOutput = "Here is a code block: <pre><code>&lt;script&gt;alert('Hello')&lt;/script&gt;</code></pre>";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('code block within bold text', () => {
    const inputText = "This is **bold with a `code block` inside**.";
    const expectedOutput = "This is <b>bold with a <code>code block</code> inside</b>.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('triple backticks with nested markdown', () => {
    const inputText = "```python\n**bold text** and __underline__ in code block```";
    const expectedOutput = '<pre><code class="language-python">**bold text** and __underline__ in code block</code></pre>';
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('unmatched code delimiters', () => {
    const inputText = "This has an `unmatched code delimiter.";
    const expectedOutput = "This has an <code>unmatched code delimiter.</code>";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('preformatted block with unusual language specification', () => {
    const inputText = "```weirdLang\nSome weirdLang code\n```";
    const expectedOutput = '<pre><code class="language-weirdLang">Some weirdLang code\n</code></pre>';
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('inline code within lists', () => {
    const inputText = `
- List item with \`code\`
* Another \`code\` item
`;
    const expectedOutput = `
• List item with <code>code</code>
• Another <code>code</code> item
`;
    const output = telegramFormat(inputText);
    expect(output.trim()).toBe(expectedOutput.trim());
});

test('vector storage links trim', () => {
    const inputText = `
- List item with \`code\`
* Another \`code\` item 
`;
    const expectedOutput = `
• List item with <code>code</code>
• Another <code>code</code> item
`;
    const output = telegramFormat(inputText);
    expect(output.trim()).toBe(expectedOutput.trim());
});

test('strikethrough conversion', () => {
    const inputText = "This is ~~strikethrough~~ text.";
    const expectedOutput = "This is <s>strikethrough</s> text.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('blockquote conversion', () => {
    const inputText = "> This is a blockquote.";
    const expectedOutput = "<blockquote>This is a blockquote.</blockquote>";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('inline URL conversion', () => {
    const inputText = "[example](http://example.com)";
    const expectedOutput = '<a href="http://example.com">example</a>';
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('inline mention conversion', () => {
    const inputText = "[User](tg://user?id=123456789)";
    const expectedOutput = '<a href="tg://user?id=123456789">User</a>';
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('escaping ampersand', () => {
    const inputText = "Use & in your HTML.";
    const expectedOutput = "Use &amp; in your HTML.";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('pre and code tags with HTML entities', () => {
    const inputText = "```html\n<div>Content</div>\n```";
    const expectedOutput = '<pre><code class="language-html">&lt;div&gt;Content&lt;/div&gt;\n</code></pre>';
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('code with multiple lines', () => {
    const inputText = "```\ndef example():\n    return 'example'\n```";
    const expectedOutput = "<pre><code>def example():\n    return 'example'\n</code></pre>";
    const output = telegramFormat(inputText);
    expect(output).toBe(expectedOutput);
});

test('combined formatting with lists', () => {
    const inputText = `
- **Bold** list item
- _Italic_ list item
- \`Code\` list item
`;
    const expectedOutput = `
• <b>Bold</b> list item
• <i>Italic</i> list item
• <code>Code</code> list item
`;
    const output = telegramFormat(inputText);
    expect(output.trim()).toBe(expectedOutput.trim());
});

test('md large example', () => {
    const inputText = `
1. **Headings:**
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

2. **Emphasis:**

*Italic text* or _Italic text_

**Bold text** or __Underline text__

***Bold and italic text*** or ___Underline and italic text___

3. **Lists:**
   - **Unordered List:**

   - Item 1
   - Item 2
     - Subitem 1
     - Subitem 2
   
   - **Ordered List:**

   1. First item
   2. Second item
      1. Subitem 1
      2. Subitem 2

4. **Links:**

[OpenAI](https://www.openai.com)

5. **Images:**

![Alt text for image](URL_to_image)
![Alt text for image](URL_to_імедж)

6. **Blockquotes:**

> This is a blockquote.
> It can span multiple lines.

7. **Inline Code:**

Here is some \`inline code\`.

8. **Code Blocks:**

\`\`\`python
def example_function():
    print("Hello World")
\`\`\`

9. **Tables:**

| Header 1 | Header 2 |
|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 |
| Row 2 Col 1 | Row 2 Col 2 |

10. **Horizontal Rule:**

---
`;
    const expectedOutput = `
1. <b>Headings:</b>
<b>H1 Heading</b>
<b>H2 Heading</b>
<b>H3 Heading</b>
<b>H4 Heading</b>
<b>H5 Heading</b>
<b>H6 Heading</b>

2. <b>Emphasis:</b>

<i>Italic text</i> or <i>Italic text</i>

<b>Bold text</b> or <u>Underline text</u>

<b><i>Bold and italic text</i></b> or <u><i>Underline and italic text</i></u>

3. <b>Lists:</b>
   • <b>Unordered List:</b>

   • Item 1
   • Item 2
     • Subitem 1
     • Subitem 2
   
   • <b>Ordered List:</b>

   1. First item
   2. Second item
      1. Subitem 1
      2. Subitem 2

4. <b>Links:</b>

<a href="https://www.openai.com">OpenAI</a>

5. <b>Images:</b>

<a href="URL_to_image">Alt text for image</a>
<a href="URL_to_імедж">Alt text for image</a>

6. <b>Blockquotes:</b>

<blockquote>This is a blockquote.
It can span multiple lines.</blockquote>

7. <b>Inline Code:</b>

Here is some <code>inline code</code>.

8. <b>Code Blocks:</b>

<pre><code class="language-python">def example_function():
    print("Hello World")
</code></pre>

9. <b>Tables:</b>

| Header 1 | Header 2 |
|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 |
| Row 2 Col 1 | Row 2 Col 2 |

10. <b>Horizontal Rule:</b>

---
`;
    const output = telegramFormat(inputText);
    console.log('output :>> ', output);
    expect(output.trim()).toBe(expectedOutput.trim());
});
