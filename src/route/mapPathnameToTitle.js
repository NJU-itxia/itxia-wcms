import { routePath } from "ROUTE/routePath";

function mapPathnameToPrefix(pathname) {
  switch (pathname) {
    case routePath.LOGIN:
      return "登录";
    case routePath.RECOVERY:
      return "恢复账号";
    case routePath.HOME:
      return "主页";
    case routePath.DASHBOARD:
      return "Dashboard";
    case routePath.HANDLE_ORDER_NEW:
      return "预约单";
    case routePath.SELF_INFO:
      return "个人信息";
    case routePath.ANNOUNCE:
      return "公告编辑";
    case routePath.MEMBER_LIST:
      return "成员管理";
    case routePath.ADD_MEMBER:
      return "添加成员";
    case routePath.TAG_MANAGE:
      return "标签管理";
    case routePath.REQUEST_ORDER:
      return "发起预约";
    case routePath.IMG_HOST:
      return "图床服务";
    default:
      return "404";
  }
}

const postfix = "IT侠后台管理系统";

function mapPathnameToTitle(pathname) {
  return mapPathnameToPrefix(pathname) + " - " + postfix;
}

export { mapPathnameToTitle };
