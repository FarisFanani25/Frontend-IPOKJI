import React, { useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";

const AddProductForm = ({ fetchProducts }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/create/produk", values)
      .then((response) => {
        console.log(response.data); // Print server response
        message.success("Product added successfully.");
        form.resetFields();
        fetchProducts(); // Reload products after adding a new one
      })
      .catch((error) => {
        console.error("Error adding product:", error.response); // Print error response
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Product Name"
        name="nama_produk"
        rules={[{ required: true, message: "Please input product name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="harga_produk"
        rules={[{ required: true, message: "Please input product price!" }]}
      >
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="deskripsi_produk"
        rules={[{ required: true, message: "Please input product description!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Stock Available"
        name="stok_tersedia"
        rules={[{ required: true, message: "Please input available stock!" }]}
      >
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item
        label="Weight"
        name="berat_produk"
        rules={[{ required: true, message: "Please input product weight!" }]}
      >
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item
        label="Image"
        name="gambar_produk"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please select product image!",
          },
        ]}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
