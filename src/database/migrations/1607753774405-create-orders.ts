import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createOrders1607753774405 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orders',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'client_id',
          type: 'integer'
        },
        {
          name: 'observation',
          type: 'text'
        },
        {
          name: 'payment_method',
          type: 'varchar'
        },
        {
          name: 'created_at',
          type: 'timestamp'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
  }
}
