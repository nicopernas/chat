package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "github.com/nicopernas/chat/testutil/keeper"
	"github.com/nicopernas/chat/testutil/nullify"
	"github.com/nicopernas/chat/x/chat/keeper"
	"github.com/nicopernas/chat/x/chat/types"
)

func createTestNextMessageId(keeper *keeper.Keeper, ctx sdk.Context) types.NextMessageId {
	item := types.NextMessageId{}
	keeper.SetNextMessageId(ctx, item)
	return item
}

func TestNextMessageIdGet(t *testing.T) {
	keeper, ctx := keepertest.ChatKeeper(t)
	item := createTestNextMessageId(keeper, ctx)
	rst, found := keeper.GetNextMessageId(ctx)
	require.True(t, found)
	require.Equal(t,
		nullify.Fill(&item),
		nullify.Fill(&rst),
	)
}

func TestNextMessageIdRemove(t *testing.T) {
	keeper, ctx := keepertest.ChatKeeper(t)
	createTestNextMessageId(keeper, ctx)
	keeper.RemoveNextMessageId(ctx)
	_, found := keeper.GetNextMessageId(ctx)
	require.False(t, found)
}
