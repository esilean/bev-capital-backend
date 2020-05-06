import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    IsEmail,
    Length,
    BeforeCreate,
} from 'sequelize-typescript'

@Table({
    tableName: 'users',
})
export class UserModel extends Model<UserModel> {
    @Column({
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id!: string

    @Length({ max: 50 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string

    @IsEmail
    @Length({ max: 100 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string

    @Length({ max: 100 })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    password!: string

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date

    @BeforeCreate
    static encryptPassword(user: UserModel): void {
        user.password = user.password + ''
    }
}

export type UserModelInterface = typeof UserModel
