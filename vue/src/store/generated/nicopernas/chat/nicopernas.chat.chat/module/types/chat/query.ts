/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../chat/params";
import { NextMessageId } from "../chat/next_message_id";

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

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a NextMessageId by index. */
  NextMessageId(
    request: QueryGetNextMessageIdRequest
  ): Promise<QueryGetNextMessageIdResponse>;
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
