import component from './vi-VN/component';
import globalHeader from './vi-VN/globalHeader';
import menu from './vi-VN/menu';
import pages from './vi-VN/pages';
import pwa from './vi-VN/pwa';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';

export default {
  // ===== Global =====
  'navBar.lang': 'Ngôn ngữ',
  'layout.user.link.help': 'Trợ giúp',
  'layout.user.link.privacy': 'Quyền riêng tư',
  'layout.user.link.terms': 'Điều khoản',
  'app.preview.down.block': 'Tải trang này về dự án của bạn',
  'app.welcome.link.fetch-blocks': 'Lấy tất cả block',
  'app.welcome.link.block-list':
    'Xây dựng nhanh các trang chuẩn dựa trên block',

  // ===== Import module =====
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
