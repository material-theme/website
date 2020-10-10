/* eslint-disable class-methods-use-this */
import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = [
    'count',
    'avatars',
  ]

  async connect() {
    const { info, members } = await (await fetch('/api/collective')).json();
    this.countTarget.textContent = info.contributorsCount;
    members.forEach((member) => {
      const imgEL = document.createElement('img');
      imgEL.setAttribute('style', '--padding:4px; --obj-f:cover; --obj-p:center; --radius:100%; --overflow:hidden; --bg-c:var(--ne-global-background);');
      imgEL.setAttribute('loading', 'lazy');
      imgEL.setAttribute('alt', '');
      imgEL.setAttribute('height', 60);
      imgEL.setAttribute('width', 60);
      imgEL.src = member.image;
      this.avatarsTarget.prepend(imgEL);
    });
  }
}
