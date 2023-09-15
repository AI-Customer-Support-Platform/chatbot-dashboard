import { useCallback } from "react";

const useInjectChatbot = () => {
  const script: HTMLScriptElement = document.createElement("script");
  script.type = "module";
  script.crossOrigin = "true";
  script.src = import.meta.env.VITE_CHATBOT_JS_URL;

  const link: HTMLLinkElement = document.createElement("link");
  link.rel = "stylesheet";
  link.href = import.meta.env.VITE_CHATBOT_CSS_URL;

  const handleInjectChatbot = useCallback((): void => {
    const head = document.head;
    head.appendChild(script);
    head.appendChild(link);
  }, [link, script]);

  const handleRemoveChatbot = useCallback((): void => {
    const head = document.head;

    if (head.contains(script)) {
      head.removeChild(script);
    }

    if (head.contains(link)) {
      head.removeChild(link);
    }
  }, [link, script]);

  const handleSetupCollectionId = (collection_id: string) => {
    window.chatGPTBConfig = {
      collection: collection_id,
    };
  };

  return {
    handleInjectChatbot,
    handleRemoveChatbot,
    handleSetupCollectionId,
  };
};

export default useInjectChatbot;
