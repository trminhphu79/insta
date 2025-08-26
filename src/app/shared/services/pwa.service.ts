// install-prompt.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InstallPromptService {
  private deferredPrompt: any = null;

  // Signals to drive UI
  canInstall = signal(false);        // Android/Chrome path
  isStandalone = signal(false);      // PWA already installed
  isIOS = signal(false);             // iOS platform + Safari likely
  showTip = signal(false);           // show iOS install instructions

  constructor() {
    // Detect standalone
    const standalone =
      (navigator as any).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches;
    this.isStandalone.set(standalone);

    // Basic iOS detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    this.isIOS.set(isIOS);

    // Android/Chrome PWA prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      // Only show install button if not already installed
      if (!this.isStandalone()) this.canInstall.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.canInstall.set(false);
      this.isStandalone.set(true);
      this.showTip.set(false);
    });

    // For iOS: if not standalone, we’ll show a tip (you can gate with a TTL)
    if (isIOS && !standalone) {
      this.showTip.set(true);
    }
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false;
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    this.canInstall.set(false);
    return outcome === 'accepted';
  }

  dismissTip() {
    this.showTip.set(false);
  }
}