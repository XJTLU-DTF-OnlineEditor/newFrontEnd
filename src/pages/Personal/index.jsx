import React, { useEffect, useState } from 'react';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Descriptions, Row, Drawer, Card, Divider, Calendar } from 'antd';
import { Avatar, Tag, Input, Select, Typography, Radio } from 'antd';
import { AntDesignOutlined, PlusOutlined } from '@ant-design/icons';
import { delTags, getTags } from '@/services/user/api';
import progress from '@/pages/Personal/components/Progress';
import Collected from '@/pages/Personal/components/Collected';

const handleTagClick = (value) => {
  console.log(value);
};

const handleTagClose = async (value) => {
  console.log(value);
  // Call delete api
  const res = await delTags({value})
};

const closableTag = () => {
  let [data, setData] = useState([])
  let [tags, setTags] = useState([])

  useEffect(async ()=> {
    const resData = await getTags()
    setData(resData)
  }, [])

  console.log(data);

  const closableTags = [
    {
      name: <Tag closable onClose={() => handleTagClose(1)} color='processing'>JAVA</Tag>,  // onClose is to call api to update user skills entity
      id: 'Java',
    },
    {
      name: <Tag closable color='success' onClose={() => handleTagClose(2)}>PYTHON</Tag>,
      id: 'python',
    },
    {
      name: <Tag closable color='default' onClose={() => handleTagClose(3)}>C++</Tag>,
      id: 'cpp',
    },
    {
      name: <Tag closable color='error' onClose={() => handleTagClose(4)}>Machine Learning</Tag>,
      id: 'ml',
    },
    {
      name: <Tag closable color='warning' onClose={() => handleTagClose(5)}>Java Web</Tag>,
      id: 'java web',
    },
    {
      name: <Tag closable color='warning' onClose={() => handleTagClose(6)}>Distributed System</Tag>,
      id: 'distributed system',
    },
    {
      name: <Tag closable color='success' onClose={() => handleTagClose(7)}>Matlab</Tag>,
      id: 'matlab',
    },
    {
      name: <Tag closable color='error' onClose={() => handleTagClose(8)}>Javascript</Tag>,
      id: 'react',
    },
  ];

  const displayTag = () => {
    tags=[]
    for (let i = 0; i < data.length; i++) {
      tags.push(closableTags[data[i].id-1].name)
      // setTags(newTags)
    }

    return (
      tags
    )
  };

  return (
    <div>
      {displayTag()}
  </div>
  );
};

const editableTag = () => {
  const editableTags = [
    {
      name: <Tag onClick={() => handleTagClick(1)} color='processing'><a>JAVA</a></Tag>,  // onClick is to call add api to update Tag Infor
      id: 1,
    },
    {
      name: <Tag onClick={() => handleTagClick(2)} color='success'><a>PYTHON</a></Tag>,
      id: 2,
    },
    {
      name: <Tag onClick={() => handleTagClick(3)} color='default'><a>C++</a></Tag>,
      id: 3,
    },
    {
      name: <Tag onClick={() => handleTagClick(4)} color='error'><a>Machine Learning</a></Tag>,
      id: 4,
    },
    {
      name: <Tag onClick={() => handleTagClick(5)} color='warning'><a>Java Web</a></Tag>,
      id: 5,
    },
    {
      name: <Tag onClick={() => handleTagClick(6)} color='warning'><a>Distributed System</a></Tag>,
      id: 6,
    },
    {
      name: <Tag onClick={() => handleTagClick(7)} color='success'><a>Matlab</a></Tag>,
      id: 7,
    },
    {
      name: <Tag onClick={() => handleTagClick(8)} color='error'><a>Javascript</a></Tag>,
      id: 8,
    },
  ];
  return (<div>
    {editableTags[0].name}
    {editableTags[1].name}
    {editableTags[2].name}
    {editableTags[3].name}
    {editableTags[4].name}
    {editableTags[5].name}
    {editableTags[6].name}
    {editableTags[7].name}
  </div>);
};

const addTags = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={{ marginTop: -10 }}>
        <Button type='primary' icon={<PlusOutlined />} onClick={showDrawer}>
          Add Tags
        </Button>
      </div>
      <Drawer
        title='Choose your skills'
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <p>{editableTag()}</p>
      </Drawer>
    </div>
  );
};

const targetCalendar = () => {
  return (
    <div className='site-calendar-customize-header-wrapper'>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className='month-item' key={`${index}`}>
                {months[index]}
              </Select.Option>,
            );
          }
          const month = value.month();

          const year = value.year();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className='year-item'>
                {i}
              </Select.Option>,
            );
          }
          return (
            <div style={{ padding: 8 }}>
              <Typography.Title level={4}>目标</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group size='small' onChange={e => onTypeChange(e.target.value)} value={type}>
                    <Radio.Button value='month'>Month</Radio.Button>
                    <Radio.Button value='year'>Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size='small'
                    dropdownMatchSelectWidth={false}
                    className='my-year-select'
                    onChange={newYear => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                    value={String(year)}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size='small'
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={selectedMonth => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
      />
    </div>
  );
};

const target = () => {
  return (
    <Row gutter={24}>
      <Col lg={14} md={24}>
        <div>
          打卡数目：
          <span>
            10000
          </span>
        </div>
      </Col>
      <Col>
        <div>
          目标数目：
          <span>
            10000
          </span>
        </div>
      </Col>
    </Row>
  );
};

const recommendedCourses = () => {
  return(
    <div>
      <Descriptions column={1} title="推荐课程" bordered>
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

const Personal = () => {
  return (
    <PageContainer
      header={{
        title: '个人中心',
        breadcrumb: {},
      }}
      content={
        <Descriptions column={3} style={{ marginBottom: -16 }}>
          <Descriptions.Item style={{ width: '20%' }}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<AntDesignOutlined />}
            />
          </Descriptions.Item>
          <Descriptions.Item label='tags' style={{ width: '50%' }}>
            {closableTag()}
          </Descriptions.Item>
          <Descriptions.Item label='In Progress' style={{ width: '30%' }}>
            <div> 10000</div>
          </Descriptions.Item>
          <Descriptions.Item>
            这是一个名字
          </Descriptions.Item>
          <Descriptions.Item>
            {addTags()}
          </Descriptions.Item>
          <Descriptions.Item label='Completed' style={{ width: '30%' }}>
            <div> 10000</div>
          </Descriptions.Item>
        </Descriptions>
      }
    >
      <GridContent>
        <Row gutter={24}>
          <Col lg={17} md={24}>
            <Card
              bordered={true}
              style={{
                marginBottom: 24,
              }}
            >
              {progress()}
            </ Card>
            <Card>
              {Collected()}
            </Card>
          </Col>
          <Col lg={7} md={24}>
            <Card
              bordered={true}
              style={{
                marginBottom: 24,
              }}>
              {targetCalendar()}
              <Divider dashed />
              {target()}
            </Card>
            <Card>
              {recommendedCourses()}
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default Personal;
