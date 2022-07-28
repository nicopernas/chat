package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/nicopernas/chat/x/chat/types"
)

// SetMessage set a specific message in the store from its index
func (k Keeper) SetMessage(ctx sdk.Context, message types.Message) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.MessageKeyPrefix))
	b := k.cdc.MustMarshal(&message)
	store.Set(types.MessageKey(
		message.MessageId,
	), b)
}

// GetMessage returns a message from its index
func (k Keeper) GetMessage(
	ctx sdk.Context,
	messageId string,

) (val types.Message, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.MessageKeyPrefix))

	b := store.Get(types.MessageKey(
		messageId,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveMessage removes a message from the store
func (k Keeper) RemoveMessage(
	ctx sdk.Context,
	messageId string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.MessageKeyPrefix))
	store.Delete(types.MessageKey(
		messageId,
	))
}

// GetAllMessage returns all message
func (k Keeper) GetAllMessage(ctx sdk.Context) (list []types.Message) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.MessageKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Message
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
