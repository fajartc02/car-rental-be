// req.user -> role
// role -> data access
const accessModel = require("../models/access");
const access = new accessModel();

function rbac(menuParam, accessParam) {
    return async(req, res, next) => {
        const role_id = req.user.role_id;
        console.log(role_id);
        if (role_id === 1) return next();
        // SELECT * From access a
        // JOIN menu m on a.menu_id = m.id
        // where a.role_id = 1 AND grant = { [$accessParam] : true } AND m.name = $menu
        const accessByRole = await access.getOne({
            where: {
                role_id: role_id,
                grant: {
                    path: [accessParam],
                    equals: true,
                },
                menu: {
                    is: {
                        name: menuParam,
                    },
                },
            },
        });
        console.log(accessByRole);
        if (!accessByRole) return next(new ValidationError("Forbidden"));
        return next();
    };
}

module.exports = rbac;