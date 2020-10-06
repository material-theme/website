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
    const selecedStyle = '3px solid hsl(var(--accent))';
    const currentPressed = this.scope.element.querySelector('[aria-checked="true"]');
    currentPressed.style.removeProperty('--border');
    currentPressed.setAttribute('aria-checked', false);
    element.setAttribute('aria-checked', true);
    element.style.setProperty('--border', selecedStyle);
    element.style.setProperty('--border-hover', selecedStyle);
  }

  /* Set the activated theme to root and save it to localStorage */
  setTheme(trigger) {
    const root = document.documentElement;
    const { variantColor } = trigger.dataset;
    const { variant } = trigger.dataset;
    const terminal = this.scope.element.querySelector('[data-terminal]');

    root.style.setProperty('--ne-global-background', variantColor);
    if (variant === 'lighter') {
      terminal.style.setProperty('--color', '#000');
      terminal.style.setProperty('--bg-c', '#fff');
    } else {
      terminal.style.removeProperty('--color');
      terminal.style.setProperty('--bg-c', 'var(--ne-global-background)');
    }
    this.nameTarget.innerHTML = this.variants[variant].label;
    this.setPressed(trigger);
    this.setImage(trigger);
  }

  setImage(trigger) {
    const getVariantImage = this.variants[trigger.dataset.variant].image;
    this.imgTarget.src = `/images/${getVariantImage}`;
  }

  /* Init preview switcher actions */
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
