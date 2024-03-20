package migrate

import "gorm.io/gorm"

type preMigrateProcess struct {
}

func (p *preMigrateProcess) Process(tx gorm.DB) error {
	return nil
}
