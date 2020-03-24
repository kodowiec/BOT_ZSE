declare module '@wulkanowy/uonet-request-signer-node' {
  export function signContent(password: string, certificate: string, content: string): Promise<string>;
}
