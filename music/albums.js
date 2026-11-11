/* Aneel Aranha albums for the GoodBarber app.
 * Loaded by a Custom Code section/widget with:
 *   <div id="aa-music" data-mode="full|strip" data-section="SECTION_ID"></div>
 *   <script src="https://aneelaranha.github.io/just-saying/music/albums.js"></script>
 * data-links="web" switches links to plain new-tab links (for testing in a browser).
 * Covers live next to this file on GitHub Pages; nothing is stored on GoodBarber.
 */
(function () {
  var BASE = 'https://aneelaranha.github.io/just-saying/music/';
  var APP = 'https://apps.aneelaranha.com/songs-1/i/';
  var yt = function (id) { return 'https://www.youtube.com/watch?v=' + id; };

  // Worship video pages inside the app (Songs (Videos) section), keyed by track title.
  // Tracks listed here open in the app; tracks with only a YouTube id open YouTube.
  var IN_APP = {
    'Walking on Water': '96958880/video-1213', 'Let Your Light Shine': '97172299/video-1215',
    'Like a Child': '97452575/video-1217', 'Now I See': '98239331/video-1223',
    'The Sower and the Seed': '96373651/video-1208', 'The Talents': '98239312/video-1222',
    'The Wise and the Foolish Builders': '97467603/video-1218', 'Consider the Lilies': '96686848/video-1211',
    'The Good Samaritan': '98239343/good-samaritan', 'Keep on Knocking': '97608043/video-1219',
    'Wake Up, My Soul': '95101610/video-1202', 'I Give You Thanks': '95304870/video-1203',
    'Lead Me': '96258381/video-1207', 'Holy Spirit, Fall on Me': '96598547/video-1210',
    'Psalm 139': '96776481/video-1212', 'Blessed': '96053329/video-1205',
    'In My Name': '98239426/video-1225', 'Eyes of Love': '98239279/video-1221',
    'I Love You': '97055442/i-love-you', 'I Know How Jesus Felt': '81795683/i-know-how-jesus-felt',
    'Homeward Bound': '95058079/video-1201', 'The Blessed Lamb of God': '96485347/video-1209'
  };

  var ALBUMS = [
    {
      id: 'songs-of-the-kingdom', title: 'Songs of the Kingdom', kind: 'Album', year: 2026,
      blurb: 'Ten songs drawn from the teachings and parables of Jesus.',
      spotify: 'https://open.spotify.com/album/7J6WoQqeGk3BtPsWjCKdwM',
      apple: 'https://music.apple.com/album/6817536826',
      amazon: 'https://music.amazon.com/albums/B0HLJ6BJ73',
      playlist: 'https://www.youtube.com/playlist?list=PLCC0k7AP_-QU',
      tracks: [
        ['Walking on Water', '8ZJdK_VRBTM'], ['Let Your Light Shine', 'uqGv6z3RGko'], ['Like a Child', 'NJRrWGKhbYw'],
        ['Now I See', 'nDt2CAQO_x0'], ['The Sower and the Seed', 'g93DogdNgks'], ['The Talents', 'KDSstEGrCeA'],
        ['The Wise and the Foolish Builders', 'KihJXtyK4C4'], ['Consider the Lilies', 'v5padzI5r9g'],
        ['The Good Samaritan', 'eznPNgxbac0'], ['Keep on Knocking', 'BTB3SGayL7w']
      ]
    },
    {
      id: 'from-dawn-to-dusk', title: 'From Dawn to Dusk', kind: 'Album', year: 2026,
      blurb: 'A worship collection to carry you from morning to night.',
      spotify: 'https://open.spotify.com/album/6JYmgFgmog1VYyEgmFWuNE',
      apple: 'https://music.apple.com/album/6771979064',
      amazon: 'https://music.amazon.com/albums/B0H2KTC2Z5',
      tracks: [
        ['Wake Up, My Soul', 'HBSThoGNb6A'], ['I Give You Thanks', 'S7OUxy-P_kk'], ['New Every Morning'],
        ['This Is the Day'], ['Lead Me', '0P8QPVfg6Qk'], ['Holy Spirit, Fall on Me', 'GaPu50o1IkQ'],
        ['After the Fire'], ['My Soul Waits for You', 'wVoLuGusFaY'], ['Psalm 139', 'dYC90p14r9s'],
        ['Into Your Hands'], ['In Peace I Lie Down']
      ]
    },
    {
      id: 'blessed', title: 'Blessed', kind: 'Single', year: 2026,
      blurb: 'Inspired by the Beatitudes: what it means to walk closely with God.',
      spotify: 'https://open.spotify.com/album/2vEaxEqZhAd1y9hyhZbd5a',
      apple: 'https://music.apple.com/album/1895446026',
      amazon: 'https://music.amazon.com/albums/B0GYGJY2VV',
      tracks: [['Blessed', 'Yr4iX9TvOM8']]
    },
    {
      id: 'homeward-bound', title: 'Homeward Bound', kind: 'Album', year: 2026,
      blurb: 'Songs of love, longing and the journey home to God.',
      spotify: 'https://open.spotify.com/album/2w1NOACchjR8Amb3F9eaLI',
      apple: 'https://music.apple.com/album/1871336595',
      amazon: 'https://music.amazon.com/albums/B0GJ7DVLVM',
      tracks: [
        ['In My Name', 'YpXUF6ztXjE'], ['Eyes of Love', '-fFzu7o1NjU'], ['The Warmth of His Embrace'],
        ['One Thing', 'JDRyPHYwfUg'], ['David’s Song', 'E21YwJdO0fI'], ['I Love You', 'P_iujVMqiQw'],
        ['Peace', 'CkJk485roVE'], ['I Know How Jesus Felt', 'app'], ['The Spirit’s Embrace'], ['Awesome God'],
        ['Homeward Bound', 'w9_t7UPDbRk'], ['The Blessed Lamb of God', '7sR0U1YIhvo']
      ]
    }
  ];

  var root = document.getElementById('aa-music');
  if (!root) return;
  var mode = root.getAttribute('data-mode') || 'full';
  var web = root.getAttribute('data-links') === 'web';
  var section = root.getAttribute('data-section');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // Outside links leave the app so Spotify, Apple Music, Amazon Music and YouTube open in their own apps.
  function ext(url) {
    return web ? esc(url) + '" target="_blank" rel="noopener'
               : 'goodbarber://openExternal?url=' + encodeURIComponent(url);
  }
  function toSection() { return section ? 'goodbarber://#!section=' + section : '#'; }

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap';
  document.head.appendChild(font);

  var css = [
    '#aa-music{--gold:#a58b57;--ink:#222;--muted:#888;--line:#ece7dc;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:var(--ink);-webkit-text-size-adjust:100%}',
    '#aa-music *{box-sizing:border-box}',
    '#aa-music a{color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}',
    '#aa-music .serif{font-family:"Playfair Display",Georgia,serif}',
    /* full page */
    '#aa-music .jump{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:12px 12px 4px}',
    '#aa-music .jump img{width:100%;aspect-ratio:1;border-radius:6px;display:block;box-shadow:0 2px 8px rgba(0,0,0,.15)}',
    '#aa-music .album{padding:24px 16px 8px;border-bottom:1px solid var(--line);scroll-margin-top:8px}',
    '#aa-music .album:last-child{border-bottom:0}',
    '#aa-music .cover{width:100%;max-width:420px;margin:0 auto;display:block;aspect-ratio:1;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.18)}',
    '#aa-music h2{font-size:26px;font-weight:600;margin:16px 0 2px;text-align:center}',
    '#aa-music .meta{text-align:center;color:var(--muted);font-size:13px;letter-spacing:.04em;text-transform:uppercase}',
    '#aa-music .blurb{text-align:center;font-size:15px;line-height:1.45;margin:10px auto 0;max-width:420px;color:#444}',
    '#aa-music .listen{text-align:center;font-size:13px;color:var(--muted);margin:16px 0 8px}',
    '#aa-music .plats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:420px;margin:0 auto}',
    '#aa-music .plat{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:58px;border-radius:12px;color:#fff !important;font-size:13px;font-weight:600;text-align:center;padding:6px 4px}',
    '#aa-music .plat svg{width:20px;height:20px}',
    '#aa-music .spotify{background:#1db954}#aa-music .apple{background:#fa2d48}#aa-music .amazon{background:#1a98ff}',
    '#aa-music .tracks{list-style:none;margin:18px auto 8px;padding:0;max-width:520px}',
    '#aa-music .tracks li{border-top:1px solid var(--line)}',
    '#aa-music .tracks li:first-child{border-top:0}',
    '#aa-music .row{display:flex;align-items:center;gap:12px;min-height:48px;padding:6px 2px}',
    '#aa-music .num{width:22px;text-align:right;color:var(--muted);font-size:14px;font-variant-numeric:tabular-nums;flex:none}',
    '#aa-music .name{flex:1;font-size:16px;line-height:1.3}',
    '#aa-music .watch{flex:none;display:inline-flex;align-items:center;gap:5px;color:var(--gold);font-size:13px;font-weight:600}',
    '#aa-music .watch svg{width:22px;height:22px}',
    '#aa-music .playlist{display:block;text-align:center;color:var(--gold);font-weight:600;font-size:14px;padding:6px 0 10px}',
    /* home strip */
    '#aa-music.strip{height:100%;display:flex;flex-direction:column}',
    /* 1px #ddd line like GoodBarber's Separator widget, with 25px of clear space on each side like every Home separator
       (9px + the 16px the Music Videos list leaves below its last item; 11px + the header's own space above the "Albums" text). */
    '#aa-music .sep{flex:none;padding:9px 0 11px}#aa-music .sep i{display:block;width:100%;border-top:1px solid #ddd}',
    '#aa-music .sh{display:flex;justify-content:space-between;align-items:center;padding:0 12px;height:48px;flex:none}',
    '#aa-music .sh .t{font-size:24px;color:#333}',
    '#aa-music .sh .s{font-size:14px;font-weight:600;color:var(--gold)}',
    '#aa-music .row4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 12px 8px;flex:1;align-content:start}',
    '#aa-music .row4 img{width:100%;aspect-ratio:1;border-radius:6px;display:block;box-shadow:0 2px 8px rgba(0,0,0,.15)}',
    '#aa-music .row4 span{display:block;font-size:11.5px;line-height:1.25;margin-top:6px;text-align:center;color:#333}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ICON = {
    spotify: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M7 9.5c3.5-1 7-.6 10 1M7.5 12.8c2.9-.8 5.8-.4 8.3.9M8 16c2.3-.6 4.5-.3 6.5.7"/></svg>',
    apple: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    amazon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/></svg>',
    play: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M10 8l6 4-6 4z" fill="#fff"/></svg>'
  };

  if (mode === 'strip') {
    root.className = 'strip';
    var link = web ? 'index.html' : toSection();
    // data-separator="top" draws a GoodBarber-style separator above the strip (the home page is at its widget limit).
    var sep = root.getAttribute('data-separator') === 'top' ? '<div class="sep"><i></i></div>' : '';
    root.innerHTML = sep +
      '<a class="sh" href="' + link + '"><span class="t serif">Albums</span><span class="s">See all ›</span></a>' +
      '<div class="row4">' + ALBUMS.map(function (a) {
        return '<a href="' + link + '"><img src="' + BASE + 'covers/' + a.id + '.jpg" alt=""><span>' + esc(a.title) + '</span></a>';
      }).join('') + '</div>';
    return;
  }

  var html = '<div class="jump">' + ALBUMS.map(function (a) {
    return '<a href="#' + a.id + '" aria-label="' + esc(a.title) + '"><img src="' + BASE + 'covers/' + a.id + '.jpg" alt=""></a>';
  }).join('') + '</div>';

  ALBUMS.forEach(function (a) {
    var n = a.tracks.length;
    html += '<section class="album" id="' + a.id + '">' +
      '<a href="' + ext(a.apple) + '"><img class="cover" src="' + BASE + 'covers/' + a.id + '.jpg" alt="' + esc(a.title) + ' cover"></a>' +
      '<h2 class="serif">' + esc(a.title) + '</h2>' +
      '<div class="meta">' + a.kind + ' · ' + a.year + ' · ' + n + (n === 1 ? ' song' : ' songs') + '</div>' +
      (a.blurb ? '<p class="blurb">' + esc(a.blurb) + '</p>' : '') +
      '<div class="listen">Listen on</div>' +
      '<div class="plats">' +
        '<a class="plat spotify" href="' + ext(a.spotify) + '">' + ICON.spotify + 'Spotify</a>' +
        '<a class="plat apple" href="' + ext(a.apple) + '">' + ICON.apple + 'Apple Music</a>' +
        '<a class="plat amazon" href="' + ext(a.amazon) + '">' + ICON.amazon + 'Amazon Music</a>' +
      '</div>' +
      '<ol class="tracks">' + a.tracks.map(function (t, i) {
        var inner = '<span class="num">' + (i + 1) + '</span><span class="name">' + esc(t[0]) + '</span>';
        var watch = '<span class="watch">Watch' + ICON.play + '</span>';
        var page = IN_APP[t[0]];
        if (page) {
          // A plain link to the app's own domain opens that page inside the app.
          var href = APP + page;
          return '<li><a class="row" href="' + (web ? esc(href) + '" target="_blank" rel="noopener' : esc(href)) + '">' + inner + watch + '</a></li>';
        }
        return t[1]
          ? '<li><a class="row" href="' + ext(yt(t[1])) + '">' + inner + watch + '</a></li>'
          : '<li><div class="row">' + inner + '</div></li>';
      }).join('') + '</ol>' +
      (a.playlist ? '<a class="playlist" href="' + ext(a.playlist) + '">Watch the full album on YouTube ›</a>' : '') +
      '</section>';
  });
  root.innerHTML = html;
})();
