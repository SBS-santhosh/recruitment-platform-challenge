// hooks/useTranslations.js
'use client';

import { useCallback, useState } from 'react';

// Simple translations - you can move this to separate files later
const translations = {
  en: {
    candidate: {
      addNew: 'Add New Candidate',
      name: 'Full Name',
      namePlaceholder: "Enter candidate's full name",
      nameRequired: 'Please enter candidate name',
      email: 'Email Address',
      emailPlaceholder: "Enter candidate's email",
      emailRequired: 'Please enter email address',
      emailInvalid: 'Please enter a valid email',
      position: 'Position',
      positionPlaceholder: 'Enter position applied for',
      positionRequired: 'Please enter position',
      notes: 'Notes',
      notesPlaceholder: 'Additional notes about candidate',
      addButton: 'Add Candidate',
      list: 'Candidate List',
      status: {
        pending: 'Pending',
        accepted: 'Accepted',
        rejected: 'Rejected'
      }
    },
    common: {
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      reject: 'Reject',
      accept: 'Accept',
      save: 'Save',
      cancel: 'Cancel'
    }
  },
  fr: {
    candidate: {
      addNew: 'Ajouter un Nouveau Candidat',
      name: 'Nom Complet',
      namePlaceholder: 'Entrez le nom complet du candidat',
      nameRequired: 'Veuillez entrer le nom du candidat',
      email: 'Adresse Email',
      emailPlaceholder: "Entrez l'email du candidat",
      emailRequired: 'Veuillez entrer une adresse email',
      emailInvalid: 'Veuillez entrer une adresse email valide',
      position: 'Poste',
      positionPlaceholder: 'Entrez le poste demandé',
      positionRequired: 'Veuillez entrer le poste',
      notes: 'Notes',
      notesPlaceholder: 'Notes supplémentaires sur le candidat',
      addButton: 'Ajouter Candidat',
      list: 'Liste des Candidats',
      status: {
        pending: 'En Attente',
        accepted: 'Accepté',
        rejected: 'Rejeté'
      }
    },
    common: {
      view: 'Voir',
      edit: 'Modifier',
      delete: 'Supprimer',
      reject: 'Rejeter',
      accept: 'Accepter',
      save: 'Sauvegarder',
      cancel: 'Annuler'
    }
  }
};

export const useTranslations = (initialLanguage = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }, [language]);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return {
    t,
    language,
    changeLanguage,
    availableLanguages: Object.keys(translations)
  };
};

export default useTranslations;