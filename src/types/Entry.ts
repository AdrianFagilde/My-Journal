import type Emoji  from "./Emoji";

export default interface Entry {
  id: string;
  body: string;
  emoji: Emoji | null;
  createdAt: Object ;
  userId: Number;
}
