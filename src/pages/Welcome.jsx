import React from 'react';
import { enquireScreen } from 'enquire-js';
import Banner from "@/pages/utils/welcomePage/Banner";
import Page1 from "@/pages/utils/welcomePage/Page1";
import './utils/static/style';
import ProCard from "@ant-design/pro-card";
import {PageContainer} from "@ant-design/pro-layout";
import './Welcome.less'
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd';


let isMobile;

enquireScreen((b) => {
  isMobile = b;
});

class Welcome extends React.PureComponent {
  state = {
    isMobile,
  }
  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
      <PageContainer
        header={{
          // title: '欢迎',
          id: 'pages.welcome.welcome'
        }}
      >
        <ProCard>
          <div className="home-wrapper">
            <Banner isMobile={this.state.isMobile} history={this.props.history}/>
            <Page1 isMobile={this.state.isMobile} />
          </div>
        </ProCard>
      </PageContainer>
      </ConfigProvider>

    );
  }
}

export default Welcome;
