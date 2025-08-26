import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.service';
import { IBaseResponse } from '@shared/interfaces/response.interface';
import { delay, from, map, Observable, of } from 'rxjs';
import { IPost, ISuggestion } from '@shared/interfaces/social.interface';

//

const mockPosts: IPost[] = [
  {
    authorId: 'user_123',
    caption: `This is a mock post about xxx`,
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
    caption: `Photo of Bé lò lì lợm xxx`,
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
        url: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/500333937_3810166422557323_34030751546230407_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEuilmOZB1SQ659Jc59Br50k3mfCFDoAjWTeZ8IUOgCNUcmwSjsUUxUWySspk8ZQ3SLjiBQkLgKfaNWYH1uF0yk&_nc_ohc=qCrFnUXTqmwQ7kNvwHuDTtL&_nc_oc=AdlDRzpH3jYYmm4zAJ64eplFO6ex1d7imhoL3NpYJ6k47sUdwlD72oK_VkJ7mUpYUGOZMeGClgedAA3U5Rv92W2i&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=jX_yJHT8kqdIHmmD3PGZUg&oh=00_AfUquDVZ8zIUk8YD7x8h6sIcMGxTg9-yyfWuR9O23Ul68g&oe=68B395FA',
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
        url: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/484109108_3738682043039095_8958127598303403142_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=SqHDeTsRKYUQ7kNvwEDymJS&_nc_oc=AdmZcxXJjjEqFuDzEEo-qbhsASQfqWu3ZFxbnt2Fb3MvRtnSRLnKRukMLJpCIB3CFaHaysk04BojQZu_0nR_lQAk&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=RmAdMbt1rKdXMqt9z2---A&oh=00_AfU2GMrcFnxASkD3b-zVhLjngiytiudQ0BeB4C2BSljAhw&oe=68B3AE05',
      },
    ],
  },
  {
    authorId: 'khoi_dev_79',
    caption: 'Anh Khoi Dev',
    visibility: 'followers',
    media: [
      {
        type: 'image',
        url: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/486608452_3898699060398126_3913284086572059265_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=g0BhuVQMGYUQ7kNvwHFQdhS&_nc_oc=AdmgR89vL1p5BWXuRs6UO_C4SeEPXyMFHAgklp4KieYT1M9-gyFHzw8cM2BmZNiaiGOfYcxiedxeooTQuaugH_6J&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=9P43_YvkCBWNLzOM-IaPTA&oh=00_AfX9j2c7pSWBU9n29rwXCRnWQzQbGkrftQy3mUbrLWiPGA&oe=68B384B0',
      },
    ],
  },
  {
    authorId: 'khoi_dev_79',
    visibility: 'followers',
    caption: 'Anh Khoi Solider',
    media: [
      {
        type: 'image',
        url: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/34693640_2069646296636754_8833870768564600832_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=spzM-K0r714Q7kNvwEYChl4&_nc_oc=Adn3RMrlSAhDIyB3rpSmcFEwZUQAYlQt3H-G-I-9BJI5cnUgppvWHIpDRMx6CVyKGafRQBEzP_ChII0h3RyM-s6B&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=xzFbQNspQEer2nZ5jpuKLQ&oh=00_AfW0T4a1hDQwcGyZ6vZDSdcHnc5IRj8pgTFKuAmuwZ2BpA&oe=68D55245',
      },
    ],
  },
];

const mockData = [
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
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
  ...mockPosts,
];
@Injectable({ providedIn: 'root' })
export class SocialApi extends BaseApi {
  searchPost(payload: { q: string; limit: number; offset: number }) {
    const endpointUrl = `${this.baseUrl}/social/post/search`;

    return of({
      message: 'Success mock data',
      data: mockData,
    }).pipe(
      delay(500),
      map((response) => {
        if (!payload.q) {
          return response;
        }
        const filtered = response.data.filter((item) =>
          payload.q
            ? (item.caption ?? '')
                .toLowerCase()
                .includes(payload.q.toLowerCase())
            : true
        );

        console.log('filtered: ', filtered);

        return {
          message: response.message,
          data: filtered,
        };
      })
    );
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
