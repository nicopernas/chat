package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/nicopernas/chat/x/chat/types"
)

func (k msgServer) NewMessage(goCtx context.Context, msg *types.MsgNewMessage) (*types.MsgNewMessageResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgNewMessageResponse{}, nil
}
