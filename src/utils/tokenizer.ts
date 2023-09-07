import { getEncoding } from "js-tiktoken";

const tokenizer = getEncoding("cl100k_base");

export const getTokenCount = (inputText: string) => {
  const encodedTokens = tokenizer.encode(inputText);
  const tokenCount = encodedTokens.length;
  return tokenCount;
};
