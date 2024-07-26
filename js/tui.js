const MAIN_CONTAINER = document.getElementById("main-container");
const SECTION_CONTAINER = document.getElementById("section-container");
const LEFT_SECTION = document.getElementById("left-section");
const RIGHT_SECTION = document.getElementById("right-section");

const HOME_SECTION = document.getElementById("home");
const SKILLS_SECTION = document.getElementById("skills");
const EXPERIENCE_SECTION = document.getElementById("experience");
const PROJECTS_SECTION = document.getElementById("projects");
const FOOTER_SECTION = document.getElementById("footer");
const MAIN_CONTENT_SECTION = document
  .getElementById("main-content")
  ?.getElementsByClassName("container-content")[0];

const COLORS = ["text-blue", "text-orange", "text-pink"];

const left_sections = [
  { name: "home", section: HOME_SECTION, items: [] },
  {
    name: "experience",
    section: EXPERIENCE_SECTION,
    items: [...EXPERIENCE_SECTION.firstElementChild.children[2].children],
  },
  {
    name: "projects",
    section: PROJECTS_SECTION,
    items: [...PROJECTS_SECTION.firstElementChild.children[2].children],
  },
  {
    name: "skills",
    section: SKILLS_SECTION,
    items: [...SKILLS_SECTION.firstElementChild.children[2].children],
  },
];

const currentPosition = {
  sectionIndex: 0,
  sectionItemIndex: 0,
};

const previousPosition = {
  sectionIndex: 0,
  sectionItemIndex: 0,
};

function clamp(min, value, max) {
  return Math.min(Math.max(min, value), max);
}

function isMobile() {
  return window.innerWidth <= 768;
}

function setupBibleReloadButton(button) {
  if (button == null) {
    return;
  }

  button.addEventListener("click", async () => {
    await displayRandomBibleVerse();
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "var(--clr-primary-txt)";
  });
  button.addEventListener("mouseenter", () => {
    const color = ["var(--clr-blue)", "var(--clr-orange)", "var(--clr-pink)"][
      Math.floor(Math.random() * 3)
    ];
    button.style.backgroundColor = color;
  });
}

async function fetchRandomBibleVerse() {
  const response = await fetch(
    "https://labs.bible.org/api/?passage=random&type=json&callback=amen",
  );
  const jsonpResponse = await response.text();

  const jsonStartIndex = jsonpResponse.indexOf("{");
  const jsonEndIndex = jsonpResponse.lastIndexOf("}");
  const jsonString = jsonpResponse.substring(jsonStartIndex, jsonEndIndex + 1);
  const data = JSON.parse(jsonString);

  return data;
}

async function displayRandomBibleVerse(parentElement = null) {
  try {
    const bibleVerse =
      document.getElementsByClassName("bible-verse")?.[0] ||
      document.createElement("div");

    if (!bibleVerse.classList.contains("bible-verse")) {
      bibleVerse.classList.add("bible-verse");
    }

    const referenceElement = document.createElement("div");
    referenceElement.classList.add("reference");

    const textElement = document.createElement("div");
    textElement.innerHTML = "Connecting to the Holy Ghost...";

    const reloadButton = document.createElement("button");
    setupBibleReloadButton(reloadButton);

    bibleVerse.innerHTML = "";

    bibleVerse.appendChild(reloadButton);
    bibleVerse.appendChild(textElement);
    bibleVerse.appendChild(referenceElement);

    parentElement?.appendChild(bibleVerse);

    const { text, bookname, chapter, verse } = await fetchRandomBibleVerse();
    referenceElement.innerText = `${bookname} ${chapter}:${verse}`;
    textElement.innerHTML = text
      .replaceAll(
        "Jesus",
        `<span class="${getRandomTextColorClass()}">Jesus</span>`,
      )
      .replaceAll(
        "Christ",
        `<span class="${getRandomTextColorClass()}">Christ</span>`,
      )
      .replaceAll(
        "Savior",
        `<span class="${getRandomTextColorClass()}">Savior</span>`,
      )
      .replaceAll(
        "Lord",
        `<span class="${getRandomTextColorClass()}">Lord</span>`,
      )
      .replaceAll(
        "God",
        `<span class="${getRandomTextColorClass()}">God</span>`,
      )
      .replaceAll(
        "Faith",
        `<span class="${getRandomTextColorClass()}">Faith</span>`,
      );
  } catch (e) {
    console.error(e);
  }
}

