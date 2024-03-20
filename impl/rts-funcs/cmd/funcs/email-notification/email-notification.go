package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/qkhuyit/rts/rts-funcs/internal/handlers"
)

var handler handlers.EmailNotificationHandler

func init() {
	//TODO load configuration and pass to contructor
	handler = handlers.NewEmailNotificationHandler()
}

func main() {

	lambda.Start(handler.HandleSendMailNotification)
}
