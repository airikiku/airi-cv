import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const translations = new Map([
  ['菊 愛莉 | International Growth & GTM', 'KIKU AIRI | International Growth & GTM'],
  ['本文へスキップ', 'Skip to main content'],
  ['菊 愛莉', 'KIKU AIRI'],
  ['メニュー', 'Menu'],
  ['実績', 'Work'],
  ['キャリア', 'Career'],
  ['プロダクト', 'Products'],
  ['コンテンツ', 'Content'],
  ['市場を越えて、', 'Across markets,'],
  ['成長を', 'driving '],
  ['つくる。', 'growth.'],
  ['市場調査・越境B2B事業開発に15年以上従事。日本・中国・台湾・欧州を横断し、消費者ブランドの市場参入、顧客・パートナー開拓、調達支援からグロース施策まで推進します。', 'I bring more than 15 years of experience in market research and cross-border B2B development. Across Japan, China, Taiwan, and Europe, I help consumer brands enter new markets, build client and partner relationships, support sourcing, and drive growth.'],
  ['実績を見る', 'Explore my work'],
  ['月間動画再生数', 'Monthly video views'],
  ['C CHANNEL 中国市場｜3か月で目標の200%', 'C CHANNEL China | 200% of target in 3 months'],
  ['ページビュー', 'Page views'],
  ['DeNA｜3か月', 'DeNA | 3 months'],
  ['PV（基準値比）', 'Page views vs. baseline'],
  ['新規獲得CPA', 'Cost per acquisition'],
  ['Wargaming Japan｜6か月', 'Wargaming Japan | 6 months'],
  ['欧州企業の月間調達支援', 'Monthly sourcing supported for European clients'],
  ['myGorilla / Torii Partners｜合計', 'myGorilla / Torii Partners | combined'],
  ['中国市場を、海外展開の成功事例へ。', 'Scaling C CHANNEL in China through local partnerships.'],
  ['コンテンツとUXを、事業成果へ。', 'Turning UX improvements into measurable growth.'],
  ['欧州への市場参入と中国調達を推進。', 'Helping Asian brands enter Europe and European buyers source in China.'],
  ['大規模投資を、効率的な獲得へ。', 'Lowering acquisition costs in Japan.'],
  ['投資プラットフォームを構想から公開へ。', 'Launching an investment platform from concept to market.'],
  ['戦略を描くだけでなく、', 'From market insight'],
  ['市場で動かす。', 'to commercial results.'],
  ['異なる市場を理解する。顧客の課題を見つける。戦略を設計する。そして、顧客獲得と事業成果までつなげる。', 'I combine market and competitor research with hands-on business development. I identify what matters to customers, shape a market-entry plan, and help win clients and partnerships.'],
  ['私のキャリアは、マーケットリサーチ、事業開発、マーケティング、プロダクト体験を横断しながら、この一連の流れを実行してきた経験です。', 'Across research, marketing, and digital products, I have turned evidence into decisions and carried those decisions through to execution.'],
  ['市場インテリジェンス', 'Market intelligence'],
  ['市場・競合・顧客インサイトを読み解き、意思決定につながる仮説と戦略へ。', 'I design qualitative and quantitative research, analyze competitors and customer needs, and turn findings into recommendations clients can act on.'],
  ['国際GTM', 'International GTM'],
  ['市場参入の設計からアウトバウンド、顧客開拓、現地パートナー連携まで。', 'I develop market-entry plans, reach decision-makers, win B2B clients, and build local partnerships.'],
  ['グロース＆プロダクト', 'Growth & product'],
  ['データ、コンテンツ、UI/UXを横断し、ユーザー体験と事業成果を改善。', 'I use analytics, content, and UX improvements to increase engagement, revenue, and acquisition efficiency.'],
  ['実績は、', 'Selected work, '],
  ['ストーリーで。', 'real impact.'],
  ['課題、打ち手、成果。キャリアの中から、強みを最もよく表す5つのケースを紹介します。', 'Five examples of how I turn market insight into new business, stronger products, and measurable growth.'],
  ['中国・台湾市場を担当し、NetEase・Weiboとの提携と現地向け動画企画を推進。中国の各プラットフォーム合計で3か月後に月間再生数1億回（目標達成率200%）、8か月後にWeibo・WeChat・小紅書のSNS総フォロワー数70万人以上を達成。', 'Led growth in China and Taiwan through local video content and partnerships with NetEase and Weibo. Across Chinese platforms, monthly video views reached 100 million after three months, twice the target. The combined following on Weibo, WeChat, and Xiaohongshu exceeded 700,000 after eight months.'],
  ['中国市場の月間総再生数', 'Monthly video views across Chinese platforms'],
  ['MyAnimeListのデスクトップ版全ページを改善。3か月で直帰率を37ポイント低減し、PVを基準値の184%に拡大。新UI公開後の最初の2か月で広告売上を20%向上。', 'Improved the desktop experience across MyAnimeList. Within three months, bounce rate fell by 37 percentage points and page views reached 184% of baseline. Ad revenue rose 20% in the first two months after the new interface launched.'],
  ['日本・中国の消費者ブランドの欧州市場参入を支援し、30社超を提案段階へ進め、年商100億円超の企業複数社と契約。欧州光学企業向けには中国サプライヤーを開拓し、10社以上の調達意向を確認、うち2社で複数回の購入を実現。欧州企業による月間合計約7,000万円以上の調達を支援。', 'Supported European market entry for consumer brands from Japan and China, advancing more than 30 companies to the proposal stage and securing contracts with multiple companies whose annual revenue exceeds JPY 10 billion. For European optical companies, I developed suppliers in China, confirmed sourcing interest from more than 10 buyers, and enabled repeat purchases by two. These projects supported more than JPY 70 million in combined monthly procurement by European clients.'],
  ['事業企画・事業化', 'New business launch'],
  ['数億円規模の予算を管理し、広告・コンテンツ・クリエイティブを最適化。6か月で新規獲得CPAを4,100円から1,240円へ削減（約70%減）。広告以外の月間平均新規ユーザー数は600人から1,800人に拡大し、1年LTV予測ベースのROASは在任中に325%へ向上。', 'Managed a marketing budget of several hundred million yen and optimized paid media, content, and creative work. Over six months, cost per new user fell from JPY 4,100 to JPY 1,240 (about 70%). Average monthly new users from non-paid channels rose from 600 to 1,800, while ROAS based on projected one-year customer lifetime value reached 325% during my tenure.'],
  ['CPA削減（最大）', 'Cost per acquisition'],
  ['未着手だった投資プラットフォームを市場調査から企画し、韓国のデザイン・開発チームと連携して公開・投資募集開始まで推進。8回の対面セミナーで重複を除く200名以上を集客し、LPを3版改善して直帰率を約30ポイント低減。', 'Took an investment platform from market research and planning through launch and the start of investment fundraising, working with design and development teams in Korea. Eight in-person seminars attracted more than 200 unique attendees. Three landing-page iterations reduced bounce rate by about 30 percentage points.'],
  ['セミナー参加者（重複除外）', 'Unique seminar attendees'],
  ['市場を越えながら、', 'From research'],
  ['できることを広げてきた。', 'to cross-border GTM.'],
  ['現場から市場開拓を学ぶ', 'Developing markets on the ground'],
  ['日本製図器工業 上海支社 / 環境経営戦略総研', 'Nihon Seizuki Kogyo, Shanghai / Environmental Management Strategy Research Institute'],
  ['上海での法人営業からキャリアを始め、エネルギー管理ソフトウェアの中国市場開拓へ。市場調査、顧客開拓、現地パートナーとの商談を実務で学びました。', 'I began my career in B2B sales in Shanghai, then worked on China market entry for energy-management software. This gave me direct experience in market research, client development, and negotiations with local partners.'],
  ['リサーチを事業判断につなげる', 'Connecting research to business decisions'],
  ['定性・定量調査、競合分析、新規事業リサーチ、KPI設計、UX改善と収益化。データを具体的な成長施策へ変換。', 'At Ipsos, I managed international research from study design through reporting. At DeNA, I applied market research, analytics, KPI design, and UX improvements to new digital businesses.'],
  ['中国・台湾市場で成長モデルを構築', 'Building growth across China and Taiwan'],
  ['C CHANNEL｜海外事業責任者・中国・台湾市場担当', 'C CHANNEL | Overseas Business Lead, China and Taiwan'],
  ['中国・台湾の消費者インサイトを起点に、現地向けコンテンツとパートナー連携を推進。NetEase・Weiboとの協業を通じて事業を拡大しました。', 'Led locally tailored content and partnerships across China and Taiwan, building on consumer insight and collaborations with NetEase and Weibo.'],
  ['成長とプロダクト体験を最適化', 'Optimizing growth and product experience'],
  ['WargamingではデジタルマーケティングとCPA改善を推進。Energy Sharesでは投資プラットフォームの公開、投資募集の開始、セミナー集客まで担当しました。', 'At Wargaming, I led digital marketing and improved acquisition efficiency. At Energy Shares, I helped launch an investment platform, open it for fundraising, and attract seminar participants.'],
  ['欧州市場参入と中国調達をつなぐ', 'Connecting European market entry and sourcing in China'],
  ['myGorilla GmbH｜業務提携パートナー・アジア市場担当', 'myGorilla GmbH | Business Alliance Partner, Asian Markets'],
  ['日本・中国の消費者ブランドの欧州市場参入と、欧州の光学関連企業による中国調達を支援。市場調査からパートナー開拓、商談、取引実行まで推進しています。', 'I support European market entry for consumer brands from Japan and China, and sourcing in China for European optical companies. My work spans research, partner development, negotiations, and execution.'],
  ['自分でも、', 'I also'],
  ['戦略や提案にとどまらず、アイデアをプロダクトに落とし込み、実際に使える形にすることにも取り組んでいます。', 'I build tools to solve problems I encounter in my work, taking ideas from concept to working product.'],
  ['Notionの表示を自分らしく整えるためのブラウザ拡張機能。テキストと画面配色のカスタマイズに加え、英語・日本語・韓国語・中国語（簡体字／繁体字）に対応したフォントを選択可能。不要なUI要素を非表示にし、集中できるワークスペースをつくります。', 'A browser extension that lets people personalize Notion. Users can change text and page colors, choose fonts for English, Japanese, Korean, Simplified Chinese, and Traditional Chinese, and hide distracting interface elements to create a more focused workspace.'],
  ['中国・海外の動画プラットフォームを横断して収集・整理・比較分析する、マーケティングエージェンシーのGTM業務を見据えた独立プラットフォーム。小红书、Bilibili、TikTok／Douyin、YouTubeを一元化し、リサーチ、競合把握、コンテンツ企画の判断を支援します。', 'A standalone video research and analysis platform developed for a marketing agency’s GTM projects. It brings Xiaohongshu, Bilibili, TikTok/Douyin, and YouTube into one place to compare channels and content, track competitors, and inform content planning.'],
  ['欧州とアジアを、', 'Connecting Europe and Asia'],
  ['事業でつなぐ。', 'through business.'],
  ['myGorilla GmbHのエージェンシーブランド「Torii Partners」を通じ、欧州市場への参入と中国での調達を支援しています。', 'Through Torii Partners, an agency brand of myGorilla GmbH, I support European market entry and sourcing in China.'],
  ['アジアのブランドを欧州へ。欧州の調達を中国へ。', 'Taking Asian brands to Europe and connecting European buyers with suppliers in China.'],
  ['日本・中国の消費者ブランドの欧州展開と、欧州の光学関連企業による中国メーカーからの調達を支援。市場理解、パートナー開拓、商談、取引実行をつなぐmyGorilla GmbHの事業です。', 'This myGorilla GmbH business helps consumer brands from Japan and China expand into Europe and European optical companies source from Chinese manufacturers. It brings together market insight, partner development, negotiations, and transaction support.'],
  ['中国の光学メーカー', 'Chinese optical manufacturers'],
  ['欧州の調達企業', 'European buyers'],
  ['コンテンツで、', 'Sharing market insights '],
  ['知見を届ける。', 'through content.'],
  ['小紅書・Bilibili・YouTube・微信公众号を通じて、取材や市場に関する知見を動画と投稿で届けています。', 'I share interviews and market insights through videos and posts on Xiaohongshu, Bilibili, YouTube, and WeChat Official Accounts.'],
  ['日本企業でオファーを', 'Which roles are in demand'],
  ['得やすい職種とは？', 'for Chinese-speaking candidates in Japan?'],
  ['日本の人材紹介サービスの担当者に、中国語人材への採用ニーズと、求められる職種について聞きました。', 'I spoke with a recruiter in Japan about demand for Chinese-speaking candidates and the roles employers are hiring for.'],
  ['インタビューを見る', 'Watch the interview'],
  ['小紅書', 'Xiaohongshu'],
  ['微信公众号', 'WeChat Official Account'],
  ['外から助言するだけでなく、', 'Across markets and cultures,'],
  ['市場の内側から、', 'I turn local insight '],
  ['つくってきた。', 'into action.'],
  ['東京・上海をビジネスハブに、日本・中国・台湾・欧州をまたぐ市場参入と事業開発を推進しています。', 'Working across Tokyo and Shanghai, I develop market-entry and business opportunities spanning Japan, China, Taiwan, and Europe.'],
  ['日本語', 'Japanese'],
  ['中国語', 'Mandarin Chinese'],
  ['英語', 'English'],
  ['ドイツ語', 'German'],
  ['プロジェクト', 'Projects'],
  ['トップへ ↑', 'Back to top ↑'],
  ['市場を理解し、国境を越えて、事業を成長させる。', 'Turning market insight into cross-border growth.'],
]);

