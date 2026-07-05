export interface AuthResponse {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}
