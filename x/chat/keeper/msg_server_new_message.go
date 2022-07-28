package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/nicopernas/chat/x/chat/types"
)

func (k msgServer) NewMessage(goCtx context.Context, msg *types.MsgNewMessage) (*types.MsgNewMessageResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	nextMessageId, found := k.GetNextMessageId(ctx)
	if !found {
		panic("could not find nextMessageId")
	}

	messageId := strconv.FormatUint(nextMessageId.MessageId, 10)

	k.SetMessage(ctx, types.Message{
		Creator:   msg.Creator,
		MessageId: messageId,
		Body:      msg.Body,
	})

	nextMessageId.MessageId++
	k.SetNextMessageId(ctx, nextMessageId)

	return &types.MsgNewMessageResponse{
		MessageId: messageId,
	}, nil
}
