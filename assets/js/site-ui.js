(function(){
  const LANG_KEY='scc_language_v100';
  const THEME_KEY='scc_theme_v100';
  function getLang(){return localStorage.getItem(LANG_KEY)||sessionStorage.getItem(LANG_KEY)||((document.cookie.match(/(?:^|; )scc_language_v100=([^;]+)/)||[])[1])||''}
  function setLang(v){if(v!=='fa'&&v!=='en')return;try{localStorage.setItem(LANG_KEY,v);sessionStorage.setItem(LANG_KEY,v);document.cookie='scc_language_v100='+v+'; Max-Age=31536000; Path=/; SameSite=Lax'}catch{};location.reload()}
  function setTheme(theme){
    const t=theme==='light'?'light':'dark'; document.documentElement.dataset.theme=t;
    try{localStorage.setItem(THEME_KEY,t)}catch{}
    document.querySelectorAll('[data-theme-toggle]').forEach(b=>{
      const icon=b.querySelector('.theme-icon'); if(icon) icon.textContent=t==='dark'?'☀':'☾';
      b.setAttribute('aria-label',t==='dark'?'حالت روشن':'حالت تاریک'); b.title=t==='dark'?'حالت روشن':'حالت تاریک';
    });
  }
  function initTheme(){let t='dark';try{t=localStorage.getItem(THEME_KEY)||'dark'}catch{};setTheme(t);document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));}
  function initLanguage(){
    const current=getLang()||'fa';
    document.querySelectorAll('[data-current-language]').forEach(el=>el.textContent=current==='en'?'English':'فارسی');
    document.querySelectorAll('[data-language-menu]').forEach(b=>b.onclick=e=>{e.stopPropagation();const menu=b.closest('.language-menu');menu?.classList.toggle('open');b.setAttribute('aria-expanded',menu?.classList.contains('open')?'true':'false')});
    document.querySelectorAll('[data-set-language]').forEach(b=>b.onclick=e=>{e.stopPropagation();setLang(b.dataset.setLanguage)});
    document.addEventListener('click',()=>document.querySelectorAll('.language-menu.open').forEach(m=>m.classList.remove('open')),{once:false});
  }
  function initMenus(){
    const closeMenu=(btn,menu)=>{ menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-label','باز کردن منو'); btn.textContent='☰'; };
    document.querySelectorAll('.menu-toggle').forEach(btn=>{
      const header=btn.closest('.unified-header') || btn.closest('header') || document;
      const menu=header.querySelector('.nav-links');
      if(!menu)return;
      btn.type='button';
      btn.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false');
      btn.setAttribute('aria-label',menu.classList.contains('open')?'بستن منو':'باز کردن منو');
      btn.textContent=menu.classList.contains('open')?'✕':'☰';
      btn.addEventListener('click',e=>{
        e.preventDefault(); e.stopPropagation();
        const open=menu.classList.toggle('open');
        btn.setAttribute('aria-expanded',open?'true':'false');
        btn.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');
        btn.textContent=open?'✕':'☰';
      });
      menu.addEventListener('click',e=>e.stopPropagation());
      menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu(btn,menu)));
      document.addEventListener('click',e=>{
        if(menu.classList.contains('open') && !header.contains(e.target)) closeMenu(btn,menu);
      });
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))closeMenu(btn,menu);});
    });
  }

  function init(){initTheme();initLanguage();initMenus();}
  window.SCCUI={getLang,setLang,setTheme,init};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
