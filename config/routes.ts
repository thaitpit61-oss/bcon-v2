/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: "/user",
    layout: false,
    routes: [
      {
        path: "/user/login",
        layout: false,
        name: "login",
        component: "./user/login",
      },
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        name: "register-result",
        icon: "smile",
        path: "/user/register-result",
        component: "./user/register-result",
      },
      {
        name: "register",
        icon: "smile",
        path: "/user/register",
        component: "./user/register",
      },
      {
        component: "404",
        path: "/user/*",
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    icon: "dashboard",
    routes: [
      {
        path: "/dashboard",
        redirect: "/dashboard/analysis",
      },
      {
        name: "analysis",
        icon: "smile",
        path: "/dashboard/analysis",
        component: "./dashboard/analysis",
      },
      {
        name: "monitor",
        icon: "smile",
        path: "/dashboard/monitor",
        component: "./dashboard/monitor",
      },
      {
        name: "workplace",
        icon: "smile",
        path: "/dashboard/workplace",
        component: "./dashboard/workplace",
      },
    ],
  },
  ///////////////////// CRM routes /////////////////////
  {
    path: "/crm",
    name: "CRM",
    icon: "user",
    routes: [
      // default crm route
      {
        path: "/crm",
        redirect: "/crm/customer",
      },
      // customer list routes
      {
        name: "Danh sách khách hàng",
        icon: "smile",
        path: "/crm/customer",
        component: "./crm/customer",
      },
      // create new customer route
      {
        path: "/crm/customer/create",
        component: "./crm/customer/create",
      },
      // Edit customer route
      {
        path: "/crm/customer/:id/edit",
        component: "./crm/customer/edit",
      },
      // opportunity list routes
      {
        name: "Danh sách cơ hội",
        icon: "smile",
        path: "/crm/opportunity",
        component: "./crm/opportunity",
      },
      // Edit opportunity route
      {
        path: "/crm/opportunity/:id/edit",
        component: "./crm/opportunity/edit",
      },
      // create new opportunity route
      {
        path: "/crm/opportunity/create",
        component: "./crm/opportunity/create",
      },
      // membership card list route
      {
        name: "Thẻ thành viên",
        icon: "smile",
        path: "/crm/membership-card",
        component: "./crm/membership-card",
      },
      // membership card edit route
      {
        path: "/crm/membership-card/:id/edit",
        component: "./crm/membership-card/edit",
      },
      // membership card create route
      {
        path: "/crm/membership-card/create",
        component: "./crm/membership-card/create",
      },
      // price quote list route
      {
        name: "Báo giá",
        icon: "smile",
        path: "/crm/price-quote",
        component: "./crm/price-quote",
      },
      // price quote edit
      {
        path: "/crm/price-quote/:id/edit",
        component: "./crm/price-quote/edit",
      },
    ],
  },
  ///////////////////// System routes /////////////////////
  {
    path: "/system",
    name: "Danh mục hệ thống",
    icon: "setting",
    routes: [
      // vào /system thì đá sang CRM (hoặc trang con đầu tiên)
      {
        path: "/system",
        redirect: "/system/crm/title",
      },
       // ===== Nhóm Phân quyền =====
      {
        name: "Phân quyền",
        icon: "smile",
        path: "/system/authorization",
        routes: [
          {
            path: "/system/authorization",
            redirect: "/system/authorization/position",
          },
          {
            name: "Chức vụ",
            icon: "smile",
            path: "/system/authorization/position",
            component: "./system/authorization/position",
          },
          {
            name: "Phòng ban",
            icon: "smile",
            path: "/system/authorization/department",
            component: "./system/authorization/department",
          },
          {
            name: "Nhóm kinh doanh",
            icon: "smile",
            path: "/system/authorization/business-unit",
            component: "./system/authorization/business-unit",
          },
        ],
      },
      // ===== Nhóm CRM =====
      {
        name: "CRM",
        icon: "smile",
        path: "/system/crm",
        routes: [
          {
            path: "/system/crm",
            redirect: "/system/crm/title",
          },
          {
            name: "Danh xưng",
            icon: "smile",
            path: "/system/crm/title",
            component: "./system/crm/title",
          },
          {
            name: "Ngành nghề",
            icon: "smile",
            path: "/system/crm/profession",
            component: "./system/crm/profession",
          },
          {
            name: "Nguồn đến",
            icon: "smile",
            path: "/system/crm/insource",
            component: "./system/crm/insource",
          },
          {
            name: "Thời điểm liên hệ",
            icon: "smile",
            path: "/system/crm/contact-time",
            component: "./system/crm/contact-time",
          },
          {
            name: "Loại hình kinh doanh",
            icon: "smile",
            path: "/system/crm/business-type",
            component: "./system/crm/business-type",
          },
        ],
      },
    ],
  },

  ///////////////////// Project routes /////////////////////
  {
    path: "/project",
    name: "Quản lý dự án",
    icon: "project",
    routes: [
      {
        path: "/project",
        redirect: "/project/list",
      },
      {
        name: "Danh sách dự án",
        icon: "smile",
        path: "/project/list",
        component: "./project/list",
      },
      {
        path: "/project/create",
        component: "./project/create",
      },
      {
        path: "/project/:id",
        component: "./project/detail",
      },
      {
        name: "Chương trình khuyến mãi",
        icon: "smile",
        path: "/project/promotions",
        component: "./project/promotions",
      },
      {
        name: "Lịch thanh toán ",
        icon: "smile",
        path: "/project/payment-schedule",
        component: "./project/payment-schedule",
      },

      // Edit project route
      {
        path: "/project/:id/edit",
        component: "./project/project-edit",
      },
      // Create promotion route
      {
        path: "/project/promotions/create",
        component: "./project/promotions/create",
      },
      // Edit promotion route
      {
        path: "/project/promotions/:id/edit",
        component: "./project/promotions/edit",
      },
      // Detail payment-schedule route
      {
        path: "/project/payment-schedule/:id",
        component: "./project/payment-schedule/detail",
      },
      // Create payment-schedule route
      {
        path: "/project/payment-schedule/create",
        component: "./project/payment-schedule/create",
      },
      // Edit payment-schedule route
      {
        path: "/project/payment-schedule/:id/edit",
        component: "./project/payment-schedule/edit",
      },
      // Detail payment-schedule route
      {
        path: "/project/payment-schedule/:id",
        component: "./project/payment-schedule/detail",
      },
      // Detail form route
      {
        name: "Biểu mẫu",
        icon: "smile",
        path: "/project/forms",
        component: "./project/forms",
      },
      {
        path: "/project/forms/create",
        component: "./project/forms/create",
      },
      // Edit form route
      {
        path: "/project/forms/:id/edit",
        component: "./project/forms/edit",
      },
      // Detail form route
      {
        path: "/project/forms/:id",
        component: "./project/forms/detail",
      },
    ],
  },

  {
    path: "/product",
    name: "Quản lý sản phẩm",
    icon: "product",
    routes: [
      {
        path: "/product",
        redirect: "/product/list",
      },
      {
        name: "Danh sách sản phẩm",
        icon: "smile",
        path: "/product/list",
        component: "./product/list",
      },
      {
        path: "/product/:maCan",
        component: "./product/detail",
      },
      {
        path: "/product/create",
        component: "./product/create",
      },
      {
        path: "/product/:maCan",
        component: "./product/detail",
      },
      // Edit product route
      {
        path: "/product/:maCan/edit",
        component: "./product/edit",
      },
      {
        name: "Đợt mở bán ",
        icon: "smile",
        path: "/product/sale",
        component: "./product/sale",
      },
      {
        path: "/product/sale/create-sale",
        component: "./product/sale/create-sale",
      },
      {
        path: "/product/sale/:id/edit",
        component: "./product/sale/edit",
      },
      {
        path: "/product/sale/:id",
        component: "./product/sale/detail",
      },
    ],
  },
  // {
  //   path: "/form",
  //   icon: "form",
  //   name: "form",
  //   routes: [
  //     {
  //       path: "/form",
  //       redirect: "/form/basic-form",
  //     },
  //     {
  //       name: "basic-form",
  //       icon: "smile",
  //       path: "/form/basic-form",
  //       component: "./form/basic-form",
  //     },
  //     {
  //       name: "step-form",
  //       icon: "smile",
  //       path: "/form/step-form",
  //       component: "./form/step-form",
  //     },
  //     {
  //       name: "advanced-form",
  //       icon: "smile",
  //       path: "/form/advanced-form",
  //       component: "./form/advanced-form",
  //     },
  //   ],
  // },
  // {
  //   path: "/form",
  //   icon: "form",
  //   name: "form",
  //   routes: [
  //     {
  //       path: "/form",
  //       redirect: "/form/basic-form",
  //     },
  //     {
  //       name: "basic-form",
  //       icon: "smile",
  //       path: "/form/basic-form",
  //       component: "./form/basic-form",
  //     },
  //     {
  //       name: "step-form",
  //       icon: "smile",
  //       path: "/form/step-form",
  //       component: "./form/step-form",
  //     },
  //     {
  //       name: "advanced-form",
  //       icon: "smile",
  //       path: "/form/advanced-form",
  //       component: "./form/advanced-form",
  //     },
  //   ],
  // },
  // {
  //   path: "/list",
  //   icon: "table",
  //   name: "list",
  //   routes: [
  //     {
  //       path: "/list/search",
  //       name: "search-list",
  //       component: "./list/search",
  //       routes: [
  //         {
  //           path: "/list/search",
  //           redirect: "/list/search/articles",
  //         },
  //         {
  //           name: "articles",
  //           icon: "smile",
  //           path: "/list/search/articles",
  //           component: "./list/search/articles",
  //         },
  //         {
  //           name: "projects",
  //           icon: "smile",
  //           path: "/list/search/projects",
  //           component: "./list/search/projects",
  //         },
  //         {
  //           name: "applications",
  //           icon: "smile",
  //           path: "/list/search/applications",
  //           component: "./list/search/applications",
  //         },
  //       ],
  //     },
  //     {
  //       path: "/list",
  //       redirect: "/list/table-list",
  //     },
  //     {
  //       name: "table-list",
  //       icon: "smile",
  //       path: "/list/table-list",
  //       component: "./table-list",
  //     },
  //     {
  //       name: "basic-list",
  //       icon: "smile",
  //       path: "/list/basic-list",
  //       component: "./list/basic-list",
  //     },
  //     {
  //       name: "card-list",
  //       icon: "smile",
  //       path: "/list/card-list",
  //       component: "./list/card-list",
  //     },
  //   ],
  // },
  // {
  //   path: "/profile",
  //   name: "profile",
  //   icon: "profile",
  //   routes: [
  //     {
  //       path: "/profile",
  //       redirect: "/profile/basic",
  //     },
  //     {
  //       name: "basic",
  //       icon: "smile",
  //       path: "/profile/basic",
  //       component: "./profile/basic",
  //     },
  //     {
  //       name: "advanced",
  //       icon: "smile",
  //       path: "/profile/advanced",
  //       component: "./profile/advanced",
  //     },
  //   ],
  // },
  // {
  //   name: "result",
  //   icon: "CheckCircleOutlined",
  //   path: "/result",
  //   routes: [
  //     {
  //       path: "/result",
  //       redirect: "/result/success",
  //     },
  //     {
  //       name: "success",
  //       icon: "smile",
  //       path: "/result/success",
  //       component: "./result/success",
  //     },
  //     {
  //       name: "fail",
  //       icon: "smile",
  //       path: "/result/fail",
  //       component: "./result/fail",
  //     },
  //   ],
  // },
  // {
  //   name: "exception",
  //   icon: "warning",
  //   path: "/exception",
  //   routes: [
  //     {
  //       path: "/exception",
  //       redirect: "/exception/403",
  //     },
  //     {
  //       name: "403",
  //       icon: "smile",
  //       path: "/exception/403",
  //       component: "./exception/403",
  //     },
  //     {
  //       name: "404",
  //       icon: "smile",
  //       path: "/exception/404",
  //       component: "./exception/404",
  //     },
  //     {
  //       name: "500",
  //       icon: "smile",
  //       path: "/exception/500",
  //       component: "./exception/500",
  //     },
  //   ],
  // },
  // {
  //   name: "account",
  //   icon: "user",
  //   path: "/account",
  //   routes: [
  //     {
  //       path: "/account",
  //       redirect: "/account/center",
  //     },
  //     {
  //       name: "center",
  //       icon: "smile",
  //       path: "/account/center",
  //       component: "./account/center",
  //     },
  //     {
  //       name: "settings",
  //       icon: "smile",
  //       path: "/account/settings",
  //       component: "./account/settings",
  //     },
  //   ],
  // },
  {
    path: "/",
    redirect: "/dashboard/analysis",
  },
  {
    component: "404",
    path: "./*",
  },
];
