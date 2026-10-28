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
  ['リサーチからGTM戦略、事業開発、パートナーシップ、成長実行まで。日本・中国・欧州をつなぎ、企業の新市場進出と成長を推進します.', 'With more than 10 years in market research and B2B business development, I help companies enter and grow in Japan, China, and wider Asia—from market analysis and GTM planning to client acquisition and partnerships.'],
  ['実績を見る', 'Explore my work'],
  ['月間動画再生数', 'Monthly video views'],
  ['C CHANNEL 中国市場｜3か月で目標の200%', 'C CHANNEL China | reached within 3 months'],
  ['ページビュー', 'Page views'],
  ['DeNA｜3か月', 'DeNA | 3 months'],
  ['関連売上', 'Related revenue'],
  ['DeNA｜6か月', 'DeNA | 6 months'],
  ['CPAを最大削減', 'Cost per acquisition'],
  ['中国市場を、海外展開の成功事例へ。', 'Scaling C CHANNEL in China through local partnerships.'],
  ['コンテンツとUXを、事業成果へ。', 'Turning UX improvements into measurable growth.'],
  ['アジア向けGTM支援をゼロから事業化。', 'Launching an Asia-focused GTM and research practice.'],
  ['大規模投資を、効率的な獲得へ。', 'Lowering acquisition costs across APAC.'],
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
  ['課題、打ち手、成果。キャリアの中から、強みを最もよく表す4つのケースを紹介します。', 'Four examples of how I turn market insight into new business, stronger products, and measurable growth.'],
  ['現地の消費者インサイトとパートナー戦略を組み合わせ、NetEase・Weiboとの連携を推進。3か月で月間動画再生数1億回（目標の200%）、8か月でWeiboフォロワー70万人以上を獲得。', 'Developed opportunities in China for Japanese brands and built local partnerships with NetEase and Weibo. These collaborations helped C CHANNEL reach 100 million monthly video views within three months and more than 700,000 Weibo followers within eight months.'],
  ['アクセス解析とユーザー行動をもとにUI/UXのボトルネックを特定。コンテンツ改善を通じて3か月で直帰率37%削減・PV184%増加、広告主向け提案により6か月で関連売上約140%増加。', 'Used Google Analytics to identify UX bottlenecks. Content and UX improvements cut bounce rate by 37% and increased page views by 184% in three months; consulting sales to advertisers increased related revenue by approximately 140% in six months.'],
  ['アジア市場向けリサーチ・GTM支援事業を自ら企画し、テストマーケティングから事業化までを主導。年商100億円規模以上の企業を複数社開拓し、顧客開拓と調査の標準業務手順を構築。', 'Proposed and launched an Asia-focused market research and GTM support business. Won multiple enterprise clients with annual revenue above JPY 10 billion and established standard processes for client development and research delivery.'],
  ['事業企画・事業化', 'New business launch'],
  ['数億円規模のプロモーション予算を管理。データ分析、UI/UX改善、クリエイティブ最適化を通じて、APACのユーザー獲得効率を改善。', 'Led APAC digital marketing with a promotional budget of several hundred million yen. Data analysis, UX improvements, and creative optimization helped reduce cost per acquisition by as much as 70%.'],
  ['CPA削減（最大）', 'Cost per acquisition'],
  ['市場を越えながら、', 'From research'],
  ['できることを広げてきた。', 'to cross-border GTM.'],
  ['現場から市場開拓を学ぶ', 'Developing markets on the ground'],
  ['上海徳佳祺商貿 / iGRID Solutions', 'Digiage International / iGrid Solutions'],
  ['中国市場の分析、法人顧客の新規開拓、投資回収分析。市場に入り、顧客と直接向き合う実務からキャリアをスタート。', 'In Shanghai, I acquired B2B clients and analyzed their return on investment. I later developed China-entry plans and conducted B2B research at iGrid Solutions.'],
  ['リサーチを事業判断につなげる', 'Connecting research to business decisions'],
  ['定性・定量調査、競合分析、新規事業リサーチ、KPI設計、UX改善と収益化。データを具体的な成長施策へ変換。', 'At Ipsos, I managed international research from study design through reporting. At DeNA, I applied market research, analytics, KPI design, and UX improvements to new digital businesses.'],
  ['中国市場で成長モデルを構築', 'Building a growth model in China'],
  ['C CHANNEL｜海外事業責任者・東アジア', 'C CHANNEL | Overseas Business Lead, East Asia'],
  ['中国の消費者インサイトを起点に、日本企業の開拓と現地パートナー連携を推進。NetEase・Weiboとの連携を通じて事業を拡大。', 'Led business development in Greater China, using local consumer insight to win Japanese corporate clients and build partnerships with NetEase and Weibo.'],
  ['成長とプロダクト体験を最適化', 'Optimizing growth and product experience'],
  ['APACのデジタルマーケティング、大規模予算管理、CPA改善に加え、クラウドファンディングプラットフォームのWeb・UI/UXをディレクション。', 'At Wargaming, I led APAC digital marketing and reduced CPA by up to 70%. At Energy Shares, I led content planning and UX/UI direction for a crowdfunding platform.'],
  ['欧州とアジアをつなぐGTM', 'Connecting Europe and Asia through GTM'],
  ['myGorilla GmbH｜パートナー・アジア市場担当', 'myGorilla GmbH | Partner, Asian Markets'],
  ['日本・中国市場のGTM、アウトバウンド、エンタープライズ開拓、欧州企業とのパートナーシップ、リサーチから納品までのプロジェクトを推進。', 'I lead GTM strategy for clients entering Japan and China, develop B2B opportunities and European partnerships, and manage research projects from planning through delivery.'],
  ['自分でも、', 'I also'],
  ['戦略や提案にとどまらず、アイデアをプロダクトに落とし込み、実際に使える形にすることにも取り組んでいます。', 'I build tools to solve problems I encounter in my work, taking ideas from concept to working product.'],
  ['Notionの表示を自分らしく整えるためのブラウザ拡張機能。テキストと画面配色のカスタマイズに加え、英語・日本語・韓国語・中国語（簡体字／繁体字）に対応したフォントを選択可能。不要なUI要素を非表示にし、集中できるワークスペースをつくります。', 'A browser extension that lets people personalize Notion. Users can change text and page colors, choose fonts for English, Japanese, Korean, Simplified Chinese, and Traditional Chinese, and hide distracting interface elements to create a more focused workspace.'],
  ['中国・海外の動画プラットフォームを横断して収集・整理・比較分析する、マーケティングエージェンシーのGTM業務を見据えた独立プラットフォーム。小红书、Bilibili、TikTok／Douyin、YouTubeを一元化し、リサーチ、競合把握、コンテンツ企画の判断を支援します。', 'A standalone video research and analysis platform developed for a marketing agency’s GTM projects. It brings Xiaohongshu, Bilibili, TikTok/Douyin, and YouTube into one place to compare channels and content, track competitors, and inform content planning.'],
  ['仕事の外でも、', 'Beyond my day job,'],
  ['人と機会をつなぐ。', 'connecting people and opportunities.'],
  ['クロスボーダーの課題に向き合い、パートナーやコンテンツ、プロダクトを通じて新しい接点をつくるプロジェクト。', 'Outside my client work, I explore cross-border opportunities through partnerships, content, and products.'],
  ['中国の工場と、海外の輸入業者・メーカーをつなぐ。', 'Connecting Chinese factories with overseas importers and manufacturers.'],
  ['中国の製造現場と海外の輸入業者・メーカーの間に立ち、国境を越えたビジネス接点をつくるプロジェクト。市場理解とパートナー開拓の経験を活かし、双方が協業機会を見つけやすい関係づくりを目指します。', 'Torii Partners connects Chinese factories with importers and manufacturers overseas. Drawing on market knowledge and partnership development, the project helps both sides identify opportunities for cross-border collaboration.'],
  ['中国の工場', 'Chinese factories'],
  ['海外の輸入業者・メーカー', 'Overseas importers & manufacturers'],
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
  ['上海・東京・ドイツを行き来し、アジアと欧州の交点から、まだ理解されていない市場に入る企業を支援しています。', 'Working between Tokyo and Shanghai, I collaborate with teams and clients across Asia and Europe to turn market research into practical GTM plans and partnerships.'],
  ['日本語', 'Japanese'],
  ['中国語', 'Mandarin Chinese'],
  ['英語', 'English'],
  ['ドイツ語', 'German'],
  ['プロジェクト', 'Projects'],
  ['トップへ ↑', 'Back to top ↑'],
  ['市場を理解し、国境を越えて、事業を成長させる。', 'Turning market insight into cross-border growth.'],
]);

const attributes = new Map([
  ['菊 愛莉 — 日本・中国・欧州をつなぐ International Growth & GTM。市場調査、事業開発、パートナーシップから成長実行まで。', 'Airi Kiku is a cross-border B2B and GTM professional with more than 10 years of experience in market research, business development, and partnerships across Asia and Europe.'],
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
