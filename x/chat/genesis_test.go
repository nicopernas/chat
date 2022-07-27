package chat_test

import (
	"testing"

	keepertest "github.com/nicopernas/chat/testutil/keeper"
	"github.com/nicopernas/chat/testutil/nullify"
	"github.com/nicopernas/chat/x/chat"
	"github.com/nicopernas/chat/x/chat/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),
		PortId: types.PortID,
		NextMessageId: &types.NextMessageId{
			MessageId: 82,
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ChatKeeper(t)
	chat.InitGenesis(ctx, *k, genesisState)
	got := chat.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.PortId, got.PortId)

	require.Equal(t, genesisState.NextMessageId, got.NextMessageId)
	// this line is used by starport scaffolding # genesis/test/assert
}
