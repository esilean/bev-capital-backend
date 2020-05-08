import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    Length,
} from 'sequelize-typescript'

@Table({
    tableName: 'stocks',
})
export default class StockModel extends Model<StockModel> {
    @Length({ max: 20 })
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    })
    symbol!: string

    @Length({ max: 50 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string

    @Length({ max: 100 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    exchange!: string

    @Length({ max: 150 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    website!: string

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date
}

export type StockModelInterface = typeof StockModel
