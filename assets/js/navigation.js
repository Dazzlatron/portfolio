class NavigationComponent extends HTMLElement {
  connectedCallback() {
    // Get attributes for configuration
    const homeLink = this.getAttribute('home-link') || '../index.html';
    const assetPath = this.getAttribute('asset-path') || '../assets';
    const aboutMeLink = this.getAttribute('about-me-link') || '../index.html#about-me';
    
    // Helper function to generate arrow SVG
    const arrowSvg = (width = 12, height = 12) => `
      <svg class="arrow-svg" width="${width}" height="${height}" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12L1 1" stroke="#A6A6A6" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 3V12H3" stroke="#A6A6A6" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    this.innerHTML = `
       <header id="mobile-tablet-header" class="header hidden">
        <div class="nav-wrapper">
          <div class="logo">
            <img class="top-nav-logo" src="${assetPath}/images/Logo-animation_rollover_05.25.gif" alt="Logo">
          </div>
          
          <!-- Horizontal navigation for tablet (768-1180px) -->
          <ul class="nav-links-tablet">
            <li><a href="${homeLink}">Projects</a></li>
            <li><a href="${aboutMeLink}">About me</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          
          <nav class="main-nav">
            <div class="menu-btn" id="menu-btn">
              <div class="menu-btn__burger"></div>
            </div> <!-- Hamburger -->
            <div class="theme-switch" title="Toggle dark mode">
              <div class="toggle-switch">
                <div class="toggle-ball"></div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      
      <!-- Mobile navigation moved outside header to fix stacking context -->
      <ul class="nav-links">
        <li class="nav-item">
          <a href="${homeLink}">
            <span class="nav-text">&nbsp;Projects&nbsp;</span>
            <span class="nav-arrow"></span>
          </a>
        </li>
        <li class="nav-item">
          <a href="${aboutMeLink}">
            <span class="nav-text">&nbsp;About me&nbsp;</span>
            <span class="nav-arrow"></span>
          </a>
        </li>
         
         
        <li><a href="#contact">Contact</a></li>
      </ul>

      <aside class="side-nav">
        <nav id="top-nav">
          <div class="nav-style">
            <img class="top-logo" src="${assetPath}/images/Logo-animation_rollover_05.25.gif" alt="Logo">
            
            <ul class="menu">
              <li class="nav-item">
                <a href="${homeLink}">
                  <span class="nav-text">&nbsp;Projects&nbsp;</span>
                  <span class="nav-arrow">${arrowSvg(12, 12)}</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="${aboutMeLink}">
                  <span class="nav-text">&nbsp;About me&nbsp;</span>
                  <span class="nav-arrow">${arrowSvg(12, 12)}</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#contact">
                  <span class="nav-text">&nbsp;Contact&nbsp;</span>
                  <span class="nav-arrow">${arrowSvg(12, 12)}</span>
                </a>
              </li>
              <li class="theme-switch padding-top-10">
                <div class="toggle-switch">
                  <div class="toggle-ball"></div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div class="top">
          <img class="to-top-icon" src="${assetPath}/images/to-top.svg" alt="To top">
        </div>
      </aside>
    `;
  }
}

customElements.define("navigation-component", NavigationComponent);
