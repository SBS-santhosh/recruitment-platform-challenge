// app/recuiter/page.js
'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Card,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Divider,
  Statistic,
  Row,
  Col,
  Typography,
  Badge,
  Tooltip,
  FloatButton
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import {
  selectCandidates,
  selectPendingCandidates,
  selectAcceptedCandidates,
  acceptCandidate,
  rejectCandidate
} from '../../store/candidateSlice';
import { useTranslations } from '../../hooks/useTranslations';

const { Title, Text } = Typography;

const RecruiterPage = () => {
  const dispatch = useDispatch();
  const { t, language, changeLanguage } = useTranslations();
  
  const allCandidates = useSelector(selectCandidates);
  const pendingCandidates = useSelector(selectPendingCandidates);
  const acceptedCandidates = useSelector(selectAcceptedCandidates);
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  // Language switcher
  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    changeLanguage(newLang);
    message.info(newLang === 'en' 
      ? 'Language changed to English' 
      : 'Langue changée en Français'
    );
  };

  const handleAccept = (candidateId) => {
    dispatch(acceptCandidate(candidateId));
    message.success(language === 'en' ? 'Candidate accepted!' : 'Candidat accepté !');
  };

  const handleReject = (candidateId) => {
    dispatch(rejectCandidate(candidateId));
    message.success(language === 'en' ? 'Candidate rejected!' : 'Candidat rejeté !');
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setViewModalVisible(true);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: {
        color: 'orange',
        text: language === 'en' ? 'Pending' : 'En Attente'
      },
      accepted: {
        color: 'green',
        text: language === 'en' ? 'Accepted' : 'Accepté'
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const candidateTableColumns = [
    {
      title: language === 'en' ? 'Name' : 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Text strong>{text} {record.lastname}</Text>
        </Space>
      ),
    },
    {
      title: language === 'en' ? 'Email' : 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: language === 'en' ? 'Position' : 'Poste',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: language === 'en' ? 'City' : 'Ville',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: language === 'en' ? 'Status' : 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: language === 'en' ? 'Applied Date' : 'Date de Candidature',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
    },
    {
      title: language === 'en' ? 'Actions' : 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title={language === 'en' ? 'View Details' : 'Voir les Détails'}>
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          
          {record.status === 'pending' && (
            <>
              <Tooltip title={language === 'en' ? 'Accept' : 'Accepter'}>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  size="small"
                  onClick={() => handleAccept(record.id)}
                />
              </Tooltip>
              <Tooltip title={language === 'en' ? 'Reject' : 'Rejeter'}>
                <Button
                  danger
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => handleReject(record.id)}
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={language === 'en' ? 'Total Candidates' : 'Total Candidats'}
              value={allCandidates.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={language === 'en' ? 'Pending Review' : 'En Attente'}
              value={pendingCandidates.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={language === 'en' ? 'Accepted' : 'Acceptés'}
              value={acceptedCandidates.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title={
          <Space>
            <TeamOutlined />
            {language === 'en' ? 'Candidate Management' : 'Gestion des Candidats'}
            <Badge count={allCandidates.length} showZero color="#1890ff" />
          </Space>
        }
      >
        <Table
          dataSource={allCandidates}
          columns={candidateTableColumns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              language === 'en'
                ? `${range[0]}-${range[1]} of ${total} candidates`
                : `${range[0]}-${range[1]} sur ${total} candidats`,
          }}
          locale={{
            emptyText: language === 'en' ? 'No candidates found' : 'Aucun candidat trouvé'
          }}
        />
      </Card>

      {/* Candidate Details Modal */}
      <Modal
        title={
          <Space>
            <UserOutlined />
            {language === 'en' ? 'Candidate Details' : 'Détails du Candidat'}
          </Space>
        }
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            {language === 'en' ? 'Close' : 'Fermer'}
          </Button>,
        ]}
        width={600}
      >
        {selectedCandidate && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>{language === 'en' ? 'Name:' : 'Nom :'}</Text>
                <br />
                <Text>{selectedCandidate.name} {selectedCandidate.lastname}</Text>
              </Col>
              <Col span={12}>
                <Text strong>{language === 'en' ? 'Status:' : 'Statut :'}</Text>
                <br />
                {getStatusTag(selectedCandidate.status)}
              </Col>
            </Row>
            
            <Divider />
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Email:</Text>
                <br />
                <Text>{selectedCandidate.email}</Text>
              </Col>
              <Col span={12}>
                <Text strong>{language === 'en' ? 'Phone:' : 'Téléphone :'}</Text>
                <br />
                <Text>{selectedCandidate.number}</Text>
              </Col>
            </Row>
            
            <Divider />
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>{language === 'en' ? 'Position:' : 'Poste :'}</Text>
                <br />
                <Text>{selectedCandidate.grade}</Text>
              </Col>
              <Col span={12}>
                <Text strong>{language === 'en' ? 'City:' : 'Ville :'}</Text>
                <br />
                <Text>{selectedCandidate.city}</Text>
              </Col>
            </Row>
            
            <Divider />
            
            <Row>
              <Col span={24}>
                <Text strong>{language === 'en' ? 'CV File:' : 'Fichier CV :'}</Text>
                <br />
                {selectedCandidate.cv ? (
                  <Button
                    type="link"
                    icon={<FileTextOutlined />}
                    onClick={() => window.open(selectedCandidate.cv.url, '_blank')}
                  >
                    {selectedCandidate.cv.name}
                  </Button>
                ) : (
                  <Text type="secondary">
                    {language === 'en' ? 'No CV uploaded' : 'Aucun CV téléchargé'}
                  </Text>
                )}
              </Col>
            </Row>
            
            <Divider />
            
            <Row>
              <Col span={24}>
                <Text strong>{language === 'en' ? 'Applied Date:' : 'Date de Candidature :'}</Text>
                <br />
                <Text>{formatDate(selectedCandidate.createdAt)}</Text>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Language Switcher FloatButton */}
      <Tooltip title={language === 'en' ? "Switch to French" : "Passer en Anglais"} placement="left">
        <FloatButton
          icon={<GlobalOutlined />}
          onClick={handleLanguageChange}
          description={language.toUpperCase()}
          shape="square"
          style={{ right: 24 }}
        />
      </Tooltip>
    </div>
  );
};

export default RecruiterPage;