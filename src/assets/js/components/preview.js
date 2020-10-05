import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = [
    'img',
    'name',
    'lighter',
    'darker',
    'ocean',
    'palenight',
    'default',
  ]

  constructor(context) {
    super();
    this.context = context;
    this.variants = {
      default: {
        label: 'Material Theme',
        image: 'default.png',
      },
      darker: {
        label: 'Material Theme Darker',
        image: 'darker.png',
      },
      ocean: {
        label: 'Material Theme Ocean',
        image: 'ocean.png',
      },
      palenight: {
        label: 'Material Theme Palenight',
        image: 'palenight.png',
      },
      lighter: {
        label: 'Material Theme Lighter',
        image: 'lighter.png',
      },
    };
  }

  /* Set the current button theme as active if match the current theme */
  setPressed(element) {
    const currentPressed = this.scope.element.querySelector('[aria-pressed="true"]');
    currentPressed.setAttribute('aria-pressed', false);
    element.setAttribute('aria-pressed', true);
  }

  /* Set the activated theme to root and save it to localStorage */
  setTheme(trigger) {
    const root = document.documentElement;
    const { variantColor } = trigger.dataset;
    const { variant } = trigger.dataset;

    root.style.setProperty('--ne-global-background', variantColor);
    this.nameTarget.innerHTML = this.variants[variant].label;
    this.setPressed(trigger);
    this.setImage(trigger);
  }

  setImage(trigger) {
    const getVariantImage = this.variants[trigger.dataset.variant].image;
    this.imgTarget.src = `/images/${getVariantImage}`;
  }

  /* Init theme switcher actions */
  connect() {
    const lighterButton = this.lighterTarget;
    const darkerButton = this.darkerTarget;
    const oceanButton = this.oceanTarget;
    const palenightButton = this.palenightTarget;
    const defaultButton = this.defaultTarget;

    lighterButton.addEventListener('click', () => {
      this.setTheme(lighterButton);
    }, false);

    darkerButton.addEventListener('click', () => {
      this.setTheme(darkerButton);
    }, false);

    oceanButton.addEventListener('click', () => {
      this.setTheme(oceanButton);
    }, false);

    palenightButton.addEventListener('click', () => {
      this.setTheme(palenightButton);
    }, false);

    defaultButton.addEventListener('click', () => {
      this.setTheme(defaultButton);
    }, false);
  }
}
