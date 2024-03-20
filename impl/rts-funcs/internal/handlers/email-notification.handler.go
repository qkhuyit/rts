package handlers

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
)

type EmailNotificationHandler interface {
	HandleSendMailNotification(ctx context.Context, snsEvent events.SNSEvent)
}

type emailNotificationHandlerImpl struct {
}

func NewEmailNotificationHandler() EmailNotificationHandler {
	return &emailNotificationHandlerImpl{}
}

func (e emailNotificationHandlerImpl) HandleSendMailNotification(ctx context.Context, snsEvent events.SNSEvent) {
	//TODO implement me
	panic("implement me")
}
