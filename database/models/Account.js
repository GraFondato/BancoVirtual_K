module.exports = (sequelize, dataTypes) => {
    let alias = 'Account'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        id_users:{
            type: dataTypes.INTEGER(10),
            references: { model: 'User', key: 'id' }
        },
        balance: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        type_account: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        
    };
    let config = {
        tableName: "accounts",
        timestamps: false
    };

    const Account = sequelize.define(alias, cols, config); 
    return Account;
}