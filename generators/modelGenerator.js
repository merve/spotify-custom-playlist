/* eslint-disable dot-notation */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-await */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require("glob");
const fs = require("fs");
const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} = require("quicktype-core");
const chokidar = require("chokidar");
const argv = require("minimist")(process.argv.slice(2));

const lang = argv["lang"] || "ts";
const cwd = argv["cwd"] || "src";

const renderOptions = {
  dart: {
    "coders-in-class": false,
  },
  ts: {
    // 'nice-property-names': true,
    "just-types": true,
  },
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const quicktypeJSON = async (targetLanguage, typeName, jsonString) => {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    fixedTopLevels: true,
    allPropertiesOptional: true,
    leadingComments: [
      " ",
      `Auto generated file please don't edit.`,
      " \n/* eslint-disable */",
    ],
    rendererOptions: renderOptions[lang],
    inferEnums: false,
  });
};

const addModel = async (filePath) => {
  const f = fs.readFileSync(filePath);
  let isCreate = false;

  if (f.length) {
    const splitted = filePath.split("/");

    const fileName = splitted.pop().split(".")[0];

    const { lines: result } = await quicktypeJSON(lang, fileName, f);

    const path = `${splitted.join("/")}/${fileName}.model.${lang}`;

    if (!fs.existsSync(path)) {
      isCreate = true;
    }

    fs.writeFileSync(path, result.join("\n"));

    if (isCreate) {
      console.log(
        "\x1b[36m%s\x1b[0m",
        `{
  Model Created!
  name: ${capitalize(fileName)}
  path: ${path}
}`
      );
    } else {
      console.log(
        "\x1b[33m%s\x1b[0m",
        `{
  Model Updated!
  name: ${capitalize(fileName)}
  path: ${path}
}`
      );
    }
  }
};

if (argv["w"]) {
  const watcher = chokidar.watch(`${cwd}/**/*.model.json`, {
    ignored: ["**/node_modules/**/*", "**/.git/**/*"],
    ignoreInitial: false,
    persistent: true,
  });

  watcher
    .on("add", async (path) => await addModel(path))
    .on("change", async (path) => await addModel(path))
    .on("error", (error) => {
      console.error("Error happened", error);
    });
} else {
  glob(
    `${cwd}/**/*.model.json`,
    {
      realpath: false,
    },
    async (err, files) => {
      for (const file of files) {
        await addModel(file);
      }
    }
  );
}
