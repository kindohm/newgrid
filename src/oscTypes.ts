export type OscMessage = {
  address: string;
  args: { type: string; value: any }[]
}