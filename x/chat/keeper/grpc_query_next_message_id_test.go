package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/nicopernas/chat/testutil/keeper"
	"github.com/nicopernas/chat/testutil/nullify"
	"github.com/nicopernas/chat/x/chat/types"
)

func TestNextMessageIdQuery(t *testing.T) {
	keeper, ctx := keepertest.ChatKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	item := createTestNextMessageId(keeper, ctx)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetNextMessageIdRequest
		response *types.QueryGetNextMessageIdResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetNextMessageIdRequest{},
			response: &types.QueryGetNextMessageIdResponse{NextMessageId: item},
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.NextMessageId(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}
