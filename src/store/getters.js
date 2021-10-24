const getters = {
    web3Account: state => state.web3.web3Account,
    web3Chain: state => state.web3.web3Chain,
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    userId: state => state.user.userId,
    nickName: state => state.user.nickName,
    userInfo: state => state.user.userInfo,
    permission_routes: state => state.permission.routes,
    errorLogs: state => state.errorLog.logs
};
export default getters;
