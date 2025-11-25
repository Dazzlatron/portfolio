class ContactSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `


    <section class="contact parallax" data-speed="0.3">
    
    <div class="cont twelve">
      <div class="col-1 process-heading section-header-row">
    <h2 class="section-header-28">Get in touch<span class="rdot">.</span></h2><span class="heading-arrow"><svg class="arrow-svg" width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12L1 1" stroke="#A6A6A6" stroke-width="1" stroke-linecap="round"></path><path d="M12 3V12H3" stroke="#A6A6A6" stroke-width="1" stroke-linecap="round"></path></svg></span><span class="section-header-underline"></span>
  
    </div>
    </div>
    <!--SPACER-->
  <div class="spacer-1-5rem mobile-0-8-rem"></div>
  <!--SPACER-->
    <div class="cont seven-five">
      <div class="col-1 section-header-row">
      <h2 class="section-header light-header">Feel free to drop me a message if you would like to work together and even if you’d just like to say hi. </h2>
  
    </div>
    </div>
    
    <!--SPACER-->
  <div class="spacer-1-5rem mobile-0-8-rem"></div>
  <!--SPACER-->
    <div class="cont contact-gap six-six">
      <div class="col-1">
        <div class="form-container">
          <form action="https://formspree.io/f/dazgraphic@gmail.com" method="POST">
            <div class="form-row">
              <div>
                
                <input type="text" id="first-name" name="name" required placeholder="Name">
              </div>
              <div>
               
                <input type="email" id="email" name="email" required placeholder="Email">
              </div>
            </div>
      
            <div class="form-row" style="flex-direction: column;">
              
              <textarea id="message" name="message" required placeholder="Message"></textarea>
            </div>
      
            <div class="submit-button-box">
              <input class="submit-button" type="submit" value="Submit">
            </div>
          </form>
        </div>
      </div>
      <div class="col-2">
         <div class="contact-info">
               
              <div class="row icon-row">
                <div class="icon"><img class="ico-email" src="../assets/images/Email-icon-2.svg" loading="lazy"/></div>
                <div class="icon-text"><a class="description" href="mailto:dazgraphic@gmail.com">dazgraphic@gmail.com</a></div>
              </div>
              <div class="row icon-row">
                <div class="icon"><img class="ico-linkedin" src="../assets/images/linkedin-icon-2.svg" loading="lazy"/></div>
                <div class="icon-text"><a class="description" href="https://www.linkedin.com/in/darynhigginson?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUmNU5IfNRbexSo5yPa5PMQ%3D%3D" target="_blank">LinkedIn</a></div>
              </div>
              <div class="row icon-row">
                <div class="icon"><img class="ico-linkedin" src="../assets/images/bluesky-logo.svg" loading="lazy"/></div>
                <div class="icon-text"><a class="description" href="https://bsky.app/profile/dazlatron.bsky.social" target="_blank">@dazlatron.bsky.social</a></div>
              </div>
            </div>
      </div>
      
      </div>
      <div class="spacer-4rem"></div>
      <div class="copyright">
      
      <div class="copy-text"> 
        <img src="assets/images/small-logo-footer.png" alt="Daryn Higginson" class="sm-logo">
        <p>&nbsp;&nbsp;|&nbsp;&nbsp;Designed & Built by Daryn Higginson with 💛<span class="copy-pipe">&nbsp;&nbsp;|&nbsp;&nbsp;</span><br class="copy-break">© 2025 Daryn Higginson. All rights reserved.
          </p>
      </div>
    </div>
  </section>

    `;
  }
}

customElements.define("contact-section", ContactSection);
