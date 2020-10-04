import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ["name", "lighter", "darker", "ocean", "palenight", "default"]

  /* Set the current button theme as active if match the current theme */
  setPressed(element) {
    const currentPressed = this.scope.element.querySelector('[aria-pressed="true"]')
    currentPressed.setAttribute('aria-pressed', false);
    element.setAttribute('aria-pressed', true);
  }

  /* Set the activated theme to root and save it to localStorage */
  setTheme(trigger) {
    const root = document.documentElement;
    const variantColor = trigger.dataset.variantColor;
    const variantName = trigger.dataset.variantName;

    root.style.setProperty('--ne-global-background', variantColor);
    this.nameTarget.innerHTML = variantName;
    this.setPressed(trigger)
  }

  /* Init theme switcher actions */
  connect() {
    const lighterButton = this.lighterTarget
    const darkerButton = this.darkerTarget
    const oceanButton = this.oceanTarget
    const palenightButton = this.palenightTarget
    const defaultButton = this.defaultTarget

    lighterButton.addEventListener('click', () => {
      this.setTheme(lighterButton)
    }, false);

    darkerButton.addEventListener('click', () => {
      this.setTheme(darkerButton)
    }, false);

    oceanButton.addEventListener('click', () => {
      this.setTheme(oceanButton)
    }, false);

    palenightButton.addEventListener('click', () => {
      this.setTheme(palenightButton)
    }, false);

    defaultButton.addEventListener('click', () => {
      this.setTheme(defaultButton)
    }, false);
  }
}
