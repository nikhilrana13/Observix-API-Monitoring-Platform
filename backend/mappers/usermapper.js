export const userMapper = (user)=>({
    username: user.username,
    email:user.email,
    role:user.role,
    profilePic:user.profilePic,
    plan:user.plan,
    isActive:user.isActive,
    lastLogin:user.lastLogin,
})
