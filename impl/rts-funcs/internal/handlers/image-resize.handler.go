package handlers

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
)

type ImageResizeHandler interface {
	HandleResizeUploaded(ctx context.Context, s3Event events.S3Event)
}

type imageResizeHandlerImpl struct {
}

func NewImageResizeHandler() ImageResizeHandler {
	return &imageResizeHandlerImpl{}
}

func (h *imageResizeHandlerImpl) HandleResizeUploaded(ctx context.Context, s3Event events.S3Event) {

}
