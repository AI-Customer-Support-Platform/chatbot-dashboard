import { getLang } from "@/utils/i18n";

const en = `
## Steps to Configure Your LINE Bot

1. **Create a New Channel**:
    - Log in to your LINE Developer account ( [https://developers.line.biz/console](https://developers.line.biz/console) ).
    - Create a new provider or use an existing one.
    - Within the provider, create a “Messaging API”  channel.
2. **Setting Up Webhook**:
    - In your bot's channel settings, go to the "Messaging API" section.
    - Set the "Webhook URL" by copying the URL from the GPTB dashboard (the page above).
    - Click the "Verify" button. A successful verification dialog should appear.
    - Enable the "Use Webhook" option.
    - Disable the "Auto-reply messages" option.
3. **Issue Channel Access Token**:
    - In the "Channel Access Token" section, click the "Issue/Reissue" button to obtain a new Channel Access Token.
    - Copy and paste this token into the GPTB dashboard (the page above), then click "Save."
    - If you need to update the Channel Access Token, repeat these steps.
4. **Test Your Bot**:
    - Scan your bot's QR code using the LINE app to add your LINE Official Account as a friend. You can share this code with others to connect with your bot.`;

const ja = `
## LINE Botの設定手順

1. **新しいチャンネルの作成**:
    - LINE Developerアカウントにログインします（[https://developers.line.biz/console](https://developers.line.biz/console)）。
    - 新しいプロバイダーを作成するか、既存のものを使用します。
    - プロバイダー内で、「Messaging API」チャンネルを作成します。
2. **Webhookの設定**:
    - ボットのチャンネル設定で、「Messaging API設定I」セクションに移動します。
    - 「Webhook URL」を設定するには、GPTBダッシュボードからURLをコピーします（上記のページ）。
    - 「検証」ボタンをクリックします。成功した検証ダイアログが表示されるはずです。
    - 「Webhookの利用」オプションを有効にします。
    - 「応答メッセージ」オプションを無効にします。
3. **チャンネルアクセストークンの発行**:
    - 「チャンネルアクセストークン」セクションで、「発行/再発行」ボタンをクリックして新しいチャンネルアクセストークンを取得します。
    - このトークンをGPTBダッシュボード（上記のページ）にコピーして貼り付け、次に「保存」をクリックします。
    - チャンネルアクセストークンを更新する必要がある場合は、これらの手順を繰り返します.
4. **ボットのテスト**:
    - LINEアプリを使用してボットのQRコードをスキャンし、LINE公式アカウントとして友達に追加します。このコードを他の人と共有してボットに接続できます。`;

export const getLineBotSetupSteps = () => {
  const langCode = getLang();
  if (langCode === "ja") {
    return ja;
  } else {
    return en;
  }
};
