import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const AddProductForm = ({ fetchProducts }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/create/produk", values)
      .then(() => {
        message.success("Product added successfully.");
        form.resetFields();
        fetchProducts(); // Reload products after adding a new one
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
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
        rules={[
          {
            required: true,
            message: "Please select product image!",
          },
        ]}
      >
        <Input type="file" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tambahkan Produk
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;