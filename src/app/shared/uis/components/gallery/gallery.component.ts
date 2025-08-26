import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  linkedSignal,
  signal,
} from '@angular/core';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

export type MediaItem = { url: string; type: 'image' | 'video'; index: number };

@Component({
  selector: 'insta-gallery',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, NgIf, NgFor],
  template: `
    <ion-grid class="explore-grid" fixed>
      <ng-container *ngFor="let group of groups(); let i = index">
        <ion-row class="explore-row" [class.row-odd]="i % 2 === 1">
          <ng-container *ngIf="i % 2 === 0; else oddPattern">
            <ion-col size="8" class="cluster">
              <div class="cluster-grid">
                <ng-container *ngFor="let it of group.small">
                  <div class="tile tile-sm">
                    <img style="object-fit: cover;" [src]="it.url" alt="" />
                  </div>
                </ng-container>
              </div>
            </ion-col>

            <ion-col size="4" class="solo pl-[4px]">
              <div class="tile tile-lg">
                <img
                  style="object-fit: cover;"
                  *ngIf="group.big"
                  [src]="group.big.url"
                  alt=""
                />
              </div>
            </ion-col>
          </ng-container>

          <ng-template #oddPattern>
            <ion-col size="4" class="solo pr-[4px]">
              <div class="tile tile-lg">
                <img
                  style="object-fit: cover;"
                  *ngIf="group.big"
                  [src]="group.big.url"
                  alt=""
                />
              </div>
            </ion-col>

            <ion-col size="8" class="cluster">
              <div class="cluster-grid">
                <ng-container *ngFor="let it of group.small">
                  <div class="tile tile-sm">
                    <img style="object-fit: cover;" [src]="it.url" alt="" />
                  </div>
                </ng-container>
              </div>
            </ion-col>
          </ng-template>
        </ion-row>
      </ng-container>
    </ion-grid>
  `,
  styles: [
    `
      .explore-grid {
        --ion-grid-padding: 0;
        --ion-grid-column-padding: 6px;
      }
      .explore-row {
        margin-bottom: 6px;
        align-items: stretch;
      }

      .tile-lg {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #f3f4f6;
        aspect-ratio: 2 / 3;
      }

      .cluster-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 1fr;
        gap: 6px;
        height: 100%;
      }

      .tile-sm,
      .tile {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #f3f4f6;
      }
      .tile-sm {
        aspect-ratio: 1 / 1;
      }

      .tile img,
      .tile-lg img,
      .tile-sm img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .cluster,
      .solo {
        display: flex;
      }
      .cluster > .cluster-grid,
      .solo > .tile-lg {
        flex: 1 1 auto;
      }

      @media (max-width: 420px) {
        .explore-row {
          flex-direction: column;
        }
        ion-col[size='8'],
        ion-col[size='4'] {
          width: 100%;
        }
        .tile-lg {
          aspect-ratio: 16 / 9;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstaGalleryComponent {
  @Input() set items(v: MediaItem[] | null) {
    this._items.set(v ?? []);
  }
  private _items = signal<MediaItem[]>([]);

  groups = linkedSignal(() => {
    const src = this._items();
    const out: Array<{ small: MediaItem[]; big?: MediaItem }> = [];
    for (let i = 0; i < src.length; i += 5) {
      const slice = src.slice(i, i + 5);
      const big = slice[0];
      const small = slice.slice(1, 5);
      out.push({
        big,
        small,
      });
    }
    return out;
  });
}
