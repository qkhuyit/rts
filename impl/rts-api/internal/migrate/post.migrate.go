package migrate

import "gorm.io/gorm"

type postMigrateProcess struct {
}

func (p *postMigrateProcess) Process(tx gorm.DB) error {
	return nil
}
