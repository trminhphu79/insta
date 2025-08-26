import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  OnInit,
} from '@angular/core';
import { ExploreStore } from '../../data-access/store';
import {
  InstaGalleryComponent,
  MediaItem,
} from '@shared/uis/components/gallery/gallery.component';

@Component({
  selector: 'insta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InstaGalleryComponent],
})
export class SearchResultsComponent implements OnInit {
  store = inject(ExploreStore);

  dataSource = linkedSignal(() => {
    return this.store.dataSource().map(
      (value, index) =>
        ({
          url: value.media[0].url,
          type: 'image',
          index,
        } as MediaItem)
    );
  });

  ngOnInit() {}
}
