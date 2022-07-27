package keeper_test

import (
	"testing"

	testkeeper "github.com/nicopernas/chat/testutil/keeper"
	"github.com/nicopernas/chat/x/chat/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.ChatKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
