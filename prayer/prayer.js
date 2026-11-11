/* Prayer Requests section for the Aneel Aranha app (Stage 1).
 * Loaded by a GoodBarber Custom Code section with:
 *   <div id="aa-prayer"></div>
 *   <script src="https://aneelaranha.github.io/just-saying/prayer/prayer.js"></script>
 * data-links="web" switches links to plain new-tab links (for testing in a browser).
 */
(function () {
  var root = document.getElementById('aa-prayer');
  if (!root) return;
  var API = (root.getAttribute('data-api') || 'https://prayer-api.prayer-api.workers.dev').replace(/\/$/, '');
  var web = root.getAttribute('data-links') === 'web';
  // data-mode="home": the same form, compact, for a Home page widget (the reply scrolls inside the widget).
  // data-separator="top": draws a GoodBarber-style separator above it.
  var home = root.getAttribute('data-mode') === 'home';
  var sepTop = root.getAttribute('data-separator') === 'top' ? '<div class="sep"><i></i></div>' : '';
  if (home) root.className = 'home';

  var HOP = {
    zoom: 'https://aanet.click/wedhope',
    meetingId: '850 3864 0207',
    passcode: '933722',
    whatsapp: 'https://aanet.click/hopgroup',
    utcHour: 15, utcMin: 30, minutes: 60 // Wednesdays 7:30 pm Dubai
  };
  var CATEGORIES = ['Healing', 'Family', 'Finances & work', 'Guidance', 'Salvation of a loved one',
    'Grief & loss', 'Spiritual growth', 'Thanksgiving', 'Other'];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // Outside links leave the app so Zoom, WhatsApp and Calendar open in their own apps.
  function ext(url) {
    return web ? esc(url) + '" target="_blank" rel="noopener'
               : 'goodbarber://openExternal?url=' + encodeURIComponent(url);
  }

  /* ---------- styles ---------- */
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap';
  document.head.appendChild(font);
  var css = [
    '#aa-prayer{--gold:#a58b57;--gold-soft:#f6f1e7;--ink:#222;--muted:#808080;--line:#ece7dc;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:var(--ink);-webkit-text-size-adjust:100%;max-width:620px;margin:0 auto;padding:0 16px 32px}',
    '#aa-prayer *{box-sizing:border-box}',
    '#aa-prayer a{color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}',
    '#aa-prayer .serif{font-family:"Playfair Display",Georgia,serif}',
    '#aa-prayer h1{font:600 28px/1.2 "Playfair Display",Georgia,serif;text-align:center;margin:24px 0 8px}',
    '#aa-prayer .lead{text-align:center;font-size:16px;line-height:1.5;color:#444;margin:0 auto 20px;max-width:460px}',
    '#aa-prayer label{display:block;font-size:13px;font-weight:600;color:#555;margin:16px 0 6px;letter-spacing:.02em}',
    '#aa-prayer .opt{font-weight:400;color:var(--muted)}',
    '#aa-prayer input,#aa-prayer textarea{width:100%;font:16px/1.4 inherit;font-family:inherit;padding:12px;border:1px solid #ddd;border-radius:10px;background:#fff;color:var(--ink);-webkit-appearance:none}',
    '#aa-prayer textarea{min-height:150px;resize:vertical}',
    '#aa-prayer input:focus,#aa-prayer textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(165,139,87,.15)}',
    '#aa-prayer .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '#aa-prayer .chips{display:flex;flex-wrap:wrap;gap:8px}',
    '#aa-prayer .chip{border:1px solid var(--line);background:#fff;border-radius:20px;padding:8px 13px;font-size:14px;color:#444;cursor:pointer}',
    '#aa-prayer .chip.on{background:var(--gold);border-color:var(--gold);color:#fff}',
    '#aa-prayer .hp{position:absolute;left:-9999px;height:0;overflow:hidden}',
    '#aa-prayer .btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:50px;border:0;border-radius:12px;background:var(--gold);color:#fff !important;font:600 16px inherit;font-family:inherit;cursor:pointer;margin-top:20px}',
    '#aa-prayer .btn[disabled]{opacity:.6}',
    '#aa-prayer .btn.ghost{background:#fff;color:var(--gold) !important;border:1px solid var(--gold)}',
    '#aa-prayer .btn svg{width:20px;height:20px}',
    '#aa-prayer .note{font-size:12.5px;line-height:1.45;color:var(--muted);text-align:center;margin:14px 0 0}',
    '#aa-prayer .err{color:#b03a2e;font-size:14px;text-align:center;margin-top:12px}',
    /* waiting */
    '#aa-prayer .wait{text-align:center;padding:70px 10px}',
    '#aa-prayer .dove{width:56px;height:56px;margin:0 auto 18px;border-radius:50%;border:3px solid var(--gold-soft);border-top-color:var(--gold);animation:aap-spin 1.1s linear infinite}',
    '@keyframes aap-spin{to{transform:rotate(360deg)}}',
    '#aa-prayer .wait p{font:400 19px/1.4 "Playfair Display",Georgia,serif;margin:0}',
    '#aa-prayer .wait small{display:block;color:var(--muted);margin-top:8px;font-size:14px}',
    /* reply */
    '#aa-prayer .help{background:#fdecea;border:1px solid #f1b0a8;color:#7a2318;border-radius:12px;padding:14px 16px;font-size:15px;line-height:1.5;margin:20px 0 4px}',
    '#aa-prayer .help b{display:block;margin-bottom:4px}',
    '#aa-prayer .opening{font:400 20px/1.45 "Playfair Display",Georgia,serif;text-align:center;margin:24px 0 18px}',
    '#aa-prayer h3{font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin:26px 0 10px;text-align:center}',
    '#aa-prayer .verse{background:var(--gold-soft);border-radius:12px;padding:14px 16px;margin:10px 0}',
    '#aa-prayer .verse q{display:block;font:italic 400 17px/1.5 "Playfair Display",Georgia,serif;quotes:none}',
    '#aa-prayer .verse cite{display:block;font-style:normal;font-weight:600;font-size:14px;color:var(--gold);margin-top:6px}',
    '#aa-prayer .verse .why{font-size:14px;color:#555;margin-top:4px;line-height:1.4}',
    '#aa-prayer .body{font-size:16px;line-height:1.6;color:#333;margin:0}',
    '#aa-prayer .prayer{font:italic 400 17px/1.6 "Playfair Display",Georgia,serif;color:#333;border-left:3px solid var(--gold);padding:2px 0 2px 14px;margin:0}',
    '#aa-prayer .trans{font-size:11.5px;color:var(--muted);text-align:center;margin-top:8px}',
    /* invite */
    '#aa-prayer .invite{margin:30px 0 0;border-radius:16px;background:#1c1b19;color:#f3ede1;padding:22px 18px;text-align:center}',
    '#aa-prayer .invite .k{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#c9b07a}',
    '#aa-prayer .invite h2{font:600 24px/1.25 "Playfair Display",Georgia,serif;margin:6px 0 8px;color:#fff}',
    '#aa-prayer .invite p{font-size:15px;line-height:1.5;margin:0 auto;max-width:420px;color:#ddd5c4}',
    '#aa-prayer .invite .when{font-size:17px;color:#fff;margin:14px 0 2px;font-weight:600}',
    '#aa-prayer .invite .dubai{font-size:13px;color:#a9a090}',
    '#aa-prayer .invite .live{display:inline-block;background:#c0392b;color:#fff;border-radius:20px;padding:3px 10px;font-size:12px;font-weight:700;letter-spacing:.06em;margin-bottom:6px}',
    '#aa-prayer .invite .btn{background:#c9b07a;color:#1c1b19 !important;margin-top:16px}',
    '#aa-prayer .invite .row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}',
    '#aa-prayer .invite .row .btn{margin-top:0;background:transparent;border:1px solid #6b604b;color:#f3ede1 !important;font-size:14px;min-height:46px}',
    '#aa-prayer .invite .ids{display:flex;justify-content:center;gap:18px;margin-top:14px;font-size:13px;color:#a9a090}',
    '#aa-prayer .invite .ids b{color:#f3ede1;font-weight:600;letter-spacing:.03em}',
    '#aa-prayer .wa{display:flex;align-items:center;gap:12px;margin-top:12px;border-radius:14px;background:#e9f8ef;padding:14px 16px;text-align:left}',
    '#aa-prayer .wa svg{width:30px;height:30px;flex:none;color:#1fa855}',
    '#aa-prayer .wa b{display:block;font-size:15px;color:#145c32}',
    '#aa-prayer .wa span{font-size:13px;color:#3d6b51}',
    '#aa-prayer .again{display:block;text-align:center;color:var(--gold);font-weight:600;margin-top:22px;font-size:15px}',
    /* 1px #ddd line like GoodBarber's Separator widget, spaced to match the 24px gaps around the other Home separators */
    '#aa-prayer .sep{padding:12px 0 18px;margin:0 -16px}#aa-prayer .sep i{display:block;width:100%;border-top:1px solid #ddd}',
    /* home widget */
    '#aa-prayer.home{padding-bottom:16px}',
    '#aa-prayer.home h1{font-size:24px;margin:4px 0 6px}',
    '#aa-prayer.home .lead{font-size:14.5px;margin-bottom:4px}',
    '#aa-prayer.home label{margin-top:12px}',
    '#aa-prayer.home textarea{min-height:110px}',
    '#aa-prayer.home .btn{margin-top:16px}',
    '#aa-prayer.home .invite{margin-top:20px;padding:18px 14px}',
    '#aa-prayer.home .invite h2{font-size:21px;margin:4px 0 2px}',
    '#aa-prayer.home .invite .when{margin-top:8px}',
    '#aa-prayer.home .wait{padding:40px 10px}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ICON = {
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1-.5-2.3-1.8-2.8-2.8l.9-1-1-2z" fill="currentColor" stroke="none"/></svg>'
  };

  /* ---------- Wednesday session time ---------- */
  // Current session if it is running now, else the next one.
  function sessionInfo() {
    var now = new Date();
    var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), HOP.utcHour, HOP.utcMin));
    d.setUTCDate(d.getUTCDate() + ((3 - d.getUTCDay() + 7) % 7));
    var end = new Date(d.getTime() + HOP.minutes * 60000);
    if (end <= now) { d.setUTCDate(d.getUTCDate() + 7); end = new Date(d.getTime() + HOP.minutes * 60000); }
    return { start: d, end: end, live: d <= now && now < end };
  }
  function dayWord(d) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var that = new Date(d); that.setHours(0, 0, 0, 0);
    var diff = Math.round((that - today) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }
  function localTime(d) { return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }); }
  function gcal(s) {
    var f = function (d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
    var details = 'Join Aneel Aranha and intercessors from around the world in prayer.\n\nZoom: ' + HOP.zoom +
      '\nMeeting ID: ' + HOP.meetingId + '\nPasscode: ' + HOP.passcode + '\n\nWhatsApp group: ' + HOP.whatsapp;
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('House of Prayer (Zoom)') +
      '&dates=' + f(s.start) + '/' + f(s.end) + '&details=' + encodeURIComponent(details) +
      '&location=' + encodeURIComponent(HOP.zoom) + '&recur=' + encodeURIComponent('RRULE:FREQ=WEEKLY;BYDAY=WE');
  }
  function isApple() { return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent); }

  function invite(afterRequest) {
    var s = sessionInfo();
    var when = s.live ? 'Happening now' : dayWord(s.start) + ' at ' + localTime(s.start);
    var calUrl = isApple() && API ? API + '/hop.ics' : gcal(s);
    return '<section class="invite">' +
      (s.live ? '<span class="live">LIVE NOW</span>' : '<div class="k">Every Wednesday on Zoom</div>') +
      '<h2>House of Prayer</h2>' +
      (home && !afterRequest ? '' : '<p>' + (afterRequest
        ? 'Your request will be lifted up at our next House of Prayer. Come and pray with us. You do not have to carry this alone.'
        : 'Join Aneel Aranha and intercessors from around the world as we pray for every request we receive.') + '</p>') +
      '<div class="when">' + esc(when) + (s.live ? '' : ' <span style="font-weight:400;color:#a9a090">(your time)</span>') + '</div>' +
      '<div class="dubai">Wednesdays, 7:30 pm Dubai time</div>' +
      '<a class="btn" href="' + ext(HOP.zoom) + '">' + ICON.video + (s.live ? 'Join now on Zoom' : 'Join on Zoom') + '</a>' +
      '<div class="row"><a class="btn" href="' + ext(calUrl) + '">' + ICON.cal + 'Add to calendar</a>' +
      '<a class="btn" href="' + ext(HOP.whatsapp) + '">' + ICON.wa + 'WhatsApp group</a></div>' +
      '<div class="ids"><span>Meeting ID <b>' + HOP.meetingId + '</b></span><span>Passcode <b>' + HOP.passcode + '</b></span></div>' +
      '</section>';
  }

  /* ---------- screens ---------- */
  var draft = { name: '', place: '', email: '', category: '', text: '' };

  function showForm(error) {
    root.innerHTML = sepTop +
      '<h1>Prayer Requests</h1>' +
      '<p class="lead">' + (home
        ? 'Share what is on your heart. You will receive a word from Scripture right away.'
        : 'Share what is on your heart. You will receive a word from Scripture right away, and we will pray for you at our Wednesday House of Prayer.') + '</p>' +
      '<form novalidate>' +
      '<label>What would you like prayer for?</label>' +
      '<div class="chips">' + CATEGORIES.map(function (c) {
        return '<button type="button" class="chip' + (draft.category === c ? ' on' : '') + '" data-c="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('') + '</div>' +
      '<label for="aap-text">Your request</label>' +
      '<textarea id="aap-text" maxlength="2000" placeholder="Tell us what is happening and how we can pray for you.">' + esc(draft.text) + '</textarea>' +
      '<div class="two"><div><label for="aap-name">First name <span class="opt">(optional)</span></label>' +
      '<input id="aap-name" maxlength="60" autocomplete="given-name" value="' + esc(draft.name) + '"></div>' +
      '<div><label for="aap-place">Country <span class="opt">(optional)</span></label>' +
      '<input id="aap-place" maxlength="80" autocomplete="country-name" value="' + esc(draft.place) + '"></div></div>' +
      '<label for="aap-email">Email <span class="opt">(optional, only if you would like us to follow up)</span></label>' +
      '<input id="aap-email" type="email" maxlength="120" autocomplete="email" inputmode="email" value="' + esc(draft.email) + '">' +
      '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<button class="btn" type="submit">Send my prayer request</button>' +
      (error ? '<div class="err">' + esc(error) + '</div>' : '') +
      '<p class="note">Your request is private. Only Aneel Aranha and the House of Prayer team will read it. The Scripture reply you receive is prepared with the help of AI.</p>' +
      '</form>' + invite(false);

    var form = root.querySelector('form');
    root.querySelectorAll('.chip').forEach(function (b) {
      b.addEventListener('click', function () {
        draft.category = b.getAttribute('data-c');
        root.querySelectorAll('.chip').forEach(function (x) { x.classList.toggle('on', x === b); });
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      draft.text = root.querySelector('#aap-text').value.trim();
      draft.name = root.querySelector('#aap-name').value.trim();
      draft.place = root.querySelector('#aap-place').value.trim();
      draft.email = root.querySelector('#aap-email').value.trim();
      if (draft.text.length < 5) { showForm('Please write a few words about what you would like us to pray for.'); return; }
      send(form.querySelector('.hp').value);
    });
  }

  // In the Home widget the code has its own scrolling frame, so go to its top; in the section, bring the form into view.
  function toTop() {
    try {
      if (home) { window.scrollTo(0, 0); if (document.scrollingElement) document.scrollingElement.scrollTop = 0; }
      else root.scrollIntoView({ block: 'start' });
    } catch (e) {}
  }

  function showWaiting() {
    root.innerHTML = sepTop + '<div class="wait"><div class="dove"></div><p>Searching the Scriptures for you…</p><small>This takes a few seconds.</small></div>';
    toTop();
  }

  function showReply(r) {
    var first = draft.name ? esc(draft.name.split(' ')[0]) : '';
    root.innerHTML = sepTop +
      (r.help ? '<div class="help"><b>' + (first ? first + ', your' : 'Your') + ' life matters to God.</b>' + esc(r.help) + '</div>' : '') +
      '<p class="opening">' + esc(r.opening) + '</p>' +
      '<h3>God\'s Word for you</h3>' +
      (r.verses || []).map(function (v) {
        return '<div class="verse"><q>' + esc(v.text) + '</q><cite>' + esc(v.reference) + '</cite>' +
          (v.why ? '<div class="why">' + esc(v.why) + '</div>' : '') + '</div>';
      }).join('') +
      '<div class="trans">Scripture quotations from the World English Bible</div>' +
      '<h3>Encouragement</h3><p class="body">' + esc(r.encouragement) + '</p>' +
      '<h3>A prayer for you to pray</h3><p class="prayer">' + esc(r.prayer) + '</p>' +
      invite(true) +
      '<a class="again" href="#" data-again>Share another prayer request</a>';
    root.querySelector('[data-again]').addEventListener('click', function (e) {
      e.preventDefault();
      draft = { name: draft.name, place: draft.place, email: draft.email, category: '', text: '' };
      showForm();
      toTop();
    });
    toTop();
  }

  function send(honeypot) {
    if (!API) { showForm('Prayer requests are not connected yet.'); return; }
    showWaiting();
    var payload = JSON.stringify({ name: draft.name, place: draft.place, email: draft.email, category: draft.category || 'Other', text: draft.text, website: honeypot || '' });
    fetch(API + '/api/petition', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (x) {
        if (!x.ok || !x.j.reply) { showForm(x.j.error || 'Something went wrong. Please try again.'); return; }
        showReply(x.j.reply);
      })
      .catch(function () { showForm('We could not send your request. Please check your connection and try again.'); });
  }

  showForm();
})();
