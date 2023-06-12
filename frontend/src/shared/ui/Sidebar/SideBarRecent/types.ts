export interface IPostContent {
  _id: string;
  title: string;
  content?: string;
}

export interface IPostFetchData {
  data: {
    data: IPostContent[];
  };
}
export interface IPostUpdateData {
  statusCode: 0;
  error: null;
  data: IPostContent;
}
