/* About Aneel Aranha page for the GoodBarber app.
 * Loaded by a Custom Code section with:
 *   <div id="aa-about"></div>
 *   <script src="https://aneelaranha.github.io/just-saying/about/about.js"></script>
 * data-links="web" switches links to plain new-tab links (for testing in a browser).
 * Edit the text here and push; the app picks it up without touching GoodBarber.
 */
(function () {
  var BASE = 'https://aneelaranha.github.io/just-saying/about/';
  var root = document.getElementById('aa-about');
  if (!root) return;
  var web = root.getAttribute('data-links') === 'web';

  // Outside links leave the app so WhatsApp, Instagram and YouTube open in their own apps.
  function ext(url) {
    return web ? url + '" target="_blank" rel="noopener' : 'goodbarber://openExternal?url=' + encodeURIComponent(url);
  }

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Lato:wght@400;700&display=swap';
  document.head.appendChild(font);

  var css = [
    'html,body{background:#1A1012 !important}',
    '#aa-about{--ground:#1A1012;--text:#F5EEE6;--text2:#DDD2C6;--gold:#D9A26B;--rule:rgba(217,162,107,.45);--faint:rgba(217,162,107,.2);',
    'background:var(--ground);color:var(--text);font-family:Lato,-apple-system,"Helvetica Neue",Arial,sans-serif;min-height:100vh;padding:28px 28px 44px;box-sizing:border-box;-webkit-text-size-adjust:100%}',
    '#aa-about *{box-sizing:border-box}',
    '#aa-about a{color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}',
    '#aa-about .wrap{max-width:520px;margin:0 auto}',
    '#aa-about .logo{height:46px;width:auto;display:block}',
    '#aa-about .portrait{width:156px;height:156px;margin:28px auto 0;padding:5px;border:1px solid var(--gold);border-radius:50%}',
    '#aa-about .portrait img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}',
    '#aa-about h1{font-family:"Playfair Display",Georgia,serif;font-weight:600;font-size:32px;letter-spacing:.03em;text-align:center;margin:22px 0 6px}',
    '#aa-about .tag{text-align:center;color:var(--text2);font-size:12px;letter-spacing:.24em;text-transform:uppercase}',
    '#aa-about .rule{height:1px;background:var(--rule);margin:28px 0}',
    '#aa-about .bio p{font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:18px;line-height:1.5;margin:0 0 16px;color:var(--text)}',
    '#aa-about .bio p:last-child{margin-bottom:0}',
    '#aa-about .bio cite{font-style:normal;color:var(--gold)}',
    '#aa-about .label{font-weight:700;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}',
    '#aa-about .wa{display:flex;align-items:center;gap:14px;margin-top:10px;padding:14px 16px;border:1px solid var(--rule);border-radius:12px}',
    '#aa-about .wa svg{width:28px;height:28px;flex:none;color:var(--gold)}',
    '#aa-about .wa .num{font-size:18px;letter-spacing:.02em}',
    '#aa-about .wa .hint{font-size:13px;color:var(--text2);margin-top:2px}',
    '#aa-about .rows{margin-top:22px}',
    '#aa-about .row{display:flex;align-items:center;min-height:46px;border-top:1px solid var(--faint)}',
    '#aa-about .row:first-child{border-top:0}',
    '#aa-about .row .label{width:110px;flex:none}',
    '#aa-about .row .val{font-size:16px;color:var(--text)}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var WA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.6c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.1.6 0l.6-.5c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .6-.6.9-.6.3-1.6.4-2.9-.1-2.3-.9-4.2-2.8-5.1-5.1-.5-1.3-.4-2.3-.1-2.9z"/></svg>';

  root.innerHTML =
    '<div class="wrap">' +
      '<img class="logo" src="' + BASE + 'logo-mark-gold.png" alt="House of Prayer logo">' +
      '<div class="portrait"><img src="' + BASE + 'portrait.jpg" alt="Portrait of Aneel Aranha"></div>' +
      '<h1>Aneel Aranha</h1>' +
      '<div class="tag">Preacher. Author. Songwriter.</div>' +
      '<div class="rule"></div>' +
      '<div class="bio">' +
        '<p>Aneel Aranha is an evangelist, preacher, author, and songwriter whose work reaches audiences worldwide through live events, digital platforms, and music.</p>' +
        '<p>He has published over a dozen books, including <cite>God Sees</cite>, <cite>Why Jesus Came to Die</cite>, and <cite>Praying the Scriptures</cite>, and is the architect of the School of Discipleship, active in over 200 communities across 14 countries.</p>' +
        '<p>His song “Blessed” has carried his message of grace to millions of viewers online, reaching far beyond the pulpit.</p>' +
      '</div>' +
      '<div class="rule"></div>' +
      '<div class="label">WhatsApp</div>' +
      '<a class="wa" href="' + ext('https://wa.me/971506258365') + '">' + WA +
        '<div><div class="num">+971 50 625 8365</div><div class="hint">Tap to send Aneel a message</div></div></a>' +
      '<div class="rows">' +
        '<a class="row" href="' + ext('https://www.aneelaranha.com') + '"><span class="label">Website</span><span class="val">www.aneelaranha.com</span></a>' +
        '<a class="row" href="' + ext('https://www.instagram.com/aneel.aranha/') + '"><span class="label">Instagram</span><span class="val">@aneel.aranha</span></a>' +
        '<a class="row" href="' + ext('https://www.youtube.com/@AneelAranhaOnLine') + '"><span class="label">YouTube</span><span class="val">@AneelAranhaOnLine</span></a>' +
      '</div>' +
    '</div>';
})();
