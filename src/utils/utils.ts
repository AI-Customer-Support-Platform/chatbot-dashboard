import i18next from "i18next";

export const copyTextToClipboard = (text: string): boolean => {
  // Create a text area element to temporarily hold the text
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Make the text area invisible and append it to the document
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);

  // Select and copy the text to the clipboard
  textArea.select();
  const copied = document.execCommand("copy");

  // Remove the text area from the document
  document.body.removeChild(textArea);

  return copied;
};

export const calculateTimeDifference = (time: string) => {
  const postDate = new Date(time);
  const currentDate = new Date();
  const timezoneOffsetMinutes = currentDate.getTimezoneOffset() * 60 * 1000;

  const timeDiff =
    currentDate.getTime() - postDate.getTime() + timezoneOffsetMinutes;
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  } else {
    return `${daysDiff}d`;
  }
};

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
