import MusicXML from "./MusicXML";
import { Score } from "./MusicXML/types";

export const loadFile = async (file: string): Promise<string[]> => {
  const response = await fetch(file);
  const score: Score = MusicXML.parse(await response.text());
  const result: string[] = [];
  Object.entries(score.parts).forEach(([_, part]) => {
    result.push(part.name);
  });
  return result;
};
