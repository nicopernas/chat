package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSendNewSpaceMessage = "send_new_space_message"

var _ sdk.Msg = &MsgSendNewSpaceMessage{}

func NewMsgSendNewSpaceMessage(
	creator string,
	port string,
	channelID string,
	timeoutTimestamp uint64,
	body string,
	user string,
) *MsgSendNewSpaceMessage {
	return &MsgSendNewSpaceMessage{
		Creator:          creator,
		Port:             port,
		ChannelID:        channelID,
		TimeoutTimestamp: timeoutTimestamp,
		Body:             body,
		User:             user,
	}
}

func (msg *MsgSendNewSpaceMessage) Route() string {
	return RouterKey
}

func (msg *MsgSendNewSpaceMessage) Type() string {
	return TypeMsgSendNewSpaceMessage
}

func (msg *MsgSendNewSpaceMessage) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSendNewSpaceMessage) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSendNewSpaceMessage) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if msg.Port == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid packet port")
	}
	if msg.ChannelID == "" {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid packet channel")
	}
	if msg.TimeoutTimestamp == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "invalid packet timeout")
	}
	return nil
}