function getRandomTextColorClass() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function colorizeString(str) {
  return str
    .replaceAll("{{", () => `<span class="${getRandomTextColorClass()}">`)
    .replaceAll("}}", "</span>");
}

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
    sql: sqlKeywords,
    mjs: nodeKeywords,
    html: htmlKeywords,
    css: cssKeywords,
    go: goKeywords,
    c: cKeywords,
    graphql: graphqlKeywords,
    sql: sqlKeywords,
    tsx: reactKeywords,
    test: testKeywords,
    sh: bashKeywords,
    yml: yamlKeywords,
    ino: arduinoKeywords,
  }[language];

  if (keywords == null) {
    return;
  }

  let coloredText = text;

  keywords.forEach((subKeywords, i) => {
    if (subKeywords.length === 0) {
      return;
    }

    const regex = new RegExp(`\\b(${subKeywords.join("|")})\\b`, "g");
    coloredText = coloredText.replaceAll(
      regex,
      (match) => `<span class="${COLORS[i]}">${match}</span>`,
    );
  });

  element.innerHTML = coloredText;
}

async function getCodeSnippet(snippet) {
  const response = await fetch(`../data/snippets/snippet.${snippet}`);
  const text = await response.text();

  return text;
}

function isVisibleInScrollView(element, container) {
  const elementTop = element.offsetTop;
  const elementBottom = elementTop + element.clientHeight;

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  return elementTop >= containerTop && elementBottom <= containerBottom;
}

function onHamburgerMenuPress() {
  const hamburgerButtonElement =
    document.getElementsByName("hamburger-toggle")[0];
  const navContainerElement =
    document.getElementsByClassName("nav-container")[0];

  if (hamburgerButtonElement.checked) {
    LEFT_SECTION.classList.add("menu-open");
    navContainerElement.style.opacity = 1;
  } else {
    LEFT_SECTION.classList.remove("menu-open");
    navContainerElement.style.opacity = 0.9;
  }
}

function closeHamburgerMenu() {
  const hamburgerButtonElement =
    document.getElementsByName("hamburger-toggle")[0];
  hamburgerButtonElement.checked = false;
  LEFT_SECTION.classList.remove("menu-open");
}

function clearMainContent() {
  MAIN_CONTENT_SECTION.innerHTML = "";
  MAIN_CONTENT_SECTION.scrollTo({ top: 0 });
}

