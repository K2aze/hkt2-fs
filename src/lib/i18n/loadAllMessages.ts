import fs from "fs";
import path from "path";

export type IntlMessages = {
  [key: string]: string | IntlMessages;
};

export function loadAllMessages(locale: string): IntlMessages {
  const messages: IntlMessages = {};

  // root messages
  const rootPath = path.join(
    process.cwd(),
    "src",
    "messages",
    `${locale}.json`,
  );

  if (fs.existsSync(rootPath)) {
    Object.assign(
      messages,
      JSON.parse(fs.readFileSync(rootPath, "utf-8")) as IntlMessages,
    );
  }

  // feature messages
  const featuresDir = path.join(process.cwd(), "src", "features");

  if (!fs.existsSync(featuresDir)) return messages;

  const features = fs.readdirSync(featuresDir);

  for (const feature of features) {
    const featureMessagePath = path.join(
      featuresDir,
      feature,
      "messages",
      `${locale}.json`,
    );

    if (fs.existsSync(featureMessagePath)) {
      messages[feature] = JSON.parse(
        fs.readFileSync(featureMessagePath, "utf-8"),
      ) as IntlMessages;
    }
  }

  return messages;
}
