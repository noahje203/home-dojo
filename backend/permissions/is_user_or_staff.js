module.exports = function(object, user){
    if (user.role == 'admin' || user.role == 'staff'){
        return true;
    }

    if(object.user._id == user.id){
        return true;
    }

    return false;
};