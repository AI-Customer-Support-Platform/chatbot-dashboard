import i18next from "i18next";

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

type LanguageDateFormats = {
  [key: string]: (month: string | number, day: number, year: number) => string;
};

export const formatDate = (dateString: string): string => {
  // prettier-ignore
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const monthNumber = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const currentLanguage = i18next.language;

  const languageDateFormats: LanguageDateFormats = {
    en: (month, day, year) => `${month} ${day}, ${year}`,
    ja: (_, day, year) => `${year}年 ${monthNumber}月 ${day}日`,
  };

  const dateFormatFunction =
    languageDateFormats[currentLanguage] || languageDateFormats["en"];
  const formattedDate = dateFormatFunction(month, day, year);

  return formattedDate;
};

export const bytesToMB = (bytes: number): string => {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(2)}MB`;
};

export const isClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  event: MouseEvent
): boolean => {
  const refElement = ref.current;
  if (refElement) {
    const { left, top, width, height } = refElement.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (
      clientX < left ||
      clientX > left + width ||
      clientY < top ||
      clientY > top + height
    ) {
      return true;
    }
  }

  return false;
};
