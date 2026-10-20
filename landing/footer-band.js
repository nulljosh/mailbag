// Footer band: Mailbag's things in a row (rainbow, letter, out-tray, stamp, column, sack, amphora, postmark, Pandora's box, wing), cut like a line
// engraving in plain 2D canvas. Faint rules run across the band; inside the glyphs they thicken, and thicken again on
// the edge facing away from the light, so the glyphs look cut into the page. Drawn once per size and theme.
// ponytail: was a WebGL shader with a drifting light; it rendered as a black box on iPhone, so it is static now.
(function () {
  var band = document.querySelector('.word-band'), canvas = band && band.querySelector('canvas');
  if (!canvas) return;


  // Each glyph is drawn white on a 100 unit square.
  function feather(c, x, y, angle, len, w) { c.save(); c.translate(x, y); c.rotate(angle); c.beginPath(); c.ellipse(len / 2, 0, len / 2, w, 0, 0, 7); c.fill(); c.restore(); }
  function wing(c, x, y, s, flip) {
    c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
    for (var i = 0; i < 5; i++) feather(c, 0, 0, -0.15 - i * 0.3, 26 + 14 * Math.sin(1 + i * 0.5), 5.5);
    c.restore();
  }
  var GLYPHS = [
    function (c) { // Iris' rainbow: seven arcs, one per folder
      c.lineWidth = 4; c.lineCap = 'round';
      for (var i = 0; i < 7; i++) { c.beginPath(); c.arc(50, 78, 42 - i * 5.4, Math.PI, 0); c.stroke(); }
    },
    function (c) { // letter
      c.beginPath(); c.roundRect(14, 28, 72, 48, 6); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.lineWidth = 6; c.lineJoin = 'round';
      c.beginPath(); c.moveTo(18, 32); c.lineTo(50, 56); c.lineTo(82, 32); c.stroke();
      c.globalCompositeOperation = 'source-over';
    },
    function (c) { // out-tray with a letter dropping in
      c.save(); c.translate(50, 34); c.rotate(-0.12); c.beginPath(); c.roundRect(-26, -16, 52, 36, 4); c.fill(); c.restore();
      c.beginPath(); c.moveTo(12, 52); c.lineTo(88, 52); c.lineTo(82, 82); c.quadraticCurveTo(81, 88, 75, 88); c.lineTo(25, 88); c.quadraticCurveTo(19, 88, 18, 82); c.closePath(); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.roundRect(37, 66, 26, 6, 3); c.fill(); c.globalCompositeOperation = 'source-over';
    },
    function (c) { // postage stamp: perforated edge, inner frame
      c.beginPath(); c.rect(24, 16, 52, 68); c.fill();
      c.globalCompositeOperation = 'destination-out';
      for (var i = 0; i < 6; i++) { var p = 24 + 5.2 + i * 8.4; [[p, 16], [p, 84]].forEach(function (q) { c.beginPath(); c.arc(q[0], q[1], 3, 0, 7); c.fill(); }); }
      for (var j = 0; j < 8; j++) { var r = 16 + 4.5 + j * 8.4; [[24, r], [76, r]].forEach(function (q) { c.beginPath(); c.arc(q[0], q[1], 3, 0, 7); c.fill(); }); }
      c.lineWidth = 3; c.strokeRect(32, 24, 36, 52);
      c.globalCompositeOperation = 'source-over';
      c.beginPath(); c.arc(50, 50, 10, 0, 7); c.fill();
    },
    function (c) { // mail sack
      c.beginPath(); c.ellipse(50, 64, 30, 26, 0, 0, 7); c.fill();
      c.beginPath(); c.moveTo(38, 40); c.lineTo(30, 20); c.lineTo(50, 30); c.lineTo(70, 20); c.lineTo(62, 40); c.closePath(); c.fill();
      c.fillRect(36, 38, 28, 6);
    },
    function (c) { // Doric column: capital, fluted shaft, base
      c.fillRect(24, 12, 52, 7); c.fillRect(30, 19, 40, 5); c.fillRect(34, 24, 32, 56); c.fillRect(26, 80, 48, 5); c.fillRect(20, 85, 60, 6);
      c.globalCompositeOperation = 'destination-out';
      for (var i = 0; i < 4; i++) c.fillRect(38.5 + i * 7.2, 26, 2.2, 52);
      c.globalCompositeOperation = 'source-over';
    },
    function (c) { // amphora: Pandora's jar
      c.beginPath(); c.ellipse(50, 62, 25, 28, 0, 0, 7); c.fill();
      c.fillRect(42, 24, 16, 18); c.beginPath(); c.ellipse(50, 22, 13, 5, 0, 0, 7); c.fill();
      c.lineWidth = 5; c.lineCap = 'round';
      [-1, 1].forEach(function (k) { c.beginPath(); c.moveTo(50 + k * 8, 30); c.bezierCurveTo(50 + k * 34, 20, 50 + k * 36, 52, 50 + k * 24, 54); c.stroke(); });
      c.globalCompositeOperation = 'destination-out'; c.lineWidth = 2.5;
      c.beginPath(); c.moveTo(30, 58); c.quadraticCurveTo(50, 66, 70, 58); c.stroke();
      c.beginPath(); c.moveTo(34, 74); c.quadraticCurveTo(50, 80, 66, 74); c.stroke();
      c.globalCompositeOperation = 'source-over';
    },
    function (c) { // postmark: double ring and wavy cancel lines
      c.lineWidth = 4;
      c.beginPath(); c.arc(40, 52, 30, 0, 7); c.stroke(); c.beginPath(); c.arc(40, 52, 22, 0, 7); c.stroke();
      c.lineWidth = 3.4; c.lineCap = 'round';
      for (var i = 0; i < 4; i++) { c.beginPath(); for (var x = 62; x <= 94; x += 2) { var y = 36 + i * 10 + 3 * Math.sin((x - 62) / 4); x === 62 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
      c.fillRect(33, 46, 14, 3.4); c.fillRect(33, 55, 14, 3.4);
    },
    function (c) { // Pandora's box: chest with a keyhole
      c.beginPath(); c.roundRect(16, 52, 68, 34, 4); c.fill();
      c.beginPath(); c.moveTo(16, 50); c.quadraticCurveTo(50, 8, 84, 50); c.closePath(); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(16, 51); c.lineTo(84, 51); c.stroke();
      c.beginPath(); c.arc(50, 66, 5, 0, 7); c.fill(); c.fillRect(48.2, 66, 3.6, 12);
      c.globalCompositeOperation = 'source-over';
    },
    function (c) { // wing, for the messenger
      wing(c, 50, 70, 1.15, true); wing(c, 50, 70, 1.15, false);
    }
  ];
  // Lays the glyphs out evenly across a w by h 2D context, in the given colour: one row, or two on a narrow band.
  function grid(w, h) {
    var n = w < h * 1.4 ? 8 : GLYPHS.length, rows = 2, per = n / rows;   // a narrow band drops the last two so both rows stay full
    return { n: n, rows: rows, per: per, cell: Math.min(h / rows * 0.86, w / per) };
  }
  function paint(c, w, h, colour) {
    var g = grid(w, h), gap = (w - g.cell * g.per) / g.per, rowH = h / g.rows;
    GLYPHS.slice(0, g.n).forEach(function (draw, i) {
      var col = i % g.per, row = Math.floor(i / g.per);
      c.save(); c.translate(gap / 2 + col * (g.cell + gap), row * rowH + (rowH - g.cell) / 2 + rowH * 0.04); c.scale(g.cell / 100, g.cell / 100);
      c.fillStyle = c.strokeStyle = colour; draw(c); c.restore();
    });
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  function layer(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  // Horizontal rules `t` px thick, one every `pitch` px, kept only where `mask` is drawn (everywhere when null).
  function rules(w, h, pitch, t, colour, mask) {
    var c = layer(w, h), x = c.getContext('2d');
    x.fillStyle = colour;
    for (var y = 0; y < h; y += pitch) x.fillRect(0, Math.round(y + (pitch - t) / 2), w, Math.max(1, Math.round(t)));
    if (mask) { x.globalCompositeOperation = 'destination-in'; x.drawImage(mask, 0, 0); }
    return c;
  }
  var drawnW = 0;
  function draw() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    drawnW = w; canvas.width = w; canvas.height = h;
    var colour = getComputedStyle(band).color, pitch = Math.min(5 * dpr, Math.max(3 * dpr, grid(w, h).cell / 22)), s = Math.max(2, h * 0.014);
    var glyphs = layer(w, h); paint(glyphs.getContext('2d'), w, h, '#fff');
    // the shadow side: glyph pixels whose neighbour down and right is outside the glyph (light from the top left)
    var shade = layer(w, h), sc = shade.getContext('2d');
    sc.drawImage(glyphs, 0, 0); sc.globalCompositeOperation = 'destination-out'; sc.drawImage(glyphs, -s, -s);
    ctx.globalAlpha = 0.28; ctx.drawImage(rules(w, h, pitch, dpr * 0.75, colour, null), 0, 0);
    ctx.globalAlpha = 1; ctx.drawImage(rules(w, h, pitch, pitch * 0.32, colour, glyphs), 0, 0);
    ctx.drawImage(rules(w, h, pitch, pitch * 0.6, colour, shade), 0, 0);
    // fade out toward the legal line
    var g = ctx.createLinearGradient(0, h * 0.88, 0, h);
    g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-in'; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
  }
  band.classList.add('live');
  draw();
  // iOS fires resize as the toolbar slides; only a width change needs a redraw
  window.addEventListener('resize', function () { if (Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)) !== drawnW) draw(); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
})();
