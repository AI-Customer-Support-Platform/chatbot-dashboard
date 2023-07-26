export const truncate = (text: string, maxLength = 40) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncatedText = text.substring(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex !== -1) {
    return truncatedText.substring(0, lastSpaceIndex) + "...";
  }

  return truncatedText + "...";
};

export const uppercaseFirstLetter = (inputString: string): string => {
  if (!inputString) {
    return "";
  }

  const firstLetter = inputString.charAt(0).toUpperCase();
  const restOfTheString = inputString.slice(1);

  return firstLetter + restOfTheString;
};
