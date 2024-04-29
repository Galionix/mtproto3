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

// json file type
/*
{
  "app_id": 2040,
  "app_hash": "b18441a1ff607e10a989891a5462e627",
  "sdk": "Windows 11",
  "device": "Durian 7A1",
  "app_version": "4.14.0 x64",
  "lang_pack": "en",
  "system_lang_pack": "en-US",
  "extra_params": "CihaKykghN6qxdIoMhCFtq+opfS7y/G/i1tb6jd+Ccg0C3eJgcURhcVj5CsgcraHB54OK6ojsu1Tv3G0+ODriRffUpXSpIX0B3EnNvxdCTTu47hrQxMSCYt+x06Y9IfCv4FkVYVx/Vkiqhly/wGaqdNFe61Y4LiYBFtNLgsbOaqnapaQ7U+oMBHs6T4Sbglp17o1fXPbH+kkd6oVfEIaIA==",
  "twoFA": "CryptoCartel2025",
  "role": null,
  "id": 7098268689,
  "phone": "34604102550",
  "username": "stetalbetna1973546",
  "date_of_birth": 1711316995,
  "date_of_birth_integrity": "e97b7cce758188f9f8b57bbedb6410b7",
  "is_premium": false,
  "first_name": "Phillip",
  "last_name": "Myers",
  "has_profile_pic": false,
  "spamblock": null,
  "session_file": "34604102550",
  "stats_spam_count": 0,
  "stats_invites_count": 0,
  "last_connect_date": "2024-04-26T17:21:25+0300",
  "proxy": null,
  "last_check_time": 0,
  "register_time": 1711465325,
  "success_registred": true,
  "ipv6": false,
  "avatar": "img/default.png"
}

*/
export type TJsonFile = {
  app_id: number;
  app_hash: string;
  sdk: string;
  device: string;
  app_version: string;
  lang_pack: string;
  system_lang_pack: string;
  extra_params: string;
  twoFA: string;
  role: null;
  id: number;
  phone: string;
  username: string;
  date_of_birth: number;
  date_of_birth_integrity: string;
  is_premium: boolean;
  first_name: string;
  last_name: string;
  has_profile_pic: boolean;
  spamblock: null;
  session_file: string;
  stats_spam_count: number;
  stats_invites_count: number;
  last_connect_date: string;
  proxy: null;
  last_check_time: number;
  register_time: number;
  success_registred: boolean;
  ipv6: boolean;
  avatar: string;
};