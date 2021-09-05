import { Descriptions } from 'antd';
import React from 'react';

const progress = () => {
  return(
    <div>
      <Descriptions column={3} title="课程进度" bordered>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column<br />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default progress;
