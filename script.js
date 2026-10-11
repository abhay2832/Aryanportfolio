const au=document.getElementById('au');
let AC,an,buf,bs=0,md=0,hg=0,PK=0;
function setupAudio(){if(AC){AC.state==='suspended'&&AC.resume();return}try{AC=new(window.AudioContext||window.webkitAudioContext)();const s=AC.createMediaElementSource(au);an=AC.createAnalyser();an.fftSize=256;an.smoothingTimeConstant=.78;s.connect(an);an.connect(AC.destination);buf=new Uint8Array(an.frequencyBinCount)}catch(e){}}
function level(){let tb=0,tm=0,th=0;if(an&&!au.paused){an.getByteFrequencyData(buf);const a=(f,t)=>{let s=0;for(let i=f;i<t;i++)s+=buf[i];return s/((t-f)*255)};tb=a(1,6);tm=a(6,24);th=a(24,70)}bs+=(tb-bs)*.3;md+=(tm-md)*.3;hg+=(th-hg)*.3}
const hero=document.querySelector('.hero'),orbs=[...document.querySelectorAll('.orb')],eqs=[...document.querySelectorAll('#eq i')];
// ---------- HERO: smooth 3D turn + blink (auto-plays, scroll scrubs) ----------
const P=[...document.querySelectorAll('.photos img.p')],vid=document.getElementById('spin'),dark=document.querySelector('.nightbg'),lt=document.getElementById('lt'),blink=document.getElementById('blink'),ts=[...document.querySelectorAll('.titles span')],wrap=document.querySelector('.wrap');
ts.forEach(s=>{s.innerHTML=s.innerHTML.split('<br>').map(l=>[...l].map((c,k)=>`<i style="--d:${k*45}ms">${c===' '?'&nbsp;':c}</i>`).join('')).join('<br>')});
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const KF=[[0,0],[5,0],[7.6,.25],[12.6,.25],[15.2,.5],[20.2,.5],[22.8,.75],[27.8,.75],[30.4,1],[35.4,1],[40,0],[42,0]];
function auto(t){t%=42;for(let i=0;i<KF.length-1;i++){const[a,x]=KF[i],[b,y]=KF[i+1];if(t>=a&&t<b)return x+(y-x)*ease((t-a)/(b-a))}return 0}
let useVid=false,scrolled=false,pos=0,tgt=0,cur=-1,mx=0,my=0,smx=0,smy=0,blinkOn=0;const t0=performance.now();
addEventListener('scroll',()=>{if(scrollY>30)scrolled=true;if(scrollY<5&&!scrolled)return});
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;spot.style.left=e.clientX+'px';spot.style.top=e.clientY+'px'});
(function blinkLoop(){setTimeout(()=>{blinkOn=1;setTimeout(()=>{blinkOn=0;if(Math.random()<.3)setTimeout(()=>{blinkOn=1;setTimeout(()=>blinkOn=0,110)},180);blinkLoop()},130)},2200+Math.random()*2800)})();
function frame(now){
 const max=wrap.offsetHeight-innerHeight,sp=scrollY/max;
 if(scrolled&&scrollY<max)tgt=Math.min(Math.max(sp,0),1);else if(!scrolled)tgt=auto((now-t0)/1000);
 pos+=(tgt-pos)*.07;smx+=(mx-smx)*.06;smy+=(my-smy)*.06;
 const x=pos*(P.length-1),base=innerWidth<800?-50:-20;
 let dk=0;level();const pk=Math.max(0,(bs-.28)/.72);PK=pk;const ny=0;
 P.forEach((im,i)=>{const d=x-i,w=Math.max(0,Math.min(1,(.4-Math.abs(d))/.15));
  im.style.opacity=w;im.style.transform=`translate(${base}%,0) translate3d(${smx*-26-d*60}px,${smy*-10+ny-pk*14}px,0) rotateY(${-d*55+smx*8}deg) scale(${1+(1-w)*-.06+pk*.05})`;
  if(i>=3)dk+=w;if(i===0){blink.style.opacity=w*blinkOn;blink.style.transform=im.style.transform}});
 dark.style.opacity=dk;lt.style.opacity=1-dk;lt.style.transform=`scale(${1+pk*.09})`;hero.style.setProperty('--b',pk.toFixed(2));orbs.forEach(o=>o.style.opacity=.55+pk*.4);eqs.forEach((e,i)=>e.style.height=(au.paused?4:4+Math.min(1,[bs,md*1.6,hg*2.4][i])*12)+'px');
 const k=Math.round(x);if(k!==cur){const old=ts[cur];if(old){old.classList.remove('on');old.classList.add('out');setTimeout(()=>old.classList.remove('out'),460)}cur=k;setTimeout(()=>{if(cur===k)ts[k].classList.add('on')},old?480:0)}
 if(useVid&&vid.duration){if(!scrolled){if(vid.paused)vid.play().catch(()=>{})}else{vid.pause();const tt=Math.min(Math.max(tgt,0),1)*vid.duration;if(Math.abs(vid.currentTime-tt)>.03)vid.currentTime=tt}}
 document.getElementById('bar').style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%';
 requestAnimationFrame(frame)}requestAnimationFrame(frame);
