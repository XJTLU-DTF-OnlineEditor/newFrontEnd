import { Collapse, Result } from 'antd';
import {
  SmileOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';

export default function ResultSection() {
  const { Panel } = Collapse;

  const hint = '';
  const [result, setResult] = useState('');
  const [res_status, setRes_status] = useState('sucess');
  const [icon, setIcon] = useState(<SmileOutlined style={{ fontSize: '30px' }} />);

  const show_result = (
    <Result
      icon={icon}
      // title={(!result) || (res_status == 'info') ? '' : result}
      subTitle={!result ? 'Results will be shown here' : result}
    />
  );

  useEffect(() => {
    PubSub.subscribe('showRes', (msg, data) => {
      let res = data.Output
      // let res = data.Output.replace('\n', '<br />');
      // res = <div dangerouslySetInnerHTML={{ __html: res }} />;
      // console.log(res);
      if (data.error_code == 200) {
        setIcon(<InfoCircleOutlined style={{ fontSize: '0', color: '#1890ff94' }} />);
        setRes_status('info');
      } else if (data.error_code == 410 || data.error_code == 408) {
        setIcon(<WarningOutlined style={{ fontSize: '50px', color: '#faad1494' }} />);
        setRes_status('warning');
      } else {
        setIcon(<CloseCircleOutlined style={{ fontSize: '50px', color: '#ff4d4f94' }} />);
        setRes_status('error');
      }
      setResult(res);
      // PubSub.publish('resCollapsed', false);
    });
  });

  return (
    <Collapse bordered={false} ghost className="reshint" defaultActiveKey={['2']}>
      <Panel header="Show hints" key="1">
        <div>{hint}</div>
      </Panel>
      <Panel header="Result" key="2" className={res_status}>
        <div>{show_result}</div>
      </Panel>
    </Collapse>
  );
}
