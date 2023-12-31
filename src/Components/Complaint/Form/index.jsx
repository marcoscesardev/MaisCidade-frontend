/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { createComplaint } from "../../../Helper/hooks/useMaisCidadeApi/useComplaint";
import { listCategories } from "../../../Helper/hooks/useMaisCidadeApi/useCategories";

const { Option } = Select;

const ComplaintForm = ({ latitude, longitude, onSuccess }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await listCategories();
    setCategories(data);
  };

  const onFinish = async (values) => {
    try {
      await createComplaint(values);
      message.success("Reclamação cadastrada com sucesso!");
      onSuccess();
    } catch (error) {
      console.error(error);
      message.error("Denúncia não cadastrada!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Form name="formulario" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Título"
          name="title"
          rules={[
            { required: true, message: "Por favor, insira o título!" },
            { max: 20, message: "O título deve ter no máximo 20 caracteres." },
          ]}
        >
          <Input placeholder="Título" />
        </Form.Item>

        <Form.Item
          label="Detalhes"
          name="description"
          rules={[
            { required: true, message: "Por favor, insira os detalhes!" },
            {
              max: 200,
              message: "A descrição deve ter no máximo 200 caracteres.",
            },
          ]}
        >
          <Input.TextArea placeholder="Detalhes" rows={4} />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="categoryId"
          rules={[
            { required: true, message: "Por favor, selecione a categoria!" },
          ]}
        >
          <Select placeholder="Selecione a categoria">
            {categories.map(({ id, name }) => (
              <Option key={`${id}-category`} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Latitude" name="latitude" initialValue={latitude}>
          <Input disabled prefix={<EnvironmentOutlined />} />
        </Form.Item>
        <Form.Item label="Longitude" name="longitude" initialValue={longitude}>
          <Input disabled prefix={<EnvironmentOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ComplaintForm;
