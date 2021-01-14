import React, { useCallback, useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { SelectedMenuAction } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { TOTAL, DCBASEBALL, FMKOREA, RULIWEB_HUMOR } from '../CONST';

const { SubMenu } = Menu;

const Header = () => { 
  const dispatch = useDispatch();
  const { selectedKey } = useSelector(state => state.selected);
  const handleClick = useCallback((e) => {
    dispatch(SelectedMenuAction(e.key));
  }, [selectedKey]);

  return (
    <Menu onClick={handleClick} selectedKeys={[selectedKey]} mode="horizontal">
      <SubMenu key="SubMenu" icon={<BarsOutlined />} title="유머 게시글">
        <Menu.Item key={TOTAL}>전체보기</Menu.Item>
        <Menu.Item key={DCBASEBALL}>DC 야구 갤러리</Menu.Item>
        <Menu.Item key={FMKOREA}>FM KOREA</Menu.Item>
        <Menu.Item key={RULIWEB_HUMOR}>루리웹 유머 BEST</Menu.Item>
      </SubMenu>
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Navigation One
      </Menu.Item>
      <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default Header;