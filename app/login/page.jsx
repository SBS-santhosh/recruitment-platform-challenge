

'use client'

import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../hooks/useTranslations';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isStudentMode, setIsStudentMode] = useState(false);
  const router = useRouter();
  const { language } = useTranslations();

  
  const validCredentials = {
    username: 'admin',
    password: 'password123'
  };

  const onFinish = async (values) => {
    setLoading(true);
    
 
    setTimeout(() => {
      if (values.username === validCredentials.username && values.password === validCredentials.password) {
        message.success(language === 'en' ? 'Login successful!' : 'Connexion réussie !');
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', values.username);
        router.push('/recruiter');
      } else {
        message.error(language === 'en' ? 'Invalid username or password' : 'Nom d\'utilisateur ou mot de passe invalide');
      }
      setLoading(false);
    }, 1000);
  };

  const handleStudentClick = () => {
    setIsStudentMode(false);
    router.push('/candidate');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5',
      padding: '20px'
    }}>
      <Card 
        title={
          <div style={{ textAlign: 'center' }}>
            {language === 'en' ? "Recruitment Platform" : "Plateforme de Recrutement"}
          </div>
        }
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        {!isStudentMode ? (
   
          <>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={() => message.error('Please check your inputs')}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label={language === 'en' ? "Username" : "Nom d'utilisateur"}
                name="username"
                rules={[{ required: true, message: language === 'en' ? 'Please input your username!' : 'Veuillez saisir votre nom d\'utilisateur !' }]}
              >
                <Input 
                  prefix={<UserOutlined />}
                  placeholder={language === 'en' ? "Enter username" : "Entrez le nom d'utilisateur"}
                />
              </Form.Item>

              <Form.Item
                label={language === 'en' ? "Password" : "Mot de passe"}
                name="password"
                rules={[{ required: true, message: language === 'en' ? 'Please input your password!' : 'Veuillez saisir votre mot de passe !' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined />}
                  placeholder={language === 'en' ? "Enter password" : "Entrez le mot de passe"}
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  {language === 'en' ? 'Log in' : 'Se connecter'}
                </Button>
              </Form.Item>
            </Form>

            <Divider>{language === 'en' ? 'or' : 'ou'}</Divider>

            <Button 
              type="default" 
              icon={<TeamOutlined />}
              onClick={handleStudentClick}
              style={{ width: '100%' }}
              size="large"
            >
              {language === 'en' ? 'I\'m a student - Apply for internship' : 'Je suis étudiant - Postuler pour un stage'}
            </Button>

        {/*   <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '6px' }}>
              <Space direction="vertical" size={0} style={{ fontSize: '12px', width: '100%' }}>
                <div><strong>{language === 'en' ? 'Demo Credentials:' : 'Identifiants de démo :'}</strong></div>
                <div>Username: admin</div>
                <div>Password: password123</div>
              </Space>
            </div> */}
          </>
        ) : (
          
          <div style={{ textAlign: 'center' }}>
            <p>{language === 'en' ? 'Student application form would go here' : 'Le formulaire de candidature étudiant irait ici'}</p>
            <Button onClick={() => setIsStudentMode(false)}>
              {language === 'en' ? 'Back to Login' : 'Retour à la connexion'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;