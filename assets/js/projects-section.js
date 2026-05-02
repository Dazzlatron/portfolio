class ProjectsSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Default: Desktop/Tablet - show reveal-elements, hide mobile */
        
        
        #reveal-elements-mobile {
          display: none;
        }
        
        /* Mobile - hide desktop, show mobile */
        @media (max-width: 768px) {
          #reveal-elements {
            display: none;
          }
          
          #reveal-elements-mobile {
            display: block;
          }
        }
        
        /* Desktop/Tablet - show desktop, hide mobile */
        @media screen and (min-width: 768px) {
         
          
          #reveal-elements-mobile {
            display: none;
          }
        }
      </style>
      
      <section id="reveal-elements" class="projects">
      <!--left column start-->
      <span id="projects" class="anchor"></span>
      <div class="column">
           <!--## PROJECT 1 ##-->
          <div class="project project-left parallax" id="project1" data-speed="0.3">
          
              <div class="flex proj-wrap p-wrap-left-1">
                  <div class="number-col"><img class="number no-1" src="assets/images/0-1.svg" loading="lazy"></div>
                  <div class="right-of-number">
                      <div class="image-container">
                  <img class="thumbnail static-image" src="assets/images/budgie-thumbnail.png" loading="lazy">
                 <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
              </div>
              <div class="description-cont">
                  <p class="taxonomy">UX DESIGN</p>
                  <h3 class="section-header">Budgie. Your budget buddy</h3>

                  <p class="biriyani-light description ">Budgie helps users create smart shopping lists, find the best prices for specific items, and discover budget-friendly recipe ideas—all in one&nbsp;place.  </p>
   
                  <a href="pages/budgie" class="gradient-button">View case study</a>
                </div>
                </div>
              </div>
          </div>
          
          <!--## PROJECT 3 ##-->
          <div class="project project-left parallax" id="project3" data-speed="0.2">
             
              <div class="proj-wrap p-wrap-left-2">
                  <img class="number no-3" src="assets/images/0-3.svg" loading="lazy">
            <br>
            <div class="image-container">
            <img class="thumbnail-left thumb static-image" src="assets/images/Demo-form-thumbnail.png" loading="lazy">
            <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
          </div>
          <div class="description-cont">
          <p class="taxonomy">UX / UI</p>
            <h3 class="section-header">Sales Capture Forms - Country Selection feature</h3>

              <p class="biriyani-light description ">An addition of a comprehensive country selection list paired with an autocomplete feature to streamline the form filling process, improving quality of leads and location data captured.  </p>
  
              <a href="pages/form-optimisation" class="gradient-button">View case study</a>
              </div>
      </div>
          </div>
            <!--## PROJECT 5 ##-->
            <div class="project project-left parallax" id="project5" data-speed="0.3">
          
              <div class="flex proj-wrap p-wrap-left-3">
                  <div class="number-col"><img class="number no-5" src="assets/images/0-5.svg" loading="lazy"></div>
                  <div class="right-of-number">
                      <div class="image-container">
                  <img class="thumbnail static-image" src="assets/images/LoopNet-mockup-browser.png" loading="lazy">
                 <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
              </div>
              <div class="description-cont">
                  <p class="taxonomy">WEB DEVELOPMENT</p>
                  <h3 class="section-header">LoopNet Solutions Website</h3>
                  <p class="biriyani-light description">When LoopNet launched in the UK, I built the new marketing website using Site Studio and created a drag-and-drop UI component library to make updates easy for non-technical users.</p>
                  <a href="pages/loopnet-solutions" class="gradient-button">View case study</a>
                  </div>
                </div>
              </div>
          </div>
           <!--## PROJECT 7 START##
           <div class="project project-left parallax" id="project7" data-speed="0.3">
          
              <div class="flex proj-wrap p-wrap-left-1">
                  <div class="number-col"><img class="number no-7" src="assets/images/0-7.svg" loading="lazy"></div>
                  <div class="right-of-number">
                      <div class="image-container">
                  <img class="thumbnail static-image" src="assets/images/photography-brochure.png" loading="lazy">
                 <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">
              </div>
              <div class="description-cont">
                  <p class="taxonomy">GRAPHIC DESIGN</p>
                  <h3 class="section-header">CoStar Photography Brochure</h3>
                  <p class="biriyani-light description">A printed brochure showcasing CoStar's architectural photography, including the new brand identity, with a fresh look and&nbsp;feel.   </p>
                  <a href="" class="gradient-button">View case study</a>
                  </div>
                </div>
              </div>
          </div>
          ## PROJECT 7 END ##-->
      </div>
      <!--left column end-->
      <!--right column start-->
      <div class="column">
          <!--## PROJECT 2 ##-->
          <div class="project project-right parallax" id="project2" data-speed="0.35">
            <div class="proj-wrap p-wrap-right-1">
              <img class="number no-2" src="assets/images/0-2.svg" loading="lazy">
        <br>
        <div class="image-container">
        <img class="thumbnail-left thumb static-image" src="assets/images/funds-thumbnail.png" loading="lazy">
        <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
      </div>
      <div class="description-cont">
      <p class="taxonomy">DIGITAL DESIGN&nbsp;&nbsp;|&nbsp;&nbsp;MARKETING</p>
        <h3 class="section-header">Funds information campaign</h3>
        <p class="biriyani-light description">Concept, design and development of a campaign promoting CoStar's new Funds Information product  feature which became our top-performing campaign of&nbsp;2024.  </p>
      <a href="pages/funds-campaign" class="gradient-button">View case study</a>
      </div>
  </div>
          </div>
         
  
          <!--## PROJECT 4 ##-->
          <div class="project project-right parallax" id="project4" data-speed="0.35">
              <div class="proj-wrap p-wrap-right-2">
                <img class="number no-4" src="assets/images/0-4.svg" loading="lazy">
          <br>
          <div class="image-container">
          <img class="thumbnail-left thumb static-image" src="assets/images/CoStar-mockup-browser.png" loading="lazy">
          <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
        </div>
        <div class="description-cont">
        <p class="taxonomy">WEB DESIGN & DEVELOPMENT</p>
          <h3 class="section-header">CoStar website redesign</h3>
          <p class="biriyani-light description" >Redesign and rebuild of CoStar's website, refreshing the look and feel in line with the company's updated brand identity. Focused on modernising the visual design and enhancing the overall user experience.  </p>
        <a href="pages/costar-reskin" class="gradient-button">View case study</a>
        </div>
    </div>
            </div>
             <!--## PROJECT 6 START ##
          <div class="project project-right parallax" id="project6" data-speed="0.3">
          
              <div class="flex proj-wrap p-wrap-right-3">
                  
                  <div class="right-of-number">
                      <div class="image-container">
                  <img class="thumbnail static-image" src="assets/images/persistent-demo-thumbanil.png" loading="lazy">
                 <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">
              </div>
              <div class="description-cont">
                  <p class="taxonomy">UX / UI</p>
                  <h3 class="section-header" >Persistent demo button case study</h3>
                  <p class="biriyani-light description">Evaluating the Impact of a 'Book a Demo' Button on Engagement and Conversions  </p>
                  <a href="" class="gradient-button">View case study</a>
                  </div>
                </div>
                <div class="number-col"><img class="number no-6" src="assets/images/0-6.svg" loading="lazy"></div>
              </div>
          </div>
          ## PROJECT 6 END ##-->
      </div>
      <!--right column end-->
  </section>
      <!--left column start-->
      <span id="projects" class="anchor"></span>
     
    <section id="reveal-elements-mobile" class="projects">
      <!--left column start-->
      <span id="projects" class="anchor"></span>
      <div class="column">
           <!--## PROJECT 1 ##-->
          <div class="project project-left parallax" id="project1" data-speed="0.3">
          
              <div class="flex proj-wrap p-wrap-left-1">
                  <div class="number-col"><img class="number no-1" src="assets/images/0-1.svg" loading="lazy"></div>
                  <div class="right-of-number">
                      <div class="image-container">
                  <img class="thumbnail static-image" src="assets/images/budgie-thumbnail.png" loading="lazy">
                 <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
              </div>
              <div class="description-cont">
                  <p class="taxonomy">UX DESIGN</p>
                  <h3 class="section-header">Budgie. Your budget buddy</h3>

                  <p class="biriyani-light description ">Budgie helps users create smart shopping lists, find the best prices for specific items, and discover budget-friendly recipe ideas—all in one&nbsp;place.  </p>
   
                  <a href="pages/budgie" class="gradient-button">View case study</a>
                </div>
                </div>
              </div>
          </div>
            <!--## PROJECT 2 ##-->
          <div class="project project-right parallax" id="project2" data-speed="0.35">
            <div class="proj-wrap p-wrap-right-1">
              <img class="number no-2" src="assets/images/0-2.svg" loading="lazy">
        <br>
        <div class="image-container">
        <img class="thumbnail-left thumb static-image" src="assets/images/funds-thumbnail.png" loading="lazy">
        <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
      </div>
      <div class="description-cont">
      <p class="taxonomy">DIGITAL DESIGN&nbsp;&nbsp;|&nbsp;&nbsp;MARKETING</p>
        <h3 class="section-header">Funds information campaign</h3>
        <p class="biriyani-light description">Concept, design and development of a campaign promoting CoStar's new Funds Information product  feature which became our top-performing campaign of&nbsp;2024.  </p>
      <a href="pages/funds-campaign" class="gradient-button">View case study</a>
      </div>
  </div>
          </div>
          <!--## PROJECT 3 ##-->
          <div class="project project-left parallax" id="project3" data-speed="0.2">
             
              <div class="proj-wrap p-wrap-left-2">
                  <img class="number no-3" src="assets/images/0-3.svg" loading="lazy">
            <br>
            <div class="image-container">
            <img class="thumbnail-left thumb static-image" src="assets/images/Demo-form-thumbnail.png" loading="lazy">
            <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
          </div>
          <div class="description-cont">
          <p class="taxonomy">UX / UI</p>
            <h3 class="section-header">Sales Capture Forms - Country Selection feature</h3>

              <p class="biriyani-light description ">An addition of a comprehensive country selection list paired with an autocomplete feature to streamline the form filling process, improving quality of leads and location data captured.  </p>
  
              <a href="pages/form-optimisation" class="gradient-button">View case study</a>
              </div>
      </div>
          </div>
           <!--## PROJECT 4 ##-->
          <div class="project project-right parallax" id="project4" data-speed="0.35">
              <div class="proj-wrap p-wrap-right-2">
                <img class="number no-4" src="assets/images/0-4.svg" loading="lazy">
          <br>
          <div class="image-container">
          <img class="thumbnail-left thumb static-image" src="assets/images/CoStar-mockup-browser.png" loading="lazy">
          <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
        </div>
        <div class="description-cont">
        <p class="taxonomy">WEB DESIGN & DEVELOPMENT</p>
          <h3 class="section-header">CoStar website redesign</h3>
          <p class="biriyani-light description" >Redesign and rebuild of CoStar's website, refreshing the look and feel in line with the company's updated brand identity. Focused on modernising the visual design and enhancing the overall user experience.  </p>
        <a href="pages/costar-reskin" class="gradient-button">View case study</a>
        </div>
    </div>
            </div>
            <!--## PROJECT 5 ##-->
            <div class="project project-left parallax" id="project5" data-speed="0.3">
          
              <div class="flex proj-wrap p-wrap-left-3">
                  <div class="number-col"><img class="number no-5" src="assets/images/0-5.svg" loading="lazy"></div>
                  <div class="right-of-number">
                      <div class="image-container">
                  <img class="thumbnail static-image" src="assets/images/LoopNet-mockup-browser.png" loading="lazy">
                 <!-- <img src="assets/images/sparkle-one.gif" alt="Animated GIF" class="animated-gif">-->
              </div>
              <div class="description-cont">
                  <p class="taxonomy">WEB DEVELOPMENT</p>
                  <h3 class="section-header">LoopNet Solutions Website</h3>
                  <p class="biriyani-light description">When LoopNet launched in the UK, I built the new marketing website using Site Studio and created a drag-and-drop UI component library to make updates easy for non-technical users.</p>
                  <a href="pages/loopnet-solutions" class="gradient-button">View case study</a>
                  </div>
                </div>
              </div>
          </div>
         
      </div>
  </section>
    `;
  }
}

customElements.define("projects-section", ProjectsSection);

