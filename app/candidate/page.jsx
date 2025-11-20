// app/candidate/page.js
'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Upload, Button, Card, Space, message, Result, FloatButton, Tooltip } from 'antd';
import { UploadOutlined, SmileOutlined, GlobalOutlined } from '@ant-design/icons';
import { addCandidate, selectCandidates } from '../../store/candidateSlice';
import { useTranslations } from '../../hooks/useTranslations';

// Local file handling
const handleLocalFileUpload = (file, onSuccess, onError) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const mockResponse = {
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type
    };
    
    setTimeout(() => {
      onSuccess(mockResponse);
      message.success(`${file.name} uploaded successfully!`);
    }, 1000);
  };
  
  reader.onerror = (error) => {
    onError(error);
    message.error('Failed to read file');
  };
  
  reader.readAsDataURL(file);
};

const CandidatePage = () => {
  const dispatch = useDispatch();
  const candidates = useSelector(selectCandidates);
  const [form] = Form.useForm();
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  const { t, language, changeLanguage } = useTranslations();

  // Debug: Log current candidates
  React.useEffect(() => {
    console.log('Current candidates in store:', candidates);
    console.log('LocalStorage candidates:', localStorage.getItem('candidatesState'));
  }, [candidates]);

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    changeLanguage(newLang);
    
    const messageText = newLang === 'en' 
      ? 'Language changed to English' 
      : 'Langue changée en Français';
    message.info(messageText);
  };

  const customUploadProps = {
    accept: '.pdf,.doc,.docx',
    fileList,
    beforeUpload: (file) => {
      const isDocument = file.type === 'application/pdf' || 
                        file.type === 'application/msword' || 
                        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      if (!isDocument) {
        message.error(language === 'en' 
          ? 'You can only upload PDF, DOC, or DOCX files!' 
          : 'Vous ne pouvez télécharger que des fichiers PDF, DOC ou DOCX !');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error(language === 'en' 
          ? 'File must be smaller than 5MB!' 
          : 'Le fichier doit être inférieur à 5 Mo !');
        return false;
      }

      setUploading(true);
      
      handleLocalFileUpload(
        file,
        (response) => {
          setUploading(false);
          form.setFieldValue('cv', {
            name: file.name,
            url: response.url,
            size: file.size,
            type: file.type
          });
          console.log('File uploaded successfully:', file.name);
        },
        (error) => {
          setUploading(false);
          console.error('Upload error:', error);
          message.error(language === 'en' ? 'File upload failed' : 'Échec du téléchargement du fichier');
        }
      );

      return false;
    },
    onRemove: () => {
      setFileList([]);
      form.setFieldValue('cv', null);
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    
    if (!values.cv) {
      message.error(language === 'en' 
        ? 'Please upload your CV before submitting' 
        : 'Veuillez télécharger votre CV avant de soumettre');
      return;
    }

    // crt candi data
    const candidateData = {
      name: values.name,
      lastname: values.lastname,
      grade: values.grade,
      city: values.city,
      number: values.number,
      email: values.email,
      cv: values.cv,
    };

    console.log('Dispatching candidate:', candidateData);

    
    dispatch(addCandidate(candidateData));
    //reset 
    setShowSuccess(true);
    
 
    form.resetFields();
    setFileList([]);

    setTimeout(() => {
      console.log('Store after dispatch - should have new candidate');
      console.log('Updated localStorage:', localStorage.getItem('candidatesState'));
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form failed:', errorInfo);
    message.error(language === 'en' 
      ? 'Please fill in all required fields correctly.' 
      : 'Veuillez remplir tous les champs obligatoires correctement.');
  };

  if (showSuccess) {
    return (
      <div style={{ 
        padding: '40px', 
        maxWidth: '800px', 
        margin: '0 auto',
        minHeight: '100vh'
      }}>
        <Result
          icon={<SmileOutlined />}
          title={language === 'en' 
            ? "Great! Your application has been submitted successfully!" 
            : "Super! Votre candidature a été soumise avec succès !"}
          subTitle={language === 'en'
            ? "The recruiter will get back to you as soon as possible."
            : "Le recruteur vous recontactera dès que possible."}
          extra={
            <Button 
              type="primary" 
              onClick={() => setShowSuccess(false)}
            >
              {language === 'en' ? 'Submit Another Application' : 'Soumettre une autre candidature'}
            </Button>
          }
        />
        
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
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Debug info 
      <div style={{ marginBottom: 16, padding: 8, background: '#f5f5f5', borderRadius: 6 }}>
        <div>Debug: {candidates.length} candidates in store</div>
        <div>Check browser console for detailed logs</div>
      </div>*/}

      <Space direction="vertical" size="large" style={{ display: 'flex', marginBottom: '40px' }}>
        <Card 
          title={language === 'en' ? "Candidate Application Form" : "Formulaire de Candidature"} 
          size="small" 
          style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        >
          <Form 
            name="candidate-form" 
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={language === 'en' ? "Name" : "Nom"}
              name="name"
              rules={[{ required: true, message: language === 'en' ? 'Please enter your name' : 'Veuillez entrer votre nom' }]}
            >
              <Input placeholder={language === 'en' ? "Enter name" : "Entrez votre nom"} />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "Last Name" : "Prénom"}
              name="lastname"
              rules={[{ required: true, message: language === 'en' ? 'Please enter your last name' : 'Veuillez entrer votre prénom' }]}
            >
              <Input placeholder={language === 'en' ? "Enter last name" : "Entrez votre prénom"} />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "Grade" : "Niveau"}
              name="grade"
              rules={[{ required: true, message: language === 'en' ? 'Please enter your grade' : 'Veuillez entrer votre niveau' }]}
            >
              <Input placeholder={language === 'en' ? "Enter grade" : "Entrez votre niveau"} />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "City" : "Ville"}
              name="city"
              rules={[{ required: true, message: language === 'en' ? 'Please enter your city' : 'Veuillez entrer votre ville' }]}
            >
              <Input placeholder={language === 'en' ? "Enter city" : "Entrez votre ville"} />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "Phone Number" : "Numéro de Téléphone"}
              name="number"
              rules={[{ required: true, message: language === 'en' ? 'Please enter your phone number' : 'Veuillez entrer votre numéro de téléphone' }]}
            >
              <Input placeholder={language === 'en' ? "Enter phone number" : "Entrez votre numéro de téléphone"} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: language === 'en' ? 'Please enter your email' : 'Veuillez entrer votre email' },
                { type: 'email', message: language === 'en' ? 'Please enter a valid email' : 'Veuillez entrer un email valide' }
              ]}
            >
              <Input placeholder={language === 'en' ? "Enter email" : "Entrez votre email"} />
            </Form.Item>
            <Form.Item
              label={language === 'en' ? "CV Upload" : "Téléchargement du CV"}
              name="cv"
              rules={[{ required: true, message: language === 'en' ? 'Please upload your CV' : 'Veuillez télécharger votre CV' }]}
              extra={language === 'en' 
                ? "Supported formats: PDF, DOC, DOCX (Max: 5MB)" 
                : "Formats supportés : PDF, DOC, DOCX (Max : 5 Mo)"}
            >
              <Upload {...customUploadProps}>
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading 
                    ? (language === 'en' ? 'Uploading...' : 'Téléchargement...')
                    : (language === 'en' ? 'Click to Upload CV' : 'Cliquez pour télécharger le CV')
                  }
                </Button>
              </Upload>
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                style={{ width: '100%' }}
                disabled={uploading}
              >
                {language === 'en' ? 'Submit Application' : 'Soumettre la Candidature'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>

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

export default CandidatePage;