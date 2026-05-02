class ContactSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="contact parallax" data-speed="0.3">
     <div class="spacer-3rem"></div>
    <div class="cont twelve">
      <div class="col-1 process-heading section-header-row">
    <h2 class="section-header-28">Get in touch<span class="rdot">.</span></h2><span class="heading-arrow"><svg class="arrow-svg" width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12L1 1" stroke="#A6A6A6" stroke-width="1" stroke-linecap="round"></path><path d="M12 3V12H3" stroke="#A6A6A6" stroke-width="1" stroke-linecap="round"></path></svg></span>
  
    </div>
    </div>
    <!--SPACER-->
  <div class="spacer-1-5rem mobile-0-8-rem"></div>
  <!--SPACER-->
    <div class="cont seven-five">
      <div class="col-1">
      <h2 class="section-header light-header">Feel free to drop me a message if you would like to work together and even if you'd just like to say hi. </h2>
  
    </div>
    </div>
    
    <!--SPACER-->
  <div class="spacer-1-5rem mobile-0-8-rem"></div>
  <!--SPACER-->
    <div class="cont contact-gap six-six">
      <div class="col-1">
        <div class="form-container">
          <form id="contact-form" action="/contact-form.php" method="POST">
            <div class="form-row">
              <div>
              <label for="first-name" class="sr-only hidden">First name</label>
                <input type="text" aria-label="First name" id="first-name" name="name" required placeholder="Name">
              </div>
              <div>
              <label for="email" class="sr-only hidden">Email Address</label>
                <input type="email" aria-label="Email Address" id="email" name="email" required placeholder="Email">
              </div>
            </div>
              
            <div class="form-row" style="flex-direction: column;">
              <label for="message" class="sr-only hidden">Message text</label>
              <textarea id="message" aria-label="Message text" name="message" required placeholder="Message"></textarea>
            </div>
      
            <div class="submit-button-box">
                <label for="message" class="sr-only hidden">Message text</label>
              <input class="submit-button" aria-label="Submit form" type="submit" value="Submit">
            </div>
          </form>
          <!-- Message will appear here -->
          <div id="formMessage" style="display: none; margin-top: 15px; padding: 10px; border-radius: 5px;"></div>
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
      <div class="map-container container">
          <div class="spacer-3rem"></div>
          <div class="row icon-row">
            <div class="icon"><img class="ico-location" src="../assets/images/location-icon-2.svg" loading="lazy"/></div>
            <div class="icon-text"><p class="description">Current Location - London, United Kingdom&nbsp;&nbsp;|&nbsp;&nbsp;Available globally</p></div>
          </div>
          <div id="map"></div>
          
      </div>
      <div class="spacer-4rem"></div>
      <div class="copyright">
      
      <div class="copy-text"> 
        <img src="assets/images/small-logo-footer.png" alt="Daryn Higginson" class="sm-logo">
        <p>&nbsp;&nbsp;|&nbsp;&nbsp;Designed & Built by Daryn Higginson with 💛<span class="copy-pipe">&nbsp;&nbsp;|&nbsp;&nbsp;</span><br class="copy-break">© 2026 Daryn Higginson. All rights reserved.
          </p>
      </div>
    </div>
  </section>
    `;

    // Form submission handler
    const form = this.querySelector('#contact-form');
    const messageDiv = this.querySelector('#formMessage');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#e3f2fd';
      messageDiv.style.color = '#1976d2';
      messageDiv.innerHTML = 'Sending your message...';
      
      fetch('/contact-form.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.innerHTML = 'Thanks for contacting me! I will be in touch as soon as I see this message.';
        form.reset();
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 8000);
      })
      .catch(error => {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.innerHTML = 'Oops! Something went wrong. Please try again or email me directly.';
      });
    });

    // Re-run image theming now that .sm-logo exists in the DOM
    if (typeof updateImagesForDarkMode === 'function') {
      updateImagesForDarkMode(document.body.classList.contains('dark-mode'));
    }

    // Google Maps initialization
    this.initializeMap();
  }

  initializeMap() {
    // Wait a bit for the component to fully render
    setTimeout(() => {
      const london = { lat: 51.46, lng: -0.04 };
      const mapElement = this.querySelector("#map");
      
      if (!mapElement) {
        console.log("Map element not found!");
        return;
      }
      
      if (typeof google === 'undefined') {
        console.log("Google Maps not loaded yet");
        return;
      }
      
      const map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: london,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          { featureType: "all", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
          { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#444444" }] },
          { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
          { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
          { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
          { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
          { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
          { featureType: "water", elementType: "all", stylers: [{ color: "#d3d3d3" }, { visibility: "on" }] }
        ]
      });
      
      new google.maps.Marker({
        position: london,
        map: map,
        title: "London"
      });
    }, 500);
  }
}

customElements.define("contact-section", ContactSection);