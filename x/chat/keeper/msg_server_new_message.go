package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/nicopernas/chat/x/chat/types"
)

func (k Keeper) StoreNewMessage(ctx sdk.Context, creator, body string) string {
	nextMessageId, found := k.GetNextMessageId(ctx)
	if !found {
		panic("could not find nextMessageId")
	}

	messageId := strconv.FormatUint(nextMessageId.MessageId, 10)

	k.SetMessage(ctx, types.Message{
		Creator:   creator,
		MessageId: messageId,
		Body:      body,
	})

	nextMessageId.MessageId++
	k.SetNextMessageId(ctx, nextMessageId)

	return messageId
}

func (k msgServer) NewMessage(goCtx context.Context, msg *types.MsgNewMessage) (*types.MsgNewMessageResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	messageId := k.StoreNewMessage(ctx, msg.Creator, msg.Body)

	return &types.MsgNewMessageResponse{
		MessageId: messageId,
	}, nil
}
