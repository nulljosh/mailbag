// Hero wall: Mailbag sorting, one card per folder. Sample mail (never anyone's real inbox) lands in the inbox, takes its
// folder chip, files away and the folder count goes up. The People card shows mail from people staying put.
(function () {
  var wall = document.getElementById('mwall'); if (!wall) return;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var n = innerWidth <= 560 ? 3 : innerWidth <= 900 ? 6 : 9;
  var CARDS = [
    ['Receipts', 41, [['Apple', 'Your receipt from Apple'], ['Uber', 'Your Thursday evening trip'], ['Amazon', 'Your order has shipped']]],
    ['Travel', 12, [['Air Canada', 'Your boarding pass: YVR to SFO'], ['Airbnb', 'Your stay in Tofino is confirmed'], ['BC Ferries', 'Sailing reminder: 7:00 am']]],
    ['People', 0, [['Mom', 'Dinner Sunday?'], ['Sam', 'Notes from today'], ['Priya', 'Photos from the hike']]],
    ['Dev', 88, [['GitHub', '[mailbag] CI passed on main'], ['Cloudflare', 'Deploy finished: mailbag'], ['npm', 'New login to your account']]],
    ['Newsletters', 27, [['Substack', 'This week in design'], ['The Verge', 'Vergecast: the week in tech'], ['Morning Brew', 'Markets wrap']]],
    ['Unsubscribe', 0, [['bestbuy.com', '6 emails this week'], ['prize-center.net', '9 emails this week'], ['shoe-outlet.com', '4 emails this week']]],
    ['Promotions', 63, [['Best Buy', '48 hour sale starts now'], ['Lululemon', 'New arrivals for fall'], ['Steam', 'A game on your wishlist is on sale']]],
    ['Social', 19, [['LinkedIn', 'You appeared in 12 searches'], ['Instagram', 'sam.k started following you'], ['Strava', 'Kudos on your morning run']]],
    ['Junk', 104, [['Prize Center', 'You won a $500 gift card!!'], ['Crypto Alerts', 'This coin is up 900%'], ['Pharmacy', 'Limited time offer']]]
  ];
  var el = function (t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, still ? 0 : ms); }); };
  for (var i = 0; i < n; i++) (function (cd, i) {
    var a = wall.appendChild(el('div', 'mc')), hd = a.appendChild(el('div', 'mc-hd')), name = cd[0], kind = name === 'People' ? 'people' : name === 'Unsubscribe' ? 'unsub' : 'folder';
    hd.appendChild(el('span', '', kind === 'unsub' ? 'Unsubscribe' : kind === 'people' ? 'Inbox' : name));
    var count = hd.appendChild(el('b', '', kind === 'folder' ? String(cd[1]) : '')), list = a.appendChild(el('div')), note = a.appendChild(el('div', 'mc-note'));
    note.textContent = kind === 'people' ? 'People stay put.' : kind === 'unsub' ? 'Repeat senders, one tap each.' : 'Mailbag/' + name;
    var k = 0;
    function add(m) {
      var r = el('div', 'mc-row'); r.appendChild(el('b', '', m[0])); r.appendChild(el('span', '', m[1]));
      r.appendChild(el('i', '', kind === 'unsub' ? 'Unsubscribe' : 'Inbox')); list.insertBefore(r, list.firstChild);
      while (list.children.length > 3) list.removeChild(list.lastChild);
      return r;
    }
    function step() {
      var m = cd[2][k++ % cd[2].length], r = add(m);
      return wait(1200).then(function () {
        if (kind === 'people') { r.querySelector('i').textContent = 'Stays'; r.classList.add('on'); return wait(2600); }
        if (kind === 'unsub') { r.querySelector('i').textContent = 'Unsubscribed'; r.classList.add('on'); return wait(2600); }
        r.querySelector('i').textContent = name; r.classList.add('on');
        return wait(900).then(function () {
          r.classList.add('filed'); count.textContent = +count.textContent + 1; count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
          return wait(1800);
        });
      });
    }
    // start with two already handled, so no card is ever empty
    [cd[2][2], cd[2][1]].forEach(function (m) { var r = add(m); r.style.animation = 'none'; r.querySelector('i').textContent = kind === 'people' ? 'Stays' : kind === 'unsub' ? 'Unsubscribed' : name; r.classList.add('on', 'filed'); });
    if (still) return;
    wait(i * 350).then(function loop() { return step().then(loop); });
  })(CARDS[i % CARDS.length], i);
})();

// Hero parallax: the wall drifts at 0.45, the copy lifts at 0.2 and fades. Off under reduced motion.
(function () {
  var bg = document.querySelector('.hero-bg'), copy = document.querySelector('.hero-copy');
  if (!bg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var t = 0;
  addEventListener('scroll', function () {
    if (t) return;
    t = requestAnimationFrame(function () {
      t = 0; var y = scrollY, h = innerHeight; if (y > h * 1.2) return;
      bg.style.setProperty('--py', (y * .45) + 'px');
      copy.style.transform = 'translate3d(0,' + (y * .2) + 'px,0)'; copy.style.opacity = Math.max(0, 1 - y / (h * .7));
    });
  }, { passive: true });
})();