const attributes = new Map([
  ['菊 愛莉 — 市場調査、越境B2B事業開発、GTM、デジタルグロースを15年以上推進。日本・中国・台湾・欧州をつなぐ。', 'Kiku Airi brings more than 15 years of experience in market research, cross-border B2B development, GTM, and digital growth across Japan, China, Taiwan, and Europe.'],
  ['菊 愛莉 — トップへ', 'KIKU AIRI — back to top'],
  ['KIKU AIRI — トップへ', 'KIKU AIRI — back to top'],
  ['メニューを開く', 'Open menu'],
  ['メインナビゲーション', 'Main navigation'],
  ['三つの経路が合流し、成長へと伸びるシンボル。日本・中国・欧州をつなぐ。市場インテリジェンス、GTM、パートナーシップ、グロースとプロダクトの経験を、洞察から戦略、実行へ。', 'Illustration showing market intelligence, GTM, partnerships, and growth and product work connecting Japan, China, and Europe, from insight to execution.'],
  ['実績一覧', 'Selected work index'],
  ['Prismew for Notion の画面ギャラリー', 'Prismew for Notion screen gallery'],
  ['ライトテーマのプリセットを選ぶ Prismew for Notion の画面', 'Prismew for Notion screen showing light theme presets'],
  ['ダークテーマのプリセットを選ぶ Prismew for Notion の画面', 'Prismew for Notion screen showing dark theme presets'],
  ['日本語フォントと非表示要素を設定する Prismew for Notion の画面', 'Prismew for Notion screen showing Japanese fonts and hidden elements'],
  ['英語フォントと非表示要素を設定する Prismew for Notion の画面', 'Prismew for Notion screen showing English fonts and hidden elements'],
  ['ページとサイドバーの配色を設定する Prismew for Notion の画面', 'Prismew for Notion screen showing page and sidebar colors'],
  ['画像を切り替える', 'Change image'],
  ['前の画像', 'Previous image'],
  ['次の画像', 'Next image'],
  ['5つの画面を選択', 'Choose from five screens'],
  ['画面 1：ライトテーマ', 'Screen 1: light theme'],
  ['画面 2：ダークテーマ', 'Screen 2: dark theme'],
  ['画面 3：日本語フォント', 'Screen 3: Japanese fonts'],
  ['画面 4：英語フォント', 'Screen 4: English fonts'],
  ['画面 5：カラー設定', 'Screen 5: color settings'],
  ['Content Intelligence Hub の画面ギャラリー', 'Content Intelligence Hub screen gallery'],
  ['チャンネル一覧と動画リストを表示する Content Intelligence Hub の画面', 'Content Intelligence Hub screen showing channels and video lists'],
  ['動画をカード形式で比較する Content Intelligence Hub の画面', 'Content Intelligence Hub screen comparing videos as cards'],
  ['表示モードを設定する Content Intelligence Hub の画面', 'Content Intelligence Hub screen showing display settings'],
  ['中国語表示のコンテンツボード画面', 'Content Intelligence Hub content board in Chinese'],
  ['検索とフィルターを使う Content Intelligence Hub の画面', 'Content Intelligence Hub screen showing search and filters'],
  ['画面 1：チャンネル一覧', 'Screen 1: channel list'],
  ['画面 2：動画ボード', 'Screen 2: video board'],
  ['画面 3：表示設定', 'Screen 3: display settings'],
  ['画面 4：中国語ボード', 'Screen 4: Chinese content board'],
  ['画面 5：検索とフィルター', 'Screen 5: search and filters'],
  ['Torii Partners のロゴ', 'Torii Partners logo'],
  ['インタビューコンテンツ', 'Interview content'],
  ['Bilibiliでインタビュー動画を見る：日本企業でオファーを得やすい職種とは？', 'Watch the Bilibili interview about roles in demand for Chinese-speaking candidates in Japan'],
  ['日本でオファーを得やすい職種をテーマにしたインタビュー動画のサムネイル', 'Thumbnail for an interview about roles in demand for Chinese-speaking candidates in Japan'],
  ['コンテンツ発信プラットフォーム', 'Content platforms'],
  ['小紅書のアカウントを開く', 'Open Xiaohongshu account'],
  ['Bilibiliのアカウントを開く', 'Open Bilibili account'],
  ['YouTubeのアカウントを開く', 'Open YouTube account'],
  ['白いスーツを着た菊愛莉', 'Kiku Airi wearing a white suit'],
  ['対応言語', 'Languages spoken'],
  ['画像を閉じる', 'Close image'],
  ['表示言語', 'Language'],
  ['日本語（現在の言語）', 'Switch to Japanese'],
]);

