import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import BannerSVGAnim from './BannerSVGAnim';
import { FormattedMessage } from 'umi';

function Banner(props) {
  return (
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1">XJTLU Online Editor</h1>
        <p key="content">
          交互式编程学习平台
        </p>
        <div key="button" className="button-wrapper">
          <Button type="primary"
                  onClick={() => props.history.push('/helper')}>
              {/* 预览 */}
            <FormattedMessage id="pages.banner.preview" />
          </Button>
          <Button style={{ margin: '0 16px' }}
                  type="primary"
                  ghost
                  onClick={()=> props.history.push('/courses')}>
            <FormattedMessage id='pages.banner.startToUse' />
            {/* 开始使用 */}
          </Button>
        </div>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