async function displayContent() {
  clearMainContent();

  const sectionName = left_sections[currentPosition.sectionIndex].name;

  const response = await fetch(`data/${sectionName}.json`);
  const { data } = await response.json();

  const outerContainerElement = document.createElement("div");
  outerContainerElement.classList.add("outer-paragraph-container");
  const innerContainerElement = document.createElement("div");
  innerContainerElement.classList.add("inner-paragraph-container");

  if (sectionName !== "home") {
    innerContainerElement.classList.add("mt-4");

    const sectionData = data[currentPosition.sectionItemIndex];
    const topElement = document.createElement("div");

    const titleElement = document.createElement("h1");
    titleElement.innerHTML =
      sectionData.title != null
        ? `<span class="${getRandomTextColorClass()}">${sectionData.title}</span>`
        : null;

    const dateElement = document.createElement("h2");
    dateElement.innerHTML =
      sectionData.date != null
        ? `<span class="${getRandomTextColorClass()}">${sectionData.date}</span>`
        : null;

    const yearElement = document.createElement("h2");
    yearElement.innerHTML =
      sectionData.year != null
        ? `[Built in <span class="${getRandomTextColorClass()}">${sectionData.year}</span>]`
        : null;

    const technologiesContainerElement = document.createElement("div");
    technologiesContainerElement.classList.add("technologies-row");
    technologiesContainerElement.innerHTML =
      sectionData.technologies?.map((t) => colorizeString(t)).join(" ") || null;

    const githubButtonElement = document.createElement("a");
    githubButtonElement.classList.add("project-button");
    githubButtonElement.href = sectionData?.githubUrl;
    githubButtonElement.target = "_blank";
    githubButtonElement.innerText = "Github";

    const demoButtonElement = document.createElement("a");
    demoButtonElement.classList.add("project-button");
    demoButtonElement.href = sectionData?.demoUrl;
    demoButtonElement.target = "_blank";
    demoButtonElement.innerText = "Demo";

    const buttonsContainerElement = document.createElement("div");
    buttonsContainerElement.classList.add("buttons-container");

    if (sectionData?.githubUrl != null) {
      buttonsContainerElement.appendChild(githubButtonElement);
    }

    if (sectionData?.demoUrl != null) {
      buttonsContainerElement.appendChild(demoButtonElement);
    }

    if (titleElement.innerHTML != null) {
      topElement.appendChild(titleElement);
    }

    if (dateElement.innerHTML != null) {
      topElement.appendChild(dateElement);
    }

    if (yearElement.innerHTML != null) {
      topElement.appendChild(yearElement);
    }

    if (technologiesContainerElement.innerHTML != null) {
      topElement.appendChild(technologiesContainerElement);
    }

    if (buttonsContainerElement.children.length > 0) {
      topElement.appendChild(buttonsContainerElement);
    }

    const imageElements =
      sectionData.images?.map((imagePath) => {
        const imageInnerContainerElement = document.createElement("div");
        imageInnerContainerElement.style.minHeight = "200px";
        imageInnerContainerElement.classList.add("image-inner-container");

        const imageElement = document.createElement("img");
        imageElement.loading = "lazy";
        imageElement.alt = "Project image";
        imageElement.decoding = "async";
        imageElement.src = `../images/${imagePath}`;
        imageElement.classList.add("project-image");

        imageInnerContainerElement.appendChild(imageElement);

        return imageInnerContainerElement;
      }) ?? [];

    sectionData.content.forEach((c, i) => {
      const element = document.createElement("div");

      element.innerHTML = colorizeString(c).replaceAll("\n", "<br>");
      innerContainerElement.appendChild(element);

      if (i < imageElements.length) {
        const imageContainerElement = document.createElement("div");
        imageContainerElement.classList.add("image-container");
        imageContainerElement.appendChild(imageElements[i]);

        innerContainerElement.appendChild(imageContainerElement);
      }
    });

    if (sectionData?.snippet != null) {
      const snippetContainerElement = document.createElement("div");
      snippetContainerElement.classList.add("snippet-container");

      const snippetElement = document.createElement("pre");
      const codeElement = document.createElement("code");
      codeElement.classList.add(sectionData.snippet);
      snippetElement.appendChild(codeElement);
      codeElement.innerText = await getCodeSnippet(sectionData.snippet);

      snippetContainerElement.appendChild(snippetElement);
      innerContainerElement.appendChild(snippetContainerElement);
    }

    innerContainerElement.prepend(topElement);
    outerContainerElement.appendChild(innerContainerElement);

    clearMainContent();
    MAIN_CONTENT_SECTION.appendChild(outerContainerElement);

    colorizeCode();
  } else {
    const logoFileName = `images/logo${Math.floor(Math.random() * 4) + 1}.svg`;
    const logoContainer = document.createElement("div");
    logoContainer.id = "logo-container";

    const logoElement = document.createElement("img");
    logoElement.loading = "eager";
    logoElement.src = logoFileName;
    logoElement.id = "logo";
    logoElement.alt = "Wallenart";

    logoContainer.appendChild(logoElement);

    clearMainContent();
    MAIN_CONTENT_SECTION.appendChild(logoContainer);

    data.forEach((d) => {
      const element = document.createElement("div");

      d.content.forEach((c) => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = colorizeString(c);
        element.appendChild(paragraph);
      });

      innerContainerElement.appendChild(element);
    });

    outerContainerElement.appendChild(innerContainerElement);
    MAIN_CONTENT_SECTION.appendChild(outerContainerElement);

    await displayRandomBibleVerse(innerContainerElement);
  }
}

