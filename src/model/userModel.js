import { DataTypes } from "sequelize";
import { sequelize } from "../configuration/databasev2.js";
import { Review } from "./reviewModel.js";
import { Favorite } from "./favoritesModel.js";

export const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

User.sync().then(() => {
  Review.sync().then(() => {
    Favorite.sync();
    
  });
});


User.hasMany(Review, {
  foreignKey: "id_user",
});
User.hasMany(Favorite, {
  foreignKey: "id_user",
});

Review.belongsTo(User, {
  foreignKey: "id_user",
});

Favorite.belongsTo(User, {
  foreignKey: "id_user",
});
