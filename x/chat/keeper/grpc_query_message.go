package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/nicopernas/chat/x/chat/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) MessageAll(c context.Context, req *types.QueryAllMessageRequest) (*types.QueryAllMessageResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var messages []types.Message
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	messageStore := prefix.NewStore(store, types.KeyPrefix(types.MessageKeyPrefix))

	pageRes, err := query.Paginate(messageStore, req.Pagination, func(key []byte, value []byte) error {
		var message types.Message
		if err := k.cdc.Unmarshal(value, &message); err != nil {
			return err
		}

		messages = append(messages, message)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllMessageResponse{Message: messages, Pagination: pageRes}, nil
}

func (k Keeper) Message(c context.Context, req *types.QueryGetMessageRequest) (*types.QueryGetMessageResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetMessage(
		ctx,
		req.MessageId,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetMessageResponse{Message: val}, nil
}
