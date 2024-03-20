package cmd

import (
	"fmt"
	m "github.com/qkhuyit/rts/rts-api/internal/migrate"
	"github.com/spf13/cobra"
)

var migrateCommand = &cobra.Command{
	Use:   "migrate",
	Short: "Migrate database",
	Run: func(cmd *cobra.Command, args []string) {
		err := m.NewMigration().Migrate()
		if err != nil {
			fmt.Println("[ERROR] Failed to migrate database, err: ", err)
		}
	},
}
