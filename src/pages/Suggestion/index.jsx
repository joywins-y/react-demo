import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Tabs } from 'antd';
import { useRef, useState } from 'react';

const { TabPane } = Tabs;

const Index = () => {
  const actionRef = useRef();
  const [tabsList, setTabsList] = useState([{ id: 'list', name: '反馈列表' }]);
  const [activeKey, setActiveKey] = useState('list');

  // 表头
  const columns = [
    {
      title: '',
      dataIndex: 'search',
      hideInTable: true,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'details',
      align: 'center',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <>
          <Button
            type="dashed"
            icon={<EyeOutlined />}
            onClick={() => {
              handleEdit(record);
            }}
          />
        </>
      ),
    },
  ];

  // 新增tab页
  const handleEdit = (record) => {
    console.log(record);
    const newTabList = JSON.parse(JSON.stringify(tabsList));
    const arr = newTabList.map((item) => item.id + '');
    if (!arr.includes(record.id + '')) {
      record.id = record.id + '';
      newTabList.push(record);
    }
    setTabsList(newTabList);
    setActiveKey(record.id + '');
  };

  // 删除tab页
  const remove = (e, selected) => {
    e.stopPropagation();
    const index = tabsList.map((item) => item.id).indexOf(selected);
    activeKey === selected && setActiveKey(tabsList[index - 1].id);
    setTabsList((vs) => {
      const values = JSON.parse(JSON.stringify(vs));
      return values.filter((item) => item.id !== selected);
    });
  };

  // 设置tabs头
  const setTab = (item) => {
    return (
      <div className="is_show_nav">
        {item.id !== 'list' && (
          <div className="action">
            <CloseOutlined
              onClick={(e) => {
                remove(e, item.id);
              }}
            />
          </div>
        )}
        <div className="title">{item.id}</div>
      </div>
    );
  };

  return (
    <ProTable
      rowKey="id"
      actionRef={actionRef}
      className="my_table"
      bordered
      search={false}
      columns={columns}
      options={false}
      pagination={{ pageSize: 5 }}
      request={async ({ pageSize, current, ...params }) => {
        const data = [
            {
              id: 'abc',
              userId: '1001',
              details: '内容',
            },
          ],
          total = 10;

        return Promise.resolve({
          data,
          pageSize,
          current,
          total,
        });
      }}
      scroll={{ x: 1500 }}
      tableRender={(props, dom, domList) => (
        <div className="is_show_tabs" data-root={tabsList.length}>
          <Tabs
            type="editable-card"
            hideAdd={true}
            renderTabBar={(props, DefaultTabBar) => (
              <DefaultTabBar {...props} />
            )}
            onChange={(e) => setActiveKey(e)}
            activeKey={activeKey}
            tabBarGutter={5}
          >
            {tabsList.map((item, index) => {
              return (
                <TabPane tab={setTab(item)} key={item.id + ''} closable={false}>
                  {index === 0 ? dom : <div>122222</div>}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      )}
    />
  );
};

export default Index;
