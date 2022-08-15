import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
import { getCaptcha, login, logout, register } from '@/services/user/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';
import { getInitialState } from '@/app';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('login');
  const [userType, setUserType] = useState('student');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    console.log(values);
    if (userType === 'student') {
      values.email = values.email + '@student.xjtlu.edu.cn';
      console.log(values);
    } else if (userType === 'teacher') {
      values.email = values.email + '@xjtlu.edu.cn';
      console.log(values);
    }

    try {
      // 登录
      const msg = await login({ ...values, userType });

      console.log(msg);

      if (msg.error_code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        }); // login successfully
        message.success(defaultLoginSuccessMessage);
        // 存储登录Token
        localStorage.setItem('token', msg.token);
        localStorage.setItem('currentAuthority', msg.currentAuthority);
        localStorage.setItem('currentAuthority', msg.currentAuthority);
        fetchUserInfo(); // fetch user information again and refresh token
        // console.log("jump to welcome")
        // Jump to welcome
        // history.push(`/welcome`)
        // console.log(history);
        if (!history) return;
        const { query } = history.location;
        // console.log(query);
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }
      if (msg.error_code === 422) {
        const defaultWrongSuccessMessage = intl.formatMessage({
          id: 'pages.login.wrong',
          defaultMessage: '请检查用户名或密码！',
        }); // login successfully
        message.error(defaultWrongSuccessMessage);
      }
    } catch (error) {
      // 如果失败去设置用户错误信息
      console.dir(error.data);
      setUserLoginState(error.data);
      console.log(userLoginState);
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
      history.push('/');
    }

    setSubmitting(false);
  };

  const handleRegisterSubmit = async (values) => {
    setSubmitting(true);
    console.log(values);

    if (userType === 'student') {
      values.email = values.email + '@student.xjtlu.edu.cn';
      console.log(values);
    } else if (userType === 'teacher') {
      values.email = values.email + '@xjtlu.edu.cn';
      console.log(values);
    }

    try {
      // 注册
      const msg = await register({ ...values, userType });
      console.log(msg);
      if (msg.status === 'ok') {
        // 注册成功
        const defaultRegisterSuccessMessage = intl.formatMessage({
          id: 'pages.login.register.success',
          defaultMessage: '注册成功！',
        }); // login successfully
        message.success(defaultRegisterSuccessMessage);
        localStorage.setItem('token', msg.token);
        localStorage.setItem('currentAuthority', msg.currentAuthority);
        fetchUserInfo(); // fetch user information again and refresh token
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      } else if (msg.status === 'error' && msg.error_code === 421) {
        const RegisterExistFailureMessage = intl.formatMessage({
          id: 'pages.login.register.failure.exist',
          defaultMessage: '邮箱已被注册，请直接登录！',
        });
        message.error(RegisterExistFailureMessage);
      } else if (msg.status === 'error' && msg.error_code === 420) {
        const noCaptchaFailureMessage = intl.formatMessage({
          id: 'pages.login.register.failure.noCaptcha',
          defaultMessage: '请先获取验证码！',
        });
        message.error(noCaptchaFailureMessage);
      }
    } catch (error) {
      // 如果失败去设置用户错误信息
      console.dir(error.data);
      setUserLoginState(error.data);
      console.log(userLoginState);
      const defaultRegisterFailureMessage = intl.formatMessage({
        id: 'pages.login.register.failure',
        defaultMessage: '注册失败，请重试！',
      });
      message.error(defaultRegisterFailureMessage);
      history.push('/');
    }
    setSubmitting(false);
  };

  const { status, type: operationType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>XJTLU Online Editor</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
          </div>
        </div>

        <div className={styles.main}>
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="login"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '登录',
              })}
            />
            <Tabs.TabPane
              key="register"
              tab={intl.formatMessage({
                id: 'pages.login.register.tab',
                defaultMessage: '注册',
              })}
            />
          </Tabs>

          {status === 'error' && operationType === 'login' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          {type === 'login' && (
            <Tabs tabPosition="top" activeKey={userType} onChange={setUserType}>
              <Tabs.TabPane
                tab=/*"我是同学"*/ {<FormattedMessage id="pages.login.student" />}
                key="student"
              >
                <>
                  <ProForm
                    initialValues={{
                      autoLogin: true,
                    }}
                    submitter={{
                      searchConfig: {
                        submitText: intl.formatMessage({
                          id: 'pages.login.submit',
                          defaultMessage: '登录',
                        }),
                      },
                      render: (_, dom) => dom.pop(),
                      submitButtonProps: {
                        loading: submitting,
                        size: 'large',
                        style: {
                          width: '100%',
                        },
                      },
                    }}
                    onFinish={async (values) => {
                      handleSubmit(values);
                    }}
                  >
                    <ProFormText
                      name="email"
                      addonAfter="@student.xjtlu.edu.cn"
                      fieldProps={{
                        size: 'large',
                        prefix: <MailOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.email.placeholder',
                        defaultMessage: 'XJTLU邮箱（必填）',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.email.required"
                              defaultMessage="请输入XJTLU邮箱!"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.password.placeholder',
                        defaultMessage: '密码',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.password.required"
                              defaultMessage="请输入密码！"
                            />
                          ),
                        },
                      ]}
                    />
                  </ProForm>
                  <div
                    style={{
                      marginBottom: 24,
                    }}
                  >
                    <a
                      style={{
                        float: 'right',
                      }}
                    >
                      <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
                    </a>
                  </div>
                </>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab=/*"我是老师"*/ {<FormattedMessage id="pages.login.teacher" />}
                key="teacher"
              >
                <>
                  <ProForm
                    initialValues={{
                      autoLogin: true,
                    }}
                    submitter={{
                      searchConfig: {
                        submitText: intl.formatMessage({
                          id: 'pages.login.submit',
                          defaultMessage: '登录',
                        }),
                      },
                      render: (_, dom) => dom.pop(),
                      submitButtonProps: {
                        loading: submitting,
                        size: 'large',
                        style: {
                          width: '100%',
                        },
                      },
                    }}
                    onFinish={async (values) => {
                      handleSubmit(values);
                    }}
                  >
                    <ProFormText
                      name="email"
                      addonAfter="@xjtlu.edu.cn"
                      fieldProps={{
                        size: 'large',
                        prefix: <MailOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.email.placeholder',
                        defaultMessage: 'XJTLU邮箱(必填)',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.email.required"
                              defaultMessage="请输入XJTLU邮箱!"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.password.placeholder',
                        defaultMessage: '密码: ant.design',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.password.required"
                              defaultMessage="请输入密码！"
                            />
                          ),
                        },
                      ]}
                    />
                  </ProForm>
                  <div
                    style={{
                      marginBottom: 24,
                    }}
                  >
                    <a
                      style={{
                        float: 'right',
                      }}
                    >
                      <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
                    </a>
                  </div>
                </>
              </Tabs.TabPane>
            </Tabs>
          )}

          {status === 'error' && operationType === 'register' && (
            <LoginMessage content="验证码错误" />
          )}
          {type === 'register' && (
            <>
              <Tabs tabPosition="top" onChange={setUserType}>
                <Tabs.TabPane
                  tab=/*"我是同学"*/ {<FormattedMessage id="pages.login.student" />}
                  key="student"
                >
                  <>
                    <ProForm
                      initialValues={{
                        autoLogin: true,
                      }}
                      submitter={{
                        searchConfig: {
                          submitText: intl.formatMessage({
                            id: 'pages.login.register.submit',
                            defaultMessage: ' 注册',
                          }),
                        },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: {
                          loading: submitting,
                          size: 'large',
                          style: {
                            width: '100%',
                          },
                        },
                      }}
                      onFinish={async (values) => {
                        handleRegisterSubmit(values);
                      }}
                    >
                      <ProFormText
                        name="email"
                        addonAfter="@student.xjtlu.edu.cn"
                        fieldProps={{
                          size: 'large',
                          prefix: <MailOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.email.placeholder',
                          defaultMessage: 'XJTLU邮箱（必填）',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.email.required"
                                defaultMessage="请输入XJTLU邮箱!"
                              />
                            ),
                          },
                        ]}
                      />
                      <ProFormText
                        name="username"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.username.placeholder',
                          defaultMessage: '昵称',
                        })}
                      />
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.password.placeholder',
                          defaultMessage: '密码',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.password.required"
                                defaultMessage="请输入密码！"
                              />
                            ),
                          },
                        ]}
                      />
                      <ProFormCaptcha
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        captchaProps={{
                          size: 'large',
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.captcha.placeholder',
                          defaultMessage: '请输入验证码',
                        })}
                        captchaTextRender={(timing, count) => {
                          if (timing) {
                            return `${count} ${intl.formatMessage({
                              id: 'pages.getCaptchaSecondText',
                              defaultMessage: '获取验证码',
                            })}`;
                          }

                          return intl.formatMessage({
                            id: 'pages.login.phoneLogin.getVerificationCode',
                            defaultMessage: '获取验证码',
                          });
                        }}
                        name="captcha"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.captcha.required"
                                defaultMessage="请输入验证码！"
                              />
                            ),
                          },
                        ]}
                        phoneName="email"
                        onGetCaptcha={async (phone) => {
                          const email = phone + '@student.xjtlu.edu.cn';
                          // console.log(email)
                          const result = await getCaptcha({ email: email });
                          // console.log(result)

                          // console.log(captcha)
                          message.success('获取验证码成功');
                        }}
                      />
                    </ProForm>
                  </>
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab=/*"我是老师"*/ {<FormattedMessage id="pages.login.teacher" />}
                  key="teacher"
                >
                  <>
                    <ProForm
                      initialValues={{
                        autoLogin: true,
                      }}
                      submitter={{
                        searchConfig: {
                          submitText: intl.formatMessage({
                            id: 'pages.login.register.submit',
                            defaultMessage: ' 注册',
                          }),
                        },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: {
                          loading: submitting,
                          size: 'large',
                          style: {
                            width: '100%',
                          },
                        },
                      }}
                      onFinish={async (values) => {
                        handleRegisterSubmit(values);
                      }}
                    >
                      <ProFormText
                        name="email"
                        addonAfter="@xjtlu.edu.cn"
                        fieldProps={{
                          size: 'large',
                          prefix: <MailOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.email.placeholder',
                          defaultMessage: 'XJTLU邮箱(必填)',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.email.required"
                                defaultMessage="请输入XJTLU邮箱!"
                              />
                            ),
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.password.placeholder',
                          defaultMessage: '密码(必填)',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.password.required"
                                defaultMessage="请输入密码！"
                              />
                            ),
                          },
                        ]}
                      />
                      <ProFormCaptcha
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        captchaProps={{
                          size: 'large',
                        }}
                        placeholder={intl.formatMessage({
                          id: 'pages.login.captcha.placeholder',
                          defaultMessage: '请输入验证码',
                        })}
                        captchaTextRender={(timing, count) => {
                          if (timing) {
                            return `${count} ${intl.formatMessage({
                              id: 'pages.getCaptchaSecondText',
                              defaultMessage: '获取验证码',
                            })}`;
                          }

                          return intl.formatMessage({
                            id: 'pages.login.phoneLogin.getVerificationCode',
                            defaultMessage: '获取验证码',
                          });
                        }}
                        name="captcha"
                        phoneName="email"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.captcha.required"
                                defaultMessage="请输入验证码！"
                              />
                            ),
                          },
                        ]}
                        onGetCaptcha={async (phone) => {
                          const email = phone + '@xjtlu.edu.cn';
                          // console.log(email)
                          const result = await getCaptcha({ email: email });
                          // console.log(result)

                          // console.log(captcha)
                          message.success('获取验证码成功');
                        }}
                      />
                    </ProForm>
                  </>
                </Tabs.TabPane>
              </Tabs>
            </>
          )}
          <Space className={styles.other} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
