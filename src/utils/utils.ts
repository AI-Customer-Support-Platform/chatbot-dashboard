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

export const formatDate = (dateString: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
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
