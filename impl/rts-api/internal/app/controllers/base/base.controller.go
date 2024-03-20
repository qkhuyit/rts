package base

import "github.com/sirupsen/logrus"

type BaseController struct {
}

func (base *BaseController) LogEndAction(
	err error,
	logger *logrus.Logger,
) {

}
