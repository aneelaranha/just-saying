/* Aneel Aranha books for the GoodBarber app.
 * Loaded by a Custom Code section/widget with:
 *   <div id="aa-books" data-mode="full|strip" data-section="SECTION_ID"></div>
 *   <script src="https://aneelaranha.github.io/just-saying/books/books.js"></script>
 * Book data comes from books.json (built from aneelaranha.com by build_books.py).
 * data-links="web" switches links to plain new-tab links (for testing in a browser).
 */
(function () {
  var BASE = 'https://aneelaranha.github.io/just-saying/books/';
  var root = document.getElementById('aa-books');
  if (!root) return;
  var mode = root.getAttribute('data-mode') || 'full';
  var web = root.getAttribute('data-links') === 'web';
  var section = root.getAttribute('data-section');
  var KEY = 'aa-open-book';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // Store links leave the app so Amazon (or the browser for Pothi) opens properly.
  function ext(url) {
    return web ? esc(url) + '" target="_blank" rel="noopener'
               : 'goodbarber://openExternal?url=' + encodeURIComponent(url);
  }
  function cover(b) { return BASE + 'covers/' + b.id + '.jpg'; }

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap';
  document.head.appendChild(font);

  var css = [
    '#aa-books{--gold:#a58b57;--ink:#222;--muted:#888;--line:#ece7dc;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:var(--ink);-webkit-text-size-adjust:100%}',
    '#aa-books *{box-sizing:border-box}',
    '#aa-books a{color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}',
    '#aa-books .serif{font-family:"Playfair Display",Georgia,serif}',
    '#aa-books .cv{width:100%;aspect-ratio:2/3;object-fit:cover;display:block;border-radius:4px;background:#f3efe7;box-shadow:0 3px 10px rgba(0,0,0,.18)}',
    /* shelf (full page) */
    '#aa-books .intro{padding:18px 16px 4px;color:var(--muted);font-size:14px;text-align:center}',
    '#aa-books .shelf{display:grid;grid-template-columns:repeat(2,1fr);gap:22px 16px;padding:16px}',
    '@media (min-width:600px){#aa-books .shelf{grid-template-columns:repeat(3,1fr)}}',
    '#aa-books .shelf .t{font-family:"Playfair Display",Georgia,serif;font-size:16px;line-height:1.25;margin-top:10px}',
    '#aa-books .shelf .s{font-size:12.5px;color:var(--muted);line-height:1.3;margin-top:3px}',
    /* detail */
    '#aa-books .back{display:inline-flex;align-items:center;gap:4px;color:var(--gold);font-weight:600;font-size:15px;padding:14px 16px 0}',
    '#aa-books .back svg{width:18px;height:18px}',
    '#aa-books .detail{padding:8px 20px 32px;max-width:560px;margin:0 auto}',
    '#aa-books .detail .cv{width:56%;max-width:240px;margin:14px auto 0;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.22)}',
    '#aa-books h2{font-size:28px;font-weight:600;line-height:1.2;text-align:center;margin:22px 0 4px}',
    '#aa-books .sub{text-align:center;color:#555;font-size:15px;line-height:1.35}',
    '#aa-books .hook{font-family:"Playfair Display",Georgia,serif;font-style:italic;font-size:18px;line-height:1.45;text-align:center;margin:18px 0 0;color:#333}',
    '#aa-books .get{margin:22px 0 4px;text-align:center;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700}',
    '#aa-books .stores{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px}',
    '#aa-books .buy{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:96px;flex:1 1 96px;max-width:160px;min-height:54px;border-radius:12px;padding:6px 8px;color:#fff !important;font-weight:600;font-size:14px;line-height:1.2}',
    '#aa-books .buy small{font-weight:400;font-size:11px;opacity:.85}',
    '#aa-books .amazon{background:#232f3e}#aa-books .pothi{background:#a58b57}',
    '#aa-books .body{margin-top:26px;border-top:1px solid var(--line);padding-top:20px}',
    '#aa-books .body p{font-size:16px;line-height:1.6;margin:0 0 14px;color:#333}',
    '#aa-books .web{display:block;text-align:center;color:var(--gold);font-weight:600;font-size:14px;margin-top:8px}',
    /* home strip */
    '#aa-books.strip{height:100%;display:flex;flex-direction:column}',
    '#aa-books .sh{display:flex;justify-content:space-between;align-items:center;padding:0 12px;height:48px;flex:none}',
    '#aa-books .sh .t{font-size:24px;color:#333}',
    '#aa-books .sh .s{font-size:14px;font-weight:600;color:var(--gold)}',
    '#aa-books .row{display:flex;gap:12px;overflow-x:auto;padding:2px 12px 10px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:none}',
    '#aa-books .row::-webkit-scrollbar{display:none}',
    '#aa-books .row a{flex:none;width:100px;scroll-snap-align:start}',
    '#aa-books .row span{display:block;font-size:11.5px;line-height:1.25;margin-top:7px;text-align:center;color:#333;height:2.5em;overflow:hidden}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';

  fetch(BASE + 'books.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (books) { mode === 'strip' ? strip(books) : full(books); })
    .catch(function () { root.innerHTML = '<p style="padding:20px;text-align:center;color:#888">Couldn’t load the books. Please check your connection.</p>'; });

  function strip(books) {
    root.className = 'strip';
    var link = web ? 'index.html' : (section ? 'goodbarber://#!section=' + section : '#');
    root.innerHTML =
      '<a class="sh" href="' + link + '"><span class="t serif">Books</span><span class="s">See all ›</span></a>' +
      '<div class="row">' + books.map(function (b) {
        return '<a href="' + (web ? 'index.html#' + b.id : link) + '" data-id="' + b.id + '"><img class="cv" src="' + cover(b) + '" alt="" loading="lazy"><span>' + esc(b.title) + '</span></a>';
      }).join('') + '</div>';
    // Remember which book was tapped so the Books section can open straight to it.
    root.querySelectorAll('.row a').forEach(function (a) {
      a.addEventListener('click', function () { try { localStorage.setItem(KEY, a.getAttribute('data-id') + '|' + Date.now()); } catch (e) {} });
    });
  }

  function full(books) {
    var byId = {};
    books.forEach(function (b) { byId[b.id] = b; });

    function shelf() {
      root.innerHTML =
        '<div class="intro">' + books.length + ' books by Aneel Aranha · tap a cover for details</div>' +
        '<div class="shelf">' + books.map(function (b) {
          return '<a href="#' + b.id + '"><img class="cv" src="' + cover(b) + '" alt="' + esc(b.title) + ' cover"><div class="t">' + esc(b.title) + '</div>' +
            (b.subtitle ? '<div class="s">' + esc(b.subtitle) + '</div>' : '') + '</a>';
        }).join('') + '</div>';
    }

    function detail(b) {
      var amazon = b.buy.filter(function (x) { return x.store === 'amazon'; });
      var pothi = b.buy.filter(function (x) { return x.store === 'pothi'; });
      root.innerHTML =
        '<a class="back" href="#">' + BACK + 'All books</a>' +
        '<div class="detail">' +
          '<img class="cv" src="' + cover(b) + '" alt="' + esc(b.title) + ' cover">' +
          '<h2 class="serif">' + esc(b.title) + '</h2>' +
          (b.subtitle ? '<div class="sub">' + esc(b.subtitle) + '</div>' : '') +
          (b.hook ? '<p class="hook">' + esc(b.hook) + '</p>' : '') +
          '<div class="get">Get your copy</div>' +
          '<div class="stores">' +
            amazon.map(function (x) { return '<a class="buy amazon" href="' + ext(x.url) + '">' + esc(x.label) + '<small>Amazon</small></a>'; }).join('') +
            pothi.map(function (x) { return '<a class="buy pothi" href="' + ext(x.url) + '">Pothi<small>India</small></a>'; }).join('') +
          '</div>' +
          '<div class="body">' + b.body.map(function (p) { return '<p>' + esc(p.text) + '</p>'; }).join('') + '</div>' +
        '</div>';
      window.scrollTo(0, 0);
    }

    function route() {
      var id = decodeURIComponent(location.hash.slice(1));
      if (byId[id]) detail(byId[id]); else shelf();
    }
    window.addEventListener('hashchange', function () { route(); if (!location.hash) window.scrollTo(0, 0); });

    // Opened from the home strip? Go straight to that book (only if tapped in the last minute).
    try {
      var v = (localStorage.getItem(KEY) || '').split('|');
      localStorage.removeItem(KEY);
      if (v[0] && byId[v[0]] && Date.now() - (+v[1] || 0) < 60000 && !location.hash) { location.hash = v[0]; return; }
    } catch (e) {}
    route();
  }
})();
