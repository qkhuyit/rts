package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var rootCommand *cobra.Command

func init() {
	rootCommand = &cobra.Command{}
	rootCommand.AddCommand(serveCommand, migrateCommand)
}

func Execute() {
	err := rootCommand.Execute()
	if err != nil {
		fmt.Println("Failed to execute command, err: ", err)
		panic(err)
	}
}
