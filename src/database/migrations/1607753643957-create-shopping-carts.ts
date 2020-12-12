import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createShoppingCarts1607753643957 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'shopping_carts',
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
          name: 'order_id',
          type: 'integer'
        },
        {
          name: 'product_id',
          type: 'integer'
        },
        {
          name: 'quantity',
          type: 'integer',
          default: 1
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shopping_carts')
  }
}
