import { Favorite } from "./favoritesModel";
import { Review } from "./reviewModel";
import { User } from "./userModel";



User.hasMany(Review, {
    foreignKey : 'id_user'
});

User.hasMany(Favorite, {
    foreignKey : 'id_user'
});

Review.belongsTo(User, {
    foreignKey : 'id_user'
})

Favorite.belongsToMany(User, {
    foreignKey : 'id_user'
})
