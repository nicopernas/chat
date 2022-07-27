package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/nicopernas/chat/x/chat/types"
)

// SetNextMessageId set nextMessageId in the store
func (k Keeper) SetNextMessageId(ctx sdk.Context, nextMessageId types.NextMessageId) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NextMessageIdKey))
	b := k.cdc.MustMarshal(&nextMessageId)
	store.Set([]byte{0}, b)
}

// GetNextMessageId returns nextMessageId
func (k Keeper) GetNextMessageId(ctx sdk.Context) (val types.NextMessageId, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NextMessageIdKey))

	b := store.Get([]byte{0})
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveNextMessageId removes nextMessageId from the store
func (k Keeper) RemoveNextMessageId(ctx sdk.Context) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NextMessageIdKey))
	store.Delete([]byte{0})
}
