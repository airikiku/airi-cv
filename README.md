# KIKU AIRI — International Growth & GTM

菊愛莉のポートフォリオサイト。日本・中国・欧州にまたがる市場参入、事業開発、GTM、プロダクトの経験を紹介しています。

## Local preview

`index.html` をブラウザで開くか、プロジェクトのディレクトリで `python3 -m http.server 4173` を実行し、`http://localhost:4173/` にアクセスしてください。ヘッダーの JP / EN から、英語版 `en.html` に切り替えられます。

日本語ページを更新した場合は `node scripts/build-english.mjs` で英語ページを再生成してください。翻訳文は同スクリプト内で管理しています。

職務経験の8件は `career-data.js` の `ja` と `en` で管理します。`career-explorer.js` は同じ経歴を「強みから見る」（海外市場参入・事業開発／市場調査・事業戦略／グロース・収益化）と「経歴から見る」で表示します。経歴内容を変更した場合は両言語を更新し、`node scripts/build-english.mjs` で英語ページの静的な代替テキストも再生成してください。`#work-gtm`、`#work-research`、`#work-growth`、`#career` と `#experience-<id>/<focus>` は直接開けます。

単一ファイル版が必要な場合は `node scripts/build-download.mjs`、日英切替版は `node scripts/build-bilingual-download.mjs` で再生成できます。

## GitHub Pages

このサイトは静的な HTML、CSS、JavaScript と画像で構成されています。GitHub Pages では `main` ブランチの `/ (root)` を公開元に設定します。変更を `main` にプッシュするとサイトが更新されます。
