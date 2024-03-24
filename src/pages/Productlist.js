import React, { useEffect, useState } from "react";
import { Table, Space, Button, message, Modal, Form, Input } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/produk")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:8080/delete/produk/${id}`)
      .then(() => {
        message.success("Product deleted successfully.");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setLoading(false);
      });
  };

  const handleEdit = (record) => {
    setEditProduct(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedProduct = { ...editProduct, ...values };
        setLoading(true);
        axios
          .put(`http://localhost:8080/update/produk/${editProduct.id_produk}`, updatedProduct)
          .then(() => {
            message.success("Product updated successfully.");
            fetchProducts();
            setIsModalVisible(false);
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id_produk",
      key: "id_produk",
    },
    {
      title: "Produk",
      dataIndex: "nama_produk",
      key: "nama_produk",
    },
    {
      title: "Harga",
      dataIndex: "harga_produk",
      key: "harga_produk",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi_produk",
      key: "deskripsi_produk",
    },
    {
      title: "Stock",
      dataIndex: "stok_tersedia",
      key: "stok_tersedia",
    },
    {
      title: "Berat",
      dataIndex: "berat_produk",
      key: "berat_produk",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<BiEdit />} onClick={() => handleEdit(record)} />
          <Button
            type="danger"
            icon={<BiTrash />}
            onClick={() => handleDelete(record.id_produk)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Product List</h1>
      <Table columns={columns} dataSource={products} loading={loading} rowKey="id" />

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Product Name" name="nama_produk" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="harga_produk" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="deskripsi_produk" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Stock Available" name="stok_tersedia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Weight" name="berat_produk" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;