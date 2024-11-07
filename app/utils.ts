export function toUtf8(str: string): string {
  return new TextEncoder()
    .encode(str)
    .reduce((acc, byte) => acc + String.fromCharCode(byte), "");
}
