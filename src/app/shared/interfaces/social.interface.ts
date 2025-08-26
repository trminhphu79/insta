export interface IPost {
  authorId: string;
  caption?: string | null;
  visibility: 'public' | 'followers';
  media: Array<{
    url: string;
    type: 'image' | 'video';
    position?: number;
    width?: number;
    height?: number;
  }>;
}

export interface ISuggestion {
  keyword: string;
}
