import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    IsEmail,
} from 'sequelize-typescript'

@Table({
    tableName: 'users',
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string

    @CreatedAt
    created_at: Date

    @UpdatedAt
    updated_at: Date
}
