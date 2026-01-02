import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { Helmet, SelectLang, useIntl, useModel } from "@umijs/max";
import { App, Checkbox, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { flushSync } from "react-dom";

import { login } from "@/services/ant-design-pro/api";
import Settings from "../../../../config/defaultSettings";

type LoginPayload = API.LoginParams & {
  autoLogin?: boolean;
};

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel("@@initialState");
  const { message } = App.useApp();
  const intl = useIntl();

  const logoSrc = useMemo(() => "/logo-bcons.png", []);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: LoginPayload) => {
    try {
      setLoading(true);

      const msg = await login({ ...values, type: "account" });

      if (msg.status === "ok") {
        message.success(
          intl.formatMessage({
            id: "pages.login.success",
            defaultMessage: "Đăng nhập thành công!",
          })
        );

        await fetchUserInfo();

        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get("redirect") || "/";
        return;
      }

      message.error(
        intl.formatMessage({
          id: "pages.login.failure",
          defaultMessage: "Sai tài khoản hoặc mật khẩu.",
        })
      );
    } catch (e) {
      message.error(
        intl.formatMessage({
          id: "pages.login.failure",
          defaultMessage: "Đăng nhập thất bại, vui lòng thử lại!",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,rgba(239,246,255,1)_0%,rgba(255,255,255,1)_55%,rgba(239,246,255,1)_100%)]">
      <Helmet>
        <title>
          {intl.formatMessage({
            id: "menu.login",
            defaultMessage: "Đăng nhập",
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>

      {/* Lang switch (giữ giống code cũ) */}
      <div className="fixed right-4 top-4 z-10">
        {SelectLang && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5">
            <SelectLang />
          </div>
        )}
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1400px] items-center px-6 py-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* LEFT: Branding */}
          <div className="order-1 flex items-center justify-center lg:order-none lg:justify-start">
            <div className="max-w-[720px]">
              <img
                src={logoSrc}
                alt="BCONS"
                className="w-full max-w-[560px] drop-shadow-[0_16px_30px_rgba(2,6,23,0.12)]"
              />
            </div>
          </div>

          {/* RIGHT: Login Card */}
          <div className="order-2 flex items-center justify-center lg:order-none lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              {/* card shadow layer */}
              <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl bg-slate-200/30 blur-[1px]" />
              <div className="absolute -right-6 -top-6 h-full w-full rounded-2xl bg-slate-200/20 blur-[2px]" />

              <div className="relative rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.12)] backdrop-blur">
                <LoginForm
                  submitter={{
                    searchConfig: { submitText: "Đăng nhập" },
                    submitButtonProps: {
                      loading,
                      className:
                        "w-full !h-11 !rounded-xl !bg-[#0B4EA2] hover:!bg-[#083F83] !border-none",
                    },
                  }}
                  contentStyle={{ padding: 0 }}
                  // ẩn header mặc định của LoginForm, mình tự vẽ tiêu đề
                  title={false}
                  subTitle={false}
                  logo={false}
                  initialValues={{ autoLogin: true }}
                  onFinish={async (values) => {
                    await handleSubmit(values as LoginPayload);
                    return true;
                  }}
                >
                  <div className="mb-5 text-center">
                    <div className="text-[26px] font-bold tracking-tight text-slate-800">
                      Đăng nhập
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      Vui lòng nhập thông tin để tiếp tục
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-slate-600">
                      Tên đăng nhập
                    </div>
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: "large",
                        prefix: <UserOutlined className="text-slate-400" />,
                      }}
                      placeholder="Admin"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đăng nhập",
                        },
                      ]}
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-medium text-slate-600">
                      Mật khẩu
                    </div>
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className="text-slate-400" />,
                      }}
                      placeholder="••••••••"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                      ]}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Checkbox
                      defaultChecked
                      onChange={(e) => {
                        // nếu bạn muốn lưu vào form values thì dùng ProFormCheckbox,
                        // còn đơn giản thì checkbox thường như này ok.
                      }}
                    >
                      <span className="text-sm text-slate-700">
                        Ghi nhớ đăng nhập
                      </span>
                    </Checkbox>

                    <a
                      className="text-sm text-[#0B4EA2] hover:text-[#083F83]"
                      href="/user/forgot"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>

                  {/* Footer nhỏ trong card (optional) */}
                  <div className="mt-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} BCONS Corporation. All rights
                    reserved.
                  </div>
                </LoginForm>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer dưới cùng (optional) */}
      <div className="pb-6 text-center text-xs text-slate-500">
        Hotline hỗ trợ:{" "}
        <span className="font-semibold text-slate-700">1900 1515</span>
      </div>
    </div>
  );
};

export default LoginPage;
