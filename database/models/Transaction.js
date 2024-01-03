module.exports = (sequelize, dataTypes) => {
    let alias = 'Transactions'; // esto debería estar en singular
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
        id_account:{
            type: dataTypes.INTEGER(10),
            references: { model: 'Account', key: 'id' }
        },
        amount: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        type_transactions: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        
    };
    let config = {
        tableName: "transactions",
        timestamps: false
    };

    const Transaction = sequelize.define(alias, cols, config); 
    return Transaction;
}