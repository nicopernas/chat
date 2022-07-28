package chat

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/nicopernas/chat/x/chat/keeper"
	"github.com/nicopernas/chat/x/chat/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set if defined
	if genState.NextMessageId != nil {
		k.SetNextMessageId(ctx, *genState.NextMessageId)
	}
	// Set all the message
	for _, elem := range genState.MessageList {
		k.SetMessage(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetPort(ctx, genState.PortId)
	// Only try to bind to port if it is not already bound, since we may already own
	// port capability from capability InitGenesis
	if !k.IsBound(ctx, genState.PortId) {
		// module binds to the port on InitChain
		// and claims the returned capability
		err := k.BindPort(ctx, genState.PortId)
		if err != nil {
			panic("could not claim port capability: " + err.Error())
		}
	}
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.PortId = k.GetPort(ctx)
	// Get all nextMessageId
	nextMessageId, found := k.GetNextMessageId(ctx)
	if found {
		genesis.NextMessageId = &nextMessageId
	}
	genesis.MessageList = k.GetAllMessage(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
