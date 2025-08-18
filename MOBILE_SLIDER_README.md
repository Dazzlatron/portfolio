# Mobile Image Slider - Click to Open Modal (Mobile Only)

A responsive, touch-friendly image slider that opens as a modal when you click on any of the three side-by-side images. **This slider only activates on mobile devices (≤767px) to prevent conflicts with desktop popup functionality.**

## Features

- **Mobile Only**: Only activates on mobile devices (≤767px)
- **Preserves Original Layout**: Three images remain side-by-side until clicked
- **Click to Open**: Click any image to open the slider modal
- **Touch Support**: Swipe left/right to navigate between images in the modal
- **Auto-play**: Automatically advances slides every 4 seconds
- **Navigation Dots**: Click dots to jump to specific slides
- **Slide Counter**: Shows current slide position (e.g., "2 / 3")
- **Keyboard Navigation**: Arrow keys, Home, End, Escape, and Spacebar support
- **Smooth Animations**: Beautiful modal open/close animations
- **Auto-pause**: Pauses auto-play when user interacts with slider
- **No Desktop Conflicts**: Completely disabled on desktop to avoid interfering with other popup functions

## How It Works

1. **Three images display side-by-side** in their original layout
2. **Images are clickable** with hover effects to show they're interactive
3. **Click any image** to open the slider modal
4. **Modal opens with smooth animation** and shows the slider
5. **Navigate through images** with swipe, dots, or keyboard
6. **Close modal** with close button, clicking outside, or pressing Escape

## HTML Structure Required

Your HTML should have this structure for the slider to work:

```html
<div class="cont four-four-four">
  <div class="col-1">
    <img src="image1.jpg" class="circle-third circle-prod-1 slider-img">
  </div>
  <div class="col-2">
    <img src="image2.jpg" class="circle-third circle-prod-2 slider-img">
  </div>
  <div class="col-3">
    <img src="image3.jpg" class="circle-third circle-prod-3 slider-img">
  </div>
</div>
```

## CSS Classes Used

- `.mobile-slider-modal` - Main modal container
- `.mobile-slider-modal-content` - Modal content wrapper
- `.mobile-slider-close` - Close button
- `.mobile-slider-wrapper` - Wrapper for all slides
- `.mobile-slider-dots` - Navigation dots container
- `.mobile-slider-dot` - Individual navigation dots
- `.mobile-slider-counter` - Slide counter display

## JavaScript Features

### Opening the Modal
- **Click any image** to open the slider modal
- **Modal opens with smooth scale animation**
- **Background dims with overlay effect**

### Touch Controls
- **Swipe Left**: Next slide
- **Swipe Right**: Previous slide
- **Tap Dots**: Jump to specific slide

### Keyboard Controls
- **Escape**: Close modal
- **Arrow Left**: Previous slide
- **Arrow Right**: Next slide
- **Home**: First slide
- **End**: Last slide
- **Spacebar**: Toggle auto-play

### Auto-play
- Automatically advances every 4 seconds
- Pauses when user interacts with slider
- Resumes after user interaction ends
- Loops back to first slide after last slide

### Closing the Modal
- **Click close button (×)**
- **Click outside the modal content**
- **Press Escape key**
- **Body scroll is restored** when modal closes

## Files Added

1. **`css/device-styles.css`** - Hover effects for clickable images
2. **`js/mobile-image-slider.js`** - Modal slider functionality
3. **`MOBILE_SLIDER_README.md`** - This documentation

## Browser Support

- **Mobile Only**: Desktop, tablet, and mobile (≤767px breakpoint)
- **Touch Events**: All modern touch devices
- **CSS**: Flexbox, CSS Grid, CSS Transitions
- **JavaScript**: ES6+ features with fallbacks
- **Desktop**: Completely disabled to prevent conflicts with other popup functions

## Customization

### Change Auto-play Speed
Modify the `autoPlayDelay` property in the JavaScript:

```javascript
this.autoPlayDelay = 4000; // 4 seconds (4000ms)
```

### Change Modal Colors
Modify the modal background and content colors:

```javascript
// In createModal() method
background: rgba(0, 0, 0, 0.9); // Modal overlay
background: white; // Modal content background
```

### Change Animation Speed
Modify the transition timing in the CSS:

```javascript
// In createModal() method
transition: opacity 0.3s ease; // Modal fade
transition: transform 0.3s ease; // Content scale
```

## Troubleshooting

### Modal Not Opening
1. Check if images have the required CSS classes
2. Verify HTML structure matches requirements
3. Check browser console for JavaScript errors

### Images Not Clickable
1. Verify images have the required CSS classes
2. Check if CSS is properly loaded
3. Ensure no other JavaScript is interfering

### Touch Not Working in Modal
1. Test on actual mobile device (not just browser dev tools)
2. Check if touch events are enabled
3. Verify no CSS is blocking touch interactions

## Performance Notes

- Images are cloned when modal opens, not duplicated in DOM
- Auto-play is paused during user interaction to save resources
- Modal is created once and reused
- Minimal DOM manipulation for optimal performance
- Body scroll is properly managed to prevent background scrolling
