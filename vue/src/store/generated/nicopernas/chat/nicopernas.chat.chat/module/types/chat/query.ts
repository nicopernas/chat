/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../chat/params";
import { NextMessageId } from "../chat/next_message_id";
import { Message } from "../chat/message";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "nicopernas.chat.chat";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetNextMessageIdRequest {}

export interface QueryGetNextMessageIdResponse {
  NextMessageId: NextMessageId | undefined;
}

export interface QueryGetMessageRequest {
  messageId: string;
}

export interface QueryGetMessageResponse {
  message: Message | undefined;
}

export interface QueryAllMessageRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllMessageResponse {
  message: Message[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetNextMessageIdRequest: object = {};

export const QueryGetNextMessageIdRequest = {
  encode(
    _: QueryGetNextMessageIdRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetNextMessageIdRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNextMessageIdRequest,
    } as QueryGetNextMessageIdRequest;
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

  fromJSON(_: any): QueryGetNextMessageIdRequest {
    const message = {
      ...baseQueryGetNextMessageIdRequest,
    } as QueryGetNextMessageIdRequest;
    return message;
  },

  toJSON(_: QueryGetNextMessageIdRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryGetNextMessageIdRequest>
  ): QueryGetNextMessageIdRequest {
    const message = {
      ...baseQueryGetNextMessageIdRequest,
    } as QueryGetNextMessageIdRequest;
    return message;
  },
};

const baseQueryGetNextMessageIdResponse: object = {};

export const QueryGetNextMessageIdResponse = {
  encode(
    message: QueryGetNextMessageIdResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.NextMessageId !== undefined) {
      NextMessageId.encode(
        message.NextMessageId,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetNextMessageIdResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNextMessageIdResponse,
    } as QueryGetNextMessageIdResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.NextMessageId = NextMessageId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNextMessageIdResponse {
    const message = {
      ...baseQueryGetNextMessageIdResponse,
    } as QueryGetNextMessageIdResponse;
    if (object.NextMessageId !== undefined && object.NextMessageId !== null) {
      message.NextMessageId = NextMessageId.fromJSON(object.NextMessageId);
    } else {
      message.NextMessageId = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetNextMessageIdResponse): unknown {
    const obj: any = {};
    message.NextMessageId !== undefined &&
      (obj.NextMessageId = message.NextMessageId
        ? NextMessageId.toJSON(message.NextMessageId)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetNextMessageIdResponse>
  ): QueryGetNextMessageIdResponse {
    const message = {
      ...baseQueryGetNextMessageIdResponse,
    } as QueryGetNextMessageIdResponse;
    if (object.NextMessageId !== undefined && object.NextMessageId !== null) {
      message.NextMessageId = NextMessageId.fromPartial(object.NextMessageId);
    } else {
      message.NextMessageId = undefined;
    }
    return message;
  },
};

const baseQueryGetMessageRequest: object = { messageId: "" };

export const QueryGetMessageRequest = {
  encode(
    message: QueryGetMessageRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetMessageRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetMessageRequest } as QueryGetMessageRequest;
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

  fromJSON(object: any): QueryGetMessageRequest {
    const message = { ...baseQueryGetMessageRequest } as QueryGetMessageRequest;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = String(object.messageId);
    } else {
      message.messageId = "";
    }
    return message;
  },

  toJSON(message: QueryGetMessageRequest): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetMessageRequest>
  ): QueryGetMessageRequest {
    const message = { ...baseQueryGetMessageRequest } as QueryGetMessageRequest;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId;
    } else {
      message.messageId = "";
    }
    return message;
  },
};

const baseQueryGetMessageResponse: object = {};

export const QueryGetMessageResponse = {
  encode(
    message: QueryGetMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetMessageResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetMessageResponse,
    } as QueryGetMessageResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = Message.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMessageResponse {
    const message = {
      ...baseQueryGetMessageResponse,
    } as QueryGetMessageResponse;
    if (object.message !== undefined && object.message !== null) {
      message.message = Message.fromJSON(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetMessageResponse): unknown {
    const obj: any = {};
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetMessageResponse>
  ): QueryGetMessageResponse {
    const message = {
      ...baseQueryGetMessageResponse,
    } as QueryGetMessageResponse;
    if (object.message !== undefined && object.message !== null) {
      message.message = Message.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
};

const baseQueryAllMessageRequest: object = {};

export const QueryAllMessageRequest = {
  encode(
    message: QueryAllMessageRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllMessageRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllMessageRequest } as QueryAllMessageRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllMessageRequest {
    const message = { ...baseQueryAllMessageRequest } as QueryAllMessageRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllMessageRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllMessageRequest>
  ): QueryAllMessageRequest {
    const message = { ...baseQueryAllMessageRequest } as QueryAllMessageRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllMessageResponse: object = {};

export const QueryAllMessageResponse = {
  encode(
    message: QueryAllMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.message) {
      Message.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllMessageResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllMessageResponse,
    } as QueryAllMessageResponse;
    message.message = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message.push(Message.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllMessageResponse {
    const message = {
      ...baseQueryAllMessageResponse,
    } as QueryAllMessageResponse;
    message.message = [];
    if (object.message !== undefined && object.message !== null) {
      for (const e of object.message) {
        message.message.push(Message.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllMessageResponse): unknown {
    const obj: any = {};
    if (message.message) {
      obj.message = message.message.map((e) =>
        e ? Message.toJSON(e) : undefined
      );
    } else {
      obj.message = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllMessageResponse>
  ): QueryAllMessageResponse {
    const message = {
      ...baseQueryAllMessageResponse,
    } as QueryAllMessageResponse;
    message.message = [];
    if (object.message !== undefined && object.message !== null) {
      for (const e of object.message) {
        message.message.push(Message.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a NextMessageId by index. */
  NextMessageId(
    request: QueryGetNextMessageIdRequest
  ): Promise<QueryGetNextMessageIdResponse>;
  /** Queries a Message by index. */
  Message(request: QueryGetMessageRequest): Promise<QueryGetMessageResponse>;
  /** Queries a list of Message items. */
  MessageAll(request: QueryAllMessageRequest): Promise<QueryAllMessageResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nicopernas.chat.chat.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  NextMessageId(
    request: QueryGetNextMessageIdRequest
  ): Promise<QueryGetNextMessageIdResponse> {
    const data = QueryGetNextMessageIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nicopernas.chat.chat.Query",
      "NextMessageId",
      data
    );
    return promise.then((data) =>
      QueryGetNextMessageIdResponse.decode(new Reader(data))
    );
  }

  Message(request: QueryGetMessageRequest): Promise<QueryGetMessageResponse> {
    const data = QueryGetMessageRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nicopernas.chat.chat.Query",
      "Message",
      data
    );
    return promise.then((data) =>
      QueryGetMessageResponse.decode(new Reader(data))
    );
  }

  MessageAll(
    request: QueryAllMessageRequest
  ): Promise<QueryAllMessageResponse> {
    const data = QueryAllMessageRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nicopernas.chat.chat.Query",
      "MessageAll",
      data
    );
    return promise.then((data) =>
      QueryAllMessageResponse.decode(new Reader(data))
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
