/*
{
  dc_id: 4,
  server_address: '149.154.167.91',
  port: 443,
  auth_key: <Buffer 2a b9 df bd c4 46 86 af c3 12 0f 9d 30 85 5c 84 f2 26 28 df 4b ac 82 84 2a ac 67 33 b2 59 30 95 17 e7 f6 97 6c 8e 56 45 63 4c 16 6f 2f da 3d 42 38 6a ... 206 more bytes>,
  takeout_id: null
}
*/

export type TSessionRow = {
  dc_id?: number;
  dcId?: number;
  server_address?: string;
  serverAddress?: string;
  port: number;
  auth_key: Buffer;
  takeout_id: null;
};

/*
,
  {
    id: 6714525061,
    hash: -3158765037984813600,
    username: 'fruhtefnaiti1985ja',
    phone: 37126986538,
    name: 'Renee Ryg',
    date: 1713890286
  }
*/
export type TEntitiesRow = {
  id: number;
  hash: number;
  username: string;
  phone: number;
  name: string;
  date: number;
};
