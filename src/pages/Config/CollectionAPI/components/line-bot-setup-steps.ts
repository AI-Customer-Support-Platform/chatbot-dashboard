import { getLang } from "@/utils/i18n";

const en = `
# Configuring Your LINE Bot

This guide will guide you through configuring your LINE bot. With a LINE bot, you can set up automated responses and interactions within the LINE messaging platform.

## Prerequisites

Before you proceed, make sure you have the following:

- Subscribed to GPTB LINE API, created a collection, and uploaded study materials.
- A LINE Developer account: https://developers.line.biz/

## Steps to Configure Your LINE Bot

1. **Create a New Channel**:
    - Log in to your LINE Developer account.
    - Create a new channel for your bot.
2. **Setting Up Webhook**:
    - In your bot's channel settings, navigate to the "Messaging API" section.
    - Set the "Webhook URL" using the URL from your GPTB LINE API details.
    - Click the "Verify" button. A successful verification dialog should appear.
    - Enable the "Use Webhook" option.
    - Disable the "Auto-reply messages" option.
    - In the "Channel Access Token" section, click the "Issue/Reissue" button to obtain a new Channel Access Token. Copy and paste this token in the appropriate input field on the GPTB LINE API page, then click "Save." If you need to update the Channel Access Token, repeat these steps.
3. **Test Your Bot**:
    - Scan your bot's QR code using the LINE app to add your LINE Official Account as a friend. You can share this code with others to connect with your bot.`;

const ja = `
# LINE Bot の設定

このガイドでは、LINE Bot の設定方法について案内します。LINE Bot を使うと、LINE メッセージプラットフォーム内で自動応答やインタラクションを設定できます。

## 前提条件

続行する前に、以下の事項を確認してください。

- GPTB LINE API に登録し、コレクションを作成し、学習資料をアップロードしてください。
- LINE 開発者アカウント: https://developers.line.biz/

## LINE Bot の設定手順

1. **新しいチャネルの作成**:
    - LINE 開発者アカウントにログインします。
    - Bot 用の新しいチャネルを作成します。
2. **Webhook の設定**:
    - ボットのチャネル設定で、「Messaging API」セクションに移動します。
    - GPTB LINE API の詳細から取得した URL を使用して、「Webhook URL」を設定します。
    - 「Verify」ボタンをクリックします。成功した検証のダイアログが表示されます。
    - 「Use Webhook」オプションを有効にします。
    - 「Auto-reply messages」オプションを無効にします。
    - 「Channel Access Token」セクションで、「Issue/Reissue」ボタンをクリックして新しい Channel Access Token を取得します。このトークンを GPTB LINE API のページの適切な入力フィールドにコピーして貼り付け、次に「Save」をクリックします。Channel Access Token を更新する必要がある場合は、これらの手順を繰り返します。
3. **ボットのテスト**:
    - LINE アプリを使用してボットの QR コードをスキャンして、LINE 公式アカウントに友達として追加します。他の人ともこのコードを共有してボットに接続できます。

あなたの学習とコーディングへの情熱が伝わります。これらの手順に従うことで、フリーランスのインディーデベロッパーとしての目標に近づくことでしょう。さらなる質問がある場合は、遠慮せずにお尋ねください！`;

export const getLineBotSetupSteps = () => {
  const langCode = getLang();
  if (langCode === "ja") {
    return ja;
  } else {
    return en;
  }
};
