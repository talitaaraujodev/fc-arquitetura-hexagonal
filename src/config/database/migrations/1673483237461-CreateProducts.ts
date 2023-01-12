import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1673483237461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal(5,2)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            default: '1',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