function clearSelectionStyling(scrollToTop) {
  if (isMobile()) {
    const selectedElement = document.getElementsByClassName("selected-item")[0];
    const selectedFrameElement =
      document.getElementsByClassName("selected-frame")[0];

    if (selectedElement != null) {
      selectedElement.classList.remove("selected-item");
    }

    if (selectedFrameElement != null) {
      selectedFrameElement.classList.remove("selected-frame");
    }
  }

  const previousSection = left_sections[previousPosition.sectionIndex];

  const previousSectionItemElement =
    previousSection.items[previousPosition.sectionItemIndex];

  const previousSectionItemIndexElement =
    previousSection.section.getElementsByClassName("list-index")[0]
      ?.firstElementChild;

  const scrollableContainerElement =
    previousSection.section.getElementsByClassName("ui-list")[0];

  previousSection.section.classList.remove("selected-frame");
  previousSectionItemElement?.classList.remove("selected-item");

  if (previousSectionItemIndexElement != null) {
    previousSectionItemIndexElement.innerText = `1 of ${previousSection.items.length}`;
  }

  if (scrollableContainerElement != null && scrollToTop) {
    scrollableContainerElement.scrollTo({ top: 0 });
  }
}

async function render(scrollToTop = false, isInitialRender = false) {
  if (
    !isMobile() &&
    !isInitialRender &&
    currentPosition.sectionIndex === previousPosition.sectionIndex &&
    currentPosition.sectionItemIndex === previousPosition.sectionItemIndex
  ) {
    return;
  }

  const currentSection = left_sections[currentPosition.sectionIndex];

  const currentSectionItemElement =
    currentSection.items?.[currentPosition.sectionItemIndex];

  const currentSectionItemIndexElement =
    currentSection.section.getElementsByClassName("list-index")[0]
      ?.firstElementChild;

  const scrollableContainerElement =
    currentSection.section.getElementsByClassName("ui-list")[0];

  clearSelectionStyling(scrollToTop);

  currentSection.section.classList.add("selected-frame");
  currentSectionItemElement?.classList.add("selected-item");

  if (currentSectionItemIndexElement != null) {
    currentSectionItemIndexElement.innerText = `${currentPosition.sectionItemIndex + 1} of ${currentSection.items.length}`;
  }

  // FIXME: not optimal, sometimes, jumps a bit too far
  // but it doesn't impair the user experience too much
  if (scrollableContainerElement != null && currentSectionItemElement != null) {
    if (
      !isVisibleInScrollView(
        currentSectionItemElement,
        scrollableContainerElement,
      ) &&
      previousPosition.sectionItemIndex !== currentPosition.sectionItemIndex
    ) {
      const gap = parseInt(
        window.getComputedStyle(currentSectionItemElement).gap,
      );

      scrollableContainerElement.scrollBy({
        top:
          previousPosition.sectionItemIndex < currentPosition.sectionItemIndex
            ? currentSectionItemElement.clientHeight + gap
            : -currentSectionItemElement.clientHeight - gap,
        behavior: "instant",
      });
    }
  }

  if (!isInitialRender) {
    displayContent();
  }

  if (isMobile()) {
    closeHamburgerMenu();
  }
}

function savePreviousPosition() {
  previousPosition.sectionIndex = currentPosition.sectionIndex;
  previousPosition.sectionItemIndex = currentPosition.sectionItemIndex;
}

function goToSection(sectionNumber, itemNumber = 0) {
  savePreviousPosition();

  currentPosition.sectionIndex = clamp(
    0,
    sectionNumber,
    left_sections.length - 1,
  );
  currentPosition.sectionItemIndex = clamp(
    0,
    itemNumber,
    left_sections[currentPosition.sectionIndex].items.length - 1,
  );
}

function goToNextSection() {
  savePreviousPosition();

  currentPosition.sectionIndex = clamp(
    0,
    currentPosition.sectionIndex + 1,
    left_sections.length - 1,
  );
  currentPosition.sectionItemIndex = 0;
}

function goToPreviousSection() {
  savePreviousPosition();

  currentPosition.sectionIndex = clamp(
    0,
    currentPosition.sectionIndex - 1,
    left_sections.length - 1,
  );
  currentPosition.sectionItemIndex = 0;
}

function goToNextItem() {
  savePreviousPosition();

  currentPosition.sectionItemIndex = clamp(
    0,
    currentPosition.sectionItemIndex + 1,
    left_sections[currentPosition.sectionIndex].items.length - 1,
  );
}

