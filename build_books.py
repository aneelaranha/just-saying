#!/usr/bin/env python3
"""Builds books/books.json and books/covers/ for the app from aneelaranha.com.

Reads every post in the website's Books category (WordPress category 67):
  - first paragraph            -> hook line
  - paragraphs/list items up to "Get Your Copy" -> description
  - Amazon / Pothi links        -> store buttons (labelled Kindle, Paperback, Hardcover, India (Pothi))
Covers are the flat front covers from Amazon (by the first Amazon edition's ID).
Safe to re-run; only downloads covers that are missing.
Usage: python3 -I build_books.py
"""
import html, json, os, re, subprocess, urllib.request

REPO = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(REPO, 'books')
API = 'https://aneelaranha.com/wp-json/wp/v2/posts?categories=67&per_page=100&_fields=id,date,slug,title,link,content'


def clean(s):
    s = re.sub(r'<br\s*/?>', ' ', s)
    s = re.sub(r'<[^>]+>', '', s)
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main():
    os.makedirs(os.path.join(OUT, 'covers'), exist_ok=True)
    posts = json.loads(fetch(API))
    books = []
    for p in posts:
        c = p['content']['rendered']
        # Paragraphs and list items in page order.
        blocks = [(tag, clean(body)) for tag, body in re.findall(r'<(p|li)[^>]*>(.*?)</\1>', c, re.S)]
        blocks = [(t, b) for t, b in blocks if b]
        stop = next((i for i, (t, b) in enumerate(blocks) if b.lower().startswith('get your copy')), len(blocks))
        hook = blocks[0][1] if blocks else ''
        body = [{'li': t == 'li', 'text': b} for t, b in blocks[1:stop]
                if not re.match(r'^(Kindle|Paperback|Hardcover|India \(Pothi\)|Published Books)$', b)]
        buy = []
        for href, text in re.findall(r'<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>', c, re.S):
            href = html.unescape(href)
            if re.search(r'amazon\.|pothi\.com', href):
                label = clean(text)
                store = 'pothi' if 'pothi.com' in href else 'amazon'
                if store == 'amazon':
                    m = re.search(r'/dp/([A-Z0-9]{10})', href)
                    href = f'https://www.amazon.com/dp/{m.group(1)}' if m else href
                buy.append({'store': store, 'label': label, 'url': href})
        full = clean(p['title']['rendered'])
        title, _, subtitle = full.partition(': ')
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        # Cover from the first Amazon edition.
        cover = os.path.join(OUT, 'covers', slug + '.jpg')
        asin = next((re.search(r'/dp/([A-Z0-9]{10})', b['url']).group(1) for b in buy if b['store'] == 'amazon'), None)
        if asin and not os.path.exists(cover):
            data = fetch(f'https://m.media-amazon.com/images/P/{asin}.01._SCLZZZZZZZ_SX600_.jpg')
            if len(data) > 3000:
                open(cover, 'wb').write(data)
                subprocess.run(['sips', '-s', 'formatOptions', '82', cover], stdout=subprocess.DEVNULL)
        books.append({'id': slug, 'title': title, 'subtitle': subtitle, 'date': p['date'][:10],
                      'hook': hook, 'body': body, 'buy': buy, 'web': p['link'],
                      'cover': os.path.exists(cover)})
    books.sort(key=lambda b: b['date'], reverse=True)
    with open(os.path.join(OUT, 'books.json'), 'w') as fh:
        json.dump(books, fh, ensure_ascii=False, indent=1)
    for b in books:
        print(f"{b['date']}  {b['title']:<36} body {len(b['body']):>2}  buy {', '.join(x['label'] for x in b['buy'])}  cover {'yes' if b['cover'] else 'MISSING'}")


if __name__ == '__main__':
    main()
