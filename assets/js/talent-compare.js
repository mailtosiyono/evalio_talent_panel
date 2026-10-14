(()=>{
  'use strict';
  const candidates={
    a:{id:'A-001',name:'Kandidat A',initial:'KA',position:'Kepala Tim Operasional',unit:'Operasional',grade:'Level 4',tenure:'7 tahun',target:'Manajer Unit',pool:'Leadership',competency:78,potential:86,performance:81,lead:82,solve:75,collab:89,stopGo:'GO',readiness:'Ready Soon',note:'Potensi kepemimpinan dan kerja sama baik; pengambilan keputusan strategis masih perlu penguatan.'},
    b:{id:'B-002',name:'Kandidat B',initial:'KB',position:'Supervisor Layanan',unit:'Layanan Bisnis',grade:'Level 4',tenure:'9 tahun',target:'Manajer Layanan',pool:'Leadership',competency:88,potential:90,performance:92,lead:90,solve:85,collab:92,stopGo:'GO',readiness:'Ready Now',note:'Kinerja konsisten, kematangan kepemimpinan baik, dan kesiapan penugasan dinilai tinggi.'},
    c:{id:'C-003',name:'Kandidat C',initial:'KC',position:'Analis Senior',unit:'Pengembangan SDM',grade:'Level 3',tenure:'5 tahun',target:'Koordinator Tim',pool:'Specialist',competency:69,potential:74,performance:76,lead:66,solve:78,collab:82,stopGo:'STOP',readiness:'Belum dievaluasi',note:'Memerlukan penguatan pengalaman koordinasi dan pemantapan kompetensi sebelum sesi berikutnya.'},
    d:{id:'D-004',name:'Kandidat D',initial:'KD',position:'Supervisor Regional',unit:'Operasional Wilayah',grade:'Level 4',tenure:'8 tahun',target:'Manager Area',pool:'Leadership',competency:84,potential:81,performance:86,lead:79,solve:88,collab:83,stopGo:'GO',readiness:'Ready Later',note:'Kemampuan analisis baik. Penguatan pengelolaan tim lintas unit diperlukan untuk posisi target.'},
    e:{id:'E-005',name:'Kandidat E',initial:'KE',position:'Business Analyst',unit:'Strategy & Planning',grade:'Level 3',tenure:'6 tahun',target:'Lead Analyst',pool:'Specialist',competency:92,potential:87,performance:90,lead:78,solve:95,collab:86,stopGo:'GO',readiness:'Ready Soon',note:'Kemampuan teknis dan analitis unggul; perlu eksposur memimpin tim sebelum promosi.'}
  };
  const board=document.querySelector('#compareBoard');if(!board)return;
  const addBtn=document.querySelector('#addCompare');
  let shown=['a','b','d'];
  let stage='pra';
  const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const badge=(value)=>{const cls=value==='GO'||value==='Ready Now'?'cmp-ok':value==='STOP'?'cmp-warn':value==='Ready Soon'?'cmp-blue':value==='Ready Later'?'cmp-orange':'cmp-neutral';return `<span class="cmp-pill ${cls}">${esc(value)}</span>`};
  const metric=(label,value)=>`<div class="cmp-metric"><span>${label}</span><strong>${value}<small>%</small></strong></div>`;
  const score=(label,value)=>`<div class="cmp-score"><div><span>${label}</span><strong>${value}%</strong></div><div class="cmp-score-track"><span style="width:${value}%"></span></div></div>`;
  const info=(label,value)=>`<div class="cmp-attribute"><span>${label}</span><strong>${esc(value)}</strong></div>`;
  const candidateCard=(key,index)=>{
    const c=candidates[key];
    const opts=Object.entries(candidates).map(([v,d])=>`<option value="${v}" ${v===key?'selected':''} ${shown.includes(v)&&v!==key?'disabled':''}>${esc(d.name)} · ${esc(d.id)}</option>`).join('');
    const isPra=stage==='pra',decision=isPra?c.stopGo:c.readiness;
    return `<article class="card cmp-card" data-candidate="${key}">
       <div class="cmp-card-toolbar"><div class="cmp-slot-label"><span>0${index+1}</span> KANDIDAT DIBANDINGKAN</div><button type="button" class="cmp-remove" data-remove="${key}" aria-label="Hapus ${esc(c.name)} dari perbandingan" title="Hapus kandidat">&times;</button></div>
       <label for="candidate-${index}" class="cmp-select-label">Pilih / ganti kandidat</label><select class="cmp-select" id="candidate-${index}" data-compare-select="${key}" aria-label="Pilih kandidat kolom ${index+1}">${opts}</select>
       <div class="cmp-profile"><span class="cmp-avatar cmp-avatar-${index%3}">${esc(c.initial)}</span><div><h3>${esc(c.name)}</h3><p>${esc(c.position)}</p><small>${esc(c.id)} · ${esc(c.pool)}</small></div></div>
       <div class="cmp-attributes">${info('Unit kerja',c.unit)}${info('Grade / level',c.grade)}${info('Masa kerja',c.tenure)}${info('Target posisi',c.target)}</div>
       <div class="cmp-block cmp-assess"><div class="cmp-block-title">Hasil Assessment</div><div class="cmp-metrics">${metric('Kompetensi',c.competency)}${metric('Potensi',c.potential)}${metric('Kinerja',c.performance)}</div></div>
       <div class="cmp-block cmp-skills"><div class="cmp-block-title">Area Kompetensi</div>${score('Kepemimpinan',c.lead)}${score('Problem Solving',c.solve)}${score('Kolaborasi',c.collab)}</div>
       <div class="cmp-block cmp-verdict"><div class="cmp-block-title">Keputusan Panel <small>${isPra?'Pra Talent Panel':'Talent Panel'}</small></div>
         <div class="cmp-decision-line"><span>${isPra?'Stop / Go':'Readiness'}</span>${badge(decision)}</div>
         <div class="cmp-decision-line cmp-secondary"><span>${isPra?'Status tahap selanjutnya':'Pra Talent Panel'}</span><strong>${esc(isPra?(c.stopGo==='GO'?'Masuk Talent Panel':'Tidak dilanjutkan'):c.stopGo)}</strong></div>
       </div>
       <div class="cmp-block cmp-note"><div class="cmp-block-title">Catatan Evaluasi</div><p>${esc(c.note)}</p></div>
       </article>`;
  };
  function render(){
    board.style.setProperty('--cmp-cols',String(shown.length||1));
    board.innerHTML=shown.map(candidateCard).join('')||'<div class="cmp-empty">Belum ada kandidat. Klik Tambah kandidat untuk memulai perbandingan.</div>';
    document.querySelector('#compareCount').textContent=`${shown.length} Kandidat dibandingkan`;
    document.querySelector('#compareStageLabel').textContent=stage==='pra'?'Pra Talent Panel':'Talent Panel';
    addBtn.disabled=shown.length===3;
    addBtn.title=shown.length===3?'Maksimal tiga kandidat dalam satu tampilan':'Tambahkan kandidat untuk dibandingkan';
    // A newly added selection excludes other currently selected candidates.
  }
  board.addEventListener('change',ev=>{
    const el=ev.target.closest('[data-compare-select]');if(!el)return;
    const old=el.dataset.compareSelect;const v=el.value;
    if(!candidates[v]||(shown.includes(v)&&old!==v))return;
    shown=shown.map(x=>x===old?v:x);render();
  });
  board.addEventListener('click',ev=>{
    const b=ev.target.closest('[data-remove]');if(!b)return;
    shown=shown.filter(x=>x!==b.dataset.remove);render();
  });
  addBtn.addEventListener('click',()=>{
    if(shown.length>=3)return;
    const first=Object.keys(candidates).find(k=>!shown.includes(k));
    if(first){shown.push(first);render()}
  });
  document.querySelectorAll('.tp-tab').forEach(btn=>btn.addEventListener('click',()=>{
    stage=btn.dataset.stage;
    document.querySelectorAll('.tp-tab').forEach(x=>{
      const selected=x===btn;x.classList.toggle('active',selected);x.setAttribute('aria-selected',String(selected));
    });render();
  }));
  render();
})();