function goToPreviousItem() {
  savePreviousPosition();

  currentPosition.sectionItemIndex = clamp(
    0,
    currentPosition.sectionItemIndex - 1,
    left_sections[currentPosition.sectionIndex].items.length - 1,
  );
}

function scrollMainContentDown() {
  MAIN_CONTENT_SECTION?.scrollBy({
    top: MAIN_CONTENT_SECTION.clientHeight / 2,
  });
}

function scrollMainContentUp() {
  MAIN_CONTENT_SECTION?.scrollBy({
    top: -(MAIN_CONTENT_SECTION.clientHeight / 2),
  });
}

function initKeyboardListeners() {
  // CTRL key is only captured on keydown/keyup
  addEventListener("keydown", async (event) => {
    let scrollToTop = false;
    const { key, code, ctrlKey } = event;

    if (key.includes("Arrow") || key.includes("Page")) {
      event.preventDefault();
    }

    if (key === "PageDown" || (ctrlKey && key === "d")) {
      scrollMainContentDown();
      return;
    } else if (key === "PageUp" || (ctrlKey && key === "u")) {
      scrollMainContentUp();
      return;
    } else if (key === "ArrowUp" || key === "k") {
      if (currentPosition.sectionIndex === 0) {
        return;
      }

      goToPreviousItem();
    } else if (key === "ArrowDown" || key === "j") {
      if (currentPosition.sectionIndex === 0) {
        return;
      }

      goToNextItem();
    } else if (key === "ArrowLeft" || key === "h") {
      goToPreviousSection();
      scrollToTop = true;
    } else if (key === "ArrowRight" || key === "l") {
      goToNextSection();
      scrollToTop = true;
    } else if (code.includes("Digit")) {
      const sectionNumber = parseInt(key) - 1;
      goToSection(sectionNumber);
      scrollToTop = true;
    } else {
      // Just here to avoid rendering on every keypress
      return;
    }

    await render(scrollToTop);
  });
}

function initMouseListeners() {
  left_sections.forEach((section, sectionIndex) => {
    section.items.forEach((item, itemIndex) => {
      item.addEventListener("click", async (event) => {
        event.stopPropagation();

        goToSection(sectionIndex, itemIndex);
        await render(sectionIndex !== previousPosition.sectionIndex);
      });
    });

    section.section.addEventListener("click", async () => {
      goToSection(sectionIndex);
      await render(sectionIndex !== previousPosition.sectionIndex);
    });
  });
}

function initTouchListeners() {
  if (!isMobile()) {
    return;
  }

  const hamburgerButtonElement =
    document.getElementsByName("hamburger-toggle")[0];

  hamburgerButtonElement.addEventListener("click", () => {
    onHamburgerMenuPress();
  });
}

async function init() {
  initKeyboardListeners();
  initMouseListeners();
  initTouchListeners();

  await render(true, true);
  await displayRandomBibleVerse();
}

/** HIGHLIGHTING STUFF **/
const javascriptKeywords = [
  [
    "colorizeCode",
    "getCodeSnippet",
    "javascript",
    "typescript",
    "html",
    "css",
    "go",
    "c",
    "graphql",
    "sql",
    "react",
    "jest",
    "bash",
    "yaml",
    "arduino",
    "innerText",
    "classList",
    "0",
    "'code'",
    "document",
    "null",
    "innerHTML",
  ],
  ["function", "const", "return", "if", "new", "async", "await", "=", "=="],
  ["getElementsByTagName", "RegExp", "fetch", "replaceAll"],
];

const typescriptKeywords = [
  [...javascriptKeywords[0]],
  [...javascriptKeywords[1], "void", "string"],
  [...javascriptKeywords[2], "Promise"],
];

const nodeKeywords = [
  [
    ...javascriptKeywords[0],
    "express",
    "IS_ONLINE",
    "helmet",
    "IS_OFFLINE",
    "method",
    "graphqlHTTP",
    "schema",
    "rootValue",
    "validationRules",
    "graphiql",
    "next",
  ],
  [...javascriptKeywords[1], "NoSchemaIntrospectionCustomRule", "else"],
  [...javascriptKeywords[2], "use", "sendStatus", "json", "setHeader"],
];

const htmlKeywords = [
  ["head", "meta", "link", "script", "title"],
  ["charset", "name", "content", "rel", "type", "href", "src", "defer"],
];

