const ptBR = {
  app: {
    title: ''
  },

  auth: {
    passwordReset: {
      error: `Email não encontrado`,
    },
    emailAddressVerificationEmail: {
      error: `Email não encontrado`,
    },
  },

  iam: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      disablingHimself: `Você não pode desativar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
    },
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  errors: {
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  emails: {
    invitation: {
      subject: `Você foi convidado para o app {0}`,
      body: `
        <p>Olá,</p>
        <p>Você foi convidado para o app {0}.</p>
        <p>Clique neste link para registrar-se.</p>
        <p><a href="{1}">{1}</a></p>
        <p>Obrigado,</p>
        <p>Equipe do app {0}</p>
      `,
    },
    emailAddressVerification: {
      subject: `Verifique seu e-mail do app {0}`,
      body: `
        <p>Olá,</p>
        <p>Clique neste link para verificar seu endereço de e-mail.</p>
        <p><a href='{0}'>{0}</a></p>
        <p>Se você não solicitou a verificação deste endereço, ignore este e-mail.</p>
        <p>Obrigado,</p>
        <p>Equipe do app {1}</p>
      `,
    },
    passwordReset: {
      subject: `Redefinir a senha do app {0}`,
      body: `
        <p>Olá,</p>
        <p>Clique neste link para redefinir a senha de login no app {0} com sua conta {1}.</p>
        <p><a href='{2}'>{2}</a></p>
        <p>Se você não solicitou a redefinição da sua senha, ignore este e-mail.</p>
        <p>Obrigado,</p>
        <p>Equipe do app {0}</p>
      `,
    },
  },
};

module.exports = ptBR;
