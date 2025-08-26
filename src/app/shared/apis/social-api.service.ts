import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.service';
import { IBaseResponse } from '@shared/interfaces/response.interface';
import { delay, from, Observable, of } from 'rxjs';
import { IPost, ISuggestion } from '@shared/interfaces/social.interface';

//
@Injectable({ providedIn: 'root' })
export class SocialApi extends BaseApi {
  searchPost(payload: { q: string; limit: number; offset: number }) {
    const endpointUrl = `${this.baseUrl}/social/post/search`;
    const mockPosts: IPost[] = [
      {
        authorId: 'user_123',
        caption: `This is a mock post about "${payload.q}"`,
        visibility: 'public',
        media: [
          {
            url: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/537131086_3890662907841007_1917934589702758009_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGvWKLkaldUTcUVkcLplZgkMJ1Cywl8yeIwnULLCXzJ4jEhzpa17RzBJGkK8Xzj821l9e2OcQRIXZuD9OyNQPAU&_nc_ohc=EnrczoLF_dUQ7kNvwHQdYrg&_nc_oc=AdlnkNgiV4A3vlXqDcxwWhhSGpyY8faMNxOzYTHsJywxD1olP0LvZX6tgpIk6vsb2S9y0cUdFS1c1_l4EMqvDmkF&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=QzxhkYReJmn_RKueBRGy3A&oh=00_AfWXNz3JKY40dfLiE09j79h6nRDrrvpb-TdXvE0RrLK-pw&oe=68B39576',
            type: 'image',
            position: 1,
            width: 200,
            height: 300,
          },
        ],
      },
      {
        authorId: 'user_123',
        caption: `Photo of Bé lò lì lợm "${payload.q}"`,
        visibility: 'public',
        media: [
          {
            url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-1108099.jpg&fm=jpg',
            type: 'image',
            position: 1,
            width: 240,
            height: 300,
          },
        ],
      },
      {
        authorId: 'user_456',
        caption: null,
        visibility: 'followers',
        media: [
          {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ02JM-sUMhWMdG04WbZ5sM9LuRoVbID-yUfR2QF957pfvbyN6WRFvfmXueJhU3eI-iGcA&usqp=CAU',
            type: 'video',
            position: 1,
            width: 230,
            height: 480,
          },
        ],
      },

      {
        authorId: 'user_456',
        caption: null,
        visibility: 'followers',
        media: [
          {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmUbVfnZg9EHi1xQ1EBia4cnzxB9NHXjS6Ys8q0U7RLa-cnzZdnFjOmIzlRnvryxa-cs&usqp=CAU',
            type: 'video',
            position: 1,
            width: 190,
            height: 480,
          },
        ],
      },
      {
        authorId: 'user_456',
        caption: null,
        visibility: 'followers',
        media: [
          {
            url: 'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg',
            type: 'video',
            position: 1,
            width: 400,
            height: 480,
          },
        ],
      },
      {
        caption: 'Belo yeu dau',
        authorId: 'user_456',
        visibility: 'followers',
        media: [
          {
            type: 'image',
            position: 1,
            width: 240,
            height: 480,
            url: 'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/484541240_3741558072751492_2543659787518122112_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHM1gqfXzag_aBx81T3ZxvpIHUAtmhn0ZYgdQC2aGfRlu9MSWy13fxWjiYfmmb13hfqE3IBjN3TF9iQ8uOAqrFH&_nc_ohc=USFZUfZRjI0Q7kNvwHJOZd5&_nc_oc=AdmDcM5Zbc9pWQ-lsj3NMW53vBXF-ChE1gZouhOWBP5Ns791DfTYdWEtCUuzKd4vP8C2yfAuQHd1Kpefywo9QBY8&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=Z2-iXfVJkpZJ6X1C_oF9fw&oh=00_AfWYk_koNvchLakwUaFM9XPE7gd4baRck5K8wW6Fe5M7-A&oe=68B37C18',
          },
        ],
      },
      {
        authorId: 'user_4562',
        caption: 'Be lo cute',
        visibility: 'followers',
        media: [
          {
            type: 'video',
            position: 1,
            width: 240,
            height: 480,
            url: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/486547483_3753122438261722_2242221342513141964_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE2dMOQoxOKmQ6pf_gN1rkf55FOmULKKnHnkU6ZQsoqcSCgv5ngVnrUKfVCK_Cu7rli7UTrCABvULCZ-wEnH_AH&_nc_ohc=RYqmGloYR6oQ7kNvwE01BZ6&_nc_oc=AdnqXSHbSmDpB8ExJg3bJXrXn11X8Y1wXzgQxHw8BxQdRe-FCF6-Uqg2NrglJ9cm47aKPlFi5hLKwCmcxeeUvDPv&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=_IE1I5csIrCs7sCKaVJvvg&oh=00_AfXa85JAOZNhBFidpLXMtcHoFusalnySEmkh0Grf-4bU1Q&oe=68B38D61',
          },
        ],
      },
    ];
    return of({
      message: 'Success mock data',
      data: [
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
        ...mockPosts,
      ],
    });
    return this.httpClient.post<IBaseResponse<IPost[]>>(endpointUrl, payload);
  }

  suggestion(q: string): Observable<IBaseResponse<ISuggestion[]>> {
    const mock: ISuggestion[] = [
      { keyword: `${q}` },
      { keyword: `${q} news` },
      { keyword: `${q} trending` },
      { keyword: `${q} latest` },
      {
        keyword: `${q} mechanism 2025`,
      },
      {
        keyword: `${q} javascript 2025`,
      },
    ];

    const data: IBaseResponse<ISuggestion[]> = {
      data: mock,
      message: 'Success',
      statusCode: 201,
    };

    return of(data).pipe(delay(300));
  }
}
