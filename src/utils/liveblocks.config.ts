import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
  throttle: 16
});
console.log(process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,"this is the key");

type Presence = {};
type Storage = {};
type UserMeta = {};
type RoomEvent = {};
export const { RoomProvider } = createRoomContext(client);
