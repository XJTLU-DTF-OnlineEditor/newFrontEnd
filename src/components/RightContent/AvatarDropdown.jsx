import React, { useCallback, useState } from 'react';
import { LoginOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Image, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import { logout } from '@/services/user/api';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await logout();
  const { query = {}, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: { currentAuthority: 'guest' } }));
        localStorage.removeItem('token');
        localStorage.removeItem('currentAuthority');
        loginOut();
        history.push('/welcome');
        return;
      } else if (key === 'login') {
        history.push('/user/login');
      }

      // history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const { currentUser } = initialState;

  // console.log(currentUser.currentAuthority)

  const displayAvator = () => {
    // console.log(currentUser.avatar)
    if (!currentUser) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src='https://joeschmoe.io/api/v1/random' alt="avatar"/>
          <span className={`${styles.name} anticon`}>请登录</span>
        </span>
      )
    }
    if (currentUser.currentAuthority === "guest" || null) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src="https://joeschmoe.io/api/v1/random"
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>请登录</span>
        </span>
      );
    } else if (currentUser.currentAuthority === 'user') {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avator} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.username}</span>
        </span>
      )
    } else if (currentUser.currentAuthority === "admin") {
      console.log(currentUser.email.split("@")[0])
      const teacherName = currentUser.email.split("@")[0]
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avator} alt="avatar" />
          <span className={`${styles.name} anticon`}>{teacherName}</span>
        </span>
      );
    }
  };

  const menuHeaderDropdown = () => {
    if (!currentUser) {
      return (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
          <Menu.Item key="login">
            <LoginOutlined/>
            登录
          </Menu.Item>
        </Menu>
      )
    }
    if (currentUser.currentAuthority === "guest") {
      return (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
          <Menu.Item key="login">
            <LoginOutlined />
            登录
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
          {menu && (
            <Menu.Item key="center">
              <UserOutlined/>
              个人中心
            </Menu.Item>
          )}
          {menu && <Menu.Divider/>}

          <Menu.Item key="logout">
            <LogoutOutlined/>
            退出登录
          </Menu.Item>
        </Menu>)
    }
  }

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      {displayAvator()}
    </HeaderDropdown>
  );
}

export default AvatarDropdown;
