import React from 'react';
import { enquireScreen } from 'enquire-js';
import Banner from "@/pages/utils/welcomePage/Banner";
import Page1 from "@/pages/utils/welcomePage/Page1";
import './utils/static/style';
import ProCard from "@ant-design/pro-card";
import {PageContainer} from "@ant-design/pro-layout";
import './Welcome.less'

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
      <PageContainer
        header={{
          title: '欢迎',
        }}
      >
        <ProCard>
          <div className="home-wrapper">
            <Banner isMobile={this.state.isMobile} />
            <Page1 isMobile={this.state.isMobile} />
          </div>
        </ProCard>
      </PageContainer>
    );
  }
}

export default Welcome;
