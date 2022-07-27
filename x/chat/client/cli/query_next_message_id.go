package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/nicopernas/chat/x/chat/types"
	"github.com/spf13/cobra"
)

func CmdShowNextMessageId() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-next-message-id",
		Short: "shows nextMessageId",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetNextMessageIdRequest{}

			res, err := queryClient.NextMessageId(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
