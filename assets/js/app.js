(()=>{
  'use strict';
  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const searchIndex=[
    ['index.html','End-to-End Process','Flowchart keseluruhan, empat tahap, lima role dan sistem Evalio'],
    ['penilaian-awal.html','Import Data Kandidat & Pembuatan Bucket','Impor kandidat, bucket, assign pekerja, jadwal, Talent Card'],
    ['pra-talent-panel.html','Pra Talent Panel','Stop Go, review kandidat, checklist, kalibrasi dan keputusan'],
    ['talent-panel.html','Talent Panel','Ready Now, Ready Soon, Ready Later, Berita Acara'],
    ['approval.html','Approval & Revisi','Maker Checker Signer, persetujuan, revisi pemutus'],
    ['output-integrasi.html','Integrasi dengan Corpu','To Be Discussed, data hasil, format, akses Corpu dan dashboard'],
    ['user-roles.html','User Roles','Admin HC, sekretaris moderator, panelis, approver dan Corpu'],
    ['talent-panel-card.html','Talent Panel Card','Preview kartu kandidat, profil, assessment, Stop Go dan readiness']
  ];  const menu=$('[data-menu-button]'),side=$('.sidebar'),mask=$('.sidebar-mask');
  const setMenu=opened=>{if(!side)return;side.classList.toggle('is-open',opened);mask?.classList.toggle('is-open',opened);menu?.setAttribute('aria-expanded',String(opened));};
  menu?.addEventListener('click',()=>setMenu(!side.classList.contains('is-open')));
  mask?.addEventListener('click',()=>setMenu(false));
  const searchModal=$('#searchModal'),searchInput=$('#searchInput'),searchResults=$('#searchResults');
  const renderSearch=()=>{
    if(!searchResults)return;
    const q=(searchInput?.value||'').toLocaleLowerCase('id').trim();
    const items=searchIndex.filter(i=>i.join(' ').toLocaleLowerCase('id').includes(q));
    searchResults.innerHTML=items.length?items.map(([url,title,desc])=>`<a href="${url}" class="search-result"><svg class="icon"><use href="#i-file"></use></svg><span><b>${title}</b><small>${desc}</small></span><svg class="icon sm" style="margin-left:auto"><use href="#i-arrow-right"></use></svg></a>`).join(''):'<div class="empty-state">Tidak ditemukan halaman yang sesuai.</div>';
  };
  const openSearch=()=>{if(!searchModal)return;searchModal.classList.add('open');searchModal.setAttribute('aria-hidden','false');renderSearch();setTimeout(()=>searchInput?.focus(),0)};
  const closeSearch=()=>{searchModal?.classList.remove('open');searchModal?.setAttribute('aria-hidden','true')};
  $$('[data-open-search]').forEach(btn=>btn.addEventListener('click',openSearch));
  $('[data-close-search]')?.addEventListener('click',closeSearch);
  searchInput?.addEventListener('input',renderSearch);
  searchModal?.addEventListener('click',e=>{if(e.target===searchModal)closeSearch();});
  // Diagram viewers: custom zoom and drag-to-pan; the original image is not recreated or altered.
  const attachViewer=(root)=>{
    if(!root||root.dataset.viewerInitialized)return;
    root.dataset.viewerInitialized='true';
    const img=$('[data-diagram-img]',root),viewport=$('[data-diagram-viewport]',root),label=$('[data-zoom-label]',root);
    if(!img||!viewport)return;
    const base=Number(img.dataset.baseWidth||img.naturalWidth||1450);
    // Keep the original swimlane labels visible in *every* diagram viewer.
    // Stage 01 already has those labels in its crop (overlay mode). Stages 02–04
    // start below them; add the matching labels as a non-overlapping strip.
    // Both layers scroll horizontally and scale from the SAME source width.
    const imageFile = new URL(img.getAttribute('src'),location.href).pathname.split('/').pop();
    const fullDiagram = imageFile === 'talent-panel-full.png';
    const stageDiagram = ['penilaian-awal.png','pra-talent-panel.png','talent-panel.png','hasil-integrasi.png'].includes(imageFile);
    const pinnedIsOverlay = fullDiagram || imageFile === 'penilaian-awal.png';
    const sourceWidth = fullDiagram ? 2048 : 1975;
    const sourceHeaderHeight = fullDiagram ? 165 : 60;
    let pinned = null, pinnedImg = null;
    if (fullDiagram || stageDiagram) {
      pinned = document.createElement('div');
      pinned.className = 'diagram-sticky-role-head';
      pinned.setAttribute('aria-hidden','true');
      pinnedImg = document.createElement('img');
      pinnedImg.alt = '';
      pinnedImg.draggable = false;
      pinnedImg.src = fullDiagram
        ? 'assets/img/talent-panel-sticky-header.png'
        : 'assets/img/flowchart-stage-role-headers.png';
      pinned.appendChild(pinnedImg);
      viewport.insertBefore(pinned,img);
    }
    const syncPinnedHeader = (width) => {
      if (!pinned) return;
      const height = width * sourceHeaderHeight / sourceWidth;
      pinned.style.width = `${width}px`;
      pinned.style.height = `${height}px`;
      // Overlay only when the image already contains the labels.
      pinned.style.marginBottom = pinnedIsOverlay ? `-${height}px` : '0px';
      pinnedImg.style.width = `${width}px`;
      pinnedImg.style.height = `${height}px`;
    };
    let zoom=1;
    const setZoom=(z)=>{const oldW=img.getBoundingClientRect().width,ratioX=(viewport.scrollLeft+viewport.clientWidth/2)/Math.max(oldW,1),ratioY=(viewport.scrollTop+viewport.clientHeight/2)/Math.max(img.getBoundingClientRect().height,1);zoom=Math.min(2.5,Math.max(.5,Math.round(z*10)/10));img.style.width=`${base*zoom}px`;syncPinnedHeader(base*zoom);label&&(label.textContent=`${Math.round(zoom*100)}%`);requestAnimationFrame(()=>{viewport.scrollLeft=img.getBoundingClientRect().width*ratioX-viewport.clientWidth/2;viewport.scrollTop=img.getBoundingClientRect().height*ratioY-viewport.clientHeight/2;});};
    img.style.width=base+'px';syncPinnedHeader(base);
    $$('[data-zoom-in]',root).forEach(b=>b.addEventListener('click',()=>setZoom(zoom+.2)));
    $$('[data-zoom-out]',root).forEach(b=>b.addEventListener('click',()=>setZoom(zoom-.2)));
    $$('[data-zoom-reset]',root).forEach(b=>b.addEventListener('click',()=>{setZoom(1);viewport.scrollLeft=0;viewport.scrollTop=0;}));
    let start=null;
    viewport.addEventListener('pointerdown',e=>{if(e.button!==0||e.pointerType==='touch')return;start={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.classList.add('dragging');viewport.setPointerCapture(e.pointerId);});
    viewport.addEventListener('pointermove',e=>{if(!start)return;viewport.scrollLeft=start.left-(e.clientX-start.x);viewport.scrollTop=start.top-(e.clientY-start.y);});
    const stop=()=>{start=null;viewport.classList.remove('dragging')};
    viewport.addEventListener('pointerup',stop);viewport.addEventListener('pointercancel',stop);viewport.addEventListener('lostpointercapture',stop);
    viewport.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();setZoom(zoom+(e.deltaY>0?-.1:.1))}},{passive:false});
  };
  $$('[data-viewer]').forEach(attachViewer);
  const diagramModal=$('#diagramModal'),modalTitle=$('#modalDiagramTitle'),modalViewer=$('#modalViewer');
  const openDiagram=(btn)=>{
    if(!diagramModal||!modalViewer)return;
    const source=btn.dataset.diagramSource;
    const title=btn.dataset.diagramTitle||'Flowchart Talent Panel';
    const base=Number(btn.dataset.diagramWidth||1770);
    modalTitle.textContent=title;
    modalViewer.innerHTML=`<div class="diagram-viewport" data-diagram-viewport><img class="diagram-image" data-diagram-img data-base-width="${base}" src="${source}" alt="${title}" draggable="false"></div>`;
    // Controls are in the modal parent; attach viewer to the modal after inserting image.
    diagramModal.classList.add('open');diagramModal.setAttribute('aria-hidden','false');
    attachViewer(diagramModal);
    $('[data-close-diagram]')?.focus();
    document.body.style.overflow='hidden';
  };
  const closeDiagram=()=>{diagramModal?.classList.remove('open');diagramModal?.setAttribute('aria-hidden','true');document.body.style.overflow='';diagramModal?.removeAttribute('data-viewer-initialized');};
  $$('[data-open-diagram]').forEach(b=>b.addEventListener('click',()=>openDiagram(b)));
  $('[data-close-diagram]')?.addEventListener('click',closeDiagram);
  diagramModal?.addEventListener('click',e=>{if(e.target===diagramModal)closeDiagram()});
  $$('[data-print]').forEach(btn=>btn.addEventListener('click',()=>window.print()));
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
    if(e.key==='Escape'){closeSearch();closeDiagram();setMenu(false)}
    if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();openSearch()}
  });
})();