const cssKeywords = [
  [
    "footer-item",
    "home-section-paragraph",
    "container",
    "footer",
    "left-section",
    "selected-frame",
    "container-content",
  ],
  [
    "display",
    "flex-direction",
    "justify-content",
    "position",
    "padding",
    "border-color",
    "margin-top",
    "font-size",
    "flex-direction",
    "gap",
    "border",
    "overflow-y",
    "overflow-x",
    "hover",
    "not",
  ],
];

const goKeywords = [
  ["0", "nil", "1"],
  ["type", "package", "struct", "any", "func", "return", "if", "int"],
];

const cKeywords = [
  [
    "deque_node",
    "data",
    "Node",
    "create_deque",
    "malloc",
    "printf",
    "exit",
    "EXIT_FAILURE",
    "NULL",
    "front",
    "back",
    "next",
    "prev",
    "destroy_deque",
    "deque_is_empty",
    "deque_pop_front",
    "free",
    "memcpy",
    "true",
    "false",
    "deque_push_back",
    "deque_push_front",
    "deque_pop_back",
    "deque_front",
  ],
  [
    "typedef",
    "struct",
    "void",
    "sizeof",
    "if",
    "return",
    "while",
    "bool",
    "else",
    "Deque",
    "static",
    "char",
    "const",
  ],
];

const graphqlKeywords = [
  [
    "FileInput",
    "FilesInput",
    "DirectoryInput",
    "ListBucketResult",
    "DeleteFileResult",
    "DeleteDirectoryResult",
    "Queries",
    "Mutations",
    "schema",
    "ListInput",
    "UploadInput",
    "SignedUrlResult",
    "SignedUrlResult",
    "TextFileContentResult",
    "RestoreFileResult",
  ],
  [
    "input",
    "type",
    "union",
    "fileName",
    "path",
    "root",
    "versionId",
    "bucketName",
    "fileNames",
    "versionIds",
    "listBucketContent",
    "getUploadUrl",
    "getDownloadUrl",
    "getTextFileContent",
    "listInput",
    "uploadInput",
    "fileInput",
    "fileInput",
    "filesInput",
    "directoryInput",
    "deleteOneFile",
    "deleteManyFiles",
    "deleteDirectory",
    "restoreFileVersion",
  ],
  [
    "String",
    "ObjectList",
    "Unauthenticated",
    "Unauthorized",
    "StorageNotFound",
    "ServerError",
    "FileNotFound",
    "FileName",
    "FileNameList",
    "Directory",
    "RestoreFileResult",
  ],
];

const sqlKeywords = [
  ["Who Let The Dogs Out Party", "Let the dogs out"],
  ["SELECT", "DISTINCT", "FROM", "WHERE", "JOIN", "AND", "ON"],
];

const reactKeywords = [
  [
    ...typescriptKeywords[0],
    "Gallery",
    "length",
    "imagesUrls",
    "false",
    "false",
    "useState",
    "1",
    "setShowFullSizeImage",
  ],
  [...typescriptKeywords[1], "export", "ExpandedImageModal"],
  ["setCurrentIndex"],
];

const testKeywords = [
  ["test", "expect", "checkEmailValidity"],
  ["let"],
  ["toBeTruthy", "toBeFalsy", "toBeUndefined", "toBe", "__typename", "not"],
];

const bashKeywords = [
  ["copy_env_files", "$src_dir", "mkdir", "cp"],
  ["for", "in", ";", "then", "if", "elif", "do", "fi", "done"],
];

const yamlKeywords = [
  [
    "name",
    "on",
    "push",
    "jobs",
    "runs-on",
    "steps",
    "uses",
    "with",
    "branches",
    "main",
    "deploy_lambda",
    "ubuntu-latest",
    "env",
    "run",
  ],
];

const arduinoKeywords = [
  [
    ...cKeywords[0],
    "setup",
    "loop",
    "stop",
    "go",
    "pinMode",
    "OUTPUT",
    "INPUT",
    "HIGH",
    "LOW",
    "58.2",
    "1000",
    "delay",
    "50",
    "1000000",
    "pulseIn",
    "digitalWrite",
    "delayMicroSeconds",
    "10",
  ],
  [...cKeywords[1], "long", "int", "swich", "case", "break"],
];
