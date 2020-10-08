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
    this.avatarsTarget.querySelectorAll('img').forEach((img, index) => {
      // eslint-disable-next-line no-param-reassign
      img.src = members[index].image;
    });
  }
}
