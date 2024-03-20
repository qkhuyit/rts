package migrate

import "gorm.io/gorm"

type Migration interface {
	Migrate() error
}

type migrateProcess interface {
	Process(tx gorm.DB) error
}

type migrationImpl struct {
	preMigrateProcess  migrateProcess
	postMigrateProcess migrateProcess
}

func (m migrationImpl) Migrate() error {
	return nil
}

func NewMigration() Migration {
	return &migrationImpl{
		preMigrateProcess:  &preMigrateProcess{},
		postMigrateProcess: &postMigrateProcess{},
	}
}
