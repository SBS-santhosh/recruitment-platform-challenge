
'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Avatar, Button, Space, message, Card, Tag, Modal, Typography } from 'antd';
import { CloseOutlined, CheckOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import {
  selectCandidates,
  rejectCandidate,
  acceptCandidate
} from '../../store/candidateSlice';
import { useTranslations } from '../../hooks/useTranslations';

const { Text } = Typography;

const RecruiterPage = () => {
  const dispatch = useDispatch();
  const { language } = useTranslations();
  
  const allCandidates = useSelector(selectCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const handleReject = (candidateId) => {
    dispatch(rejectCandidate(candidateId));
    message.success(language === 'en' ? 'Candidate removed!' : 'Candidat supprimé !');
  };

  const handleAccept = (candidateId) => {
    dispatch(acceptCandidate(candidateId));
    message.success(language === 'en' ? 'Candidate accepted!' : 'Candidat accepté !');
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setViewModalVisible(true);
  };

  const getAvatarUrl = (name, lastname) => {
    const seed = `${name}-${lastname}`.replace(/\s+/g, '-');
    return `https://api.dicebear.com/7.x/miniavs/svg?seed=${seed}`;
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

  return (
    <div style={{ padding: '24px' }}>
      <Card title={language === 'en' ? "Candidate Applications" : "Candidatures"}>
        <List
          itemLayout="horizontal"
          dataSource={allCandidates}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total, range) =>
              language === 'en'
                ? `${range[0]}-${range[1]} of ${total} candidates`
                : `${range[0]}-${range[1]} sur ${total} candidats`,
          }}
          renderItem={candidate => (
            <List.Item
              actions={[
                <Button
                  icon={<EyeOutlined />}
                  size="small"
                  onClick={() => handleViewDetails(candidate)}
                >
                  {language === 'en' ? 'View' : 'Voir'}
                </Button>,
                candidate.status === 'pending' && (
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    size="small"
                    onClick={() => handleAccept(candidate.id)}
                  >
                    {language === 'en' ? 'Accept' : 'Accepter'}
                  </Button>
                ),
                <Button
                  danger
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => handleReject(candidate.id)}
                >
                  {language === 'en' ? 'Remove' : 'Supprimer'}
                </Button>
              ].filter(Boolean)}
            >
              <List.Item.Meta
                avatar={<Avatar src={getAvatarUrl(candidate.name, candidate.lastname)} />}
                title={
                  <Space>
                    {`${candidate.name} ${candidate.lastname}`}
                    {getStatusTag(candidate.status)}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={0}>
                    <div>{candidate.email}</div>
                    <div>{candidate.grade} • {candidate.city}</div>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Candidate Details Modal */}
      <Modal
        title={language === 'en' ? 'Candidate Details' : 'Détails du Candidat'}
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
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>{language === 'en' ? 'Name:' : 'Nom :'}</Text>
                <br />
                <Text>{selectedCandidate.name} {selectedCandidate.lastname}</Text>
              </div>
              
              <div>
                <Text strong>{language === 'en' ? 'Email:' : 'Email :'}</Text>
                <br />
                <Text>{selectedCandidate.email}</Text>
              </div>
              
              <div>
                <Text strong>{language === 'en' ? 'Position:' : 'Poste :'}</Text>
                <br />
                <Text>{selectedCandidate.grade}</Text>
              </div>
              
              <div>
                <Text strong>{language === 'en' ? 'City:' : 'Ville :'}</Text>
                <br />
                <Text>{selectedCandidate.city}</Text>
              </div>
              
              <div>
                <Text strong>{language === 'en' ? 'Phone:' : 'Téléphone :'}</Text>
                <br />
                <Text>{selectedCandidate.number}</Text>
              </div>
              
              <div>
                <Text strong>{language === 'en' ? 'Status:' : 'Statut :'}</Text>
                <br />
                {getStatusTag(selectedCandidate.status)}
              </div>
              
              <div>
                <Text strong>{language === 'en' ? 'CV:' : 'CV :'}</Text>
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
              </div>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecruiterPage;