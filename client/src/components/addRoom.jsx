import React, { useState } from "react";
import { Modal, Form, Input ,DatePicker} from "antd";
import jwt_decode from 'jwt-decode';

export const AddRoom = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [dateTime,setDatetime] = useState();
  return (
    <Modal
      visible={visible}
      title="Create a new Scheduled Room"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            values.startedBy = jwt_decode(localStorage.getItem('jwt'))._id
            values.start = new Date(dateTime);
            console.log(values);
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Room Name"
          rules={[
            {
              required: true,
              message: "Please input Classroom name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Select time"
          rules={[
            {
              required: true,
              message: "Please Enter time",
            },
          ]}
        >
          <DatePicker showTime onOk={(val)=>{setDatetime(val._d)}}/>
        </Form.Item>
       
      </Form>
    </Modal>
  );
};
