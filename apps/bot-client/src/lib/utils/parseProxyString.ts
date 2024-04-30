import { ProxyInterface } from "telegram/network/connection/TCPMTProxy";

export const parseProxyString = (proxyString: string): ProxyInterface => {
  // ip:port:user:password
  const [ip, port, user, password] = proxyString.split(":");
  return {
    socksType: 5,
    ip,
    port: parseInt(port),
    username: user,
    password,
    MTProxy: false,
  };
};
