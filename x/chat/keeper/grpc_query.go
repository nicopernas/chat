package keeper

import (
	"github.com/nicopernas/chat/x/chat/types"
)

var _ types.QueryServer = Keeper{}