let html = readFileSync(join(root, 'index.html'), 'utf8');
for (const [source, english] of translations) {
  if (source.endsWith('.') && /[\u3040-\u30ff\u3400-\u9fff]/.test(source)) {
    translations.set(`${source.slice(0, -1)}。`, english);
  }
}
html = html.replace('<html lang="ja">', '<html lang="en">');
html = html.replace('src="assets/market-connections.svg"', 'src="assets/market-connections-en.svg"');
html = html.replace('AIRI KIKU / INTERNATIONAL GROWTH &amp; GTM', 'INTERNATIONAL GROWTH &amp; GTM');
html = html.replace('<h2>自分でも、<em>つくる。</em>', '<h2>I also <em>build.</em>');
html = html.replace('<a href="index.html" lang="ja" aria-current="page" aria-label="日本語（現在の言語）">JP</a>\n<a href="en.html" lang="en" aria-label="Switch to English">EN</a>', '<a href="index.html" lang="ja" aria-label="Switch to Japanese">JP</a>\n<a href="en.html" lang="en" aria-current="page" aria-label="English (current language)">EN</a>');

html = html.replace(/>([^<>]*)</g, (match, text) => {
  const key = text.trim();
  return translations.has(key) ? `>${text.replace(key, translations.get(key))}<` : match;
});
html = html.replace(/\b(alt|aria-label|data-gallery-alt|content)="([^"]*)"/g, (match, name, value) => {
  return attributes.has(value) ? `${name}="${attributes.get(value)}"` : match;
});
html = html.replace(/^[\t ]+$/gm, '');

const leftover = [...html.matchAll(/>([^<>]*[\u3040-\u30ff\u3400-\u9fff][^<>]*)<|\b(?:alt|aria-label|data-gallery-alt|content)="([^"]*[\u3040-\u30ff\u3400-\u9fff][^"]*)"/g)]
  .map(match => (match[1] ?? match[2]).trim())
  .filter(text => text !== '小'); // The Xiaohongshu icon uses its original brand mark.
if (leftover.length) throw new Error(`Untranslated content:\n${[...new Set(leftover)].join('\n')}`);

const svg = readFileSync(join(root, 'assets/market-connections.svg'), 'utf8')
  .replace('市場を読み解く', 'Read the market')
  .replace('市場参入を設計する', 'Design market entry')
  .replace('人と事業をつなぐ', 'Connect people &amp; business')
  .replace('成長と体験を磨く', 'Improve growth &amp; UX');
writeFileSync(join(root, 'assets/market-connections-en.svg'), svg);
writeFileSync(join(root, 'en.html'), html);
console.log('Built en.html and assets/market-connections-en.svg');
