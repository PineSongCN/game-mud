const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    userId: state => state.user.userId,
    avatar: state => state.user.avatar,
    name: state => state.user.nickName,
    nickName: state => state.user.nickName,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    errorLogs: state => state.errorLog.logs
};
export default getters;
