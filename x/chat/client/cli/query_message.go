package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/nicopernas/chat/x/chat/types"
	"github.com/spf13/cobra"
)

func CmdListMessage() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-message",
		Short: "list all message",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllMessageRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.MessageAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowMessage() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-message [message-id]",
		Short: "shows a message",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argMessageId := args[0]

			params := &types.QueryGetMessageRequest{
				MessageId: argMessageId,
			}

			res, err := queryClient.Message(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
