import CodeBlock from "@/components/CodeBlock";

interface CodeFieldProps {
  collectionId: string;
}

const CodeField: React.FC<CodeFieldProps> = ({ collectionId }) => {
  return (
    <div className="rounded-lg bg-white/50 p-4">
      <p className="text-lg text-slate-700">
        To import our chatbot into your website, please copy the following code
        and paste it into the <b>head</b> section of your website's index.html
        file:
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
  crossorigin=""
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
