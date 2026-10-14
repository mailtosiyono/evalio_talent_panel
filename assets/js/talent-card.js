(()=>{
  'use strict';
  const candidates={
    a:{name:'Kandidat A',id:'A-001',avatar:'KA',job:'Kepala Tim Operasional',unit:'Operasional',level:'Level 4',tenure:'7 tahun',target:'Manajer Unit',pool:'Leadership',competency:78,potential:86,performance:81,lead:82,solve:75,collab:89,stopGo:'GO',readiness:'Ready Soon',note:'Memiliki potensi kepemimpinan dan kolaborasi yang baik. Disarankan pengembangan pada pengambilan keputusan strategis.'},
    b:{name:'Kandidat B',id:'B-002',avatar:'KB',job:'Supervisor Layanan',unit:'Layanan Bisnis',level:'Level 4',tenure:'9 tahun',target:'Manajer Layanan',pool:'Leadership',competency:88,potential:90,performance:92,lead:90,solve:85,collab:92,stopGo:'GO',readiness:'Ready Now',note:'Telah menunjukkan konsistensi hasil kerja dan kemampuan memimpin tim. Siap didiskusikan untuk peran yang lebih besar.'},
    c:{name:'Kandidat C',id:'C-003',avatar:'KC',job:'Analis Senior',unit:'Pengembangan SDM',level:'Level 3',tenure:'5 tahun',target:'Koordinator Tim',pool:'Specialist',competency:69,potential:74,performance:76,lead:66,solve:78,collab:82,stopGo:'STOP',readiness:'Belum dievaluasi',note:'Perlu penguatan pengalaman memimpin dan pemantapan kompetensi sebelum dipertimbangkan pada sesi berikutnya.'}
  };
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const select=$('#candidateSelect');if(!select)return;
  let stage='pra';
  const setText=(id,txt)=>{const e=$('#'+id);if(e)e.textContent=txt};
  const render=()=>{
    const c=candidates[select.value]||candidates.a;
    ['name','id','avatar','job','unit','level','tenure','target'].forEach(key=>setText('tc'+key[0].toUpperCase()+key.slice(1),c[key]));
    setText('tcPool','Pool: '+c.pool);
    ['competency','potential','performance'].forEach(key=>{const e=$('#tc'+key[0].toUpperCase()+key.slice(1));if(e)e.innerHTML=c[key]+'<span>%</span>'});
    [['lead','lead'],['solve','solve'],['collab','collab']].forEach(([key,id])=>{setText(id+'Val',c[key]+'%');const bar=$('#'+id+'Bar');if(bar)bar.style.width=c[key]+'%'});
    const isPra=stage==='pra';
    setText('stageOverline',isPra?'TAHAP 02 · PRA TALENT PANEL':'TAHAP 03 · TALENT PANEL');
    setText('stageTitle',isPra?'Hasil Evaluasi Stop / Go':'Hasil Evaluasi Readiness');
    setText('stageDesc',isPra?'Kesimpulan kalibrasi bersama setelah review kandidat.':'Kategori kesiapan untuk kandidat berstatus Go.');
    const result=isPra?c.stopGo:c.readiness;
    const status=$('#stageStatus');status.textContent=result;status.className='tc-state '+(result==='GO'?'go':result==='STOP'?'stop':result==='Ready Now'?'now':result==='Ready Soon'?'soon':'later');
    setText('decisionText',isPra?(c.stopGo==='GO'?'GO — dilanjutkan ke Talent Panel':'STOP — tidak dilanjutkan pada sesi ini'):(c.stopGo==='STOP'?'Belum masuk sesi Talent Panel':result));
    setText('approvalText',isPra?'Contoh: disetujui':(c.stopGo==='STOP'?'Tidak berlaku':'Contoh: hasil disetujui'));
    setText('tcNotes',c.note);
  };
  select.addEventListener('change',render);
  $$('.tp-tab').forEach(tab=>tab.addEventListener('click',()=>{stage=tab.dataset.stage;$$('.tp-tab').forEach(t=>{let on=t===tab;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on))});render()}));
  render();
})();
