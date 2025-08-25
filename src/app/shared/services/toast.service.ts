import { inject, Injectable } from '@angular/core';
import { ToastOptions } from '@ionic/angular';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastController = inject(ToastController);
  private defaultOptions: Partial<ToastOptions> = {
    duration: 1500,
    position: 'bottom',
    keyboardClose: true,
  };

  async openToast(options: ToastOptions) {
    const instance = await this.toastController.create({
      ...this.defaultOptions,
      ...options,
    });
    await instance.present();
  }
}
