'use client'

import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Space, Divider, FloatButton, Tooltip } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../hooks/useTranslations';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isStudentMode, setIsStudentMode] = useState(false);
  const router = useRouter();
  const { language, changeLanguage } = useTranslations();

  const validCredentials = {
    username: process.env.NEXT_PUBLIC_LOGIN_USERNAME || 'admin',
    password: process.env.NEXT_PUBLIC_LOGIN_PASSWORD || 'password'
  };

  {/*Create youy own .env file with the the login you want 
    NEXT_PUBLIC_LOGIN_USERNAME=user
    NEXT_PUBLIC_LOGIN_PASSWORD=pass
                                      */}

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    changeLanguage(newLang);
    
    const messageText = newLang === 'en' 
      ? 'Language changed to English' 
      : 'Langue changée en Français';
    message.info(messageText);
  };

  const onFinish = async (values) => {
    setLoading(true);
    
    setTimeout(() => {
      if (values.username === validCredentials.username && values.password === validCredentials.password) {
        message.success(language === 'en' ? 'Login successful!' : 'Connexion réussie !');
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

export default LoginPage;