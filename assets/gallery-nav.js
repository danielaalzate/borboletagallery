(() => {
  const nav = document.querySelector('.nav, .site-nav');
  if (!nav || nav.dataset.menuReady === 'true') return;

  const brand = nav.querySelector('.brand');
  const homeHref = brand?.getAttribute('href') || 'index.html';
  const isSectionNav = nav.classList.contains('site-nav');
  const links = nav.querySelector('.nav-links');
  const items = [
    ['Inicio', homeHref],
    ['La galería', `${homeHref}#galeria`],
    ['Obras disponibles', homeHref.replace(/#.*$/, '').replace(/index\.html$/, 'obras-disponibles.html')],
    ['Artistas', `${homeHref}#artistas`],
    ['Agenda una visita', `${homeHref}#visita`]
  ];

  const panel = links || document.createElement('div');
  if (!links) {
    panel.className = 'mobile-nav-links';
    items.forEach(([label, href]) => {
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = label;
      panel.append(anchor);
    });
    nav.append(panel);
  } else if (!links.querySelector('[data-home-link]')) {
    const home = document.createElement('a');
    home.href = homeHref;
    home.textContent = 'Inicio';
    home.dataset.homeLink = 'true';
    links.prepend(home);
  }

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  nav.append(toggle);
  nav.dataset.menuReady = 'true';

  const style = document.createElement('style');
  style.textContent = `
    .menu-toggle{display:none;align-items:center;justify-content:center;flex-direction:column;gap:4px;width:42px;height:42px;padding:8px;border:1px solid var(--ink);background:#fff;color:var(--ink);cursor:pointer}
    .menu-toggle span{display:block;width:18px;height:1px;background:currentColor;transition:transform .2s,opacity .2s}
    .menu-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(5px) rotate(45deg)}
    .menu-toggle[aria-expanded="true"] span:nth-child(2){opacity:0}
    .menu-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}
    .mobile-nav-links{display:none}
    @media(max-width:720px){
      .nav,.site-nav{position:relative}
      .menu-toggle{display:inline-flex;flex:0 0 auto}
      .nav-links.is-open,.mobile-nav-links.is-open{display:flex;position:absolute;top:100%;left:0;right:0;z-index:40;flex-direction:column;gap:0;padding:10px 20px 16px;background:#fff;color:var(--ink);border:1px solid var(--ink);box-shadow:0 10px 20px rgba(0,0,0,.14)}
      .nav-links.is-open a,.mobile-nav-links.is-open a{padding:12px 0;border-bottom:1px solid var(--line);font-size:14px}
      .nav-links.is-open a:last-child,.mobile-nav-links.is-open a:last-child{border-bottom:0}
      .site-nav .nav-actions{margin-left:auto;margin-right:10px}
    }
  `;
  document.head.append(style);

  const close = () => {
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  panel.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', close));
})();
