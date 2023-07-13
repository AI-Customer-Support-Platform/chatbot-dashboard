import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useInjectChatbot = (): void => {
  const pathname = useLocation().pathname;

  const script: HTMLScriptElement = document.createElement("script");
  script.type = "module";
  script.crossOrigin = "true";
  script.src = "https://chatbot-web-dev.vercel.app/chatgptb.js";

  const link: HTMLLinkElement = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://chatbot-web-dev.vercel.app/chatgptb.css";

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

  useEffect(() => {
    if (pathname.includes("/chat/")) {
      const pathParts = pathname.split("/");
      const collection_id = pathParts[pathParts.length - 1];
      handleSetupCollectionId(collection_id);

      handleInjectChatbot();
    } else {
      handleRemoveChatbot();
    }

    // Clean up the injected script and link on unmount
    return handleRemoveChatbot;
  }, [pathname, handleInjectChatbot, handleRemoveChatbot]);
};

export default useInjectChatbot;
