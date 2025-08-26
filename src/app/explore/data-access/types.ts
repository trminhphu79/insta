import { IPost, ISuggestion } from '@shared/interfaces/social.interface';

export enum SearchModeEnum {
  NONE,
  RECENT,
  SEARCHING,
}

export type ExploreState = {
  dataSource: IPost[];
  suggestions: Array<ISuggestion>;
  recentSuggestions: Array<ISuggestion>;
  loading: boolean;
  error: string | null;
  query: string;
  mode: SearchModeEnum;
};
