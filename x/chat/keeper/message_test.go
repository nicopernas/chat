package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/nicopernas/chat/testutil/keeper"
	"github.com/nicopernas/chat/testutil/nullify"
	"github.com/nicopernas/chat/x/chat/keeper"
	"github.com/nicopernas/chat/x/chat/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNMessage(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Message {
	items := make([]types.Message, n)
	for i := range items {
		items[i].MessageId = strconv.Itoa(i)

		keeper.SetMessage(ctx, items[i])
	}
	return items
}

func TestMessageGet(t *testing.T) {
	keeper, ctx := keepertest.ChatKeeper(t)
	items := createNMessage(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetMessage(ctx,
			item.MessageId,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestMessageRemove(t *testing.T) {
	keeper, ctx := keepertest.ChatKeeper(t)
	items := createNMessage(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveMessage(ctx,
			item.MessageId,
		)
		_, found := keeper.GetMessage(ctx,
			item.MessageId,
		)
		require.False(t, found)
	}
}

func TestMessageGetAll(t *testing.T) {
	keeper, ctx := keepertest.ChatKeeper(t)
	items := createNMessage(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllMessage(ctx)),
	)
}
