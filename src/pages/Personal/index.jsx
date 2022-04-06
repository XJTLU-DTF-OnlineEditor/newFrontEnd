import React, {Component} from 'react';
import {GridContent, PageContainer} from '@ant-design/pro-layout';
import {Button, Col, Descriptions, Row, Card, Divider, Calendar, Menu} from 'antd';
import {Avatar, Tag, Input, Select, Typography, Radio} from 'antd';
import {CheckCircleOutlined,AntDesignOutlined, LogoutOutlined, RightOutlined} from '@ant-design/icons';
import {delTag, getTag, login, updateTag} from '@/services/user/api';
import progress from '@/pages/Personal/components/Progress';
import Collected from '@/pages/Personal/components/Collected';
import {currentUser as queryCurrentUser} from "@/services/user/api";
import {Access} from "@/.umi/plugin-access/access";
import HeaderDropdown from "@/components/HeaderDropdown";
import GuestContent from "@/pages/Personal/components/GuestContent";
import { enquireScreen } from 'enquire-js';
import '../utils/static/style';

const targetCalendar = () => {
  return (
    <div className="site-calendar-customize-header-wrapper">
      <Calendar
        fullscreen={false}
        headerRender={({value, type, onChange, onTypeChange}) => {
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
              <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
              </Select.Option>,
            );
          }
          const month = value.month();

          const year = value.year();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div style={{padding: 8}}>
              <Typography.Title level={4}>目标</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    onChange={(newYear) => {
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
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={(selectedMonth) => {
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
          <span>10000</span>
        </div>
      </Col>
      <Col>
        <div>
          目标数目：
          <span>10000</span>
        </div>
      </Col>
    </Row>
  );
};

const recommendedCourses = () => {
  return (
    <div>
      <Descriptions column={1} title="推荐课程" bordered>
        <Descriptions.Item>
          This is the first Column
          <br/>
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column
          <br/>
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column
          <br/>
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column
          <br/>
        </Descriptions.Item>
        <Descriptions.Item>
          This is the first Column
          <br/>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

const options = [
  {label: 'java', value: '1'},
  {label: 'python', value: '2'},
  {label: 'C++', value: '3'},
  {label: 'Machine Learning', value: '4'},
  {label: 'Java Web', value: '5'},
  {label: 'distributed system', value: '6'},
  {label: 'matlab', value: '7'},
  {label: 'react', value: '8'},
];

function tagRender(props) {
  const {label, value, closable, onClose} = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color="gold"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{marginRight: 2}}
    >
      {label}
    </Tag>
  );
}

const onTagSearch = async (label) => {
  console.log(label);
  const res = await updateTag(label);
  console.log(res);
};

export default class personal extends Component {

  state = {
    currentUser: {},
    access: false,
  };

  constructor() {
    super();
    console.log('constructor');
    this.getData();
  }

  componentDidMount() {
    // 初始化数据
    // console.log('Did Mount');
    this.getData();

  }

  getData = async () => {
    const currentUser = await queryCurrentUser()
    console.log(currentUser)
    this.setState({currentUser: currentUser.data})
    if (currentUser.data.currentAuthority === "user") {
      this.setState({access: true})
    }
    console.log(this.state)
  }

  render() {
    const menuHeaderDropdown = (
      <Menu onClick={() => {
        this.props.history.push('/user/login')
      }}>
        <Menu.Item key="logout">
          <LogoutOutlined/>
          登录
        </Menu.Item>
      </Menu>
    )

    return (
      <PageContainer
        header={{
          title: '个人中心',
          breadcrumb: {},
        }}
        content={
          <Access
            accessible={this.state.access}
            fallback={
              <HeaderDropdown overlay={menuHeaderDropdown}>
                <Avatar
                  size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                  src='https://joeschmoe.io/api/v1/random' alt="avatar"/>
              </HeaderDropdown>
            }
          >
            <Descriptions column={3} style={{marginBottom: -16}}>
              <Descriptions.Item style={{width: '20%'}}>
                <Avatar
                  size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                  icon={<AntDesignOutlined/>}
                />
              </Descriptions.Item>
              <Descriptions.Item label="tags" style={{width: '100%'}}>
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  placeholder={'Choose your interests'}
                  defaultValue={this.state.tag}
                  style={{width: '90%'}}
                  options={options}
                  onChange={onTagSearch}
                />
              </Descriptions.Item>
              <Descriptions.Item label="In Progress" style={{width: '30%'}}>
                <div>
                  10000
                </div>
              </Descriptions.Item>
              <Descriptions.Item>
                这是一个名字
              </Descriptions.Item>
              <Descriptions.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Completed" style={{width: '30%'}}>
                <div>
                  10000
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Access>

        }
      >
        <Access accessible={this.state.access}>
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
                </Card>
                <Card>{Collected()}</Card>
              </Col>
              <Col lg={7} md={24}>
                <Card
                  bordered={true}
                  style={{
                    marginBottom: 24,
                  }}
                >
                  {targetCalendar()}
                  <Divider dashed/>
                  {target()}
                </Card>
                <Card>{recommendedCourses()}</Card>
              </Col>
            </Row>
          </GridContent>
        </Access>
        <Access accessible={!this.state.access}>
          <GuestContent />
        </Access>
      </PageContainer>
    )
  }
}
