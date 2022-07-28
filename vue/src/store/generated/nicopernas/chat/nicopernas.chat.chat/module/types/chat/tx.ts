/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "nicopernas.chat.chat";

export interface MsgNewMessage {
  creator: string;
  body: string;
}

export interface MsgNewMessageResponse {
  messageId: string;
}

export interface MsgSendNewSpaceMessage {
  creator: string;
  port: string;
  channelID: string;
  timeoutTimestamp: number;
  body: string;
  user: string;
}

export interface MsgSendNewSpaceMessageResponse {}

const baseMsgNewMessage: object = { creator: "", body: "" };

export const MsgNewMessage = {
  encode(message: MsgNewMessage, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgNewMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgNewMessage } as MsgNewMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.body = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgNewMessage {
    const message = { ...baseMsgNewMessage } as MsgNewMessage;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    return message;
  },

  toJSON(message: MsgNewMessage): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgNewMessage>): MsgNewMessage {
    const message = { ...baseMsgNewMessage } as MsgNewMessage;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    return message;
  },
};

const baseMsgNewMessageResponse: object = { messageId: "" };

export const MsgNewMessageResponse = {
  encode(
    message: MsgNewMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgNewMessageResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgNewMessageResponse } as MsgNewMessageResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgNewMessageResponse {
    const message = { ...baseMsgNewMessageResponse } as MsgNewMessageResponse;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = String(object.messageId);
    } else {
      message.messageId = "";
    }
    return message;
  },

  toJSON(message: MsgNewMessageResponse): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgNewMessageResponse>
  ): MsgNewMessageResponse {
    const message = { ...baseMsgNewMessageResponse } as MsgNewMessageResponse;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId;
    } else {
      message.messageId = "";
    }
    return message;
  },
};

const baseMsgSendNewSpaceMessage: object = {
  creator: "",
  port: "",
  channelID: "",
  timeoutTimestamp: 0,
  body: "",
  user: "",
};

export const MsgSendNewSpaceMessage = {
  encode(
    message: MsgSendNewSpaceMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.port !== "") {
      writer.uint32(18).string(message.port);
    }
    if (message.channelID !== "") {
      writer.uint32(26).string(message.channelID);
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(32).uint64(message.timeoutTimestamp);
    }
    if (message.body !== "") {
      writer.uint32(42).string(message.body);
    }
    if (message.user !== "") {
      writer.uint32(50).string(message.user);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSendNewSpaceMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSendNewSpaceMessage } as MsgSendNewSpaceMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.port = reader.string();
          break;
        case 3:
          message.channelID = reader.string();
          break;
        case 4:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.body = reader.string();
          break;
        case 6:
          message.user = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendNewSpaceMessage {
    const message = { ...baseMsgSendNewSpaceMessage } as MsgSendNewSpaceMessage;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = String(object.port);
    } else {
      message.port = "";
    }
    if (object.channelID !== undefined && object.channelID !== null) {
      message.channelID = String(object.channelID);
    } else {
      message.channelID = "";
    }
    if (
      object.timeoutTimestamp !== undefined &&
      object.timeoutTimestamp !== null
    ) {
      message.timeoutTimestamp = Number(object.timeoutTimestamp);
    } else {
      message.timeoutTimestamp = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    return message;
  },

  toJSON(message: MsgSendNewSpaceMessage): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.port !== undefined && (obj.port = message.port);
    message.channelID !== undefined && (obj.channelID = message.channelID);
    message.timeoutTimestamp !== undefined &&
      (obj.timeoutTimestamp = message.timeoutTimestamp);
    message.body !== undefined && (obj.body = message.body);
    message.user !== undefined && (obj.user = message.user);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSendNewSpaceMessage>
  ): MsgSendNewSpaceMessage {
    const message = { ...baseMsgSendNewSpaceMessage } as MsgSendNewSpaceMessage;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port;
    } else {
      message.port = "";
    }
    if (object.channelID !== undefined && object.channelID !== null) {
      message.channelID = object.channelID;
    } else {
      message.channelID = "";
    }
    if (
      object.timeoutTimestamp !== undefined &&
      object.timeoutTimestamp !== null
    ) {
      message.timeoutTimestamp = object.timeoutTimestamp;
    } else {
      message.timeoutTimestamp = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    return message;
  },
};

const baseMsgSendNewSpaceMessageResponse: object = {};

export const MsgSendNewSpaceMessageResponse = {
  encode(
    _: MsgSendNewSpaceMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSendNewSpaceMessageResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSendNewSpaceMessageResponse,
    } as MsgSendNewSpaceMessageResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSendNewSpaceMessageResponse {
    const message = {
      ...baseMsgSendNewSpaceMessageResponse,
    } as MsgSendNewSpaceMessageResponse;
    return message;
  },

  toJSON(_: MsgSendNewSpaceMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSendNewSpaceMessageResponse>
  ): MsgSendNewSpaceMessageResponse {
    const message = {
      ...baseMsgSendNewSpaceMessageResponse,
    } as MsgSendNewSpaceMessageResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  NewMessage(request: MsgNewMessage): Promise<MsgNewMessageResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SendNewSpaceMessage(
    request: MsgSendNewSpaceMessage
  ): Promise<MsgSendNewSpaceMessageResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  NewMessage(request: MsgNewMessage): Promise<MsgNewMessageResponse> {
    const data = MsgNewMessage.encode(request).finish();
    const promise = this.rpc.request(
      "nicopernas.chat.chat.Msg",
      "NewMessage",
      data
    );
    return promise.then((data) =>
      MsgNewMessageResponse.decode(new Reader(data))
    );
  }

  SendNewSpaceMessage(
    request: MsgSendNewSpaceMessage
  ): Promise<MsgSendNewSpaceMessageResponse> {
    const data = MsgSendNewSpaceMessage.encode(request).finish();
    const promise = this.rpc.request(
      "nicopernas.chat.chat.Msg",
      "SendNewSpaceMessage",
      data
    );
    return promise.then((data) =>
      MsgSendNewSpaceMessageResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
