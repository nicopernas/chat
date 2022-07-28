/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "nicopernas.chat.chat";

export interface MsgNewMessage {
  creator: string;
  body: string;
}

export interface MsgNewMessageResponse {
  messageId: string;
}

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

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  NewMessage(request: MsgNewMessage): Promise<MsgNewMessageResponse>;
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
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
