/* ============================================================
   _shared.js - SoulBrothers
   Zawiera: baner cookies/RODO + pływający przycisk WhatsApp
   Wczytaj na każdej stronie przed </body>:
   <script src="_shared.js"></script>
   ============================================================ */

(function() {
  'use strict';

  /* ── KONFIGURACJA - zmień tu swoje dane ─────────────── */
  var CONFIG = {
    phone: {
      number:  '+48500000000',         // numer do wyświetlenia i kliknięcia
      display: '+48 500 000 000'       // wersja czytelna
    },
    whatsapp: {
      number:  '48500000000',          // numer bez + i spacji
      message: 'Dzień dobry! Chciałbym zapytać o produkty SoulBrothers.'
    },
    cookieName: 'sb_cookies_accepted',
    cookieDays: 365
  };
  /* ────────────────────────────────────────────────────── */

  /* ── CSS ── */
  var style = document.createElement('style');
  style.textContent = [

    /* ── KONTAKT FLOAT BUTTON ── */
    '.sb-float {',
    '  position:fixed; bottom:24px; right:24px; z-index:9990;',
    '  display:flex; flex-direction:column; align-items:flex-end; gap:10px;',
    '  opacity:0; pointer-events:none;',
    '  transition:opacity 0.35s ease, transform 0.35s ease;',
    '  transform:translateY(16px);',
    '}',
    '.sb-float.visible {',
    '  opacity:1; pointer-events:auto; transform:translateY(0);',
    '}',
    /* Action items - hidden until expanded */
    '.sb-float-actions {',
    '  display:flex; flex-direction:column; align-items:flex-end; gap:8px;',
    '  opacity:0; pointer-events:none;',
    '  transform:translateY(10px);',
    '  transition:opacity 0.25s ease, transform 0.25s ease;',
    '}',
    '.sb-float.open .sb-float-actions {',
    '  opacity:1; pointer-events:auto; transform:translateY(0);',
    '}',
    /* Each action row */
    '.sb-float-action {',
    '  display:flex; align-items:center; gap:10px;',
    '  text-decoration:none;',
    '}',
    '.sb-float-action-label {',
    '  background:rgba(10,37,64,0.92);',
    '  backdrop-filter:blur(8px);',
    '  color:white; font-family:\'DM Sans\',sans-serif;',
    '  font-size:0.82rem; font-weight:500;',
    '  padding:7px 14px; border-radius:100px;',
    '  white-space:nowrap; letter-spacing:0.02em;',
    '  box-shadow:0 2px 12px rgba(0,0,0,0.2);',
    '}',
    '.sb-float-action-btn {',
    '  width:48px; height:48px; border-radius:50%;',
    '  display:flex; align-items:center; justify-content:center;',
    '  flex-shrink:0; box-shadow:0 3px 14px rgba(0,0,0,0.2);',
    '  transition:transform 0.2s;',
    '}',
    '.sb-float-action:hover .sb-float-action-btn { transform:scale(1.08); }',
    '.sb-float-action-btn.wa { background:#25D366; }',
    '.sb-float-action-btn.ph { background:#1a6bbc; }',
    '.sb-float-action-btn svg { width:22px; height:22px; }',
    /* Main toggle button */
    '.sb-float-main {',
    '  width:58px; height:58px; border-radius:50%;',
    '  background:var(--navy,#0a2540);',
    '  display:flex; align-items:center; justify-content:center;',
    '  cursor:pointer; border:none;',
    '  box-shadow:0 4px 20px rgba(10,37,64,0.35);',
    '  transition:background 0.2s, transform 0.2s;',
    '  position:relative;',
    '}',
    '.sb-float-main:hover { background:#1a6bbc; transform:scale(1.05); }',
    '.sb-float-main svg {',
    '  width:26px; height:26px; fill:none;',
    '  stroke:white; stroke-width:2;',
    '  stroke-linecap:round; stroke-linejoin:round;',
    '  position:absolute;',
    '  transition:opacity 0.2s, transform 0.2s;',
    '}',
    '.sb-float-main .icon-msg { opacity:1; transform:scale(1); }',
    '.sb-float-main .icon-close { opacity:0; transform:scale(0.5) rotate(-90deg); }',
    '.sb-float.open .sb-float-main .icon-msg { opacity:0; transform:scale(0.5) rotate(90deg); }',
    '.sb-float.open .sb-float-main .icon-close { opacity:1; transform:scale(1) rotate(0deg); }',
    /* Pulse ring */
    '.sb-float-main::after {',
    '  content:""; position:absolute; inset:-5px;',
    '  border-radius:50%; border:2px solid rgba(26,107,188,0.4);',
    '  animation:sbPulse 2.5s 2s infinite;',
    '}',
    '.sb-float.open .sb-float-main::after { animation:none; border-color:transparent; }',
    '@keyframes sbPulse {',
    '  0%  {transform:scale(1);opacity:0.7}',
    '  70% {transform:scale(1.5);opacity:0}',
    '  100%{transform:scale(1.5);opacity:0}',
    '}',

    /* Cookie banner */
    '.sb-cookie {',
    '  position:fixed; bottom:0; left:0; right:0; z-index:9999;',
    '  background:rgba(10,37,64,0.97);',
    '  backdrop-filter:blur(12px);',
    '  border-top:1px solid rgba(255,255,255,0.1);',
    '  padding:1.2rem 5vw;',
    '  display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;',
    '  font-family:\'DM Sans\',sans-serif;',
    '  animation:sbCookieSlide 0.4s ease both;',
    '}',
    '@keyframes sbCookieSlide {',
    '  from{transform:translateY(100%)}',
    '  to  {transform:translateY(0)}',
    '}',
    '.sb-cookie-text {',
    '  flex:1; min-width:200px;',
    '  font-size:0.84rem; color:rgba(255,255,255,0.75);',
    '  line-height:1.6; font-weight:300;',
    '}',
    '.sb-cookie-text a { color:#3a8fd4; text-decoration:none; }',
    '.sb-cookie-text a:hover { text-decoration:underline; }',
    '.sb-cookie-text strong { color:white; font-weight:500; }',
    '.sb-cookie-btns { display:flex; gap:10px; flex-shrink:0; flex-wrap:wrap; }',
    '.sb-cookie-accept {',
    '  background:#1a6bbc; color:white;',
    '  padding:9px 22px; border-radius:100px;',
    '  font-family:\'DM Sans\',sans-serif; font-size:0.85rem; font-weight:500;',
    '  border:none; cursor:pointer; transition:background 0.2s;',
    '  white-space:nowrap;',
    '}',
    '.sb-cookie-accept:hover { background:#3a8fd4; }',
    '.sb-cookie-reject {',
    '  background:transparent; color:rgba(255,255,255,0.55);',
    '  padding:9px 16px; border-radius:100px;',
    '  font-family:\'DM Sans\',sans-serif; font-size:0.85rem; font-weight:400;',
    '  border:1px solid rgba(255,255,255,0.15); cursor:pointer;',
    '  transition:all 0.2s; white-space:nowrap;',
    '}',
    '.sb-cookie-reject:hover { color:white; border-color:rgba(255,255,255,0.35); }',
    '@media(max-width:600px){',
    '  .sb-cookie { flex-direction:column; gap:1rem; }',
    '  .sb-cookie-btns { width:100%; }',
    '  .sb-cookie-accept, .sb-cookie-reject { flex:1; text-align:center; }',
    '  .sb-float { bottom:16px; right:16px; }',
    '  .sb-float-main { width:52px; height:52px; }',
    '  .sb-float-main svg { width:22px; height:22px; }',
    '}'

  ].join('\n');
  document.head.appendChild(style);

  /* ── COOKIE HELPERS ── */
  function getCookie(name) {
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name + '=') === 0) return c.substring(name.length + 1);
    }
    return null;
  }
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  /* ── KONTAKT FLOAT BUTTON ── */
  function renderFloatBtn() {
    var waUrl = 'https://wa.me/' + CONFIG.whatsapp.number
              + '?text=' + encodeURIComponent(CONFIG.whatsapp.message);

    var wrap = document.createElement('div');
    wrap.className = 'sb-float';
    wrap.id = 'sbFloat';
    wrap.innerHTML = [
      '<div class="sb-float-actions" id="sbFloatActions">',
        // WhatsApp
        '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="sb-float-action">',
          '<span class="sb-float-action-label">WhatsApp</span>',
          '<div class="sb-float-action-btn wa">',
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
              '<path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>',
              '<path fill="white" d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.858L.054 23.368a.75.75 0 00.916.916l5.51-1.478A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM12 22a9.951 9.951 0 01-5.031-1.362l-.36-.214-3.732 1.001 1-3.731-.233-.374A9.951 9.951 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>',
            '</svg>',
          '</div>',
        '</a>',
        // Phone
        '<a href="tel:' + CONFIG.phone.number + '" class="sb-float-action">',
          '<span class="sb-float-action-label">' + CONFIG.phone.display + '</span>',
          '<div class="sb-float-action-btn ph">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
              '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
            '</svg>',
          '</div>',
        '</a>',
      '</div>',
      // Main toggle button
      '<button class="sb-float-main" id="sbFloatMain" aria-label="Kontakt">',
        '<svg class="icon-msg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
        '<svg class="icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      '</button>',
    ].join('');

    document.body.appendChild(wrap);

    // Toggle open/close
    document.getElementById('sbFloatMain').addEventListener('click', function() {
      wrap.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });

    // Show after scrolling down ~200px
    function checkFloatScroll() {
      var footer = document.querySelector('footer');
      var footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight - 60;
      if (window.scrollY > 200 && !footerVisible) {
        wrap.classList.add('visible');
      } else {
        wrap.classList.remove('visible');
        wrap.classList.remove('open');
      }
    }
    window.addEventListener('scroll', checkFloatScroll, { passive: true });
    checkFloatScroll();
  }

  /* ── COOKIE BANNER ── */
  function renderCookieBanner() {
    if (getCookie(CONFIG.cookieName)) return; // already accepted/rejected

    var banner = document.createElement('div');
    banner.className = 'sb-cookie';
    banner.id = 'sbCookieBanner';
    banner.innerHTML = [
      '<div class="sb-cookie-text">',
        '<strong>Ta strona używa plików cookies.</strong> ',
        'Używamy cookies w celach analitycznych i funkcjonalnych. ',
        'Korzystając ze strony, wyrażasz zgodę na ich użycie zgodnie z naszą ',
        '<a href="strefa-klienta.html">Polityką prywatności</a>.',
      '</div>',
      '<div class="sb-cookie-btns">',
        '<button class="sb-cookie-accept" id="sbCookieAccept">Akceptuję</button>',
        '<button class="sb-cookie-reject" id="sbCookieReject">Tylko niezbędne</button>',
      '</div>'
    ].join('');
    document.body.appendChild(banner);

    function closeBanner(accepted) {
      setCookie(CONFIG.cookieName, accepted ? '1' : '0', CONFIG.cookieDays);
      banner.style.transform = 'translateY(110%)';
      banner.style.transition = 'transform 0.4s ease';
      setTimeout(function() { banner.remove(); }, 420);
    }

    document.getElementById('sbCookieAccept').addEventListener('click', function() { closeBanner(true); });
    document.getElementById('sbCookieReject').addEventListener('click', function() { closeBanner(false); });
  }

  /* ── INIT ── */
  function init() {
    renderFloatBtn();
    initLoadingScreen();
    initParallax();
    initCursorGlow();
    initTilt();
    initTypewriter();
    initGradientMesh();

    // Cookie banner after scroll
    if (!getCookie(CONFIG.cookieName)) {
      var shown = false;
      function checkScroll() {
        if (shown) return;
        var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrolled > 0.28 || window.scrollY > 400) {
          shown = true;
          window.removeEventListener('scroll', checkScroll);
          renderCookieBanner();
        }
      }
      window.addEventListener('scroll', checkScroll, { passive: true });
      // Banner shows only on scroll - no timer fallback
    }
  }

  /* ══════════════════════════════════════════
     1. LOADING SCREEN
     Pokazuje się przy wejściu, znika po 0.8s
  ══════════════════════════════════════════ */
  function initLoadingScreen() {
    if (!document.getElementById('hero')) return;
    if (sessionStorage.getItem('sb_loaded')) return;
    sessionStorage.setItem('sb_loaded', '1');

    var st = document.createElement('style');
    st.textContent = [
      /* Modern dark loading screen */
      '#sb-loader{position:fixed;inset:0;z-index:99999;',
      'background:#060e1c;',
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;',
      'transition:opacity 0.5s ease;}',
      '#sb-loader.hide{opacity:0;pointer-events:none;}',

      /* Logo mark */
      '#sb-loader-mark{',
      'width:56px;height:56px;border-radius:12px;overflow:hidden;margin-bottom:20px;',
      'opacity:0;transform:scale(0.8);',
      'animation:slPop 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) forwards;}',
      '#sb-loader-mark img{width:100%;height:100%;object-fit:contain;}',
      '@keyframes slPop{to{opacity:1;transform:scale(1)}}',

      /* Brand name */
      '#sb-loader-brand{',
      'font-family:"Outfit","Space Grotesk",sans-serif;font-size:1.5rem;font-weight:700;',
      'letter-spacing:0.02em;margin-bottom:32px;',
      'opacity:0;transform:translateY(6px);',
      'animation:slFade 0.4s 0.3s ease forwards;}',
      '#sb-loader-brand .soul{color:#1a6bbc;}',
      '#sb-loader-brand .bro{color:rgba(255,255,255,0.9);}',
      '@keyframes slFade{to{opacity:1;transform:translateY(0)}}',

      /* Progress line */
      '#sb-loader-line{',
      'width:140px;height:1.5px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;',
      'opacity:0;animation:slFade 0.3s 0.4s ease forwards;}',
      '#sb-loader-line-fill{',
      'height:100%;width:0;background:linear-gradient(90deg,#1a6bbc,#c9963a);',
      'border-radius:2px;animation:slBar 0.7s 0.45s ease forwards;}',
      '@keyframes slBar{to{width:100%}}',
    ].join('');
    document.head.appendChild(st);

    var loader = document.createElement('div');
    loader.id = 'sb-loader';
    var logoSrc = document.querySelector('.nav-logo img');
    loader.innerHTML = '<div id="sb-loader-mark">' + (logoSrc ? '<img src="' + logoSrc.src + '" alt="">' : '') + '</div>'
      + '<div id="sb-loader-brand"><span class="soul">Soul</span><span class="bro">Brothers</span></div>'
      + '<div id="sb-loader-line"><div id="sb-loader-line-fill"></div></div>';
    document.body.appendChild(loader);

    setTimeout(function() {
      loader.classList.add('hide');
      setTimeout(function() { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 550);
    }, 950);
  }

  /* ══════════════════════════════════════════
     2. PARALLAX NA HERO
     Zdjęcie przesuwa się wolniej niż scroll
  ══════════════════════════════════════════ */
  function initParallax() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var slides = hero.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function() {
        var scrolled = window.scrollY;
        var speed = 0.35; // 0 = no parallax, 0.5 = half speed
        var offset = scrolled * speed;
        slides.forEach(function(slide) {
          slide.style.transform = 'translateY(' + offset + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     3. CURSOR GLOW
     Subtelna poświata podążająca za kursorem
     Tylko desktop
  ══════════════════════════════════════════ */
  function initCursorGlow() {
    if (window.matchMedia('(pointer:coarse)').matches) return; // skip touch devices

    var s = document.createElement('style');
    s.textContent = [
      '#sb-glow{position:fixed;pointer-events:none;z-index:9998;',
      'width:420px;height:420px;border-radius:50%;',
      'background:radial-gradient(circle,rgba(26,107,188,0.10) 0%,rgba(26,107,188,0.04) 40%,transparent 70%);',
      'transform:translate(-50%,-50%);',
      'transition:opacity 0.3s ease;opacity:0;}',
    ].join('');
    document.head.appendChild(s);

    var glow = document.createElement('div');
    glow.id = 'sb-glow';
    document.body.appendChild(glow);

    var mx = -999, my = -999, cx = -999, cy = -999;
    var visible = false;

    document.addEventListener('mousemove', function(e) {
      mx = e.clientX; my = e.clientY;
      if (!visible) { glow.style.opacity = '1'; visible = true; }
    });
    document.addEventListener('mouseleave', function() {
      glow.style.opacity = '0'; visible = false;
    });

    // Smooth follow with lerp
    (function loop() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* ══════════════════════════════════════════
     4. 3D TILT NA KARTACH PRODUKTÓW
     Karta obraca się w kierunku kursora
  ══════════════════════════════════════════ */
  function initTilt() {
    if (window.matchMedia('(pointer:coarse)').matches) return;

    function applyTilt(el) {
      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5..0.5
        var y = (e.clientY - rect.top)  / rect.height - 0.5;
        var intensity = 8; // degrees max
        el.style.transform = [
          'translateY(-6px) scale(1.01)',
          'rotateX(' + (-y * intensity) + 'deg)',
          'rotateY(' + ( x * intensity) + 'deg)',
        ].join(' ');
        el.style.transition = 'transform 0.1s ease';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25,0.8,0.25,1)';
      });
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
    }

    // Apply to product cards - also watch for dynamically rendered cards
    function attachTilt() {
      document.querySelectorAll('.pcard, .mini-card').forEach(function(card) {
        if (card.dataset.tilt) return;
        card.dataset.tilt = '1';
        applyTilt(card);
      });
    }

    attachTilt();
    // Re-run when carousel switches category
    var observer = new MutationObserver(attachTilt);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ══════════════════════════════════════════
     5. TYPEWRITER NA HERO
     Zmienia jedno słowo co kilka sekund
  ══════════════════════════════════════════ */
  function initTypewriter() {
    var h1 = document.querySelector('.hero h1');
    if (!h1) return;

    var words = ['twoja oaza', 'Twoje spa', 'Twoja balia', 'Twój basen', 'Twój relaks'];
    var idx = 0;

    // Wrap the italic em in a typewriter span
    var em = h1.querySelector('em');
    if (!em) return;

    var s = document.createElement('style');
    s.textContent = [
      '.sb-tw{display:inline-block;position:relative;}',
      '.sb-tw::after{content:"|";margin-left:1px;',
      'animation:sbCaret 1s infinite;color:var(--gold-light,#e8b860);}',
      '@keyframes sbCaret{0%,100%{opacity:1}50%{opacity:0}}',
      '.sb-tw-out{animation:sbTwOut 0.3s ease forwards;}',
      '.sb-tw-in {animation:sbTwIn  0.35s ease both;}',
      '@keyframes sbTwOut{to{opacity:0;transform:translateY(-12px)}}',
      '@keyframes sbTwIn {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
    ].join('');
    document.head.appendChild(s);

    em.innerHTML = '<span class="sb-tw">' + em.textContent + '</span>';
    var tw = em.querySelector('.sb-tw');

    setInterval(function() {
      tw.classList.add('sb-tw-out');
      setTimeout(function() {
        idx = (idx + 1) % words.length;
        tw.textContent = words[idx];
        tw.classList.remove('sb-tw-out');
        tw.classList.add('sb-tw-in');
        setTimeout(function() { tw.classList.remove('sb-tw-in'); }, 400);
      }, 300);
    }, 2800);
  }

  /* ══════════════════════════════════════════
     6. GRADIENT MESH
     Animowane tło na sekcji statystyk
  ══════════════════════════════════════════ */
  function initGradientMesh() {
    var stats = document.querySelector('.stats');
    if (!stats) return;

    var s = document.createElement('style');
    s.textContent = [
      '.stats{position:relative;overflow:hidden;}',
      '#sb-mesh{position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0.55;}',
      '.stats > *:not(#sb-mesh){position:relative;z-index:1;}',
      '@keyframes sbMesh1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-20px) scale(1.1)}}',
      '@keyframes sbMesh2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,30px) scale(0.95)}}',
      '@keyframes sbMesh3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,40px) scale(1.05)}}',
    ].join('');
    document.head.appendChild(s);

    var mesh = document.createElement('div');
    mesh.id = 'sb-mesh';
    mesh.innerHTML = [
      '<svg width="100%" height="100%" viewBox="0 0 800 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">',
        '<defs>',
          '<radialGradient id="mg1" cx="50%" cy="50%" r="50%">',
            '<stop offset="0%" stop-color="#1a6bbc" stop-opacity="0.7"/>',
            '<stop offset="100%" stop-color="#1a6bbc" stop-opacity="0"/>',
          '</radialGradient>',
          '<radialGradient id="mg2" cx="50%" cy="50%" r="50%">',
            '<stop offset="0%" stop-color="#c9963a" stop-opacity="0.5"/>',
            '<stop offset="100%" stop-color="#c9963a" stop-opacity="0"/>',
          '</radialGradient>',
          '<radialGradient id="mg3" cx="50%" cy="50%" r="50%">',
            '<stop offset="0%" stop-color="#3a8fd4" stop-opacity="0.45"/>',
            '<stop offset="100%" stop-color="#3a8fd4" stop-opacity="0"/>',
          '</radialGradient>',
        '</defs>',
        '<ellipse cx="150" cy="80" rx="220" ry="140" fill="url(#mg1)" style="animation:sbMesh1 8s ease-in-out infinite"/>',
        '<ellipse cx="650" cy="60" rx="200" ry="120" fill="url(#mg2)" style="animation:sbMesh2 10s ease-in-out infinite"/>',
        '<ellipse cx="400" cy="120" rx="250" ry="100" fill="url(#mg3)" style="animation:sbMesh3 12s ease-in-out infinite"/>',
      '</svg>',
    ].join('');
    stats.insertBefore(mesh, stats.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