// typing line
const words=['Available for internships.','Learning fast with modern AI tools.','Building useful web projects.'];let wi=0,ci=0,del=false;const ty=document.getElementById('type');
(function tick(){const w=words[wi];ty.textContent=w.slice(0,ci);if(!del&&ci===w.length){del=true;return setTimeout(tick,1600)}if(del&&ci===0){del=false;wi=(wi+1)%words.length}ci+=del?-1:1;setTimeout(tick,del?25:55)})();
// particles
const cv=document.getElementById('fx'),cx=cv.getContext('2d');let pts=[];function rs(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;pts=Array.from({length:70},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*2+.5,v:Math.random()*.5+.15}))}rs();addEventListener('resize',rs);
(function dr(){cx.clearRect(0,0,cv.width,cv.height);pts.forEach(p=>{p.y-=p.v*(1+PK*6);if(p.y<0){p.y=cv.height;p.x=Math.random()*cv.width}cx.fillStyle='rgba(255,255,255,.55)';cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill()});requestAnimationFrame(dr)})();
// ---------- Skills ----------
const S=['Microsoft Word','Microsoft Excel','PowerPoint','Google Workspace','Tally','Basic GST','Financial Accounting','Data Entry','Internet Research','Email Writing','AI Tools & Prompting'],S2=['Communication','Leadership','Teamwork','Problem Solving','Time Management','Customer Handling','Analytical Skills','Decision Making','Adaptability','Critical Thinking'];
const fill=(id,a)=>document.getElementById(id).innerHTML=[...a,...a,...a,...a].map(s=>`<i>${s}</i>`).join('');fill('r1',S);fill('r2',S2);
// ---------- Certificates: add files to /certificates then list here ----------
const CERTS=[
  // ['certificates/badminton.jpg','Badminton Certificate - FS University'],
];
document.getElementById('certs').innerHTML=CERTS.length?CERTS.map(c=>`<div class="card tilt"><img src="${c[0]}" alt="${c[1]}"><h3>${c[1]}</h3></div>`).join(''):'<div class="empty mono">// CERTIFICATES COMING SOON</div>';
// ---------- Tilt cards, reveal, counters ----------
document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty('--ry',(x-.5)*14+'deg');el.style.setProperty('--rx',(.5-y)*14+'deg');el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%')});el.addEventListener('mouseleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;x.target.classList.add('in');x.target.querySelectorAll('[data-n]').forEach(n=>{let v=0,t=+n.dataset.n;const id=setInterval(()=>{n.textContent=++v;if(v>=t)clearInterval(id)},250)})}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();window.open('https://mail.google.com/mail/?view=cm&fs=1&to=pp9099034@gmail.com&su='+encodeURIComponent('Portfolio Message from '+nm.value)+'&body='+encodeURIComponent('Name: '+nm.value+'\nEmail: '+em.value+'\n\n'+ms.value),'_blank')});
// ---------- Music: two songs, loops; browsers need one click/tap before sound can start ----------
const SONGS=[['music/song1.mp3','Song 1'],['music/song2.mp3','Song 2']],mp=document.getElementById('mp'),pp=document.getElementById('pp'),sn=document.getElementById('sn');let si=0,started=false;
function load(i){si=(i+SONGS.length)%SONGS.length;au.src=SONGS[si][0];sn.textContent=SONGS[si][1]}
function play(){setupAudio();au.play().then(()=>{mp.classList.add('on');pp.innerHTML='&#10074;&#10074;'}).catch(()=>{})}
function pause(){au.pause();mp.classList.remove('on');pp.innerHTML='&#9654;'}
load(0);au.addEventListener('ended',()=>{load(si+1);play()});
pp.addEventListener('click',e=>{e.stopPropagation();started=true;au.paused?play():pause()});
document.getElementById('nx').addEventListener('click',e=>{e.stopPropagation();started=true;load(si+1);play()});
document.getElementById('pv').addEventListener('click',e=>{e.stopPropagation();started=true;load(si-1);play()});
addEventListener('pointerdown',e=>{if(started||e.target.closest('a,button,input,textarea'))return;started=true;play()});
// ---------- Optional: real 360 video (put hero.mp4 next to index.html) ----------
vid.addEventListener('loadedmetadata',()=>{useVid=true;vid.style.display='block';document.querySelector('.photos').style.display='none'});
