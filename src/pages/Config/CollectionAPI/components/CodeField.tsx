import { useTranslation } from "react-i18next";

import CodeBlock from "@/components/CodeBlock";

interface CodeFieldProps {
  collectionId: string;
}

const CodeField: React.FC<CodeFieldProps> = ({ collectionId }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl rounded-lg bg-white/50 p-4">
      <p className="text-lg text-slate-700">
        {t(
          "To integrate our chatbot into your website, kindly copy the following code snippet and paste it within the `<head>` section of your website's index.html file:"
        )}
      </p>
      <CodeBlock
        language="javascript"
        code={`
<script>
  window.chatGPTBConfig = {
    collection: "${collectionId}",
  };
</script>

<script
  type="module"
  crossorigin
  src="https://chatbot-web-dev.vercel.app/chatgptb.js"
></script>
<link
  rel="stylesheet"
  href="https://chatbot-web-dev.vercel.app/chatgptb.css"
/>
`}
      />
    </div>
  );
};
export default CodeField;
