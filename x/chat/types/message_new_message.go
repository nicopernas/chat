package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewMessage = "new_message"

var _ sdk.Msg = &MsgNewMessage{}

func NewMsgNewMessage(creator string, body string) *MsgNewMessage {
	return &MsgNewMessage{
		Creator: creator,
		Body:    body,
	}
}

func (msg *MsgNewMessage) Route() string {
	return RouterKey
}

func (msg *MsgNewMessage) Type() string {
	return TypeMsgNewMessage
}

func (msg *MsgNewMessage) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewMessage) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewMessage) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
