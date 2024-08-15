function colorizeCode() {
  const element = document.getElementsByTagName("code")[0];

  if (element == null) {
    return;
  }

  const text = element.innerText;
  const language = element.classList[0];

  const keywords = {
    js: javascriptKeywords,
    ts: typescriptKeywords,
    html: htmlKeywords,
    css: cssKeywords,
    go: goKeywords,
    c: cKeywords,
    gql: graphqlKeywords,
    sql: sqlKeywords,
    jsx: reactKeywords,
    jest: testKeywords,
    sh: bashKeywords,
    yml: yamlKeywords,
    ino: arduinoKeywords,
  }[language];

  if (keywords == null) {
    return;
  }

  let coloredText = text;

  keywords.forEach(
    (/** @type {[]string} **/ subKeywords, /** @type {number} **/ i) => {
      const regex = new RegExp(`\\b(${subKeywords.join("|")})\\b`, "g");
      coloredText = coloredText.replaceAll(
        regex,
        (match) => `<span class="${COLORS[i]}">${match}</span>`,
      );
    },
  );

  element.innerHTML = coloredText;
}

/**
 * @param {string} snippet
 * @returns {Promise<string>}
 */
async function getCodeSnippet(snippet) {
  const response = await fetch(`../data/snippets/snippet.${snippet}`);
  const text = await response.text();

  return text;
}
