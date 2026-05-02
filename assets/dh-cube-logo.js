/**
 * DH Cube Logo — Custom Web Component
 * Usage: <dh-cube-logo size="120" speed="8"></dh-cube-logo>
 */
class DHCubeLogo extends HTMLElement {
  connectedCallback() {
    const size   = parseInt(this.getAttribute('size')  || '120');
    const speed  = parseFloat(this.getAttribute('speed') || '8');
    const half   = size / 2;
    const border = Math.max(1, Math.round(size / 60));
    const fSize  = (size * 0.233).toFixed(1);
    const fSizeL = (size * 0.317).toFixed(1);
    const innerS = (size * 0.667).toFixed(1);
    const innerI = (size * 0.417).toFixed(1);

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }
        .scene {
          width: ${size}px;
          height: ${size}px;
          perspective: ${size * 5}px;
          position: relative;
        }
        .scene::after {
          content: '';
          position: absolute;
          inset: -${size * 0.17}px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(255,21,21,0.08) 0%, transparent 70%);
          animation: glow ${speed * 0.375}s ease-in-out infinite;
          pointer-events: none;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin ${speed}s cubic-bezier(0.45,0.05,0.55,0.95) infinite;
          cursor: pointer;
        }
        .cube:hover { animation-play-state: paused; }
        @keyframes spin {
          0%   { transform: rotateX(-20deg) rotateY(0deg); }
          25%  { transform: rotateX(-20deg) rotateY(90deg); }
          50%  { transform: rotateX(-20deg) rotateY(180deg); }
          75%  { transform: rotateX(-20deg) rotateY(270deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }
        @keyframes glow {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:1;  transform:scale(1.15); }
        }
        .face {
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: ${border}px solid rgba(255,21,21,0.6);
          font-size: ${fSize}px;
          font-weight: 900;
          letter-spacing: -${size * 0.017}px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          user-select: none;
        }
        .face-front  { background:rgba(30,30,30,.92); transform:translateZ(${half}px); }
        .face-back   { background:rgba(20,20,20,.92); transform:rotateY(180deg) translateZ(${half}px); }
        .face-right  { background:rgba(25,25,25,.92); transform:rotateY(90deg)  translateZ(${half}px); }
        .face-left   { background:rgba(25,25,25,.92); transform:rotateY(-90deg) translateZ(${half}px); }
        .face-top    { background:rgba(18,18,18,.92); transform:rotateX(90deg)  translateZ(${half}px); }
        .face-bottom { background:rgba(18,18,18,.92); transform:rotateX(-90deg) translateZ(${half}px); }

        .d {
          color:#FF1515;
          text-shadow:0 0 ${size*.083}px rgba(255,21,21,.8),0 0 ${size*.25}px rgba(255,21,21,.4);
        }
        .h {
          color:#fbfbfb;
          text-shadow:0 0 ${size*.083}px rgba(255,255,255,.3);
        }
        .single { font-size:${fSizeL}px; letter-spacing:0; }
        .inner {
          width:${innerS}px; height:${innerS}px;
          border:${border}px solid rgba(255,21,21,.4);
          display:flex; align-items:center; justify-content:center;
          transform:rotate(45deg);
        }
        .inner::before {
          content:'';
          width:${innerI}px; height:${innerI}px;
          border:1px solid rgba(255,21,21,.3);
          display:block;
        }
        .shadow {
          position:absolute;
          bottom:-${size*.33}px;
          left:50%;
          transform:translateX(-50%);
          width:${size*.667}px;
          height:${size*.133}px;
          background:radial-gradient(ellipse,rgba(255,21,21,.25) 0%,transparent 70%);
          animation:shad ${speed}s cubic-bezier(0.45,0.05,0.55,0.95) infinite;
        }
        @keyframes shad {
          0%,100% { opacity:.7; transform:translateX(-50%) scaleX(.8); }
          50%      { opacity:.4; transform:translateX(-50%) scaleX(1.1); }
        }
      </style>
      <div class="wrap">
        <div class="scene">
          <div class="cube">
            <div class="face face-front"><span class="d">D</span><span class="h">H</span></div>
            <div class="face face-back"><span class="h">H</span><span class="d">D</span></div>
            <div class="face face-right"><span class="h single">H</span></div>
            <div class="face face-left"><span class="d single">D</span></div>
            <div class="face face-top"><div class="inner"></div></div>
            <div class="face face-bottom"><div class="inner"></div></div>
          </div>
        </div>
        <div class="shadow"></div>
      </div>
    `;
  }
}

customElements.define('dh-cube-logo', DHCubeLogo);
