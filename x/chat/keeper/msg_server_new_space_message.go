package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	clienttypes "github.com/cosmos/ibc-go/v3/modules/core/02-client/types"
	"github.com/nicopernas/chat/x/chat/types"
)

func (k msgServer) SendNewSpaceMessage(goCtx context.Context, msg *types.MsgSendNewSpaceMessage) (*types.MsgSendNewSpaceMessageResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: logic before transmitting the packet

	// Construct the packet
	var packet types.NewSpaceMessagePacketData

	packet.Body = msg.Body
	packet.User = msg.User

	// Transmit the packet
	err := k.TransmitNewSpaceMessagePacket(
		ctx,
		packet,
		msg.Port,
		msg.ChannelID,
		clienttypes.ZeroHeight(),
		msg.TimeoutTimestamp,
	)
	if err != nil {
		return nil, err
	}

	return &types.MsgSendNewSpaceMessageResponse{}, nil
}
