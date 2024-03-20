package cmd

import (
	"context"
	"fmt"
	"github.com/qkhuyit/rts/rts-api/internal/app"
	"github.com/spf13/cobra"
)

var serveCommand = &cobra.Command{
	Use:   "serve",
	Short: "Start API Server",
	Run: func(cmd *cobra.Command, args []string) {
		defer func() {
			err := app.App.Stop(context.Background())
			fmt.Println("[ERROR] Failed to stop application container, err: ", err)
		}()
		app.App.Run()
	},
}
