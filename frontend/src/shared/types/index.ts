export interface IServerResponse<Data> {
  statusCode: number;
  data: Data | null;
  error: string | null;
}
