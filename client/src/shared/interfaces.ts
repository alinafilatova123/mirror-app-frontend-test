export interface PostI {
  id: string;
  caption: string;
  permalink: string;
  date: string;
  likes: number;
  comments: number;
  userId: string;
  username: string;
}

export interface LayoutI {
  layout: {
    current: string;
    params: {
      grid?: {
        columns: number;
        rows: number;
      };
      masonry?: {
        columns: number;
        rows: number;
      };
    };
  };
  template: string;
  navigation: string;
}