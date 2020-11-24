const product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pictureurl : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    farm_id: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Product.associate = (models) => {
    Product.hasMany(models.Cart);
  };

  return Product;
};

module.exports = product;
