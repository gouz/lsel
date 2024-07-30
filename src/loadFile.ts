import parseMusicXML from "./MusicXML";

export const loadFile = async (file: string): Promise<string[]> =>
  new Promise((resolve) => {
    fetch(file)
      .then((response) => response.text())
      .then((text) => {
        resolve(
          Object.entries(parseMusicXML(text).parts).map(
            ([_, part]) => part.name
          )
        );
      });
  });
