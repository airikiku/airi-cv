(() => {
  'use strict';
  let controller;
  function init() {
  controller?.abort();
  controller = new AbortController();
  const root = document.getElementById('career-explorer');
  if (!root || !window.CAREER_EXPLORER) return;
  root.querySelector('dialog[open]')?.close();
  document.body.classList.remove('dialog-open');
  const en = document.documentElement.lang === 'en';
  const jobs = window.CAREER_EXPLORER[en ? 'en' : 'ja'];
  const copy = en ? {
    heading:'Explore my experience from two perspectives.',intro:'Find relevant work by expertise, or follow my career by company and role. Each experience connects responsibilities, actions, and outcomes.',
    methods:'Ways to explore my experience',skills:'By expertise',skillsSub:'Find experience relevant to your role',career:'By career',careerSub:'Explore companies, roles, and dates',
    all:'All experience',allSub:'See the full picture',gtm:'Market entry & business development',research:'Market intelligence & strategy',growth:'Growth & monetization',
    gtmSub:'Markets / Clients / Partnerships',researchSub:'Research / Insights / Decisions',growthSub:'Acquisition / UX / Revenue',
    gtmShort:'Market entry & BD',researchShort:'Research & strategy',growthShort:'Growth & monetization',
    instructions:'Choose an area to see the relevant focus of each experience.',filtered:'Showing the selected expertise. Open an experience to explore its other dimensions.',count:n=>`${n} experiences`,
    details:'Explore experience',roleDetails:'View role & results',full:'Full experience',close:'Close ×',journey:'Career history',order:'Most recent first / 8 core experiences',
    note:'myGorilla GmbH is a business partnership. Role descriptions at DeNA, Ipsos, and the Environmental Management Strategy Research Institute describe responsibilities rather than formal HR titles.',
    position:'Role & results',lens:'Explore this experience by focus',jump:'See this role in context:',timeline:'View in career history'
  } : {
    heading:'経験を、ふたつの視点から。',intro:'求める専門性から、関連する実績へ。または、これまでのキャリアを時系列で。各社での経験を、役割・取り組み・成果からご覧いただけます。',
    methods:'経験の閲覧方法',skills:'強みから見る',skillsSub:'募集ポジションに近い実績を探す',career:'経歴から見る',careerSub:'会社・役割・在籍期間を確認する',
    all:'すべての経験',allSub:'全体像をつかむ',gtm:'海外市場参入・事業開発',research:'市場調査・事業戦略',growth:'グロース・収益化',
    gtmSub:'市場開拓 / 顧客 / パートナー',researchSub:'リサーチ / インサイト / 意思決定',growthSub:'ユーザー獲得 / UX / マネタイズ',
    gtmShort:'市場参入・BD',researchShort:'市場調査・戦略',growthShort:'グロース・収益化',
    instructions:'関心のある領域を選ぶと、その視点で実績を表示します。',filtered:'選択した専門領域の取り組みを表示しています。詳しく見ると、同じ経験の別の側面も確認できます。',count:n=>`${n}件の経験`,
    details:'詳しく見る',roleDetails:'職務と成果を見る',full:'全体を見る',close:'閉じる ×',journey:'これまでのキャリア',order:'新しい順に表示 / 主な職務経験 8件',
    note:'myGorilla GmbHは業務提携パートナーとしての活動です。DeNA・Ipsos・環境経営戦略総研の一部の役割名は、正式な人事職位ではなく担当業務を示します。',
    position:'職務と成果',lens:'この経験を読む視点',jump:'この経験を時系列で確認する：',timeline:'経歴一覧で見る'
  };
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const labels = {gtm:copy.gtm,research:copy.research,growth:copy.growth};
  const short = {gtm:copy.gtmShort,research:copy.researchShort,growth:copy.growthShort};
  let selected = 'all', mode = 'skills', current = null, opener = null;
  root.innerHTML = `
    <div class="ce-heading"><h2>${copy.heading}</h2><p>${copy.intro}</p></div>
    <div class="ce-view-tabs" role="tablist" aria-label="${copy.methods}">
    <button id="ce-skills-tab" role="tab" aria-selected="true" aria-controls="ce-skills-panel"><span>${copy.skills}</span><small>${copy.skillsSub}</small></button>
    <button id="ce-career-tab" role="tab" aria-selected="false" aria-controls="career" tabindex="-1"><span>${copy.career}</span><small>${copy.careerSub}</small></button></div>
    <section id="ce-skills-panel" role="tabpanel" aria-labelledby="ce-skills-tab">
    <div class="ce-intro-line"><p id="ce-filter-description">${copy.instructions}</p><span id="ce-count" class="ce-count" role="status" aria-live="polite"></span></div>
    <div class="ce-filters" role="group" aria-label="${copy.skills}">${['all','gtm','research','growth'].map(key=>`<button class="ce-filter" data-filter="${key}" aria-pressed="${key==='all'}"><strong>${copy[key]}</strong><small>${copy[key+'Sub']}</small></button>`).join('')}</div>
    <div id="ce-cards" class="ce-cards"></div></section>
    <section id="career" role="tabpanel" aria-labelledby="ce-career-tab" hidden><div class="ce-timeline-head"><h3>${copy.journey}</h3><p>${copy.order}</p></div><div id="ce-timeline"></div><p class="ce-footnote">${copy.note}</p></section>
    <dialog class="ce-dialog" id="ce-detail" aria-labelledby="ce-detail-title"><div class="ce-dialog-top"><span id="ce-dialog-position"></span><div class="ce-dialog-actions"><nav class="ce-dialog-language" aria-label="${en?'Language':'表示言語'}"><button data-language="ja" ${en?'':'aria-current="page"'}>JP</button><button data-language="en" ${en?'aria-current="page"':''}>EN</button></nav><button class="ce-close" id="ce-close" autofocus>${copy.close}</button></div></div><div class="ce-dialog-body"><h2 id="ce-detail-title"></h2><p id="ce-detail-meta" class="ce-dialog-meta"></p><p id="ce-detail-summary" class="ce-dialog-summary"></p><div id="ce-lens-nav" class="ce-lens-nav" role="group" aria-label="${copy.lens}"></div><div id="ce-lens-panel" class="ce-lens-panel" aria-live="polite"></div><p class="ce-dialog-footer">${copy.jump} <button id="ce-show-career">${copy.timeline}</button></p></div></dialog>`;
  const $ = id => document.getElementById('ce-'+id);
  const dialog = $('detail');
  const tags = job => Object.keys(job.facets).map(key=>`<span class="ce-tag ${selected===key?'ce-active':''}">${short[key]}</span>`).join('');
  const panelId = value => value==='career' ? 'career' : 'ce-skills-panel';
  function renderCards() {
    const filtered = jobs.filter(job=>selected==='all'||job.facets[selected]);
    $('count').textContent = copy.count(filtered.length);
    $('filter-description').textContent = selected==='all' ? copy.instructions : copy.filtered;
    $('cards').innerHTML = filtered.map(job=>{
      const facet = job.facets[selected==='all'?job.primary:selected];
      return `<article class="ce-card"><div class="ce-card-top"><span class="ce-company">${escape(job.name)}</span><span class="ce-date">${job.date}</span></div><h3>${escape(selected==='all'?job.headline:facet.title)}</h3><p>${escape(selected==='all'?job.summary:facet.description)}</p><div class="ce-evidence"><strong>${escape(facet.metric)}</strong><small>${escape(facet.caption)}</small></div><div class="ce-card-foot"><div class="ce-tags">${tags(job)}</div><button class="ce-detail-btn" data-open="${job.id}" aria-label="${escape(job.name+' / '+copy.details)}">${copy.details} ＋</button></div></article>`;
    }).join('');
    root.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===selected)));
  }
  $('timeline').innerHTML = jobs.map(job=>`<article class="ce-timeline-row" id="ce-row-${job.id}" tabindex="-1"><div class="ce-period">${job.date}</div><div><h3>${escape(job.name)}</h3><div class="ce-role">${escape(job.role)} / ${escape(job.place)}</div><p>${escape(job.summary)}</p><div class="ce-tags">${tags(job)}</div></div><button class="ce-detail-btn" data-open="${job.id}" aria-label="${escape(job.name+' / '+copy.roleDetails)}">${copy.roleDetails} ＋</button></article>`).join('');
  function view(value) {
    mode = value;
    for (const item of ['skills','career']) {
      const active = item===mode;
      document.getElementById(panelId(item)).hidden = !active;
      $(item+'-tab').setAttribute('aria-selected',String(active));
      $(item+'-tab').tabIndex = active?0:-1;
    }
  }
  function lens(key) {
    $('lens-nav').querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lens===key)));
    $('lens-panel').innerHTML = (key==='all'?Object.keys(current.facets):[key]).map(k=>{
      const facet = current.facets[k];
      return `<section class="ce-lens-section"><h3>${escape(facet.title)}</h3><div class="ce-evidence"><strong>${escape(facet.metric)}</strong><small>${escape(facet.caption)}</small></div><ul>${facet.bullets.map(bullet=>`<li>${escape(bullet)}</li>`).join('')}</ul></section>`;
    }).join('');
  }
  function openJob(job, key) {
    const wasOpen = dialog.open;
    current = job;
    $('detail-title').textContent = job.name;
    $('detail-meta').textContent = `${job.date} / ${job.place} / ${job.role}`;
    $('detail-summary').textContent = job.summary;
    $('dialog-position').textContent = copy.position+' / '+job.name;
    $('lens-nav').innerHTML = ['all',...Object.keys(job.facets)].map(k=>`<button data-lens="${k}" aria-pressed="false">${k==='all'?copy.full:short[k]}</button>`).join('');
    lens(job.facets[key]?key:'all');
    if (!wasOpen) { dialog.showModal(); dialog.scrollTop=0; document.body.classList.add('dialog-open'); }
  }
  const motion = () => matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth';
  function setHash(hash, replace=false) { history[replace?'replaceState':'pushState'](null,'','#'+hash); }
  const parentHash = () => mode==='career'?'career':selected==='all'?'work':'work-'+selected;
  function close() { if (dialog.open) dialog.close(); setHash(parentHash(),true); }
  const legacy = {'case-1':'cchannel','case-2':'dena','case-3':'mygorilla','case-4':'wargaming','case-5':'energy'};
  function route(scroll=true) {
    const hash = location.hash.slice(1), [base,focus] = hash.split('/');
    const id = legacy[base] || (base.startsWith('experience-') ? base.slice(11) : null);
    const job = jobs.find(item=>item.id===id);
    if (job) { openJob(job,focus); return; }
    if (dialog.open) dialog.close();
    const targetRow = hash.startsWith('career-') ? document.getElementById('ce-row-'+hash.slice(7)) : null;
    if (hash==='career'||targetRow) view('career');
    else if (hash==='work'||['work-gtm','work-research','work-growth'].includes(hash)) {
      selected = hash==='work'?'all':hash.slice(5); view('skills'); renderCards();
    } else return;
    if (scroll) (targetRow||root).scrollIntoView({behavior:motion(),block:targetRow?'center':'start'});
    if (targetRow) targetRow.focus({preventScroll:true});
  }
  root.addEventListener('click',event=>{
    const filter = event.target.closest('[data-filter]'),open=event.target.closest('[data-open]'),focus=event.target.closest('[data-lens]');
    const language=event.target.closest('[data-language]');
    if (language && language.dataset.language!==document.documentElement.lang) {
      if (document.documentElement.hasAttribute('data-standalone-bilingual')) window.setStandaloneLanguage?.(language.dataset.language);
      else window.location.href=`${language.dataset.language==='en'?'en.html':'index.html'}${location.hash}`;
      return;
    }
    if (filter) { selected=filter.dataset.filter; renderCards(); setHash(parentHash()); }
    if (open) { opener=open; const job=jobs.find(item=>item.id===open.dataset.open); const key=mode==='skills'&&job.facets[selected]?selected:'all'; setHash('experience-'+job.id+'/'+key); openJob(job,key); }
    if (focus) { lens(focus.dataset.lens); setHash('experience-'+current.id+'/'+focus.dataset.lens,true); }
  });
  for (const item of ['skills','career']) $(item+'-tab').addEventListener('click',()=>{view(item);setHash(parentHash());});
  root.querySelector('.ce-view-tabs').addEventListener('keydown',event=>{
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault(); const next=event.key==='Home'?'skills':event.key==='End'?'career':mode==='skills'?'career':'skills';
    view(next);setHash(parentHash());$(next+'-tab').focus();
  });
  $('close').addEventListener('click',close);
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(opener?.isConnected&&!opener.closest('[hidden]'))opener.focus({preventScroll:true});});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)close();});
  $('show-career').addEventListener('click',()=>{const id=current.id;dialog.close();setHash('career-'+id);route();});
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');if(!link)return;
    const hash=link.getAttribute('href').slice(1);
    if(hash==='work'||hash==='career'||legacy[hash]||['work-gtm','work-research','work-growth'].includes(hash)){
      event.preventDefault();setHash(hash);route();
    }
  },{signal:controller.signal});
  window.addEventListener('hashchange',()=>route(),{signal:controller.signal});
  renderCards(); route();
  }
  window.renderCareerExplorer = init;
  init();
})();
