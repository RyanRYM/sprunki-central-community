(function(){
 const form=document.getElementById('verityForm'),input=document.getElementById('verityInput'),box=document.getElementById('verityMessages'),status=document.getElementById('verityStatus'),search=document.getElementById('verityChannelSearch'),results=document.getElementById('verityChannelResults');
 if(!form)return;
 const moods={happy:'assets/images/verity-happy.png',thinking:'assets/images/verity-thinking.png',confused:'assets/images/verity-confused.png',sad:'assets/images/verity-sad.png',surprised:'assets/images/verity-surprised.png',angry:'assets/images/verity-angry.png',wink:'assets/images/verity-wink.png'};
 let channels=[];
 function lang(){return (window.SCCUI?.getLang?.()||'fa')==='en'?'en':'fa'}
 function moodFor(q){const t=String(q||'').toLowerCase();if(/عصب|خشم|angry|hate|نفرت/.test(t))return 'angry';if(/غم|sad|ناراحت|sorry|بد|bad/.test(t))return 'sad';if(/خنده|شوخی|joke|funny|عالی|great/.test(t))return 'happy';if(/واو|wow|جدی|really|!{2,}/.test(t))return 'surprised';if(/[?؟]|چرا|چطور|چگونه|how|why|what|when|where|حل|حساب|calculate/.test(t))return 'thinking';if(/wink|😉/.test(t))return 'wink';return 'happy'}
 function add(role,text,mood){const row=document.createElement('div');row.className='verity-msg-row '+role;const d=document.createElement('div');d.className='verity-msg '+role;const b=document.createElement('b');b.textContent=role==='bot'?'Verity':(lang()==='en'?'You':'شما');const p=document.createElement('p');p.textContent=text;d.append(b,p);if(role==='bot'){const img=document.createElement('img');img.className='verity-msg-avatar';img.src=moods[mood||moodFor(text)]||moods.happy;img.alt='Verity';row.append(img,d)}else row.append(d);box.appendChild(row);box.scrollTop=box.scrollHeight}
 function setMood(m){const hero=document.querySelector('.verity-hero-avatar img');if(hero)hero.src=moods[m]||moods.happy}
 function localAnswer(message){const m=String(message||'').trim(),t=m.toLowerCase(),en=lang()==='en';
   const math=m.replace(/×/g,'*').replace(/÷/g,'/').replace(/,/g,'.').replace(/\^/g,'**').replace(/[^0-9+\-*/().%\s]/g,'').trim();
   if(math&&/^[0-9+\-*/().%\s*]+$/.test(math)&&/\d/.test(math)){try{const v=Function('"use strict";return ('+math+')')();if(Number.isFinite(v))return en?`The result is ${v}.`:`حاصل می‌شود ${v}.`}catch{}}

   if(/^(hi|hello|hey|yo|سلام|درود|سلوم|سلام وریتی|salam|salam verity)\b/i.test(m))
     return en?'Hey! 👋 I’m Verity. How can I help?':'سلام! 👋 من وریتی‌ام. چطور می‌تونم کمکت کنم؟';

   if(/(چخبر|چه خبر|چه خبرا|خبری|خوبی|خوبی؟|چطوری|چطوری؟|حالت چطوره|حالت خوبه|چه خبر؟|how are you|how r u|what'?s up|whats up|you good|how is it going)/i.test(t))
     return en?'I’m good! 😄 Everything’s running smoothly on my side. What are you up to?':'من خوبم! 😄 همه‌چیز این طرف رو به راهه. تو چه خبر؟';

   if(/(مرسی|ممنون|دمت گرم|متشکرم|thanks|thank you|thx)/i.test(t))
     return en?'You’re welcome! 😄':'خواهش می‌کنم! 😄';

   if(/(خداحافظ|فعلا|فعلاً|بای|bye|goodbye|see you)/i.test(t))
     return en?'See you later! 👋':'فعلاً داش! 👋';

   if(/(عالی|خوبه|خوب شد|باحاله|cool|great|awesome|nice)/i.test(t))
     return en?'Nice! 😄':'عالیه! 😄';

   if(/scc|sprunki central|scc چیست|scc چیه|اس‌سی‌سی|اس سی سی/i.test(t))
     return en?'SCC means Sprunki Central Community — a community for Sprunki fans, creators, channels, projects and collaboration.':'SCC یعنی Sprunki Central Community؛ یک جامعه برای طرفداران، سازندگان، کانال‌ها، پروژه‌ها و همکاری‌های مربوط به Sprunki.';

   if(/verity|وریتی|وری|دستیار/i.test(t))
     return en?'I’m Verity, the SCC assistant. I can chat about SCC, rules, channels, projects, news and simple calculations.':'من وریتی، دستیار SCC هستم. می‌تونم درباره SCC، قوانین، کانال‌ها، پروژه‌ها، اخبار و محاسبات ساده باهات صحبت کنم.';

   if(/rule|rules|official rules|قانون|قوانین|قوانین رسمی|مقررات/i.test(t))
     return en?'SCC has 42 official rules covering respect, content rights, member channels, management conduct and fair participation.':'SCC دارای ۴۲ قانون رسمی درباره احترام، حقوق آثار، کانال‌های عضو، رفتار مدیریتی و مشارکت عادلانه است.';

   if(/channel|channels|member channel|کانال|کانال‌ها|کانال عضو|عضو کانال/i.test(t))
     return en?'The Channels section lists SCC member channels. New channels can apply through the Join section.':'در بخش کانال‌ها، کانال‌های عضو SCC نمایش داده می‌شوند. کانال‌های جدید هم می‌تونن از بخش عضویت درخواست بدن.';

   if(/art|arts|fan art|oc|creative|gallery|project|projects|آثار|اثر|فن آرت|فَن آرت|گالری|گالری آثار|پروژه|پروژه‌ها|پروژه های|موسیقی|بازی|انیمیشن|داستان|داستان‌ها/i.test(t))
     return en?'The Arts section includes Fan Art, Music, Games, OC & Projects, Animation and Stories.':'بخش آثار SCC شامل Fan Art، موسیقی، بازی، OC و پروژه‌ها، انیمیشن و داستانه.';

   if(/language|زبان|فارسی|انگلیسی|english|persian/i.test(t))
     return en?'SCC supports Persian and English. Use the language menu in the top navigation to switch.':'SCC از فارسی و انگلیسی پشتیبانی می‌کنه؛ از منوی زبان بالای سایت می‌تونی زبان رو عوض کنی.';

   if(/owner|creator|admin|مالک|رئیس|مدیر اصلی|صاحب|سازنده/i.test(t))
     return en?'The SCC owner is Ryan_RYM.':'مالک SCC، Ryan_RYM است.';

   if(/help|کمک|چی کار|چه کار|راهنما|چطور|چگونه|چجوری/i.test(t))
     return en?'Sure! Ask me about SCC, its rules, channels, arts, Verity, news, or a calculation.':'حتماً! درباره SCC، قوانین، کانال‌ها، آثار، وریتی، اخبار یا یک محاسبه ازم بپرس.';

   if(/news|update|updates|announcement|خبر|اخبار|آپدیت|آپدیت‌ها|به‌روزرسانی|اطلاعیه/i.test(t))
     return en?'SCC is currently on version 1.0.2. Check the News page for the latest announcements and updates.':'نسخه فعلی SCC، نسخه ۱.۰.۲ است. برای آخرین اطلاعیه‌ها و به‌روزرسانی‌ها صفحه اخبار رو ببین.';

   if(/[?؟]|چرا|چطور|چگونه|how|why|what|when|where|who|which|حل|حساب|calculate|حساب کن/i.test(t))
     return en?'I can help with SCC, its rules, member channels, the Arts & Projects gallery, Verity, news, language settings, and basic calculations.':'می‌تونم درباره SCC، قوانین، کانال‌های عضو، گالری آثار و پروژه‌ها، وریتی، اخبار، تنظیمات زبان و محاسبات ساده کمکت کنم.';

   return en?'Hmm, I’m not sure about that yet. 😅 Try asking me about SCC, rules, channels, arts, Verity, news, or a simple calculation.':'هوم، فعلاً جواب دقیقی برای این یکی ندارم 😅. می‌تونی درباره SCC، قوانین، کانال‌ها، آثار، وریتی، اخبار یا یک محاسبه ساده ازم بپرسی.';
 }
 form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;add('user',q);input.value='';setMood(moodFor(q));status.textContent=lang()==='en'?'Thinking…':'در حال فکر کردن…';setTimeout(()=>{const a=localAnswer(q);add('bot',a,moodFor(a));setMood(moodFor(a));status.textContent=lang()==='en'?'Ready.':'آماده‌ام.'},220)});
 function renderChannels(q){if(!results)return;const t=String(q||'').trim().toLowerCase();if(!t){results.innerHTML=lang()==='en'?'<small>Type a channel name to search.</small>':'<small>برای جستجو نام کانال را بنویس.</small>';return}const list=channels.filter(c=>String(c.name||'').toLowerCase().includes(t)).slice(0,8);results.innerHTML=list.length?list.map(c=>`<a href="${String(c.link||'#').replace(/"/g,'&quot;')}" target="_blank" rel="noopener"><b>${String(c.name||'SCC').replace(/[<>&]/g,'')}</b><small>${String(c.description||'').replace(/[<>&]/g,'')}</small></a>`).join(''):(lang()==='en'?'<small>No matching channels.</small>':'<small>کانالی پیدا نشد.</small>')}
 search?.addEventListener('input',e=>renderChannels(e.target.value));setMood('happy');
})();
