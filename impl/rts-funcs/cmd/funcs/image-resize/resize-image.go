package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/qkhuyit/rts/rts-funcs/internal/handlers"
)

var handler handlers.ImageResizeHandler

func init() {
	//TODO load configuration and pass to contructor
	handler = handlers.NewImageResizeHandler()
}

func main() {

	lambda.Start(handler.HandleResizeUploaded)
}
