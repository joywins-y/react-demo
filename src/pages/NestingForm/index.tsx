import { CloseOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Collapse, Form, Space, Typography } from 'antd';
import React from 'react';

const Index: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      // style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields?.map((field) => (
              <Collapse
                key={field?.key}
                defaultActiveKey={[field?.key]}
                items={[
                  {
                    key: field?.key,
                    label: `Item ${field?.name + 1}`,
                    children: (
                      <div>
                        <ProForm.Group size={8}>
                          <ProFormSelect
                            width="md"
                            label="环境"
                            name={[field?.name, 'hj']}
                            options={[
                              { label: '生产', value: 1 },
                              { label: '灰度', value: 2 },
                              { label: '预发', value: 3 },
                              { label: '仿真', value: 4 },
                            ]}
                            // style={{ minWidth: 150 }}
                          />
                          <ProFormText
                            width="sm"
                            label=""
                            name={[field?.name, 'aig']}
                            placeholder="AIG（选填）"
                            wrapperCol={{ span: 24 }}
                          />
                          <ProFormText
                            width="sm"
                            label=""
                            name={[field?.name, 'zone']}
                            placeholder="Zone（选填）"
                            wrapperCol={{ span: 24 }}
                          />
                        </ProForm.Group>
                      </div>
                    ),
                    extra: (
                      <Space>
                        <CopyOutlined
                          onClick={(e) => {
                            e?.stopPropagation();
                            const copyData =
                              form?.getFieldValue('items')?.[field?.name];
                            add(copyData);
                          }}
                        />
                        <CloseOutlined
                          onClick={(e) => {
                            e?.stopPropagation();
                            if (fields.length === 1) {
                              return;
                            }
                            remove(field?.name);
                          }}
                        />
                        {/* <FileAddOutlined /> */}
                        <PlusOutlined
                          onClick={(e) => {
                            e?.stopPropagation();
                            add();
                          }}
                        />
                      </Space>
                    ),
                  },
                ]}
              />
            ))}
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};

export default Index;
